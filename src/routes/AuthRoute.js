import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoaderPrimary from '../components/LoaderPrimary';
import { AuthContext } from '../context/AuthProvider';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-center bg-[#41106b] h-screen bg-opacity-10 pb-6 ">
        <LoaderPrimary></LoaderPrimary>
      </section>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AuthRoute;
