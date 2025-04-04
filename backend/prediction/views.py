from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .ml_model import predict_disease

# Create your views here.

@api_view(["POST"])
def predict(request):
    data = request.data
    symptoms = data.get("symptoms",[])

    result = predict_disease(symptoms)

    return JsonResponse(result)


