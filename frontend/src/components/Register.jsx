import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import appRoutes from '../core/routes/routes.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [users, setUsers] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getAllUsers = async () => {

        const route = 'http://127.0.0.1:8000/api/v1/auth/users/';

        try {
            const res = await fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setUsers(data);
        }

        catch (error) {
            console.error(error);
        }
    }

    // Getting all the users on page loading
    useEffect(() => {
        getAllUsers();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await getAllUsers();
        const route = 'http://localhost:8000/api/v1/auth/registration/';

        // Check is a user with such email exists. 
        // We do this before the post request, because we already have the email from the form and the users data from the get request.
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
            setErrorMsg('This email already exists');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(route, { email, password1, password2 });
            navigate(appRoutes.VERIFICATION);
        }

        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <section className='reg-form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='password-one'>Password</label>
                <input
                    type='password'
                    id='password-one'
                    name='password1'
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                />
                <label htmlFor='password-two'>Repeat Password</label>
                <input
                    type='password'
                    id='password-two'
                    name='password2'
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                />
                <p>{errorMsg}</p>
                <button className="register-btn">Register</button>
            </form>
        </section>
    );
}