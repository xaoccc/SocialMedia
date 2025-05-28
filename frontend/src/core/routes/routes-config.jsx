import appRoutes from './routes.js'
import Login from "../../components/Login.jsx";
import Logout from "../../components/Logout.jsx";
import Register from "../../components/Register.jsx";
import Verification from "../../components/Verification.jsx";
import Home from "../../components/Home.jsx";
import About from "../../components/About.jsx";
import Contact from "../../components/Contact.jsx";
import NotFound from "../../components/NotFound.jsx";
import GoogleCallback from "../../components/GoogleCallback.jsx";
import { handleGoogleCallback } from '../../loader.js';

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
        element: <Home />
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
        path: appRoutes.UNKNOWN,
        element: <NotFound />
    },
    {
        path: appRoutes.GOOGLE_CALLBACK,
        loader: handleGoogleCallback,
        element: <GoogleCallback />
    },

]

export default routesConfig;