import React, { useEffect, useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaFirstOrder } from "react-icons/fa6";
import { RiUserReceived2Line } from "react-icons/ri";
import { apiResponseHandler } from "../apiResponse/apiResponse";
import toast from "react-hot-toast";
const Profile = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [address, setAddress] = useState({
        country: "",
        district: "",
        city: "",
        tole: "",
        muncipility: "",
        province: "",
        number: ""
    });


    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };
    const { country, district, city, tole, muncipility, province, number } = address

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user._id
        console.log(userId);

        try {
            const res = await apiResponseHandler("/api/v1/address/addaddress", "POST", { country, district, city, tole, muncipility, province, number, userId });
            console.log(res);

            if (res.data.success === false) {
                toast.error(res.data.message)
            }
            if (res.data.success === true) {
                toast.success(res.data.message)
            }




        } catch (error) {
            toast.error("unable to make a request")
        }

    };



    return (
        <section className="w-full overflow-hidden px-3  py-10   rounded-lg">
            {/* User Profile Section */}
            <div className="flex gap-10 flex-col lg:flex-row   ">
                <div className=" flex flex-col bg-white px-4 py-4 rounded-xl items-center gap-10 justify-center">
                    <div className=" flex flex-col items-center justify-center gap-4">
                        <img src="../../public/image/profile.JPG" alt="" className=" w-48 outline outline-4 hover:outline-blue-800 transition duration-500 hover:scale-105 outline-blue-500 p-1 cursor-pointer h-48 rounded-full" />
                        <h1 className="   text-lg font-extrabold">Jeevan Dangi</h1>
                    </div>
                    <div className="">
                        <p className=" text-xl font-extrabold text-center">Address</p>
                        <table>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Country</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Nepal</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>District</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Dang</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Provience</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Lumbini</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>City</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Tulsipur</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Tole</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Sharadanagar</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Municipality</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Tulsipur</td>
                            </tr>
                            <tr>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>Phone Number</td>
                                <td className=' text-gray-600 py-2 px-8 border-b-2 border-gray-200'>98989898</td>
                            </tr>
                        </table>
                        <div className="flex justify-center gap-5 mt-8">
                            <button
                                onClick={() => setShowPopup(true)}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Add Address
                            </button>
                            <button
                                onClick={() => setShowPopup(true)}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Edit Address
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-10 items-center bg-white px-4 pt-4">
                    <p className=" text-xl font-extrabold text-gray-600 underline">Detail's</p>
                    <div className=" grid gap-5 py-7  w-full md:grid-cols-2 lg:grid-cols-3">
                        <div className=" py-5 px-4 rounded-lg border-2 border-blue-200 flex bg-gradient-to-r from-blue-400 to-red-400 flex-col items-center gap-10">
                            <div className="flex items-center justify-center gap-1">
                                <MdProductionQuantityLimits className="text-6xl text-white" />
                                <h1 className=" text-center  text-3xl font-extrabold">Total Purchase</h1>
                            </div>
                            <span className=" text-xl">200 items</span>
                        </div>
                        <div className=" py-5 px-4 rounded-lg border-2 border-blue-200 bg-gradient-to-r from-green-400 to-yellow-400 flex flex-col items-center gap-10">
                            <div className="flex items-center justify-center gap-1">
                                <FaFirstOrder className="text-6xl text-white" />
                                <h1 className=" text-center text-3xl font-extrabold">Recent Order</h1>
                            </div>
                            <span className=" text-xl">200 items</span>
                        </div>
                        <div className=" py-5 px-4 rounded-lg border-2 border-blue-200 bg-gradient-to-r from-orange-400 to-pink-400  flex flex-col items-center gap-10">
                            <div className="flex items-center justify-center">
                                <RiUserReceived2Line className=" text-white text-6xl" />
                                <h1 className=" text-center text-3xl font-extrabold">Yet To Received</h1>
                            </div>
                            <span className=" text-xl">200 items</span>
                        </div>

                    </div>
                </div>

                {/* Add Address Button */}

            </div>

            {/* Popup Form */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Address</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="country" className="block text-gray-600 mb-1">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={address.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your country"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="district" className="block text-gray-600 mb-1">District</label>
                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        value={address.district}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your district"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-gray-600 mb-1">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={address.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your city"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tole" className="block text-gray-600 mb-1">Tole</label>
                                    <input
                                        type="text"
                                        id="tole"
                                        name="tole"
                                        value={address.tole}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your tole"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="municipality" className="block text-gray-600 mb-1">Municipality</label>
                                    <input
                                        type="text"
                                        id="municipality"
                                        name="muncipility"
                                        value={address.muncipility}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your municipality"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="province" className="block text-gray-600 mb-1">Province</label>
                                    <input
                                        type="text"
                                        id="province"
                                        name="province"
                                        value={address.province}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter your province"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-600 mb-1">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="number"
                                    value={address.number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export { Profile };
