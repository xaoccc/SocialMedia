import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar.jsx'; 

import { useLoaderData, useNavigate } from 'react-router-dom';

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
                    <img src={userProfile.profile_picture_url}></img>
                </div>
            ) : (
                <p>You are not logged in</p>
            )}
        </section>
    );
};

export default Home;