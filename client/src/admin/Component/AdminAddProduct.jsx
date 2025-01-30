import { useEffect, useState } from "react"
import { apiResponseHandler } from "../../apiResponse/apiResponse"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
const AdminAddProduct = () => {

    const navigate = useNavigate()
    const [data, setData] = useState([])

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }



    useEffect(() => {
        const data = async () => {

            try {
                const res = await apiResponseHandler('/api/v1/category/getcategory', 'GET')
                if (res.data.success === true) {
                    setData(res.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        data()
    }, [])

    const [allData, setAllData] = useState({
        productName: '',
        brand: '',
        price: '',
        catageory: '',
        item_weight: '',
        description: '',
        quantity: ''
    })

    const handleChange = (e) => {   // This function is used to set the value of the input field to the state
        setAllData({
            ...allData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("file", file);
        Object.entries(allData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });
        try {
            const res = await apiResponseHandler("/api/v1/product/addproduct", "POST", formDataToSubmit, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log(res);

            // Handle the response
            if (res.data.success === true) {
                toast.success(res.data.message);
                navigate('/admin/addProduct')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Unable to make a request");
        }
    };

    return (
        <>
            <section className="bg-white rounded-lg py-4 mb-2 px-7 border-2 border-blue-100 ">
                <h2 className="mb-8 text-xl font-bold text-gray-900 ">Add a new product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900  ">Product Name</label>
                            <input type="text" name="productName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    dark:placeholder-gray-400     " placeholder="Type product name" required onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900  ">Brand</label>
                            <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      " placeholder="Product brand" required onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900  ">Price</label>
                            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900  ">Quantity</label>
                            <input type="text" name="quantity" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      " placeholder="12" required onChange={handleChange} />
                        </div>
                        <div className="w-full">
                            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900  ">Discount</label>
                            <input type="number" name="discount" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="%20" required onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                                Category
                            </label>
                            <select
                                id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                name="catageory" // Make sure the name matches your form field
                                // Add selected value to bind the state
                                onChange={handleChange} // Ensure the handleChange is updating the state
                            >
                                {data.map((category, index) => (
                                    <option key={category._id || index} value={category._id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="item_weight" className="block mb-2 text-sm font-medium text-gray-900  ">Item Weight (kg)</label>
                            <input type="number" name="item_weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={12} required onChange={handleChange} />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" name="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Your description here" defaultValue={""} onChange={handleChange} />
                        </div>


                        <div>
                            <label className="block mb-5 text-sm font-medium text-gray-900 " htmlFor="image">Upload file</label>
                            <input name="image" className="block  text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 " type="file" onChange={handleFileChange} />
                            <p className="mt-1 text-sm text-gray-500  " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>




                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-500 hover:bg-primary-800">
                        Add product
                    </button>
                </form>

            </section >

        </>
    )
}

export { AdminAddProduct }