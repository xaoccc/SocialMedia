import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appRoutes from '../core/routes/routes.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate(appRoutes.INDEX);
    }, [logout, navigate]);

    return null;
}