import { useQuery } from "react-query";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UpDateProduct = () => {
    const { isLoading, data } = useQuery("allProduct", async () => {
        const response = await fetch(
            "https://black-and-white-server.vercel.app/collection/allProducts"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="border-b ">
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Image
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Product Information
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Sizes & Colors
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Price & Discount
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Status & Category
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item._id} className="border-b ">
                            <td className="px-4 py-3">
                                <img
                                    src={item.images}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="px-4 py-3">
                                <p className="text-sm font-medium text-gray-900">
                                    {item.title}
                                </p>
                                <p className="text-sm text-gray-600">Type: {item.type}</p>
                                <p className="text-sm text-gray-600">
                                    Product Type: {item.productType}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Material: {item.material}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Details Material: {item.detailsMaterial}
                                </p>
                            </td>
                            <td className="px-4 py-3">
                                <p className="text-sm text-gray-600">
                                    Sizes:{" "}
                                    {Array.isArray(item.size) ? item.size.join(", ") : "N/A"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Colors:{" "}
                                    {Array.isArray(item.color) ? item.color.join(", ") : "N/A"}
                                </p>
                            </td>
                            <td className="px-4 py-3">
                                <p className="text-sm text-gray-600">Price: {item.price}</p>
                                <p className="text-sm text-gray-600">
                                    Discount: {item.discount}
                                </p>
                            </td>
                            <td className="px-4 py-3">
                                <p className="text-sm text-gray-600">
                                    Product Status: {item.productStatus}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Collection Status: {item.collectionStatus}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Category: {item.category}
                                </p>
                            </td>
                            <td className="px-4 py-3 h-full flex items-center justify-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <MdDelete />
                                </button>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                                    <FaRegEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UpDateProduct;
