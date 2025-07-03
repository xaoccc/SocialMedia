from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'profile_picture_url']

        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Add fields you want to expose in the API
        fields = ['id', 'username', 'email', 'first_name', 'last_name']