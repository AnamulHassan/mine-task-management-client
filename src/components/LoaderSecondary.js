import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderSecondary = () => {
  return (
    <div className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 bg-[#41106b] flex flex-col justify-center items-center h-screen bg-opacity-10 pb-6">
      <Oval
        ariaLabel="loading-indicator"
        height={80}
        width={80}
        strokeWidth={5}
        strokeWidthSecondary={3}
        color="#6b1d5c"
        secondaryColor="white"
      />
    </div>
  );
};

export default LoaderSecondary;
