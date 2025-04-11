from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Vitals
from authentication.renderers import UserRenderer
from .serializers import VitalsSerializer

# Create your views here.

class VitalsView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self,request,format=None):
        vitals = Vitals.objects.filter(user=request.user).order_by('-date_time').first()
        if vitals:
            serializer = VitalsSerializer(vitals)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"errors": "No vitals found"}, status=status.HTTP_404_NOT_FOUND)
    

class VitalsUpdateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        """Create or update vitals for the current user"""
        # Check if the user already has a vitals entry
        existing_vitals = Vitals.objects.filter(user=request.user).order_by('-date_time').first()
        
        if existing_vitals:
            # If there's an existing entry, update it
            serializer = VitalsSerializer(existing_vitals, data=request.data)
        else:
            # If no existing entry, create a new one
            serializer = VitalsSerializer(data=request.data)
            
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({'msg':'Vitals Updated Successfully'},status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
