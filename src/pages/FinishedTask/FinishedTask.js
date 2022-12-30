import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoaderSecondary from '../../components/LoaderSecondary';
import { AuthContext } from '../../context/AuthProvider';
import FinishedTaskCard from './FinishedTaskCard';

const FinishedTask = () => {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const {
    data: finishedTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks', pathname],
    queryFn: async () => {
      const res = await fetch(
        `https://task-management-app-server-inky.vercel.app/finished_task?email=${user?.email}`,
        // `http://localhost:5000/finished_task?email=${user?.email}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem('task-manager-token')
            )}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoaderSecondary></LoaderSecondary>;
  }
  return (
    <section>
      {finishedTasks.length > 0 ? (
        <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 bg-[#41106b] h-screen bg-opacity-10 pb-6 ">
          <h2 className="custom-text text-center my-4 font-bold text-3xl">
            Your finished task list
          </h2>
          <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-6 px-2 lg:px-8 relative overflow-hidden">
            <div className="absolute h-96 w-96 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
            <div className="space-y-2 w-full">
              {finishedTasks.length > 0 &&
                finishedTasks.map((task, index) => (
                  <FinishedTaskCard
                    key={index}
                    taskData={task}
                    refetch={refetch}
                  ></FinishedTaskCard>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 bg-[#41106b] flex flex-col justify-center items-center h-[90vh] bg-opacity-10 pb-6">
          <h2 className="text-2xl font-bold custom-text">
            There is no finished task here
          </h2>
          <Link
            to="/add_task"
            className="!border-2 custom-button-outline block rounded-md text-[#e0d4e8] leading-6 py-[2px] px-6 text-lg font-semibold mt-6"
          >
            You can add some task
          </Link>
        </div>
      )}
    </section>
  );
};

export default FinishedTask;
