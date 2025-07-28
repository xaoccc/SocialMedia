import NavBar from './NavBar.jsx';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';

const Contact = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
    }, [jwtData]);

    return (
        <>
            <section className="container">
                <NavBar />
                {jwtData ? (
                    <div className="contact">
                        <h1>Contact Us</h1>
                    </div>
                ) : (
                    <p>You are not logged in</p>
                )}
                <iframe loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107478.60407905567!2d9.465088757264867!3d46.83157372962593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4784c7768af75b55%3A0x2b4f78a6d7011f30!2z0JrRg9GALCDQqNCy0LXQudGG0LDRgNC40Y8!5e1!3m2!1sbg!2sbg!4v1753703724617!5m2!1sbg!2sbg">
                </iframe>
                <div className="contact-us flex-column">
                    <p className="phone"><i class="fa-solid fa-phone"></i>+123 456 789</p>
                    <p className="email"><i class="fa-solid fa-envelope"></i>kyp@put.ka</p>
                </div>
            </section>
            
            
        </>
    )
};

export default Contact;