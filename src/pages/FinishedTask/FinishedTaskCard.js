import React, { useContext, useState } from 'react';
import { FaCalendarAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthProvider';
import TaskDeleteModal from '../MyTask/TaskDeleteModal';
import TaskDetails from '../MyTask/TaskDetails';
import AddComment from './AddComment';

const FinishedTaskCard = ({ taskData, refetch }) => {
  const { user } = useContext(AuthContext);
  // console.log(taskData);
  const { title, image, date, _id, isCommented } = taskData;
  const [openDetails, setOpenDetails] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openShowComment, setOpenShowComment] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingDelete, setProcessingDelete] = useState(false);
  const [processingComment, setProcessingComment] = useState(false);

  const handleDetailsOpen = () => setOpenDetails(!openDetails);

  const handleOpenComment = () => setOpenComment(!openComment);

  const handleDeleteOpen = () => setOpenDelete(!openDelete);

  const handleShowCommentOpen = () => setOpenShowComment(!openShowComment);
  const handleNotCompleteTask = id => {
    setProcessing(true);
    // fetch(
    //   `https://task-management-app-server-inky.vercel.app/task_modify?email=${user?.email}`,
    fetch(`http://localhost:5000/finished_task_modify?email=${user?.email}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem('task-manager-token')
        )}`,
      },
      body: JSON.stringify({ id }),
    })
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
  const handleCommentSubmit = data => {
    // setProcessingComment
    const comment = {
      email: user.email,
      taskId: _id,
      comment: data.comment,
    };
    console.log(comment);
    return;
    fetch(
      `https://task-management-app-server-inky.vercel.app/add_task?email=${user.email}`,
      // fetch(`http://localhost:5000/add_task?email=${user?.email}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem('task-manager-token')
          )}`,
        },
        body: JSON.stringify(comment),
      }
    )
      .then(res => res.json())
      .then(result => {});
  };
  return (
    <div className="w-full mx-auto bg-[#e1896a] bg-opacity-10 flex items-center justify-between rounded-xl overflow-hidden space-x-2 lg:space-x-6 border-2 border-[#e0d4e8] border-opacity-30 py-2 md:py-0">
      <div className="w-2/12 lg:w-1/12 hidden md:block">
        <img
          className="h-20 w-20"
          src={image ? image : 'Image not found'}
          alt=""
        />
      </div>
      <div className="flex  overflow-hidden flex-col lg:flex-row justify-between space-x-2 lg:space-x-6 w-8/12 lg:w-7/12">
        <div className="inline-flex flex-col lg:flex-row w-full items-start lg:items-center justify-between space-x-2 lg:space-x-4 text-sm lg:text-lg font-normal md:font-semibold">
          <h2 className="inline">
            {title ? (
              <span className="flex items-center">
                <FaCheck className="hidden md:block text-lg mr-1 lg:mr-2" />
                <span className="inline-block"> {title}</span>
              </span>
            ) : (
              'Title not found'
            )}
          </h2>
          <h4 className="">
            {date ? (
              <span className="flex text-xs md:text-sm lg:text-md items-center">
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
            className="custom-button-secondary py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold"
            onClick={handleDetailsOpen}
          >
            Details
          </button>
          {isCommented ? (
            <button
              className="custom-button-secondary py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold"
              onClick={handleShowCommentOpen}
            >
              Show Comment
            </button>
          ) : (
            <button
              className="custom-button-secondary py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold"
              onClick={handleOpenComment}
            >
              Comment
            </button>
          )}
        </div>
      </div>
      <div className="space-y-2 md:space-y-0 space-x-0 md:space-x-4 lg:space-x-6 w-4/12 lg:w-3/12 flex flex-col md:flex-row items-start justify-start md:justify-end pr-6">
        {processing ? (
          <span className="custom-button-secondary py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold flex select-none items-center">
            Loading <FaSpinner className="animate-spin text-white ml-1" />
          </span>
        ) : (
          <button
            onClick={() => handleNotCompleteTask(_id)}
            className="custom-button-secondary py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold"
          >
            Undone
          </button>
        )}

        <button
          onClick={handleDeleteOpen}
          className="custom-button py-[2px] md:py-1 px-2 md:px-2  lg:px-4 rounded-lg text-white text-xs md:text-sm lg:text-md font-semibold"
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
        <AddComment
          handleCommentSubmit={handleCommentSubmit}
          handleOpenComment={handleOpenComment}
          openComment={openComment}
          processingComment={processingComment}
        ></AddComment>
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

export default FinishedTaskCard;
