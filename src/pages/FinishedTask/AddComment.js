import React, { Fragment } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';

const AddComment = ({
  handleCommentSubmit,
  handleOpenComment,
  openComment,
  processingComment,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <Fragment>
      <Dialog
        size={'xl'}
        className="!bg-[#44a5fd] border-[3px] w-full border-[#e0d4e8] border-opacity-25 !bg-opacity-10"
        open={openComment}
        handler={handleOpenComment}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-[#e0d4e8]">
          <span className="text-[#e0d4e8] font-semibold text-md lg:text-2xl">
            Add Comment
          </span>
        </DialogHeader>
        <DialogBody>
          <div className="w-full flex text-[#e0d4e8] space-x-3">
            <form
              className="w-full"
              onSubmit={handleSubmit(handleCommentSubmit)}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <label
                  className="font-semibold select-none block text-md md:text-lg lg:text-xl mb-1 md:mb-2 ml-0 md:ml-4"
                  htmlFor="comment"
                >
                  Write your comment about this task
                </label>
                {errors.comment?.type === 'required' && (
                  <p
                    className="font-semibold mb-2 block text-sm md:text-lg lg:text-xl text-[#fe7178]"
                    role="alert"
                  >
                    Comment is required
                  </p>
                )}
              </div>
              <textarea
                id="comment"
                placeholder="Write your comment"
                type="text-area"
                className="block text-[#33085b]  focus:outline-none w-full text-lg px-4 font-semibold rounded-md py-2 mb-1"
                {...register('comment', { required: true })}
                aria-invalid={errors.comment ? 'true' : 'false'}
                rows="3"
              />

              <div className="w-full flex justify-end mt-4 space-x-3">
                <button
                  className="custom-button  py-1  md:py-2 border-transparent text-white  leading-8 px-4 inline-flex rounded-lg text-lg md:text-xl font-semibold"
                  onClick={handleOpenComment}
                >
                  Cancel
                </button>
                {processingComment ? (
                  <span></span>
                ) : (
                  <input
                    className="custom-button-secondary py-1  md:py-2 border-transparent text-white  leading-8 px-4 inline-flex rounded-lg text-lg md:text-xl font-semibold"
                    type="submit"
                    value="Continue"
                  />
                )}
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default AddComment;
