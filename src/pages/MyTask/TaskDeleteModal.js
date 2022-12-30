import React, { Fragment } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { FaSpinner, FaTrashAlt } from 'react-icons/fa';

const TaskDeleteModal = ({
  handleDeleteOpen,
  handleDeleteTask,
  openDelete,
  taskData,
  processingDelete,
}) => {
  const { title, _id } = taskData;
  return (
    <Fragment>
      <Dialog
        size="xl"
        className="!bg-[#44a5fd] border-[3px] border-[#e0d4e8] border-opacity-25 !bg-opacity-10"
        open={openDelete}
        handler={handleDeleteOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          <span className="text-[#e0d4e8] font-semibold text-md lg:text-2xl">
            Delete Confirmation
          </span>
        </DialogHeader>
        <DialogBody>
          <div className="inline-flex flex-col text-[#e0d4e8] justify-center items-center w-full">
            <span className="w-20 h-20 bg-[#fe7178] bg-opacity-10 rounded-full flex justify-center items-center">
              {' '}
              <FaTrashAlt className="text-3xl text-[#fe7178]" />
            </span>

            <h3 className="my-1 inline-flex text-center font-bold text-xl text-[#e0d4e]">
              {title ? <span>Task: {title}</span> : 'Title not found'}
            </h3>
            <h2 className=" text-lg text-center font-semibold">
              Do you want to delete this task?
            </h2>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex justify-end mt-4 space-x-3">
            <button
              className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold"
              onClick={handleDeleteOpen}
            >
              Close
            </button>
            {processingDelete ? (
              <span className="custom-button py-1 px-4 rounded-lg text-white text-md font-semibold flex items-center">
                Loading <FaSpinner className="animate-spin text-white ml-1" />
              </span>
            ) : (
              <button
                className="custom-button py-1 px-4 rounded-lg text-white text-md font-semibold"
                onClick={() => handleDeleteTask(_id)}
              >
                Confirm
              </button>
            )}
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default TaskDeleteModal;
