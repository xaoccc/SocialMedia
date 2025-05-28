import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import routesConfig from './core/routes/routes-config.jsx';


const router = createBrowserRouter(routesConfig);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;