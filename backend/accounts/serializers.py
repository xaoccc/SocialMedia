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


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update Profile fields
        profile = instance.profile  # assuming a OneToOne relationship exists
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()