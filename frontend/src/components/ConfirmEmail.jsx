import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import appRoutes from '../core/routes/routes.js';

function ConfirmEmail() {
  const { key } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/account-confirm-email/", {
        key: key,
      })
      .then(() => setStatus("Email confirmed! You can now log in here:"))
      .catch(() => setStatus("Invalid or expired confirmation link."));
  }, [key]);

  return <div className="flex-center">
        <div>{status}</div>
        <Link to={appRoutes.INDEX}>Log In</Link>
    </div>
  ;
}

export default ConfirmEmail;