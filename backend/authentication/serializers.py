from django.forms import ValidationError
from rest_framework import serializers
from authentication.models import User
from django.utils.encoding import smart_str, force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from authentication.utils import Util

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
    

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email','password']
        read_only_fields = ['id', 'email', 'is_active', 'registered_date']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','gender','age','blood_group','is_active','registered_date']


class ChangeUserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style = {'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255, style = {'input_type':'password'},write_only=True)

    class Meta:
        fields = ['password','password2']

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')

        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password does not match')
        
        user.set_password(password)
        user.save()
        return attrs
    

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http:/localhost:3000/api/user/reset/' + uid + '/' + token
            print(link)

            # Send Email
            body = 'Click The Link to Reset your Password ' + link
            data= {
                'subject': 'Reset Your Password',
                'body' : body,
                'to_email' : user.email
            }
            Util.send_email(data)

            return attrs
        else:
            raise serializers.ValidationError("You are not a registered user") 
        

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style = {'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255, style = {'input_type':'password'},write_only=True)

    class Meta:
        fields = ['password','password2']

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        uid = self.context.get('uid')
        token = self.context.get('token')

        if password != password2:
            raise ValidationError('Password and Confirm Password does not match')
        
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)

        if not PasswordResetTokenGenerator().check_token(user,token):
            raise ValidationError('Token is not valid or expired')

        user.set_password(password)
        user.save()
        return attrs
