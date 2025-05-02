from django.urls import path
from patient_dashboard.views import VitalsView , VitalsUpdateView
from patient_dashboard.views import AppointmentDisplayView, CancelAppointmentView

urlpatterns = [
    path('vital/', VitalsView.as_view(),name='vital'),
    path('vital/update/', VitalsUpdateView.as_view(),name='vitalupdate'),
    path('appointment/display/', AppointmentDisplayView.as_view(),name='displayappointment'),
    path('appointment/<int:appointment_id>/cancel/', CancelAppointmentView.as_view(), name='cancel-appointment'),
]