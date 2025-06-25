from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'profile', 'content', 'created_at', 'likes_count']
        read_only_fields = ['id', 'created_at', 'likes_count']