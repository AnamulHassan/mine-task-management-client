import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoaderButton from '../../components/LoaderButton';
import { AuthContext } from '../../context/AuthProvider';
import SocialLogin from '../Sheared/SocialLogin/SocialLogin';
const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { createUserWithEmailPass, setUser, setLoading, userUpdate } =
    useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const imageHostKey = process.env.REACT_APP_IMGBB_API_KEY;
  const [isPhoto, setIsPhoto] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // console.log(loading);
  const handleSignUp = data => {
    if (data.photo.length === 0) {
      return setIsPhoto(true);
    } else {
      setIsPhoto(false);
      const name = data.name;
      const image = data.photo[0];
      const email = data.email;
      const password = data.password;
      const formData = new FormData();
      formData.append('image', image);
      setProcessing(true);
      setError('');
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(imgData => {
          if (imgData.success) {
          }
          createUserWithEmailPass(email, password)
            .then(result => {
              if (result.user?.uid) {
                userUpdate(name, imgData.data.url)
                  .then(() => {
                    const {
                      accessToken,
                      emailVerified,
                      isAnonymous,
                      displayName,
                      email,
                      phoneNumber,
                      photoURL,
                      uid,
                    } = result.user;
                    const userInfo = {
                      accessToken,
                      emailVerified,
                      isAnonymous,
                      displayName,
                      email,
                      photoURL,
                      phoneNumber,
                      uid,
                    };
                    setUser(userInfo);
                    setLoading(false);
                    setProcessing(false);
                    reset();
                    navigate(from, { replace: true });
                  })
                  .catch(error => setError(error.message));
              }
            })
            .catch(error => {
              setLoading(false);
              setProcessing(false);
              if (error.message.includes('auth/weak-password')) {
                setError('Password should be at least 6 characters');
              } else if (error.message.includes('auth/email-already-in-use')) {
                setError('Email has been used already');
              } else {
                setError(error.message);
              }
            });
        });
    }
  };

  return (
    <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between bg-[#41106b] h-screen bg-opacity-10 pb-6">
      <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full md:w-8/12 lg:w-5/12  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-6 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
        <div
          className="absolute h-48 w-48 rounded-full bg-[#fe7178] -z-10 left-5 bottom-5 bg-opacity-20 scale-150 -translate-x-1/2 -
      translate-y-1/2"
        ></div>
        <h2 className="text-3xl font-semibold my-2 ">Register</h2>
        <form className="w-full" onSubmit={handleSubmit(handleSignUp)}>
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="name"
            >
              Enter your name
            </label>
            {errors.name?.type === 'required' && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Email is required
              </p>
            )}
          </div>

          <input
            id="name"
            placeholder="Enter your name"
            className="block text-[#33085b]  focus:outline-none w-full bg-[#e8f0fd] text-sm md:text-md lg:text-lg px-4 font-semibold rounded-md py-1 md:py-2 mb-0 md:mb-1"
            {...register('name', { required: true })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />

          <div className=" flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="photo"
            >
              Select your photo
            </label>
            {isPhoto && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Photo is required
              </p>
            )}
          </div>
          <input
            id="photo"
            type="file"
            placeholder="Choose your photo"
            className="
            text-sm md:text-md lg:text-lg
            file:mr-5 file:py-1 md:file:py-2  file:px-4
            file:rounded-l-md bg-white
            text-[#33085b] w-full font-semibold file:font-semibold file:border-0 rounded-md
            file:bg-[#e8f0fd] file:text-[#bdbdbd]
            hover:file:cursor-pointer
            hover:file:text-[#33085b]"
            {...register('photo', { required: true })}
            aria-invalid={errors.photo ? 'true' : 'false'}
          />
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
              htmlFor="password"
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
            id="password"
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
                value="Sign up"
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
              Do you have an account already?{' '}
              <Link className="text-[#fe7178] font-bold" to="/login">
                {' '}
                Login
              </Link>
            </p>
          )}
        </div>
        <div className="w-full">
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
