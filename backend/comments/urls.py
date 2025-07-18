from django.urls import path, include
from .views import AddNewComment, ShowAllComments, LikeComment,  ReplyCreateView, ShowAllReplies, DeleteView, EditView


urlpatterns = [
    path("", ShowAllComments.as_view(), name="show_all_comments"),
    path("add/", AddNewComment.as_view(), name="comment_add"),
    path("like/", LikeComment.as_view(), name="comment_like"),  
    path("delete/", DeleteView.as_view(), name="comment_reply_delete"),   
    path("edit/", EditView.as_view(), name="comment_reply_edit"),   
    path("<int:comment_id>/replies/", ReplyCreateView.as_view(), name="reply_add"),
    path("<int:comment_id>/all-replies/", ShowAllReplies.as_view(), name="show_all_replies"),
    # path("<int:comment_id>/edit-reply/", EditReply.as_view(), name="edit_reply"),
]