import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from '../Sheared/SocialLogin/SocialLogin';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = data => console.log(data);

  return (
    <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between h-[82vh] bg-[#41106b] bg-opacity-10 ">
      <div className="flex flex-col justify-center items-center mt-8 mx-auto w-5/12  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-6 px-8 relative overflow-hidden">
        <div className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
        <div
          className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 left-5 bottom-5 bg-opacity-20 scale-150 -translate-x-1/2 -
      translate-y-1/2"
        ></div>
        <h2 className="text-3xl font-semibold my-2 ">Login</h2>
        <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
          <div className=" flex justify-between items-center mb-2">
            <label
              className="font-semibold select-none block text-xl  ml-4"
              htmlFor="email"
            >
              Enter your email
            </label>
            {errors.email?.type === 'required' && (
              <p
                className="font-semibold  block text-xl text-[#fe7178]"
                role="alert"
              >
                Email is required
              </p>
            )}
          </div>
          <input
            id="email"
            placeholder="Enter your email"
            className="block text-[#33085b]  focus:outline-none w-full text-lg px-4 font-semibold rounded-md py-2 mb-1"
            {...register('email', { required: true })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          <div className=" flex justify-between items-center mb-2">
            <label
              className="font-semibold select-none block text-xl  ml-4"
              htmlFor="email"
            >
              Enter your password
            </label>
            {errors.password?.type === 'required' && (
              <p
                className="font-semibold  block text-xl text-[#fe7178]"
                role="alert"
              >
                Password is required
              </p>
            )}
          </div>
          <input
            placeholder="Enter your password"
            className="block  focus:outline-none w-full text-lg px-4 font-semibold rounded-md py-2 mb-6 text-[#33085b]"
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          <div className="w-full flex justify-center items-center">
            <input
              className="custom-button  py-2 border-transparent text-white  leading-8 px-8 inline-flex rounded-xl text-2xl font-semibold"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <div>
          <p className="mt-4 font-semibold text-xl">
            Do you want to{' '}
            <Link className="text-[#fe7178] font-bold" to="/sign_up">
              {' '}
              Create new account?
            </Link>
          </p>
        </div>
        <div className="w-full">
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </section>
  );
};

export default Login;
