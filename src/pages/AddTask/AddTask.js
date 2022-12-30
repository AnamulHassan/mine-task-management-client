import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoaderButton from '../../components/LoaderButton';
import { AuthContext } from '../../context/AuthProvider';

const AddTask = () => {
  const [isPhoto, setIsPhoto] = useState(false);
  const imageHostKey = process.env.REACT_APP_IMGBB_API_KEY;
  const { user } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSignUp = data => {
    if (data.photo.length === 0) {
      return setIsPhoto(true);
    } else {
      setIsPhoto(false);
      const title = data.taskTitle;
      const image = data.photo[0];
      const description = data.taskDescription;
      const formData = new FormData();
      const date = new Date().toISOString();
      const email = user.email;
      formData.append('image', image);
      setProcessing(true);
      setError('');
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(imgData => {
          if (imgData.success) {
            const taskInfo = {
              title,
              image: imgData.data.url,
              description,
              date,
              email,
              isCompleted: false,
            };
            fetch(
              `https://task-management-app-server-inky.vercel.app/add_task?email=${user?.email}`,
              // fetch(`http://localhost:5000/add_task?email=${user?.email}`,
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  authorization: `Bearer ${JSON.parse(
                    localStorage.getItem('task-manager-token')
                  )}`,
                },
                body: JSON.stringify(taskInfo),
              }
            )
              .then(res => res.json())
              .then(result => {
                if (result.acknowledged) {
                  setProcessing(false);
                  navigate('/my_task');
                }
              })
              .catch(error => {
                console.log(error.message);
                setError(error.message);
                setProcessing(false);
              });
          }
        });
    }
  };
  return (
    <section className="w-11/12 mx-auto border-[3px] border-t-0 px-2 rounded-b-xl border-[#e0d4e8] border-opacity-30 py-2 flex items-center justify-between bg-[#41106b] h-screen bg-opacity-10 pb-6 ">
      <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full md:w-10/12 lg:w-8/12  bg-[#e0d4e8] bg-opacity-10 rounded-xl py-4 lg:py-6 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute h-96 w-96 rounded-full bg-[#fe7178] -z-10 right-5 top-5 bg-opacity-20 scale-150 translate-x-1/2 -translate-y-1/2"></div>
        <h2 className="text-3xl font-semibold my-2 ">Add your task</h2>
        <form className="w-full" onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="task-title"
            >
              Write your task title
            </label>
            {errors.taskTitle?.type === 'required' && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Task title is required
              </p>
            )}
          </div>

          <input
            id="task-title"
            placeholder="Enter your task title"
            className="block text-[#33085b]  focus:outline-none w-full bg-[#e8f0fd]  text-sm md:text-md lg:text-lg px-4 font-semibold rounded-md py-2 mb-1"
            {...register('taskTitle', { required: true })}
            aria-invalid={errors.taskTitle ? 'true' : 'false'}
          />

          <div className=" flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="photo"
            >
              Add your task photo
            </label>
            {isPhoto && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Task photo is required
              </p>
            )}
          </div>
          <input
            id="photo"
            type="file"
            placeholder="Choose your photo"
            className="
            text-sm md:text-md lg:text-lg
            file:text-sm file:md:text-md file:lg:text-lg
            file:mr-5 file:py-2  file:px-4
            file:rounded-l-md bg-white
            text-[#33085b] w-full font-semibold file:font-semibold file:border-0 rounded-md
            file:bg-[#e8f0fd] file:text-[#bdbdbd]
            hover:file:cursor-pointer
            hover:file:text-[#33085b] mb-1"
            {...register('photo', { required: true })}
            aria-invalid={errors.photo ? 'true' : 'false'}
          />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <label
              className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
              htmlFor="task-description"
            >
              Write your task description
            </label>
            {errors.taskDescription?.type === 'required' && (
              <p
                className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                role="alert"
              >
                Task description is required
              </p>
            )}
          </div>
          <textarea
            id="task-description"
            type="text-area"
            placeholder="Write your task description"
            className="block text-[#33085b]  focus:outline-none w-full text-sm md:text-md lg:text-lg px-4 font-semibold rounded-md py-2 mb-1"
            {...register('taskDescription', { required: true })}
            aria-invalid={errors.taskDescription ? 'true' : 'false'}
            rows="3"
          />
          <div className="w-full flex justify-end mt-4">
            {processing ? (
              <span className="custom-button py-1  md:py-2 border-transparent px-8 inline-flex select-none rounded-xl font-semibold">
                <LoaderButton></LoaderButton>
              </span>
            ) : (
              <div className="flex items-center w-full justify-between">
                {error ? (
                  <p className="text-lg font-semibold text-[#fe7178]">
                    {error}
                  </p>
                ) : (
                  <span>&nbsp;</span>
                )}
                <input
                  className="custom-button  py-1  md:py-2 border-transparent text-white  leading-8 px-4 md:px-8 inline-flex rounded-xl text-xl medicine:text-2xl font-semibold"
                  type="submit"
                  value="Add Task"
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
