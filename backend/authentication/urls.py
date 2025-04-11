from django.urls import path
from authentication.views import UserRegistrationView
from authentication.views import UserLoginView
from authentication.views import UserProfileView
from authentication.views import UserProfileUpdateView
from authentication.views import UserChangePasswordView
from authentication.views import SendPasswordResetEmailView
from authentication.views import UserPasswordResetView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserProfileView.as_view(),name='profile'),
    path('profile/update/', UserProfileUpdateView.as_view(),name='profileupdate'),
    path('changepassword/', UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(),name='resetpasswordemail'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(),name='resetpassword'),
]
