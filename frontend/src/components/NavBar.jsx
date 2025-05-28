import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import appRoutes from '../core/routes/routes.js';

const NavBar = () => {
    const { jwtData } = useAuth();

    useEffect(() => {
        // Debug
        // if (jwtData) {
        //     console.log('JWT Data:', jwtData);
        // }
    }, [jwtData]);

    return (

            <nav>
                <img src="../../public/logo.png" alt="logo" />
                <ul>
                    {jwtData ? (
                        <>
                            <li>
                                <Link to={appRoutes.CONTACT}>Contact Us</Link>
                            </li>
                            <li>
                                <Link to={appRoutes.ABOUT}>About Us</Link>
                            </li>
                            <li>
                                <Link to={appRoutes.LOGOUT}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to={appRoutes.INDEX}>Login</Link>
                        </li>
                    )}


                </ul>
            </nav>

    );
};

export default NavBar;