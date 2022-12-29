import React, { useState } from 'react';

import TaskDetails from './TaskDetails';
import TaskEdit from './TaskEdit';

const MyTaskCard = ({ taskData }) => {
  const { title, description, thumbnails } = taskData;
  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDetailsOpen = () => setOpenDetails(!openDetails);
  const handleEditOpen = () => setOpenEdit(!openEdit);
  return (
    <div className="w-full mx-auto bg-[#e1896a] bg-opacity-10 flex items-center rounded-xl overflow-hidden space-x-6">
      <div>
        <img className="h-12 w-12" src={thumbnails} alt="" />
      </div>
      <div className="flex  space-x-6">
        <h2>{title ? title : 'Title not found'}</h2>
        <div className="space-x-6">
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
        <TaskDetails
          className="w-full"
          taskData={taskData}
          handleDetailsOpen={handleDetailsOpen}
          openDetails={openDetails}
        ></TaskDetails>
        <TaskEdit
          className="w-full"
          taskData={taskData}
          handleEditOpen={handleEditOpen}
          openEdit={openEdit}
        ></TaskEdit>
      </div>
      <div className="space-x-6">
        <button className="custom-button-secondary py-1 px-4 rounded-lg text-white text-md font-semibold">
          Complete
        </button>
        <button className="custom-button py-1 px-4 rounded-lg text-white text-md font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyTaskCard;
