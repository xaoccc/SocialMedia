import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import Reply from "./Reply";


export default function Comment({ comments, userProfile, onCommentsUpdate }) {
    const { jwtData } = useAuth();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [newReply, setNewReply] = useState(null);
    const [replies, setReplies] = useState([]);

    const editComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    const reply = (comment) => {
        setNewReply(comment.id);
    }

    useEffect(() => {
    }, [jwtData]);
    console.log(userProfile);

    const handleLike = async (comment, action) => {
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

    const handleDelete = async (comment) => {
        try {
            const response = await fetch('http://localhost:8000/comments/delete/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    comment_id: comment.id,
                    user_id: userProfile.user,
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

    const handleEdit = async (comment, editedContent) => {
        try {
            const response = await fetch('http://localhost:8000/comments/edit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    comment_id: comment.id,
                    editedContent: editedContent,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            if (onCommentsUpdate) {
                // Reload the comments data and exit the edit comment mode
                onCommentsUpdate();
                setEditingCommentId(null);
            }
        } catch (error) {
            console.error(error);
        }

    }


    const showAllReplies = async (e, commentId) => {
        e.preventDefault();

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
                setReplies(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        showAllReplies();
    }, []);

    return (
        <div class="comment-wrapper">
            {comments.map((comment) => (
                <div key={comment.id} className="flex-row">
                    <div className="rating-wrapper">
                        <button onClick={() => handleLike(comment, 'like')}>
                            <img src="../../public/icon-plus.svg" alt="plus icon" />
                        </button>
                        <div className="score">{comment.likes_count || 0}</div>
                        <button onClick={() => handleLike(comment, 'unlike')}>
                            <img src="../../public/icon-minus.svg" alt="minus icon" />
                        </button>
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
                                            <div className="delete flex-row" onClick={() => handleDelete(comment)}>
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
                                            <a className="reply-txt reply" onClick={() => reply(comment)}>Reply</a>
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
                                    <button onClick={() => handleEdit(comment, editedContent)}>Update</button>
                                </>
                            ) : (
                                <p className="comment-body">{comment.content}</p>
                            )}
                        </div>
                        {newReply === comment.id && (
                            <Reply
                                commentId={comment.id}
                                userProfile={userProfile}
                                onReplySent={() => {
                                    setNewReply(null);
                                    onCommentsUpdate?.();
                                }}
                            />
                        )}
                    </article>

                </div>
            ))}

        </div>
    )
};

