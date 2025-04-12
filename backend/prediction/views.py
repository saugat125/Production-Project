from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .ml_model import predict_disease
from .models import Disease, Doctor, PredictionRecord
from rest_framework.permissions import IsAuthenticated
import json

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
                'name': recommended_doctor.name,
                'specialization': recommended_doctor.get_specialization_display(),
            } if recommended_doctor else None
        }
        return Response(response_data, status=status.HTTP_200_OK)
    



