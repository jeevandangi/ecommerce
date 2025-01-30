import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiResponseHandler } from '../apiResponse/apiResponse'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/userContext'


function RegisterUser() {

    const navigate = useNavigate();
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        // If the user is logged in, redirect to the home page
        if (userData.user && userData.token) {
            navigate('/home')
        }
    }, [userData, navigate])

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const { name, phoneNumber, password } = formData;


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const res = await apiResponseHandler("/api/v1/users/register", "POST", { name, phoneNumber, password });   // Make a POST request to the /register endpoint
            console.log(res.data.message);
            if (res.data.success == false) {
                // setApiResponse(res.data.message);
                toast.error(res.data.message);
            }
            if (res.data.success == true) {
                // setApiResponse(res.data.message);
                toast.success(res.data.message);
                navigate('/');
            }

        }

        catch (error) {
            console.error(error.message);
        }
        // setApiResponse("");
    }

    return (
        <>
            <section className="flex flex-col py-5 items-center pt-6">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">Create an
                            account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900  ">Your full name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Emelia Erickson"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900  ">Phone Number</label>
                                <input type="text" name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300   sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9800000000" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"  >Create an account</button>
                            <p className="text-sm text-gray-500 ">Already have an account? <Link to="/login"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/signin">Sign in here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterUser