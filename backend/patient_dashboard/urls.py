from django.urls import path
from patient_dashboard.views import VitalsView , VitalsUpdateView

urlpatterns = [
    path('vital/', VitalsView.as_view(),name='vital'),
    path('vital/update/', VitalsUpdateView.as_view(),name='vitalupdate'),
]