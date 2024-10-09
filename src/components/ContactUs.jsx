import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const ContactUs = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/contact-us`
                );

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
                        `http://localhost:5000/contact-us/${id}`,
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

    return (
        <div>
            <div className='overflow-x-auto mt-10'>
                <h2 className='text-3xl font-semibold mb-5 text-center'>
                    Contact Us Message
                </h2>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='border-b '>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Name
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Email
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                {/* <FaEye /> */}
                                Details
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Reply
                            </th>
                            <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>
                                Delete
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
                                        {item.name}
                                    </td>
                                    <td className='px-4 py-3'>{item.email}</td>
                                    <td className='px-4 py-3 '>
                                        <button onClick={() => setOpenModal(true)} className=' hover:text-blue-500 text-2xl'>
                                            <FaEye />
                                        </button>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <a
                                            href={`mailto:${item.email}`}
                                            className='text-blue-500 hover:text-blue-600'>
                                            Reply
                                        </a>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <button
                                            disabled={deleteLoading}
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className='text-red-500 hover:text-red-600 text-2xl'>
                                            <MdDelete />
                                        </button>
                                    </td>
                                  { openModal && <div className='fixed top-1/2 left-[60%] shadow-xl -translate-x-1/2 -translate-y-1/2 w-[500px] h-fit bg-white border-2 rounded-xl z-[99999999] p-5 text-left max-h-[500px] overflow-y-auto'>
                                        <button className="text-3xl text-red-500 absolute top-3 right-3" onClick={() => setOpenModal(false)}>
                                            <IoClose />
                                        </button>
                                        <p className='text-lg font-medium'>
                                            <span className='text-xl font-semibold mr-2'>
                                                Name:
                                            </span>{" "}
                                            {item.name}
                                        </p>{" "}
                                        <p className='text-lg font-medium mt-3'>
                                            <span className='text-xl font-semibold mr-2'>
                                                Email:
                                            </span>{" "}
                                            {item.email}
                                        </p>
                                        <p className='text-lg font-medium mt-3'>
                                            <span className='text-xl font-semibold mr-2'>
                                                Message:
                                            </span>{" "}
                                            {item.message}
                                        </p>
                                    </div>}
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

export default ContactUs;
