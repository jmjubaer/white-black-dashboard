import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const CustomerOrder = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [singleOrder, setSingleOrder] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(`http://localhost:5000/order`);

                const result = await response.json();
                if (result) {
                    setData(result);
                    setLoading(false);
                }
                console.log(result);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, [refetch]);

    const handleOpenModal = async (id) => {
        const response = await fetch(`http://localhost:5000/order/${id}`);

        const result = await response.json();
        if (result) {
            setSingleOrder(result);
            setOpenModal(true);
        }
    };
    const handleCloseModal = () => {
        setSingleOrder({});

        setOpenModal(false);
    };
const handleChangeStatus = (e,id) => {
    const status = e.target.value
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to change the status of this order?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change status!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch(`http://localhost:5000/order/status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({status}),
            })
            const data = await response.json()
            console.log(data);  
            if(data.message){
                setRefetch(!refetch)
                Swal.fire(
                    'Status Changed!',
                    'The status of the order has been changed successfully.',
                   'success'
                )
            }
        }
    });
}
    return (
        <div>
            <div className='overflow-x-auto mt-10'>
                <h2 className='text-3xl font-semibold mb-5 text-center'>
                    Customer Order Details
                </h2>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='border-b '>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                #
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Customer
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Phone
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                {/* <FaEye /> */}
                                Product Title
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Details
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Total Price
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className=''>Loading...</tr>
                        ) : data.length > 0 ? (
                            data.map((item, index) => (
                                <tr
                                    key={index}
                                    className='border-b text-center'>
                                    <td className='px-4 py-3 text-left'>
                                        {index + 1}
                                    </td>{" "}
                                    <td className='px-4 py-3 text-left'>
                                        {item.name}
                                    </td>
                                    <td className='px-4 py-3'>{item.number}</td>
                                    <td className='px-4 py-3'>
                                        {item.productInfo.map((product) => (
                                            <p>
                                                {product.name.slice(0, 25)}....
                                            </p>
                                        ))}
                                    </td>
                                    <td className='px-4 py-3 '>
                                        <button
                                            onClick={() =>
                                                handleOpenModal(item._id)
                                            }
                                            className=' hover:text-blue-500 text-xl'>
                                            <FaEye />
                                        </button>
                                    </td>
                                    <td className='px-4 py-3'>
                                        &#x09F3;{" "}
                                        {item?.productInfo?.reduce(
                                            (total, product) => {
                                                return (
                                                    total +
                                                    product.price *
                                                        product.quantity
                                                );
                                            },
                                            0
                                        )}
                                    </td>
                                    <td className='px-4 py-3 '>
                                        <select  onChange={(e)=> handleChangeStatus(e,item._id)} defaultValue={item.status} className='border p-2 border-slate-300 rounded outline-none'>
                                            <option value='processing'>
                                                Processing
                                            </option>
                                            <option value='pending'>
                                                Pending
                                            </option>
                                            <option value='shipped'>
                                                Shipped
                                            </option>
                                            <option value='delivered'>
                                                Delivered
                                            </option>
                                            <option value='cancelled'>
                                                Cancelled
                                            </option>
                                        </select>
                                    </td>
                                    {openModal && (
                                        <div className='fixed top-1/2 left-[60%] shadow-xl -translate-x-1/2 -translate-y-1/2 w-3/5 h-fit bg-white border-2 rounded-xl z-[99999999] p-5 text-left max-h-[500px] overflow-y-auto'>
                                            <button
                                                className='text-3xl text-red-500 absolute top-3 right-3'
                                                onClick={() =>
                                                    handleCloseModal()
                                                }>
                                                <IoClose />
                                            </button>
                                            <p className='text-lg font-medium'>
                                                <span className='text-xl font-semibold mr-2'>
                                                    Customer Name:
                                                </span>{" "}
                                                {singleOrder.name}
                                            </p>{" "}
                                            <p className='text-lg font-medium mt-3'>
                                                <span className='text-xl font-semibold mr-2'>
                                                    Phone:
                                                </span>{" "}
                                                {singleOrder.number}
                                            </p>
                                            <p className='text-lg font-medium mt-3'>
                                                <span className='text-xl font-semibold mr-2'>
                                                    Local Address:
                                                </span>{" "}
                                                {singleOrder.localAddress}
                                            </p>{" "}
                                            <div className='grid grid-cols-3'>
                                                <p className='text-lg font-medium mt-3'>
                                                    <span className='text-xl font-semibold mr-2'>
                                                        City:
                                                    </span>{" "}
                                                    {singleOrder.city}
                                                </p>{" "}
                                                <p className='text-lg font-medium mt-3'>
                                                    <span className='text-xl font-semibold mr-2'>
                                                        District:
                                                    </span>{" "}
                                                    {singleOrder.district}
                                                </p>{" "}
                                                <p className='text-lg font-medium mt-3'>
                                                    <span className='text-xl font-semibold mr-2'>
                                                        Postal Code:
                                                    </span>{" "}
                                                    {singleOrder.code}
                                                </p>
                                            </div>
                                            <div className='mt-5'>
                                                <h2 className='text-2xl font-semibold'>
                                                    Product Information :
                                                </h2>

                                                {singleOrder.productInfo.map(
                                                    (product, index) => (
                                                        <div
                                                            key={index}
                                                            className=' border my-5 flex items-center p-2 rounded gap-4'>
                                                            <img
                                                                src={
                                                                    product.image
                                                                }
                                                                alt=''
                                                                className='w-[100px] rounded h-[100px]'
                                                            />
                                                            <div className=''>
                                                                <p className='text-lg capitalize font-medium'>
                                                                    <span className='text-xl font-semibold mr-2 '>
                                                                        Product
                                                                        title:
                                                                    </span>{" "}
                                                                    {
                                                                        product.name
                                                                    }
                                                                </p>{" "}
                                                                <div className='flex items-center gap-5'>
                                                                    <p className='text-lg font-medium capitalize'>
                                                                        <span className='text-xl font-semibold mr-2'>
                                                                            Color:
                                                                        </span>{" "}
                                                                        {
                                                                            product.color
                                                                        }
                                                                    </p>
                                                                    <p className='text-lg font-medium uppercase'>
                                                                        <span className='text-xl font-semibold capitalize mr-2'>
                                                                            Size:
                                                                        </span>{" "}
                                                                        {
                                                                            product.size
                                                                        }
                                                                    </p>
                                                                </div>{" "}
                                                                <div className='flex items-center gap-5'>
                                                                    <p className='text-lg font-medium'>
                                                                        <span className='text-xl font-semibold mr-2'>
                                                                            Quantity:
                                                                        </span>{" "}
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </p>
                                                                    <p className='text-lg font-medium'>
                                                                        <span className='text-xl font-semibold mr-2'>
                                                                            Price:
                                                                        </span>{" "}
                                                                        &#x09F3;
                                                                        {
                                                                            product.price
                                                                        }
                                                                    </p>{" "}
                                                                    <p className='text-lg font-medium'>
                                                                        <span className='text-xl font-semibold mr-2'>
                                                                            Total
                                                                            Price:
                                                                        </span>{" "}
                                                                        &#x09F3;{" "}
                                                                        {product.price *
                                                                            product.quantity}
                                                                    </p>{" "}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
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
        </div>
    );
};

export default CustomerOrder;
