from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from urllib.parse import urljoin
import requests
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from django.views import View
from django.contrib.auth import get_user_model

from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, UserSerializer
from .models import Profile

from dj_rest_auth.registration.views import RegisterView



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_OAUTH_CALLBACK_URL
    client_class = OAuth2Client


class GoogleLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        """
        If you are building a fullstack application (eq. with React app next to Django)
        you can place this endpoint in your frontend application to receive
        the JWT tokens there - and store them in the state
        """

        code = request.GET.get("code")

        

        if code is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        # Remember to replace the localhost:8000 with the actual domain name before deployment
        token_endpoint_url = urljoin("http://localhost:8000", reverse("google_login"))
        response = requests.post(url=token_endpoint_url, data={"code": code})

        return Response(response.json(), status=status.HTTP_200_OK)

class LoginPage(View):
    def get(self, request, *args, **kwargs):        
        return render(
            request,
            "pages/login.html",
            {
                "google_callback_uri": settings.GOOGLE_OAUTH_CALLBACK_URL,
                "google_client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            },
        )

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

# Override the RegisterView, so that we can create a new Profile object linked to the User object with a default profile picture url.
class CustomRegisterView(RegisterView):
    def perform_create(self, serializer):
        # Custom logic here (e.g., logging, sending a custom email)
        user = serializer.save(self.request)
        User = get_user_model()
        user_object = User.objects.get(username=user)
      
        profile = Profile.objects.get(user_id=user_object.id)
        profile.profile_picture_url='https://raw.githubusercontent.com/xaoccc/SocialMedia/refs/heads/main/frontend/public/no-profile.jpg'
        profile.save()
        return user
    
class AllUsersView(APIView):
    def get(self, request, *args, **kwargs):
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
