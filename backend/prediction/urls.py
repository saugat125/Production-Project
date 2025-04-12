from django.urls import path
from prediction.views import DiseasePredictionView

urlpatterns = [
    path('predict/', DiseasePredictionView.as_view(),name='predict'),
]