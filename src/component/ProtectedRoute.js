import React from 'react';
import Unauthorized from './Unauthorized';
import TimeOut from './TimeOut';

function ProtectedRoute({ children }) {
  const IsLoggedIn = sessionStorage.getItem('authToken');
  if (!IsLoggedIn) {
    return (
      <>
        <Unauthorized />
        <TimeOut />
      </>
    );
  }
  return children;
}

export default ProtectedRoute;
