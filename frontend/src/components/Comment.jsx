import React, { useEffect, useState } from 'react';
export default function Comment() {

    const [comments, setComments] = useState([]);
    const showAllComments = async () => {
        // e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/comments/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                console.error('Failed to fetch comments:', response.status);
            } else {
                const data = await response.json();
                console.log('Comments:', data);
                setComments(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        showAllComments();
    }, []);

    return (
        <div class="comment-wrapper">
            {comments.map((comment) => (
                <div key={comment.id} className="flex-row">
                    <div className="rating-wrapper">
                        <button>
                            <img src="../../public/icon-plus.svg" alt="plus icon" />
                        </button>
                        <div className="score">{comment.score || 0}</div>
                        <button>
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
                                    <img src="../../public/icon-reply.svg" alt="reply icon" />
                                    <a className="reply-txt">Reply</a>
                                </div>
                            </div>
                        </div>
                        <p className="comment-body">{comment.text || comment.body}</p>
                    </article>
                </div>
            ))}

        </div>
    );
}