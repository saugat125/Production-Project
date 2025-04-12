from django.db import models
from django.conf import settings

# Create your models here.

class Vitals(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vitals')
    heart_rate = models.PositiveIntegerField(blank=True, null=True)
    blood_pressure = models.CharField(max_length=10 ,blank=True, null=True) 
    temperature = models.FloatField(max_length=10 ,blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_time']
        verbose_name = "Vitals"
        verbose_name_plural = "Vitals"

    def __str__(self):
        return f"{self.user.name} - {self.date_time}"


