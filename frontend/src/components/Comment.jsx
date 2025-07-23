import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import Reply from "./Reply";

export default function Comment({ comments, userProfile, onCommentsUpdate }) {
    const { jwtData } = useAuth();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [editedReplyContent, setEditedReplyContent] = useState("");
    const [newReply, setNewReply] = useState(null);
    const [replies, setReplies] = useState([]);

    const editComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    const editReply = (reply) => {
        setEditingReplyId(reply.id);
        setEditedReplyContent(reply.content);
    };


    useEffect(() => {
    }, [jwtData]);

    // We use the same like handler for both comment and reply
    const handleLike = async (comment, reply, action) => {
        try {
            const response = await fetch('http://localhost:8000/comments/like/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    comment_id: comment.id,
                    user_id: userProfile.user,
                    reply_id: reply?.id ?? '', /* here we check if the like is for a comment of for a reply  */
                    action: action
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            if (onCommentsUpdate) {
                onCommentsUpdate();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (commentId, replyId) => {

        try {
            const response = await fetch('http://localhost:8000/comments/delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    user_id: userProfile.user,
                    reply_id: replyId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            if (onCommentsUpdate) {
                onCommentsUpdate();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (commentId, replyId, editedContent) => {
        try {
            const response = await fetch('http://localhost:8000/comments/edit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    reply_id: replyId,
                    content: editedContent,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            if (onCommentsUpdate && data['success'].split(' ')[0] == 'Comment') {
                // Reload the comments data and exit the edit comment mode
                onCommentsUpdate();
                setEditingCommentId(null);
            } else if (data['success'].split(' ')[0] == 'Reply') {
                // Reload the replies data and exit the edit comment mode
                await showAllReplies(commentId);
                setEditingReplyId(null);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const showAllReplies = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8000/comments/${commentId}/all-replies/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.error('Failed to fetch comments:', response.status);
            } else {
                const data = await response.json();
                setReplies(prev => ({
                    ...prev,
                    [commentId]: data
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (comments.length > 0) {
            comments.forEach((comment) => {
                showAllReplies(comment.id);
            });
        }
    }, [comments]);

    return (
        <div className="comment-wrapper">
            {comments.map((comment) => (
                <div key={comment.id} className="flex-row">
                    <div className="rating-wrapper">
                        <button onClick={() => handleLike(comment, null, 'like')}>+</button>
                        <div className="score">{comment.likes_count || 0}</div>
                        <button onClick={() => handleLike(comment, null, 'unlike')}>-</button>
                    </div>
                    <article>
                        <div className="comment-header flex-row">
                            <div className="comment-header-left flex-row">
                                <img className="profile-pic" src={comment.avatar || '../../public/no-profile.jpg'} alt="" />
                                <div className="profile-name">{comment.username || 'Anonymous'}</div>
                                <div className="date">{comment.created_at
                                    ? new Date(comment.created_at)
                                        .toLocaleDateString('en-GB')
                                        .replace(/\//g, '-')
                                    : ''}
                                </div>
                            </div>
                            <div className="comment-header-right flex-row">
                                <div className="flex-row">
                                    {(userProfile.user == comment.user_id)
                                        ? <>
                                            <div className="delete flex-row" onClick={() => handleDelete(comment.id, null)}>
                                                <img src="../../public/icon-delete.svg" alt="delete icon" />
                                                <a className="delete-txt delete">Delete</a>
                                            </div>
                                            <div className="edit flex-row" onClick={() => editComment(comment)}>
                                                <img src="../../public/icon-edit.svg" alt="edit icon" />
                                                <a>Edit</a>
                                            </div>
                                        </>
                                        : <>
                                            <img src="../../public/icon-reply.svg" className="reply" alt="reply icon" />
                                            <a className="reply-txt reply" onClick={() => {
                                                setNewReply(comment.id);
                                                // fetch replies when user clicks "Reply"
                                            }}>Reply</a>
                                            <a className="reply-txt reply" onClick={() => setNewReply(null)}>Cancel Reply</a>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                        <div key={comment.id}>
                            {editingCommentId === comment.id ? (
                                <>
                                    <textarea
                                        className="comment-body"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    />
                                    <button onClick={() => handleEdit(comment.id, null, editedContent)}>Update</button>
                                </>
                            ) : (
                                <p className="comment-body">{comment.content}</p>
                            )}
                        </div>

                        <div className="replies-wrapper">
                            {(replies[comment.id] || []).map((reply) => (

                                <div key={reply.id} className="flex-row">
                                    <div className="rating-wrapper">
                                        <button onClick={() => handleLike(comment, reply, 'like')}>+</button>
                                        <div className="score">{reply.likes_count || 0}</div>
                                        <button onClick={() => handleLike(comment, reply, 'unlike')}>-</button>
                                    </div>
                                    <article>
                                        <div className="comment-header flex-row">
                                            <div className="comment-header-left flex-row">
                                                <img className="profile-pic" src={reply.avatar || '../../public/no-profile.jpg'} alt="" />
                                                <div className="profile-name">{reply.username || 'Anonymous'}</div>
                                                <div className="date">{reply.created_at
                                                    ? new Date(reply.created_at)
                                                        .toLocaleDateString('en-GB')
                                                        .replace(/\//g, '-')
                                                    : ''}
                                                </div>
                                            </div>
                                            <div className="comment-header-right flex-row">
                                                <div className="flex-row">
                                                    {(userProfile.user == reply.user_id)
                                                        ? <>
                                                            <div className="delete flex-row" onClick={() => handleDelete(comment.id, reply.id)}>
                                                                <img src="../../public/icon-delete.svg" alt="delete icon" />
                                                                <a className="delete-txt delete">Delete</a>
                                                            </div>
                                                            <div className="edit flex-row" onClick={() => editReply(reply)}>
                                                                <img src="../../public/icon-edit.svg" alt="edit icon" />
                                                                <a>Edit</a>
                                                            </div>
                                                        </>
                                                        : <>
                                                            <img src="../../public/icon-reply.svg" className="reply" alt="reply icon" />
                                                            <a className="reply-txt reply" onClick={() => {
                                                                setNewReply(reply.id);
                                                                // fetch replies when user clicks "Reply"
                                                            }}>Reply</a>
                                                            <a className="reply-txt reply" onClick={() => setNewReply(null)}>Cancel Reply</a>
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div key={reply.id}>
                                            {editingReplyId === reply.id ? (
                                                <>
                                                    <textarea
                                                        className="comment-body"
                                                        value={editedReplyContent}
                                                        onChange={(e) => setEditedReplyContent(e.target.value)}
                                                    />
                                                    <button onClick={() => handleEdit(comment.id, reply.id, editedReplyContent)}>Update</button>
                                                </>
                                            ) : (
                                                <p className="comment-body">{reply.content}</p>
                                             )}
                                        </div> 
                                    </article>

                                </div>
                            ))}
                        </div>

                        {newReply === comment.id && (
                            <Reply
                                commentId={comment.id}
                                userProfile={userProfile}
                                replies={replies[comment.id] || []}
                                onReplySent={() => {
                                    setNewReply(null);
                                    onCommentsUpdate?.();
                                }}
                                onRepliesUpdate={() => showAllReplies(comment.id)}
                            />
                        )}
                    </article>

                </div>
            ))}

        </div>
    )
};

