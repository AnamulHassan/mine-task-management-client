import React, { Fragment } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const TaskDetails = ({ handleDetailsOpen, openDetails, taskData }) => {
  const { title, description, image, date } = taskData;
  return (
    <Fragment>
      <Dialog
        size={'xl'}
        className="!bg-[#44a5fd] border-[3px] border-[#e0d4e8] border-opacity-25 !bg-opacity-10"
        open={openDetails}
        handler={handleDetailsOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-[#e0d4e8]">
          <span className="text-[#e0d4e8] font-semibold text-md lg:text-2xl">
            Task Description
          </span>
        </DialogHeader>
        <DialogBody>
          <div className="w-full flex flex-col md:flex-row text-[#e0d4e8] space-x-0 md:space-x-3">
            <div className="flex justify-center w-full md:w-1/2">
              <img
                className="w-48 lg:w-96 h-48 lg:h-96 rounded-xl"
                src={image ? image : 'Image not found'}
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2 pr-0 md:pr-4">
              <h2 className="font-bold mt-2 md:mt-0 text-lg md:text-xl lg:text-2xl">
                {title ? (
                  <span>Task: {title}</span>
                ) : (
                  <span>Task: Title not found</span>
                )}
              </h2>
              <p className="mt-2 text-sm md:text-md lg:text-lg font-semibold">
                {description ? (
                  <span>Description: {description}</span>
                ) : (
                  <span>Description: Description not found</span>
                )}
              </p>
              <h4 className="">
                {date ? (
                  <span className="flex text-xs md:text-sm lg:text-md font-semibold items-center mt-2">
                    Date:
                    {new Date(date).getDate()}-{new Date(date).getMonth()}-
                    {new Date(date).getFullYear()}{' '}
                  </span>
                ) : (
                  'Date not found'
                )}
              </h4>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            className="custom-button py-1 px-4 rounded-lg text-white text-md font-semibold"
            onClick={handleDetailsOpen}
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default TaskDetails;
