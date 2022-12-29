import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
  return (
    <div>
      <div className="w-full flex items-center mt-4">
        <p className="bg-[#fe7178] bg-opacity-30 block h-1 w-full"></p>
        <span className="text-2xl font-bold mx-6">Or</span>
        <p className="bg-[#fe7178] bg-opacity-30 block h-1 w-full"></p>
      </div>
      <div className="flex justify-center mt-4">
        <button className="!border-2 flex items-center font-semibold text-xl py-2 px-8 rounded-xl bg-transparent custom-button-outline text-white">
          <FcGoogle className="text-2xl mr-2" /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
