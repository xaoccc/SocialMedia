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


class UserProfileUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    profile_picture_url = serializers.URLField(required=False)

    def update(self, instance, validated_data):
        user = instance
        profile = user.profile

        user.username = validated_data.get('username', user.username)
        user.first_name = validated_data.get('first_name', user.first_name)
        user.last_name = validated_data.get('last_name', user.last_name)
        user.save()

        profile.profile_picture_url = validated_data.get(
            'profile_picture_url', profile.profile_picture_url
        )
        profile.save()

        return user