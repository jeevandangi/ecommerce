import { useState } from "react"
import { apiResponseHandler } from "../../apiResponse/apiResponse"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"



const AddCategory = () => {
    const navigate = useNavigate()
    const [category, setCategories] = useState()
    const [fileData, setFileData] = useState(null)

    const handleFileChange = (e) => {
        setFileData(e.target.files[0])
    }
    // console.log(fileData);
    const formData = new FormData();
    formData.append('category', category)
    formData.append('file', fileData)



    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const res = await apiResponseHandler("/api/v1/category/addcategory", "POST", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data.success === false) {
                toast.error(res.data.message)

            }
            if (res.data.success === true) {
                navigate('/admin/category')
                toast.success(res.data.message)
            }


        } catch (error) {
            toast.error("Failed to add category")
        }



    }



    return (
        <>
            <section className="bg-white rounded-lg py-4 mb-2 px-7 border-2 border-blue-100 ">
                <h2 className="mb-8 text-xl font-bold text-gray-900 ">Add a new category</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900  ">Category</label>
                            <input type="text" name="category" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:placeholder-gray-400     " placeholder="Type category name" required onChange={(e) => setCategories(e.target.value)} />
                        </div>
                        <div>
                            <label className="block mb-5 text-sm font-medium text-gray-900 " htmlFor="image">Upload file</label>
                            <input name="image" className="block  text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 " type="file" onChange={handleFileChange} />
                            <p className="mt-1 text-sm text-gray-500  " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>

                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-500 hover:bg-primary-800">
                        Add category
                    </button>
                </form>

            </section >
        </>
    )
}

export { AddCategory }