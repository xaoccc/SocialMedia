import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useEffect } from 'react';
import appRoutes from '../core/routes/routes.js';

const GoogleCallback = () => {
  const jwtData = useLoaderData(); // Get the jwtData returned from the loader
  const { setJwtData } = useAuth();
  const navigate = useNavigate();

  // Update context and redirect to home
  React.useEffect(() => {
    if (jwtData) {
      setJwtData(jwtData); // Update the AuthContext with jwtData
      navigate(appRoutes.HOME); // Redirect to the Home route
    }
  }, [jwtData, setJwtData, navigate]);

  return <div>Processing...</div>;
};

export default GoogleCallback;
