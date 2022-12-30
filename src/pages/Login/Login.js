import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoaderButton from '../../components/LoaderButton';
import { AuthContext } from '../../context/AuthProvider';
import SocialLogin from '../Sheared/SocialLogin/SocialLogin';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { loginWithEmailAndPassword, setUser, setLoading } =
    useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleLogin = data => {
    setProcessing(true);
    setError(error);
    loginWithEmailAndPassword(data.email, data.password)
      .then(result => {
        setUser(result.user);
        setError('');
        setProcessing(false);
        setLoading(false);
        reset();
        navigate(from, { replace: true });
      })
      .catch(error => {
        setProcessing(false);
        setLoading(false);
        if (error.message.includes('auth/wrong-password')) {
          setError("User and password didn't match");
        } else if (error.message.includes('auth/user-not-found')) {
          setError('User not found');
        } else if (error.message.includes('auth/invalid-email')) {
          setError('Email format incorrect');
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between h-screen bg-[#41106b] bg-opacity-10 ">
      <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full md:w-8/12 lg:w-5/12  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-6 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
        <div
          className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 left-5 bottom-5 bg-opacity-20 scale-150 -translate-x-1/2 -
      translate-y-1/2"
        ></div>
        <h2 className="text-3xl font-semibold my-2 ">Login</h2>
        <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="email"
            >
              Enter your email
            </label>
            {errors.email?.type === 'required' && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Email is required
              </p>
            )}
          </div>
          <input
            id="email"
            placeholder="Enter your email"
            className="block text-[#33085b]  focus:outline-none w-full bg-[#e8f0fd] text-sm md:text-md lg:text-lg px-4 font-semibold rounded-md py-1 md:py-2 mb-0 md:mb-1"
            {...register('email', { required: true })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="email"
            >
              Enter your password
            </label>
            {errors.password?.type === 'required' && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Password is required
              </p>
            )}
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="block text-[#33085b]  focus:outline-none w-full bg-[#e8f0fd] text-sm md:text-md lg:text-lg px-4 font-semibold rounded-md py-1 md:py-2 mb-0 md:mb-1"
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <div className="w-full flex justify-center items-center">
            {processing ? (
              <span className="custom-button select-none duration-300  mt-2 py-1 md:py-2 border-transparent text-white  leading-8 px-8 inline-flex rounded-xl text-xl md:text-2xl font-semibold">
                <LoaderButton></LoaderButton>
              </span>
            ) : (
              <input
                className="custom-button mt-2 py-1 md:py-2 border-transparent text-white  leading-8 px-4 md:px-8 inline-flex rounded-xl text-xl md:text-2xl font-semibold"
                type="submit"
                value="Login"
              />
            )}
          </div>
        </form>
        <div>
          {error ? (
            <p className="mt-4 text-center font-semibold text-[#fe7178] text-sm md:text-lg lg:text-xl">
              {error}
            </p>
          ) : (
            <p className="mt-4 font-semibold text-sm md:text-lg lg:text-xl text-center">
              Do you want to{' '}
              <Link className="text-[#fe7178] font-bold" to="/sign_up">
                {' '}
                Create new account?
              </Link>
            </p>
          )}
        </div>
        <div className="w-full">
          <SocialLogin setError={setError}></SocialLogin>
        </div>
      </div>
    </section>
  );
};

export default Login;
