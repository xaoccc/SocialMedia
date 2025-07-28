import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';

const Profile = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
    }, [jwtData]);

    return (
        <>
            <section className="container">
                <NavBar />
                {jwtData ? (
                    <div className="contact">
                        <h1>Profile</h1>
                    </div>
                ) : (
                    <p>You are not logged in</p>
                )}
            </section>
            
            
        </>
    )
};

export default Profile;