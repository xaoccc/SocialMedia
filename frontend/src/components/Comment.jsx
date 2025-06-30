export default function Comment({ comments }) {
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
    );
}