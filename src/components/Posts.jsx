import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import pleceholder from "../assets/pleceholder.png";

const Post = () => {
    const [postSerial, setPostSerial] = useState(0);
    const [currentPost, setCurrentPost] = useState({});
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        fetch(`https://amlaa.vercel.app/post/${postSerial}`)
            .then((response) => response.json())
            .then((data) => {
                setCurrentPost(data);
                setValue("image", data.image);
                setValue("icon", data.icon);
                setValue("link", data.link);
            });
    }, [postSerial]);
    const onSubmit = (data) => {
        if (postSerial) {
            fetch(`https://amlaa.vercel.app/post/${postSerial}`, {
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
                        title: "Post change successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Select a post serial",
            });
        }
    };
    return (
        <div>
            <h2 className='text-2xl font-bold text-gray-900'>Edit Post</h2>
            <div className='grid grid-cols-12 my-5 gap-2'>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eac9")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eac9" && "text-white bg-blue-400 border-blue-400"}`}>
                    1
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eaca")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eaca" && "text-white bg-blue-400 border-blue-400"}`}>
                    2
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eacb")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eacb" && "text-white bg-blue-400 border-blue-400"}`}>
                    3
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eacc")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eacc" && "text-white bg-blue-400 border-blue-400"}`}>
                    4
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eacd")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eacd" && "text-white bg-blue-400 border-blue-400"}`}>
                    5
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eace")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eace" && "text-white bg-blue-400 border-blue-400"}`}>
                    6
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0eacf")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0eacf" && "text-white bg-blue-400 border-blue-400"}`}>
                    7
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0ead0")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0ead0" && "text-white bg-blue-400 border-blue-400"}`}>
                    8
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0ead1")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0ead1" && "text-white bg-blue-400 border-blue-400"}`}>
                    9
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0ead2")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0ead2" && "text-white bg-blue-400 border-blue-400"}`}>
                    10
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0ead3")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0ead3" && "text-white bg-blue-400 border-blue-400"}`}>
                    11
                </button>
                <button
                    onClick={() => setPostSerial("6708073d5ff22a71c5d0ead4")}
                    className={`w-full p-1 rounded text-xl font-bold border-2 ${postSerial == "6708073d5ff22a71c5d0ead4" && "text-white bg-blue-400 border-blue-400"}`}>
                    12
                </button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=' grid grid-cols-4 gap-6 mt-5'>
                <div className=''>
                    <img
                        src={
                            currentPost.image ? currentPost.image : pleceholder
                        }
                        className='w-full h-full rounded-md object-cover'
                    />
                </div>
                <div className='col-span-3 flex flex-col justify-between'>
                    <div className='col-span-3'>
                        <label
                            htmlFor='image'
                            className='block text-sm font-medium text-gray-700'>
                            Image URL:
                        </label>
                        <input
                            id='image'
                            placeholder='Image URL'
                            {...register("image", { required: true })}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        {errors.image && (
                            <span className='text-red-500 text-sm'>
                                This field is required
                            </span>
                        )}
                    </div>{" "}
                    <div className='col-span-1'>
                        <label
                            htmlFor='icon'
                            className='block text-sm font-medium text-gray-700'>
                            Icon:
                        </label>
                        <select
                            id='icon'
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-[10px] px-3 focus:ring-indigo-500 focus:border-indigo-500'
                            {...register("icon", { required: true })}>
                            <option value=''>Icon..</option>
                            <option value='Facebook'>Facebook</option>
                            <option value='Instagram'>Instagram</option>
                            <option value='Twitter'>Twitter</option>
                            <option value='LinkedIn'>LinkedIn</option>
                            <option value='Google'>Google</option>
                            <option value='YouTube'>YouTube</option>
                            <option value='Blogger'>Blogger</option>
                            <option value='Pinterest'>Pinterest</option>
                            <option value='TikTok'>TikTok</option>
                            <option value='Snapchat'>Snapchat</option>
                            <option value='Reddit'>Reddit</option>
                            <option value='Telegram'>Telegram</option>
                            <option value='Web'>Web</option>
                        </select>
                        {errors.icon && (
                            <span className='text-red-500 text-sm'>
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className='col-span-3'>
                        <label
                            htmlFor='link'
                            className='block text-sm font-medium text-gray-700'>
                            Post link:
                        </label>
                        <input
                            placeholder='Post link'
                            id='link'
                            {...register("link", { required: true })}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        {errors.link && (
                            <span className='text-red-500 text-sm'>
                                This field is required
                            </span>
                        )}
                    </div>{" "}
                </div>
                <div className='col-span-4'>
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

export default Post;
