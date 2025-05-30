import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar.jsx'; 

const Home = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
        // Debug
        if (jwtData) {
            console.log('JWT Data:', jwtData);
        }
    }, [jwtData]);

    return (
        <section className="container">
            <NavBar />
            {jwtData ? (
                <h2>Welcome, {(!jwtData.user.first_name) ? jwtData.user.username : jwtData.user.first_name}!</h2>
            ) : (
                <p>You are not logged in</p>
            )}
        </section>
    );
};

export default Home;