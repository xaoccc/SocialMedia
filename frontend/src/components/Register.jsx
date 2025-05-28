import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import appRoutes from '../core/routes/routes.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const route = 'http://localhost:8000/api/v1/auth/registration/';

        try {
            const res = await axios.post(route, { email, password1, password2 });
            // Debug
            console.log(res);
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
                <button>Register</button>
            </form>
        </section>
    );
}