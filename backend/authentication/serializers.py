from rest_framework import serializers
from authentication.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'} , write_only=True)
    class Meta:
        model = User
        fields = ['email','name','age','gender','password','password2']
        extra_kwargs = {
            'password' :{'write_only':True}
        }

    # Validate password and confirm password
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.pop('password2', None)

        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password does not match')
        return attrs
    
    def create(self,validate_data):
        return User.objects.create_user(**validate_data)