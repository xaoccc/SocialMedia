import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';

const About = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
    }, [jwtData]);

    return (
        <section className="container">
            <NavBar />
            {jwtData ? (
                <div className="about">
                    <h1>About Us</h1>
                </div>
            ) : (
                <p>You are not logged in</p>
            )}

        </section>

    )
};

export default About;