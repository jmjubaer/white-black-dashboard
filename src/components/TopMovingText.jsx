import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const TopMovingText = () => {
    const [text, setText] = React.useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        fetch("https://amlaa.vercel.app/top-moving-text")
            .then((response) => response.json())
            .then((data) => {
                setText(data);
            });
    }, []);

    const onSubmit = (data) => {
        fetch(`https://amlaa.vercel.app/top-moving-text/${text._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-6 grid grid-cols-2 gap-6'>
                <div className='col-span-2'>
                    <label
                        htmlFor='text'
                        className='block text-sm font-medium text-gray-700'>
                        Text
                    </label>
                    <input
                        id='text'
                        defaultValue={text.text}
                        {...register("text", { required: true })}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                    />
                    {errors.text && (
                        <span className='text-red-500 text-sm'>
                            This field is required
                        </span>
                    )}
                </div>
                <div className='col-span-2'>
                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Update Text
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TopMovingText;
