import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import LoaderButton from '../../../components/LoaderButton';
import { AuthContext } from '../../../context/AuthProvider';

const SocialLogin = ({ setError }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { loginWithGoogle, setUser, setLoading } = useContext(AuthContext);
  const [processing, setProcessing] = useState();
  const handleLoginWithGoogle = () => {
    setProcessing(true);
    loginWithGoogle()
      .then(result => {
        navigate(from, { replace: true });
        setUser(result.user);
        setProcessing(false);
        setLoading(false);
      })
      .catch(error => {
        setProcessing(false);
        setLoading(false);
        if (error.message.includes('auth/internal-error')) {
          setError('Something wend wrong');
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <div>
      <div className="w-full flex items-center mt-4">
        <p className="bg-[#fe7178] bg-opacity-30 block h-[2px] md:h-1 w-full"></p>
        <span className="text-xl md:text-2xl font-bold mx-6">Or</span>
        <p className="bg-[#fe7178] bg-opacity-30 block h-[2px] md:h-1 w-full"></p>
      </div>
      <div className="flex justify-center mt-4">
        {processing ? (
          <span className="!border-2 flex items-center font-semibold text-lg md:text-xl py-1 md:py-2 px-4 md:px-8 rounded-xl bg-transparent custom-button-outline text-white">
            <LoaderButton></LoaderButton>
          </span>
        ) : (
          <button
            onClick={handleLoginWithGoogle}
            className="!border-2 flex items-center font-semibold text-lg md:text-xl py-1 md:py-2 px-4 md:px-8 rounded-xl bg-transparent custom-button-outline text-white"
          >
            <FcGoogle className="text-xl md:text-2xl mr-2" /> Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialLogin;
