from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .ml_model import predict_disease
from .models import Disease, Doctor, PredictionRecord
from rest_framework.permissions import IsAuthenticated
import json
from .serializers import AppointmentSerializer, DoctorSerializer

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
        # Get optional specialization filter from query params
        specialization = request.query_params.get('specialization')
        
        # Filter doctors if specialization is provided
        if specialization:
            doctors = Doctor.objects.filter(specialization=specialization)
        else:
            doctors = Doctor.objects.all()
        
        # Serialize the data
        serializer = DoctorSerializer(doctors, many=True)
        
        # Return the response
        return Response(serializer.data, status=status.HTTP_200_OK)

