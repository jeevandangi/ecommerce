import { useEffect, useState } from "react";
import { apiResponseHandler } from "../../apiResponse/apiResponse";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";

const ViewCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(null); // Track category ID for open modal
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // To hold the selected category ID for delete

    const handleOpen = (id) => {
        setSelectedCategoryId(id);  // Set the selected category ID to delete
        setOpen(id);  // Open the modal for the selected category ID
    };

    const handleClose = () => {
        setOpen(null); // Close the modal
        setSelectedCategoryId(null); // Clear the selected category ID
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiResponseHandler("/api/v1/category/getcategory", "GET");
                if (res.data.success === true) {
                    setData(res.data.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (!selectedCategoryId) return; // If no category ID is selected, don't proceed
        console.log(selectedCategoryId);

        try {
            const res = await apiResponseHandler(`/api/v1/category/deleteCategory/${selectedCategoryId}`, 'DELETE');
            if (res.data.success === true) {
                toast.success(res.data.message);
                // Remove the deleted category from the state
                setData((prevData) => prevData.filter((category) => category._id !== selectedCategoryId));
                setOpen(null); // Close the modal after deletion
                setSelectedCategoryId(null); // Clear the selected category ID
            } else {
                toast.error("Failed to delete category");
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p>Loading ...........</p>;
    }

    return (
        <>
            <div className="bg-white rounded-lg h-screen px-5 py-8">
                <div className="mb-5 font-extrabold text-xl">
                    <h1>Brand</h1>
                </div>
                <div>
                    {data.map((category) => (
                        <div
                            className="flex justify-between gap-4 py-2 cursor-pointer border-b-2 border-gray-300"
                            key={category._id}
                        >
                            <div className="">

                                <p className="py-2 px-3 w-full hover:bg-blue-400 hover:text-white   capitalize">
                                    {category.categoryName}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Link
                                    to={`/admin/editcategory/${category._id}`}
                                    className="flex items-center justify-center rounded-lg hover:bg-green-500 bg-green-600 px-8   py-1 text-white text-lg"
                                >
                                    <span>Edit</span>
                                </Link>
                                <div
                                    className="bg-red-600 rounded-lg hover:bg-red-500 flex items-center justify-center   px-8 text-white"
                                    onClick={() => handleOpen(category._id)} // Open modal for this category
                                >
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {open && (
                        <div className="absolute flex bg-gray-500 items-center justify-center w-full h-screen top-0 left-0 ring-0 bg-opacity-55">
                            <div className="flex gap-5 rounded-xl relative flex-col items-center justify-center px-10 py-10 bg-white">
                                <div className="absolute top-2 right-3">
                                    <RxCross2 className="cursor-pointer" onClick={handleClose} />
                                </div>
                                <div>
                                    <h1 className="text-black">Do you want to delete this category?</h1>
                                </div>
                                <div className="flex gap-8">
                                    <div
                                        className="bg-red-600 cursor-pointer text-white px-8 py-1"
                                        onClick={handleDelete}
                                    >
                                        <span>Yes</span>
                                    </div>
                                    <div
                                        className="bg-blue-600 cursor-pointer text-white px-8 py-1"
                                        onClick={handleClose} // Close modal if clicked "No"
                                    >
                                        <span>No</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export { ViewCategory };
