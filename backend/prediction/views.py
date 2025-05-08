from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .ml_model import predict_disease
from .models import Disease, Doctor, PredictionRecord
from rest_framework.permissions import IsAuthenticated
import json
from .serializers import AppointmentSerializer, DoctorSerializer
from django.db.models import Q
import google.generativeai as genai
from django.conf import settings

# Disease information from gemini api
genai.configure(api_key=settings.GEMINI_API_KEY)

def get_disease_info(disease_name):
    """Fetch disease info from Gemini API"""
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    prompt = f"""Provide medical information about {disease_name} as a pure JSON object with exactly these 3 fields:
        1. "description": A 1-2 sentence overview of the disease
        2. "common_symptoms": An array of 5-6 most common symptoms
        3. "prevention_tips": An array of 5-6 prevention strategies

        Important requirements:
        - Return ONLY the raw JSON object 
        - Do NOT include any Markdown formatting (no ```json or ```)
        - Do NOT include any explanatory text
        - Maintain this exact structure:
        {{
            "description": "",
            "common_symptoms": [],
            "prevention_tips": []
        }}

        Example output for "Migraine":
        {{
            "description": "Migraine is...",
            "common_symptoms": ["Symptom 1", "Symptom 2"],
            "prevention_tips": ["Tip 1", "Tip 2"]
        }}"""
    
    try:
        response = model.generate_content(prompt)

        if not response.text:
            print(f"Empty response from Gemini for {disease_name}")
            return None
        print("Raw Gemini response:", response.text)
        return response.text
    except Exception as e:
        print(f"Gemini API error for {disease_name}: {str(e)}")
        return None
    

# Create your views here.

class DiseasePredictionView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        data = request.data
        symptoms = data.get("symptoms", [])
        
        # Get disease prediction from ML model
        ml_result = predict_disease(symptoms)
        if "error" in ml_result:
            return Response({"error": ml_result["error"]}, status=status.HTTP_400_BAD_REQUEST)
        
        top_disease = ml_result['predictions'][0]['disease']
        probability = ml_result['predictions'][0]['probability']
        
        disease_obj = Disease.objects.get(name__iexact=top_disease)
        # Get the first recommended doctor or None if there are no matches
        recommended_doctor = Doctor.objects.filter(
            specialization=disease_obj.specialization
        ).first()
        
        # Get disease info from Gemini API
        disease_info = get_disease_info(top_disease)
        print("Disease info from Gemini:", disease_info)
        try:
            disease_info = json.loads(disease_info) if disease_info else None
        except json.JSONDecodeError:
            disease_info = None

        # Store the prediction record
        prediction = PredictionRecord.objects.create(
            user=request.user,
            symptoms=json.dumps(symptoms),
            predicted_disease_name=top_disease,  
            predicted_disease=disease_obj, 
            probability=probability,
            recommended_doctor=recommended_doctor
        )
        response_data = {
            'predicted_disease': ml_result['predictions'],
            'info': disease_info,
            'timestamp': prediction.timestamp.isoformat(),
            'recommended_doctor': {
                'id' : recommended_doctor.id,
                'name': recommended_doctor.name,
                'specialization': recommended_doctor.get_specialization_display(),
            } if recommended_doctor else None
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
    
# Booking Appointment
class AppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """Create a new appointment for the current user"""
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            # Associate the appointment with the current user
            appointment = serializer.save(user=request.user)
            
            # Return the created appointment details
            response_data = {
                'id': appointment.id,
                'doctor_name': appointment.doctor.name,
                'doctor_specialization': appointment.doctor.specialization,
                'appointment_date': appointment.appointment_date,
                'preferred_time': appointment.get_preferred_time_display(),
                'message': appointment.message,
                'created_at': appointment.created_at
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# List all doctors
class DoctorListView(APIView):
    def get(self, request, format=None):
        # Get query parameters
        specialization = request.query_params.get('specialization')
        search_query = request.query_params.get('search')
        
        # Start with all doctors
        doctors = Doctor.objects.all()
        
        # Apply filters if provided
        if specialization:
            doctors = doctors.filter(specialization=specialization)
        
        if search_query:
            doctors = doctors.filter(
                Q(name__icontains=search_query) |
                Q(specialization__icontains=search_query)
            )
        
        # Order results
        doctors = doctors.order_by('name')
        
        # Serialize the data
        serializer = DoctorSerializer(doctors, many=True)
        
        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)
    



