import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar.jsx';
import '../reset.css';
import '../styles.css';
import { useLoaderData } from 'react-router-dom';
import Comment from './Comment.jsx';

const Home = () => {
    const { jwtData } = useAuth();
    const userProfile = useLoaderData();

    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
    }, [jwtData]);

    useEffect(() => {
    }, [userProfile]);

    const handleNewComment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/comments/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtData.access}`,
                },
                body: JSON.stringify({
                    content: newCommentContent
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Comment added:', data);
            setNewCommentContent('');

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="container">
            <NavBar />
            {jwtData ? (
                <div>
                    <h2>Welcome, {(!jwtData.user.first_name) ? jwtData.user.username : jwtData.user.first_name}!</h2>
                </div>
            ) : (
                <p>You are not logged in</p>
            )}

            <section class="comments">

                <Comment />
            </section>
            <form class="new-comment flex-row" onSubmit={handleNewComment}>
                <img src={userProfile.profile_picture_url} />
                <textarea
                    rows="4"
                    name="new-comment"
                    id="new-comment"
                    placeholder="Add a comment..."
                    onChange={(e) => setNewCommentContent(e.target.value)}
                ></textarea>
                <button>SEND</button>
            </form>

        </section>
    );
};

export default Home;