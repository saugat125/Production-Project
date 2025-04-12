from django.db import models

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
