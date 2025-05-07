from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, email, name, age=None, gender=None, role='PATIENT', blood_group=None, password=None, password2=None):
        """
        Creates a normal user (not admin).
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            age=age,
            gender=gender,
            role=role,
            blood_group=blood_group,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates a superuser (admin) with only email, name, and password.
        Other fields are auto-filled with default admin values.
        """
        user = self.create_user(
            email,
            name=name,
            password=password,
            age=30,  
            gender='M', 
            role='ADMIN',
            blood_group='', 
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    name = models.CharField(max_length=200)

    # Optional fields (not required for superuser)
    GENDER_CHOICES = [('M', 'Male'), ('F', 'Female')]
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)

    age = models.PositiveIntegerField(blank=True, null=True)
    
    ROLE_CHOICES = [('PATIENT', 'Patient'), ('ADMIN', 'Admin')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='PATIENT')
    
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-'),
    ]
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)

    registered_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"  # Login with email
    REQUIRED_FIELDS = ["name"]  # Only asks for name when creating superuser

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin