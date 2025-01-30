import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { FaProductHunt } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbBrandBeats } from "react-icons/tb";
import { FiBell } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from '../../context/userContext';


const SideBar = () => {
    const [clickProduct, setClickProduct] = useState(false)
    const [clickBrand, setClickBrand] = useState(false)
    const [clickOrder, setOrderClick] = useState(false)
    const { navClick } = useContext(AuthContext)


    const handelProductClick = () => {
        setClickProduct((pre) => !pre)
    }

    const handleOrderClick = () => {
        setOrderClick((pre) => !pre)
    }
    const handleBrandClick = () => {
        setClickBrand((pre) => !pre)
    }

    return (
        <>
            <div className={`${navClick ? 'w-72 opacity-100' : " w-0 opacity-0"}     fixed shadow-lg left-0 h-screen   top-16 transition-all duration-700  bg-white overflow-y-scroll`} style={{ zIndex: '999' }}>
                <ul className=' px-3 py-3'>

                    <Link to='/admin'>
                        <Button className="w-full  hover:bg-gray-200 rounded-md  "  >
                            <div className=" w-full gap-3 flex py-2 justify-start">
                                <span className="inline-flex items-center">
                                    <MdDashboard className=' text-2xl text-gray-500' />
                                </span>
                                <span className=' text-gray-500 capitalize font-bold text-lg'>Dashboard</span>
                            </div>
                        </Button>
                    </Link>

                    <div className="">

                        <Button className="w-full flex-col hover:bg-gray-200 rounded-md  " onClick={handelProductClick} >
                            <div className=" w-full items-center  flex py-2 justify-between ">
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className="inline-flex items-center">
                                        <FaProductHunt className=' text-2xl text-gray-500' />
                                    </span>
                                    <span className=' text-gray-500 capitalize font-bold text-lg'>Product</span>
                                </div>
                                {clickProduct ? <RiArrowDownSLine className=' text-2xl text-gray-500' /> : <MdKeyboardArrowRight className=' text-2xl text-gray-500' />}
                            </div>

                        </Button>
                        <div className={` ml-5 transition duration-50 ease-in-out border-l-2 ${clickProduct ? 'h-auto opacity-100' : ' h-0 opacity-0 '}border-gray-300 pl-2`}>
                            <Link to='/admin/product'>
                                <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                    <div className=" w-full gap-3 flex  justify-start">
                                        <span className=' text-gray-500 capitalize font-bold text-md'>Product List</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link to='/admin/addProduct'>
                                <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                    <div className=" w-full gap-3 flex   justify-start">

                                        <span className=' text-gray-500 capitalize font-bold text-md'>Add Product</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link to='/admin/category'>
                                <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                    <div className=" w-full gap-3 flex   justify-start">

                                        <span className=' text-gray-500 capitalize font-bold text-md'>View Category</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link to='/admin/addcategory'>
                                <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                    <div className=" w-full gap-3 flex   justify-start">

                                        <span className=' text-gray-500 capitalize font-bold text-md'>Add Category</span>
                                    </div>
                                </Button>
                            </Link>

                        </div>
                    </div>



                    <div className="">

                        <Button className="w-full flex-col hover:bg-gray-200 rounded-md  " onClick={handleOrderClick} >
                            <div className=" w-full items-center  flex py-2 justify-between ">
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className="inline-flex items-center">
                                        <FaCartArrowDown className=' text-2xl text-gray-500' />
                                    </span>
                                    <span className=' text-gray-500 capitalize font-bold text-lg'>Order</span>
                                </div>
                                {clickOrder ? <RiArrowDownSLine className=' text-2xl text-gray-500' /> : <MdKeyboardArrowRight className=' text-2xl text-gray-500' />}
                            </div>

                        </Button>
                        <div className={` ml-5 transition duration-50 ease-in-out border-l-2 ${clickOrder ? 'h-auto opacity-100' : ' h-0 opacity-0 '}border-gray-300 pl-2`}>
                            <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                <Link to='/admin/viewOrder' className=" w-full gap-3 flex  justify-start ">
                                    <span className=' text-gray-500 capitalize font-bold text-md'>View Order</span>
                                </Link>
                            </Button>

                            <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className=' text-gray-500 capitalize font-bold text-md'>Manage Order</span>
                                </div>
                            </Button>

                        </div>
                    </div>

                    <div className="">

                        <Button className="w-full flex-col hover:bg-gray-200 rounded-md  " onClick={handleBrandClick} >
                            <div className=" w-full items-center  flex py-2 justify-between ">
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className="inline-flex items-center">
                                        <TbBrandBeats className=' text-2xl text-gray-500' />
                                    </span>
                                    <span className=' text-gray-500 capitalize font-bold text-lg'>Brands</span>
                                </div>
                                {clickBrand ? <RiArrowDownSLine className=' text-2xl text-gray-500' /> : <MdKeyboardArrowRight className=' text-2xl text-gray-500' />}
                            </div>

                        </Button>
                        <div className={` ml-5 transition duration-50 ease-in-out border-l-2 ${clickBrand ? 'h-auto opacity-100' : ' h-0 opacity-0 '}border-gray-300 pl-2`}>
                            <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className=' text-gray-500 capitalize font-bold text-md'>View Brand</span>
                                </div>
                            </Button>
                            <Button className="w-full hover:bg-gray-200 rounded-md  "  >
                                <div className=" w-full gap-3 flex  justify-start">
                                    <span className=' text-gray-500 capitalize font-bold text-md'>Add Brand</span>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <Button className="w-full  hover:bg-gray-200 rounded-md  "  >
                        <div className=" w-full gap-3 flex py-2 justify-start">
                            <span className="inline-flex items-center">
                                <FiBell className=' text-2xl text-gray-500' />
                            </span>
                            <span className=' text-gray-500 capitalize font-bold text-lg'>Notification</span>
                        </div>
                    </Button>
                    <Button className="w-full  hover:bg-gray-200 rounded-md  "  >
                        <div className=" w-full gap-3 flex py-2 justify-start">
                            <span className="inline-flex items-center">
                                <BiMessageRounded className=' text-2xl text-gray-500' />
                            </span>
                            <span className=' text-gray-500 capitalize font-bold text-lg'>Message</span>
                        </div>
                    </Button>
                    <Button className="w-full  hover:bg-gray-200 rounded-md  "  >
                        <div className=" w-full gap-3 flex py-2 justify-start">
                            <span className="inline-flex items-center">
                                <CiSettings className=' text-2xl text-gray-500' />
                            </span>
                            <span className=' text-gray-500 capitalize font-bold text-lg'>Setting</span>
                        </div>
                    </Button>
                    <Button className="w-full  hover:bg-gray-200 rounded-md  "  >
                        <div className=" w-full gap-3 flex py-2 justify-start">
                            <span className="inline-flex items-center">
                                <CiLogin className=' text-2xl text-gray-500' />
                            </span>
                            <span className=' text-gray-500 capitalize font-bold text-lg'>Log Out</span>
                        </div>
                    </Button>




                </ul>

            </div>
        </>
    )
}

export { SideBar }