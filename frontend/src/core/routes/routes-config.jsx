import appRoutes from './routes.js'
import Login from "../../components/Login.jsx";
import Logout from "../../components/Logout.jsx";
import Register from "../../components/Register.jsx";
import Verification from "../../components/Verification.jsx";
import Home from "../../components/Home.jsx";
import About from "../../components/About.jsx";
import Contact from "../../components/Contact.jsx";
import Profile from "../../components/Profile.jsx";
import NotFound from "../../components/NotFound.jsx";
import GoogleCallback from "../../components/GoogleCallback.jsx";
import ConfirmEmail from '../../components/ConfirmEmail.jsx';
import { handleGoogleCallback } from '../../loader.js';
import { userData } from '../userData.js';

const routesConfig = [
    {
        path: appRoutes.INDEX,
        element: <Login />
    },
    {
        path: appRoutes.REGISTER,
        element: <Register />
    },
    {
        path: appRoutes.LOGIN,
        element: <Login />
    },
    {
        path: appRoutes.LOGOUT,
        element: <Logout />
    },
    {
        path: appRoutes.VERIFICATION,
        element: <Verification />
    },
    {
        path: appRoutes.HOME,
        loader: userData,
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: appRoutes.ABOUT,
        element: <About />
    },
    {
        path: appRoutes.CONTACT,
        element: <Contact />
    },
    {
        path: appRoutes.PROFILE,
        element: <Profile />
    },
    {
        path: appRoutes.UNKNOWN,
        element: <NotFound />
    },
    {
        path: appRoutes.EMAILVERIFICATION,
        element: <ConfirmEmail />
    },
    {
        path: appRoutes.GOOGLE_CALLBACK,
        loader: handleGoogleCallback,
        element: <GoogleCallback />
    },

]

export default routesConfig;