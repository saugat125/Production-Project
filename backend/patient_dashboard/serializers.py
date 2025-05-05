from django.forms import ValidationError
from rest_framework import serializers
from patient_dashboard.models import Vitals
from prediction.models import Appointment, PredictionRecord

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
    

class PredictionRecordSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    disease_name = serializers.CharField(source='predicted_disease.name', read_only=True)
    doctor_name = serializers.CharField(source='recommended_doctor.name', read_only=True)
    doctor_specialization = serializers.CharField(source='recommended_doctor.specialization', read_only=True)
    timestamp = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = PredictionRecord
        fields = [
            'id',
            'user_name',
            'symptoms',
            'predicted_disease_name',
            'disease_name',
            'probability',
            'doctor_name',
            'doctor_specialization',
            'timestamp'
        ]
        read_only_fields = fields