import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';

export default function Reply({ commentId, userProfile }) {
    const [newReplyContent, setNewReplyContent] = useState('');
    const { jwtData } = useAuth();

   

    useEffect(() => {
    }, [jwtData]);

    const handleNewReply = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/comments/${commentId}/replies/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    content: newReplyContent
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            setNewReplyContent('');
            await showAllReplies();

        } catch (error) {
            console.error(error);
        }
    }



    return (

        <form className="new-reply flex-row" onSubmit={handleNewReply}>
            <img src={userProfile.profile_picture_url} />
            <textarea
                rows="4"
                name="new-reply"
                id="new-reply"
                placeholder="Add a comment..."
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
            ></textarea>
            <button>REPLY</button>
        </form>
    );
};