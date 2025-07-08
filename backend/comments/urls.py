from django.urls import path, include
from .views import AddNewComment, ShowAllComments, LikeComment, DeleteComment, EditComment, ReplyCreateView, ShowAllReplies


urlpatterns = [
    path("", ShowAllComments.as_view(), name="show_all_comments"),
    path("add/", AddNewComment.as_view(), name="comment_add"),
    path("like/", LikeComment.as_view(), name="comment_like"),   
    path("delete/", DeleteComment.as_view(), name="comment_delete"),   
    path("edit/", EditComment.as_view(), name="comment_edit"),   
    path("<int:comment_id>/replies/", ReplyCreateView.as_view(), name="reply_add"),
    path("<int:comment_id>/all-replies/", ShowAllReplies.as_view(), name="show_all_replies")

]