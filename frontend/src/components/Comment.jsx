import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';


export default function Comment({ comments, userProfile, onCommentsUpdate }) {
    const { jwtData } = useAuth();

    useEffect(() => {
    }, [jwtData]);

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
                                    <img src="../../public/icon-reply.svg" className="reply" alt="reply icon" />
                                    <a className="reply-txt reply">Reply</a>
                                </div>
                            </div>
                        </div>
                        <p className="comment-body">{comment.content}</p>
                    </article>
                </div>
            ))}

        </div>
    )
};

