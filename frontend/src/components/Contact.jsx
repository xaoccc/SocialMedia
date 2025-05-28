import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';

const Contact = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
    }, [jwtData]);

    return (
        <section>
            <NavBar />
            {jwtData ? (
                <div className="contact">
                    <h1>Contact Us</h1>
                </div>
            ) : (
                <p>You are not logged in</p>
            )}
        </section>

    )
};

export default Contact;