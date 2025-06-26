from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'profile', 'content', 'created_at', 'likes_count', 'username', 'avatar']
        read_only_fields = ['id', 'created_at', 'likes_count']

    def get_username(self, obj):
        return obj.profile.user.username if obj.profile and obj.profile.user else None

    def get_avatar(self, obj):
        return obj.profile.profile_picture_url if obj.profile and obj.profile.profile_picture_url else None