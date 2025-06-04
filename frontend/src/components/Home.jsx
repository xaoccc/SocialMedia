import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar.jsx';
import '../reset.css';
import '../styles.css';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const { jwtData } = useAuth();
    const userProfile = useLoaderData();

    useEffect(() => {
    }, [jwtData]);

    useEffect(() => {
    }, [userProfile]);

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
                <div class="comment-wrapper flex-row">
                    <div class="rating-wrapper">
                        <button>
                            <img src="./images/icon-plus.svg" alt="plus icon" />
                        </button>
                        <div class="score">5</div>
                        <button>
                            <img src="./images/icon-minus.svg" alt="plus icon" />
                        </button>
                    </div>
                    <article>
                        <div class="comment-header flex-row">
                            <div class="comment-header-left flex-row">
                                <img class="profile-pic" src="" alt="" />
                                <div class="profile-name"></div>
                                <div class="date"></div>
                            </div>
                            <div class="comment-header-right flex-row">
                                <div class="flex-row">
                                    <img src="./images/icon-reply.svg" alt="reply icon" />
                                    <a class="reply-txt">Reply</a>
                                </div>
                            </div>
                        </div>
                        <p class="comment-body"></p>
                    </article>
                </div>

            </section>
            <section class="new-comment flex-row">
                <img src={userProfile.profile_picture_url} />
                <textarea rows="4" name="" id="" placeholder="Add a comment..."></textarea>
                <button>SEND</button>
            </section>

        </section>
    );
};

export default Home;