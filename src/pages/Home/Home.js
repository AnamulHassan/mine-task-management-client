import React from 'react';

const Home = () => {
  return (
    <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between bg-[#41106b] h-screen bg-opacity-10 pb-6 ">
      <div className="flex flex-col justify-center items-center mt-8 mx-auto w-8/12  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-6 px-8 relative overflow-hidden">
        <div className="absolute h-96 w-96 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
        <h2 className="text-3xl font-semibold my-2 ">
          Page has been developing
        </h2>
      </div>
    </section>
  );
};

export default Home;
