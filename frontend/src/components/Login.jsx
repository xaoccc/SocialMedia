import { googleCallbackUri, googleClientId } from '../config.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import appRoutes from '../core/routes/routes.js';
import { loginUser } from '../core/api.js';
import { useAuth } from '../context/AuthContext.jsx';


export default function Login() {
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;
    
    const { setJwtData } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser(email, password); // Call the API
            console.log(data)
            setJwtData(data);
            navigate(appRoutes.HOME);
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
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <label htmlFor='password'>Password</label>
                <input 
                    type='password' 
                    id='password' 
                    name='password' 
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