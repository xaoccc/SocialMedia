from django.urls import path, include
from .views import AddNewComment, ShowAllComments, LikeComment


urlpatterns = [
    path("", ShowAllComments.as_view(), name="show_all_comments"),
    path("add/", AddNewComment.as_view(), name="comment_add"),
    path("like/", LikeComment.as_view(), name="comment_like"),   

]