from rest_framework import serializers
from .models import Comment, Reply

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'profile', 'content', 'created_at', 'likes_count', 'username', 'avatar', 'user_id']
        read_only_fields = ['id', 'created_at', 'likes_count']

    def get_username(self, obj):
        return obj.profile.user.username if obj.profile and obj.profile.user else None
    
    def get_user_id(self, obj):
        return obj.profile.user.id if obj.profile and obj.profile.user else None

    def get_avatar(self, obj):
        return obj.profile.profile_picture_url if obj.profile and obj.profile.profile_picture_url else None

class ReplySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    profile = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'profile', 'content', 'created_at', 'likes_count', 'username', 'avatar', 'user_id']
        read_only_fields = ['id', 'created_at', 'likes_count']

    def get_username(self, obj):
        return obj.user.user.username if obj.user and obj.user.user else None

    def get_user_id(self, obj):
        return obj.user.user.id if obj.user and obj.user.user else None

    def get_avatar(self, obj):
        return obj.user.profile_picture_url if obj.user and obj.user.profile_picture_url else None
