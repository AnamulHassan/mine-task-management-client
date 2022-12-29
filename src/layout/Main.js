import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../pages/Sheared/Header/Header';

const Main = () => {
  return (
    <section className="relative pb-12 text-[#e0d4e8] w-screen">
      <Header></Header>
      <Outlet></Outlet>
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#33085b] -z-40  "></div>
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 h-3/4 rounded-full w-3/4 bg-[#6b1d5c] -z-30  blur-[300px] "></div>
    </section>
  );
};

export default Main;
