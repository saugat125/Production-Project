from django.db import models
from django.conf import settings

# Create your models here.

class Disease(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=50, choices= [
        ('dermatology', 'Dermatology'),
        ('allergy and immunology', 'Allergy and Immunology'),
        ('gastroenterology', 'Gastroenterology'),
        ('infectious diseases', 'Infectious Diseases'),
        ('endocrinology', 'Endocrinology'),
        ('cardiology', 'Cardiology'),
        ('pulmonology', 'Pulmonology'),
        ('neurology', 'Neurology'),
        ('rheumatology', 'Rheumatology'),
        ('urology', 'Urology'),
        ('hepatology', 'Hepatology'),
        ('proctology', 'Proctology'),
    ])

    def __str__(self):
        return f"{self.name}"
    

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=50, choices=Disease._meta.get_field('specialization').choices)

    def __str__(self):
        return f"{self.name} - {self.specialization}"
    

class PredictionRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    symptoms = models.TextField()
    predicted_disease_name = models.CharField(max_length=100, null=True, blank=True)  # Adding null=True
    predicted_disease = models.ForeignKey(Disease, on_delete=models.SET_NULL, null=True, blank=True)
    probability = models.FloatField()
    recommended_doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
   
    def __str__(self):
        return f"{self.user.name} - {self.predicted_disease} at {self.timestamp}"
    

class Appointment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')

    TIME_CHOICES = [
        ('morning', 'Morning (9:00 AM - 12:00 PM)'),
        ('afternoon', 'Afternoon (1:00 PM - 4:00 PM)'),
        ('evening', 'Evening (5:00 PM - 8:00 PM)'),
    ]

    appointment_date = models.DateField()
    preferred_time = models.CharField(max_length=20, choices=TIME_CHOICES)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  

    class Meta:
        ordering = ['-appointment_date']  

    def __str__(self):
        return f"{self.user.name} with Dr. {self.doctor.name} on {self.appointment_date}"

