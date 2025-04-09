from django.urls import path
from authentication.views import UserRegistrationView
from authentication.views import UserLoginView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
]
