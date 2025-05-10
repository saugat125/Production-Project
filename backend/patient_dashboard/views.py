from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Vitals
from authentication.renderers import UserRenderer
from .serializers import VitalsSerializer
from prediction.models import Appointment, PredictionRecord
from .serializers import PredictionRecordSerializer
from .serializers import AppointmentListSerializer

# Create your views here.

class VitalsView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        vitals = Vitals.objects.filter(user=request.user).order_by('-date_time').first()
        
        if vitals:
            serializer = VitalsSerializer(vitals)
        else:
            # Return default empty values
            serializer = VitalsSerializer(data={
                'temperature': None,
                'blood_pressure': None,
                'heart_rate': None,
                'date_time': None
            })
            serializer.is_valid()  # Make sure to call this
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class VitalsUpdateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        """Create or update vitals for the current user"""
        # Check if the user already has a vitals entry
        existing_vitals = Vitals.objects.filter(user=request.user).order_by('-date_time').first()
        
        if existing_vitals:
            # If there's an existing entry, update it
            serializer = VitalsSerializer(existing_vitals, data=request.data)
        else:
            # If no existing entry, create a new one
            serializer = VitalsSerializer(data=request.data)
            
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'msg':'Vitals Updated Successfully'},status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AppointmentDisplayView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self,request,format=None):
        """Get all appointments for the current user"""
        appointments = Appointment.objects.filter(user=request.user).select_related('doctor')
        serializer = AppointmentListSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CancelAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, appointment_id, format=None):
        try:
            appointment = Appointment.objects.get(id=appointment_id, user=request.user)
            appointment.delete()
            return Response(
                {"message": "Appointment cancelled successfully."},
                status = status.HTTP_200_OK
            )
        except Appointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found."},
                status = status.HTTP_404_NOT_FOUND
            )
        

class PredictionHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        try:
            # Get records for the current user, ordered by most recent
            records = PredictionRecord.objects.filter(user=request.user).order_by('-timestamp')
            
            # Serialize the data
            serializer = PredictionRecordSerializer(records, many=True)
            
            return Response({
                'success': True,
                'data': serializer.data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)