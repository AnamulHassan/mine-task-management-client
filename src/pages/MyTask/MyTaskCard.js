import React, { useContext, useState } from 'react';
import { FaCalendarAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthProvider';
import TaskDeleteModal from './TaskDeleteModal';
import TaskDetails from './TaskDetails';
import TaskEdit from './TaskEdit';

const MyTaskCard = ({ taskData, refetch }) => {
  const { user } = useContext(AuthContext);
  // console.log(taskData);
  const { title, image, date, _id, isCompleted } = taskData;
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingDelete, setProcessingDelete] = useState(false);

  const handleDetailsOpen = () => setOpenDetails(!openDetails);
  const handleEditOpen = () => setOpenEdit(!openEdit);
  const handleDeleteOpen = () => setOpenDelete(!openDelete);
  const handleCompleteTask = id => {
    setProcessing(true);
    fetch(
      `https://task-management-app-server-inky.vercel.app/task_modify?email=${user?.email}`,
      // fetch(`http://localhost:5000/task_modify?email=${user?.email}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('task-manager-token')
          )}`,
        },
        body: JSON.stringify({ id }),
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result.modifiedCount > 0) {
          setProcessing(false);
          refetch();
        }
      })
      .catch(error => {
        setProcessing(false);
        console.log(error);
      });
  };
  const handleDeleteTask = id => {
    console.log(id);
    setProcessingDelete(true);
    fetch(
      `https://task-management-app-server-inky.vercel.app/task_delete?email=${user?.email}`,
      // fetch(`http://localhost:5000/task_delete?email=${user?.email}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('task-manager-token')
          )}`,
        },
        body: JSON.stringify({ id }),
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result.deletedCount > 0) {
          setProcessingDelete(false);
          setOpenDelete(!openDelete);
          refetch();
        }
      })
      .catch(error => {
        setProcessingDelete(false);
        console.log(error);
      });
  };
  return (
    <div className="w-full mx-auto bg-[#e1896a] bg-opacity-10 flex items-center justify-between rounded-xl overflow-hidden space-x-6">
      <div className="w-1/12">
        <img
          className="h-20 w-20"
          src={image ? image : 'Image not found'}
          alt=""
        />
      </div>
      <div className="flex justify-between space-x-6 w-7/12">
        <div className="flex w-full items-center justify-between space-x-4 text-lg font-semibold">
          <h2 className="">
            {title ? (
              <span className="flex items-center">
                <FaCheck className="mr-2" /> {title}
              </span>
            ) : (
              'Title not found'
            )}
          </h2>
          <h4 className="">
            {date ? (
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {new Date(date).getDate()}-{new Date(date).getMonth()}-
                {new Date(date).getFullYear()}{' '}
              </span>
            ) : (
              'Date not found'
            )}
          </h4>
        </div>
        <div className="space-x-6 flex items-center">
          <button
            className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold"
            onClick={handleDetailsOpen}
          >
            Details
          </button>
          <button
            className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold"
            onClick={handleEditOpen}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="space-x-6 w-3/12 flex justify-end pr-6">
        {processing ? (
          <span className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold flex select-none items-center">
            Loading <FaSpinner className="animate-spin text-white ml-1" />
          </span>
        ) : (
          <div>
            {isCompleted ? (
              <span className="custom-button-tertiary py-1 px-4 rounded-lg text-[#33085b] text-md font-semibold flex select-none items-center">
                Completed
              </span>
            ) : (
              <button
                onClick={() => handleCompleteTask(_id)}
                className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold"
              >
                Complete
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleDeleteOpen}
          className="custom-button py-1 px-4 rounded-lg text-white text-md font-semibold"
        >
          Delete
        </button>
      </div>
      <div>
        <TaskDetails
          taskData={taskData}
          handleDetailsOpen={handleDetailsOpen}
          openDetails={openDetails}
        ></TaskDetails>
        <TaskEdit
          taskData={taskData}
          handleEditOpen={handleEditOpen}
          openEdit={openEdit}
        ></TaskEdit>
        <TaskDeleteModal
          taskData={taskData}
          handleDeleteOpen={handleDeleteOpen}
          openDelete={openDelete}
          handleDeleteTask={handleDeleteTask}
          processingDelete={processingDelete}
        ></TaskDeleteModal>
      </div>
    </div>
  );
};

export default MyTaskCard;
