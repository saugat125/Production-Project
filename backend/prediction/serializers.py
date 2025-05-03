from rest_framework import serializers
from .models import Appointment
from datetime import datetime
from prediction.models import Doctor

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor', 'appointment_date', 'preferred_time', 'message']
    
    def validate_appointment_date(self, value):
        """Check that appointment date is not in the past"""
        if value < datetime.now().date():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return value
    

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization']