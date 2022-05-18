import React from "react";
import { useForm } from "react-hook-form";

const AddToLists = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) =>{
      const title = data.title;
      const description = data.description;
      const list = {
          title,
          description
      }
      fetch('http://localhost:4000/do_lists', {
        method: 'POST',
        body: JSON.stringify(list),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) =>{
           if(data.acknowledged){
               alert('Added successfully');
               reset();
           }
        });

  }
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="mt-5 ">
        <h1 className="text-2xl font-bold">Add to To-Do Lists</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Task Title</span>
            </label>
            <input
              type="text"
              placeholder="Task title"
              class="input input-bordered w-full max-w-xs"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            <label class="label">
              {errors.title?.type === "required" && (
                <span class="label-text-alt text-red-500">
                  {errors.title.message}
                </span>
              )}
            </label>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Task Description</span>
            </label>
            <textarea
              type="text"
              placeholder="Task description"
              class="textarea w-full textarea-accent  max-w-xs"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            />
            <label class="label">
              {errors.description?.type === "required" && (
                <span class="label-text-alt text-red-500">
                  {errors.description.message}
                </span>
              )}
            </label>
          </div>

          <input
            className="btn btn-accent w-full max-w-xs text-white"
            type="submit"
            value="Add"
          />
        </form>
      </div>
    </div>
  );
};

export default AddToLists;
