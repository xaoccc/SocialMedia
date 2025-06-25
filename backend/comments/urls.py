from django.urls import path, include
from .views import AddNewComment


urlpatterns = [
    path("add/", AddNewComment.as_view(), name="comment_add"),

]