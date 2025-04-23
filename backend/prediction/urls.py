from django.urls import path
from prediction.views import DiseasePredictionView
from prediction.views import AppointmentView

urlpatterns = [
    path('predict/', DiseasePredictionView.as_view(),name='predict'),
    path('appointment/', AppointmentView.as_view(),name='appointment'),
]