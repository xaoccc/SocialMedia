import { googleCallbackUri, googleClientId } from '../config.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import appRoutes from '../core/routes/routes.js';
import { loginUser } from '../core/api.js';
import { useAuth } from '../context/AuthContext.jsx';


export default function Login() {
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;

    const { setJwtData, jwtData } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // We go to the homepage only after jwtData(token) is already in the local storage
        // It cannot be there before if the loginUser() is not properly executed, so this ensures we cannot access homepage and all other 
        // authentication required data before a properly executed loginUser()
        if (jwtData) {
            navigate(appRoutes.HOME);
        }
    }, [jwtData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Here we call the API in api.js
        try {
            const data = await loginUser(email, password); 
            setJwtData(data);
        }

        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <section>
            <h1>Welcome!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
            <p>New user?</p>
            <button>
                <Link to={appRoutes.REGISTER}>Register New User</Link>
            </button>
            <p>or</p>
            <button>
                <Link to={googleSignInUrl}>Sign in with Google</Link>
            </button>

        </section>

    );
}