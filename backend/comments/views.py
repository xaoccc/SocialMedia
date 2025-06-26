from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Comment
from .serializers import CommentSerializer
from accounts.models import Profile  # Adjust if Profile is in another app

class AddNewComment(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Get the profile of the currently logged-in user
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['profile'] = profile.id

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShowAllComments(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
