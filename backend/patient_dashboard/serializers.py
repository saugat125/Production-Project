from django.forms import ValidationError
from rest_framework import serializers
from patient_dashboard.models import Vitals
from prediction.models import Appointment

class VitalsSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    class Meta:
        model = Vitals
        fields = ['id', 'user', 'temperature', 'blood_pressure', 'heart_rate', 'date_time']


class AppointmentListSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name')
    doctor_specialization = serializers.CharField(source='doctor.specialization')
    preferred_time = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id',
            'doctor_name',
            'doctor_specialization',
            'appointment_date',
            'preferred_time',
            'message',
            'created_at'
        ]
    
    def get_preferred_time(self, obj):
        return obj.get_preferred_time_display()