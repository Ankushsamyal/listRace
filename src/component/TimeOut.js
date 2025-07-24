import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function TimeOut() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }
  return null; 
}

export default TimeOut;