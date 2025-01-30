import { useEffect, useState } from "react";
import { apiResponseHandler } from "../../apiResponse/apiResponse";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState(""); // Manage category name directly
    const { categoryId } = useParams();
    const navigate = useNavigate();

    // Fetch category data when component mounts
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await apiResponseHandler(`/api/v1/category/getcategory/${categoryId}`, "GET");
                if (res.data.success) {
                    setCategoryName(res.data.data.categoryName); // Set categoryName directly
                } else {
                    toast.error("Failed to fetch category details");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching category");
            }
        };
        fetchCategory();
    }, [categoryId]);

    // Handle category update
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent form submission reload
        try {
            const payload = { categoryName }; // Send updated category name
            const res = await apiResponseHandler(`/api/v1/category/updatecategory/${categoryId}`, "POST", payload);
            if (res.data.success) {
                toast.success("Category updated successfully!");
                navigate("/admin/category");
            } else {
                toast.error(res.data.message || "Failed to update category");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating category");
        }
    };

    return (
        <section className="bg-white rounded-lg py-4 mb-2 px-7 border-2 border-blue-100">
            <h2 className="mb-8 text-xl font-bold text-gray-900">Edit Category</h2>
            <form onSubmit={handleUpdate}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400"
                            placeholder="Type category name"
                            value={categoryName} // Controlled input
                            required
                            onChange={(e) => setCategoryName(e.target.value)} // Update state
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-500 hover:bg-primary-800"
                >
                    Update Category
                </button>
            </form>
        </section>
    );
};

export { EditCategory };
