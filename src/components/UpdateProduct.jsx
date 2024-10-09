import { useQuery } from "react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const UpDateProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(true);
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/products/all`
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

    const onSubmit = async ({searchText}) => {
        const response = await fetch(
            `http://localhost:5000/products/search/${searchText}`
        );
        const data = await response.json();
        if (data) {
            setProductData(data);
        }
    };
    return (
        <div className='overflow-x-auto'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center justify-center gap-5 mb-5'>
                <input
                    type='search'
                    name=''
                    {...register("searchText", { required: true })}
                    id=''
                    placeholder='Enter product title....'
                    className={`p-2 w-1/2 outline-none border border-slate-600 rounded-lg ${errors.searchText && "border-red-500"}`}
                />

                <button type="submit" className='bg-blue-500 px-5 py-2 text-white rounded-lg'>
                    Search
                </button>   
                <button onClick={()=> setRefetch(!refetch)} className='bg-blue-500 px-5 py-2 text-white rounded-lg'>
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
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        <MdDelete />
                                    </button>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
                                        <FaRegEdit />
                                    </button>
                                </td>
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
