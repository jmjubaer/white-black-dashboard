import { useQuery } from "react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";

const UpDateProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const [openModal, setOpenModal] = useState(false);
    const images = watch("image");
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [refetch, setRefetch] = useState(true);
    const [productData, setProductData] = useState([]);
    const [editProductId, setEditProductId] = useState("");
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(
                    `https://amlaa.vercel.app/products/all`
                );

                const result = await response.json();
                if (result) {
                    setProductData(result);
                    setLoading(false);
                }
                console.log(result);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, [refetch]);
    useEffect(() => {
        if (images) {
            // Split the string and filter out empty strings
            const imageArray = images
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url !== ""); // Remove empty strings

            // Update the imageUrls state if the array length changes or URLs change
            if (
                imageArray.length <= 5 &&
                imageArray.join(",") !== imageUrls.join(",")
            ) {
                setImageUrls(imageArray);
            }
        } else {
            // If images is empty, reset imageUrls to an empty array
            setImageUrls([]);
        }
    }, [images]);
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const response = await fetch(
            `https://amlaa.vercel.app/products/search/${e.target.searchText.value}`
        );
        const data = await response.json();
        if (data) {
            setProductData(data);
        }
    };
    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(
                        `https://amlaa.vercel.app/product/delete/${id}`,
                        {
                            method: "DELETE",
                        }
                    );

                    const result = await response.json();
                    if (result) {
                        setRefetch(!refetch);
                        setDeleteLoading(false);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success",
                        });
                    }
                    console.log(result);
                }
            });
            setDeleteLoading(true);
        } catch (error) {
            console.log(error);
            setDeleteLoading(false);
        }
    };
    const handleOpenModal = async (id) => {
        try {
            const response = await fetch(
                `https://amlaa.vercel.app/product/${id}`
            );
            setEditProductId(id);
            const result = await response.json();
            if (result) {
                setOpenModal(true);
                setValue("title", result.title);
                setValue("color", result.color);
                setValue("price", result.price);
                setValue("size", result.size);
                setValue("status", result.status);
                setValue("discount", result.discount);
                setValue("category", result.category);
                setValue("fit", result.fit);
                setValue("deals", false);
                setValue("material", result.material);
                setValue("description", result.description);
                const preImage = result?.images.map((url) => url).join(",");
                console.log(preImage);
                setValue("image", preImage);
                setValue("description", result.description);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = (data) => {
        fetch(`https://amlaa.vercel.app/product/update/${editProductId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, images: imageUrls }),
        }).then((response) => {
            if (response.ok) {
                setOpenModal(false);
                setEditProductId("");
                Swal.fire({
                    icon: "success",
                    title: "Product Updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setRefetch(!refetch);
                reset();
                setImageUrls([]);
                console.log(response);
            }
        });
    };
    return (
        <div className='overflow-x-auto'>
            <form
                onSubmit={handleSearch}
                className='flex items-center justify-center gap-5 mb-5'>
                <input
                    type='search'
                    name='searchText'
                    id=''
                    placeholder='Enter product title....'
                    className={`p-2 w-1/2 outline-none border border-slate-600 rounded-lg ${errors.searchText && "border-red-500"}`}
                />

                <button
                    type='submit'
                    className='bg-blue-500 px-5 py-2 text-white rounded-lg'>
                    Search
                </button>
                <button
                    type='reset'
                    onClick={() => setRefetch(!refetch)}
                    className='bg-blue-500 px-5 py-2 text-white rounded-lg'>
                    Reset
                </button>
            </form>
            <table className='min-w-full bg-white border border-gray-200'>
                <thead>
                    <tr className='border-b '>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Image
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Product Information
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Sizes & Colors
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Price & Discount
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Status & Category
                        </th>
                        <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr className=''>Loading...</tr>
                    ) : productData.length > 0 ? (
                        productData?.map((item) => (
                            <tr key={item._id} className='border-b '>
                                <td className='px-4 py-3'>
                                    <img
                                        src={item.images}
                                        alt={item.title}
                                        className='w-16 h-16 object-cover'
                                    />
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm font-semibold capitalize text-gray-900'>
                                        {item.title}
                                    </p>

                                    <p className='text-sm text-gray-600 capitalize'>
                                        <span className='font-bold'>
                                            Details Material:
                                        </span>{" "}
                                        {item.material}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            Sizes:
                                        </span>{" "}
                                        {item.size}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            Colors:
                                        </span>{" "}
                                        {item.color}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            Price:
                                        </span>{" "}
                                        {item.price}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            Discount:
                                        </span>{" "}
                                        {item.discount}
                                    </p>
                                </td>
                                <td className='px-4 py-3'>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            {" "}
                                            Status:
                                        </span>{" "}
                                        {item.status}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-bold'>
                                            Category:
                                        </span>{" "}
                                        {item.category}
                                    </p>
                                </td>
                                <td className='px-4 py-3 h-full flex items-center justify-center'>
                                    <button
                                        disabled={deleteLoading}
                                        onClick={() => handleDelete(item._id)}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        <MdDelete />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleOpenModal(item._id)
                                        }
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
                                        <FaRegEdit />
                                    </button>
                                </td>
                                {openModal && (
                                    <div className='fixed top-1/2 left-[60%] shadow-xl -translate-x-1/2 -translate-y-1/2 w-[60%] h-fit bg-white border-2 rounded-xl z-[99999999] p-5 text-left max-h-[500px] overflow-y-auto'>
                                        <button
                                            className='text-3xl text-red-500 absolute top-3 right-3'
                                            onClick={() => setOpenModal(false)}>
                                            <IoClose />
                                        </button>
                                        <h1 className='text-2xl font-bold mb-6'>
                                            Update Product
                                        </h1>
                                        <form
                                            onSubmit={handleSubmit(handleEdit)}
                                            className='space-y-6 grid grid-cols-2 gap-6'>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor='title'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Title*
                                                </label>
                                                <input
                                                    id='title'
                                                    {...register("title", {
                                                        required: true,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.title && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor='color'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Color (comma-separated)*
                                                </label>
                                                <input
                                                    id='color'
                                                    {...register("color", {
                                                        required: true,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.color && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-span-1'>
                                                <label
                                                    htmlFor='price'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Price*
                                                </label>
                                                <input
                                                    id='price'
                                                    type='number'
                                                    {...register("price", {
                                                        required: true,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.price && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-span-1'>
                                                <label
                                                    htmlFor='size'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Size (comma-separated)
                                                </label>
                                                <input
                                                    id='size'
                                                    {...register("size")}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.size && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className='col-span-1'>
                                                <label
                                                    htmlFor='status'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Status (In Stock or Sold
                                                    Out)*
                                                </label>
                                                <select
                                                    id='status'
                                                    {...register("status", {
                                                        required: true,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500'>
                                                    <option value=''>
                                                        Select....
                                                    </option>
                                                    <option value='in-stock'>
                                                        In Stock
                                                    </option>
                                                    <option value='sold-out'>
                                                        Sold Out
                                                    </option>
                                                </select>
                                                {errors.status && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className='col-span-1'>
                                                <label
                                                    htmlFor='discount'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Discount (%)
                                                </label>
                                                <input
                                                    id='discount'
                                                    type='number'
                                                    step='1'
                                                    {...register("discount", {
                                                        min: 0,
                                                        max: 100,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.discount && (
                                                    <span className='text-red-500 text-sm'>
                                                        Can't and less than 0 or
                                                        more than 100
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor='category'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Category
                                                </label>
                                                <select
                                                    id='category'
                                                    {...register("category", {
                                                        required: true,
                                                    })}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500'>
                                                    <option value=''>
                                                        Select...
                                                    </option>
                                                    <option value='tshirt'>
                                                        T-shirt
                                                    </option>
                                                    <option value='polos'>
                                                        Polos
                                                    </option>
                                                    <option value='premium-solids'>
                                                        Premium Solids
                                                    </option>
                                                    <option value='headwear'>
                                                        Headwear
                                                    </option>
                                                    <option value='oversize-t-shirt'>
                                                        Oversize T-shirt
                                                    </option>
                                                    <option value='shirt'>
                                                        shirt
                                                    </option>
                                                    <option value='jackets'>
                                                        Jackets
                                                    </option>
                                                    <option value='headwear'>
                                                        Headwear
                                                    </option>
                                                    <option value='bottomwear'>
                                                        Bottomwear
                                                    </option>
                                                    <option value='accessories'>
                                                        Accessories
                                                    </option>
                                                </select>
                                                {errors.category && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                                <div className='flex items-center gap-4 mt-4 '>
                                                    <input
                                                        {...register("deals")}
                                                        type='checkbox'
                                                        name='deals'
                                                        id='deals'
                                                        className='transform scale-150'
                                                    />
                                                    <label
                                                        htmlFor='deals'
                                                        className='block text-xl font-medium text-gray-700'>
                                                        Best Deals
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-span-1'>
                                                <label
                                                    htmlFor='fit'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Fit
                                                </label>
                                                <select
                                                    id='fit'
                                                    {...register("fit")}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500'>
                                                    <option value=''>
                                                        Select...
                                                    </option>
                                                    <option value='regular-fit'>
                                                        Regular Fit
                                                    </option>
                                                    <option value='slim-fit'>
                                                        Slim Fit
                                                    </option>
                                                </select>
                                                {errors.fit && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor='material'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Material
                                                </label>
                                                <input
                                                    id='material'
                                                    {...register("material")}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {errors.material && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className='col-span-2'>
                                                <label className='block text-sm font-medium text-gray-700'>
                                                    Images (Up to five URLs)*
                                                </label>
                                                <input
                                                    type='text'
                                                    {...register("image", {
                                                        required: true,
                                                    })}
                                                    // onChange={handleImageChange}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500'
                                                />
                                                {imageUrls.length >= 5 && (
                                                    <p style={{ color: "red" }}>
                                                        Maximum 5 image URLs
                                                        allowed
                                                    </p>
                                                )}
                                                {errors.image && (
                                                    <span className='text-red-500 text-sm'>
                                                        This field is required
                                                    </span>
                                                )}
                                                <div className='mt-2 flex gap-3'>
                                                    {imageUrls.map(
                                                        (url, index) => (
                                                            <img
                                                                key={index}
                                                                src={url}
                                                                alt={`Image ${index + 1}`}
                                                                className='w-24 h-24 object-cover mr-2 mb-2 rounded-md'
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor='description'
                                                    className='block text-sm font-medium text-gray-700'>
                                                    Description
                                                </label>
                                                <textarea
                                                    id='material'
                                                    {...register("description")}
                                                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px]'></textarea>
                                            </div>

                                            <div className='col-span-2'>
                                                <button
                                                    type='submit'
                                                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                                    Update Product
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr className=''>No Message available</tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UpDateProduct;
