import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import pleceholder from "../assets/pleceholder.png";
import { IoSend } from "react-icons/io5";
const HighlightsProducts = () => {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const inputLink = watch("link");
    const [linkId, setLinkId] = useState("");
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/highlight-product-link`
                );

                const result = await response.json();
                if (result) {
                    setLinkId(result._id)
                    setValue("link", result.link)
                    setLoading(false);
                }
                console.log(result);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const linkId = inputLink.split('/').pop();
                const response = await fetch(
                    `http://localhost:5000/product/${linkId}`
                );

                const result = await response.json();
                if (result) {
                    setProduct(result);
                    setLoading(false);
                }
                console.log(result);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, [inputLink]);
    const handleChangeLink = (data) => {
        fetch(`http://localhost:5000/highlight-product-link/${linkId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            // alert("Product added successfully!");
        })
        console.log(linkId);
    }


    return (
        <div className=''>
            <form  onSubmit={handleSubmit(handleChangeLink)} className='relative w-full h-fit'>
                <label
                    htmlFor='link'
                    className='block font-medium text-gray-700'>
                    Product Link*
                </label>
                <input
                    id='link'
                    type='url'
                    // defaultValue={link.link}
                    {...register("link", { required: true })}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
                {errors.link && (
                    <span className='text-red-500 text-sm'>
                        This field is required
                    </span>
                )}
               <button className="absolute bottom-2 right-3 text-2xl text-blue-500"><IoSend /></button>
            </form>
            <div className='overflow-x-auto mt-10'>
                <h2 className="text-3xl font-semibold mb-5 text-center">Product Details</h2>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='border-b '>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Image
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Product Title
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Size & color
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Price & Discount
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Status & Category
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className=''>Loading...</tr>
                        ) : product._id ? (
                            <tr className='border-b '>
                                <td className='px-4 py-3'>
                                    <img
                                        src={
                                            product?.images
                                                ? product?.images[0]
                                                : pleceholder
                                        }
                                        alt={product?.title}
                                        className='w-16 h-16 object-cover'
                                    />
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm capitalize font-medium text-gray-900'>
                                        {product?.title}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm text-gray-600 uppercase'>
                                        Sizes:{" "}
                                        {product?.size ? product?.size : "N/A"}
                                    </p>
                                    <p className='text-sm text-gray-600 capitalize'>
                                        Colors:{" "}
                                        {product?.color
                                            ? product?.color
                                            : "N/A"}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm text-gray-600'>
                                        Price: {product?.price}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        Discount: {product?.discount}%
                                    </p>
                                </td>
                                <td className='px-4 py-3 capitalize'>
                                    <p className='text-sm text-gray-600'>
                                        Product Status: {product?.status}
                                    </p>

                                    <p className='text-sm text-gray-600'>
                                        Category: {product?.category}
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            <tr className="">No Product details available</tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HighlightsProducts;
