import React, { Fragment } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const TaskDetails = ({ handleDetailsOpen, openDetails, taskData }) => {
  const { title, description, image } = taskData;
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
        <DialogHeader className="text-[#e0d4e8]">Task Description</DialogHeader>
        <DialogBody>
          <div className="flex text-[#e0d4e8] space-x-3">
            <img
              className="w-1/2 h-96 rounded-xl"
              src={image ? image : 'Image not found'}
              alt=""
            />
            <div>
              <h2 className="font-bold text-2xl">
                {title ? (
                  <span>Task: {title}</span>
                ) : (
                  <span>Task: Title not found</span>
                )}
              </h2>
              <p className="mt-2 text-lg font-semibold">
                {description ? (
                  <span>Description: {description}</span>
                ) : (
                  <span>Description: Description not found</span>
                )}
              </p>
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
