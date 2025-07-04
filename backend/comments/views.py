from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Comment, Like
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
    
class LikeComment(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
      
        like = Like.objects.filter(comment_id=data['comment_id']).filter(user_id=data['user_id'])
        if like is None or like.count() == 0:
            if data['action'] == 'like':
                like = Like.objects.create(comment_id=data['comment_id'], user_id=data['user_id'])
                like.save()
                return Response(data, status=status.HTTP_201_CREATED)
        elif (like is None or like.count() > 0) and data['action'] == 'unlike':
            like.delete()
            return Response(data, status=status.HTTP_201_CREATED)

        
        return Response({"error": "Comment likes not updated. You can like a comment just once."}, status=status.HTTP_400_BAD_REQUEST)
        
        

class ShowAllComments(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteComment(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):        
        data = request.data.copy()
        comment = Comment.objects.get(id = data['comment_id'])
        comment.delete()
        return Response({"success": "Comment successfully deleted."}, status=status.HTTP_201_CREATED)