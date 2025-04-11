from django.forms import ValidationError
from rest_framework import serializers
from patient_dashboard.models import Vitals

class VitalsSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    class Meta:
        model = Vitals
        fields = ['id', 'user', 'temperature', 'blood_pressure', 'heart_rate', 'date_time']
