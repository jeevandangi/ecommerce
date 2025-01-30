import React, { useState, useEffect, useRef } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FaAlignJustify } from "react-icons/fa6";

import { apiResponseHandler } from "../apiResponse/apiResponse";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/userContext";
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { CartContext } from "../context/CartContext";

const UserNavBar = () => {
    const [click, setClick] = useState(false);
    // const [isDisable, setDisable] = useState(true)
    const navigate = useNavigate()

    const { removeUser } = useContext(AuthContext)
    const { cartLength } = useContext(CartContext)



    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch search results from the backend
    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.trim() === "") {
                setFilteredResults([]);
                setIsDropdownVisible(false);
                return;
            }

            try {
                const response = await apiResponseHandler(`/api/v1/product/search?query=${searchQuery}`, "GET");
                console.log(response.data.data);

                setFilteredResults(response.data.data);
                setIsDropdownVisible(response.data.data.length > 0);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        const debounceTimeout = setTimeout(fetchResults, 500); // Debounce API calls
        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuClick = () => {
        setClick((pre) => !pre);
    };





    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const token = localStorage.getItem("token")


            const res = await apiResponseHandler("/api/v1/users/logout", "POST", { token });   // Make a POST request to the /register endpoint

            if (res.data.success == false) {
                // setApiResponse(res.data.message);
                toast.error(res.data.message);
            }
            if (res.data.success == true) {
                // setApiResponse(res.data.message);
                removeUser()
                toast.success(res.data.message);
                navigate('/');
            }

        }

        catch (error) {
            console.error(error.message);
        }
        // setApiResponse("");
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAvatarClick = () => {
        setAnchorEl(null);
    };

    const handleSearchItemShowClick = (id) => {
        navigate(`/userhome/ShowProductBySearchGrid/${id}`)
    }

    return (
        <>
            <div className="pt-3 fixed left-0 right-0 top-0 z-auto   bg-gray-50 shadow-lg " style={{ zIndex: "1000" }}>
                <div className="flex px-4 flex-col gap-3  ">
                    <div className="border-b-2 pb-2 border-gray-200 relative flex flex-col justify-center w-full">
                        <div className=" flex   items-center  gap-5">


                            <div className="flex  md:grid   md:grid-cols-8 w-full items-center justify-between">
                                <Link to='/userhome'>  <img src="../../public/image/logo.jpg" alt="logo" className=" rounded-full h-14 bg-red-300 border-2 border-blue-300" /></Link>


                                {/* search button */}


                                <div className="  items-center justify-center col-span-5 md:flex hidden w-full">
                                    <div className="flex relative justify-center md:w-full lg:w-3/4 border-gray-200 rounded-sm bg-gray-200 items-center px-2 py-2">
                                        <IoSearchOutline className="text-3xl text-rose-500 cursor-pointer" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="outline-none px-2 w-full bg-transparent py-1"
                                        />
                                        <button className="mr-1 capitalize bg-rose-500 px-2 py-1 text-white rounded-sm transition duration-300 ease-in-out">
                                            search
                                        </button>

                                        {isDropdownVisible && (
                                            <div ref={dropdownRef} className="z-50 rounded-lg shadow-lg border-2 border-blue-100 overflow-y-scroll absolute top-16 px-5 py-8 h-48 bg-white w-full">
                                                {filteredResults.map((item, index) => (
                                                    <div key={index} className="p-2 border-b-2 border-gray-300 hover:bg-blue-400 cursor-pointer hover:text-white capitalize" onClick={() => handleSearchItemShowClick(item._id)}>
                                                        {item.productName}
                                                    </div >
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>



                                <div className=" relative flex gap-3 items-center justify-center">
                                    <Link to='/userhome/cart'> <MdOutlineShoppingCart className="text-2xl cursor-pointer text-rose-400 text-center" /></Link>
                                    <button  >
                                        <RxAvatar className={`hover:text-rose-400  text-3xl cursor-pointer text-rose-500 `} onClick={handleClick}
                                        />

                                    </button>
                                    <div className=" absolute rounded-full px-1 left-7 text-white bottom-5 text-sm bg-red-700">{cartLength}</div>
                                </div>


                                {/* user section styling */}
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleCloseAvatarClick}
                                    onClick={handleCloseAvatarClick}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 10000,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleCloseAvatarClick}>
                                        <Link to="/userhome/profile" className=" flex items-center justify-center">  <Avatar /> Profile </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseAvatarClick}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleCloseAvatarClick}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Add another account
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseAvatarClick}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={handleSubmit}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>



                            {/* menu button */}
                            <div className=" relative md:none">
                                <FaAlignJustify

                                    className="text-2xl  w-10 cursor-pointer text-gray-600 md:hidden"
                                    onClick={handleMenuClick}

                                />
                            </div>
                        </div>

                        {/* responsive nav bar for mobile view */}
                        <div
                            className={`list-none    left-0 top-34 py-3    flex-col gap-1   w-full duration-400 ease-in-out bg-slate-100 shadow-md  ${click ? "flex" : "hidden"
                                }`}
                        >
                            <Link to='/userhome' className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Home
                            </Link>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Best Sellers
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Gift Ideas
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Games
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Electronic
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Home & Garden
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Cloths
                            </li>
                            <Link to="/userhome/profile" className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                View Profile
                            </Link>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                My Account
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                My Order
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Setting
                            </li>
                            <li className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Help Desk
                            </li>
                            <li onClick={handleSubmit} className="py-2 hover:bg-blue-600 hover:text-white px-2 border-b-2 border-gray-200 cursor-pointer text-gray-600">
                                Log Out
                            </li>


                        </div>

                        {/* mobile view search icon */}
                        <div className="flex border-2 mt-4 border-gray-200 rounded-xl bg-gray-200 items-center px-2 py-2 md:hidden">
                            <IoSearchOutline className="text-3xl cursor-pointer" />
                            <input
                                type="text"
                                className="outline-none w-full px-2 bg-transparent py-1"
                            />
                            <button className="mr-1 capitalize bg-blue-600 px-2 py-1 text-white rounded-lg transition duration-300 ease-in-out">
                                search
                            </button>
                        </div>
                    </div>




                    {/* large screen nav bar */}
                    <div className=" list-none md:flex gap-3 w-full items-center justify-center   pb-3 hidden   ">
                        <Link to="/userhome" className=" px-4   transition duration-600 focus sm:text-sm md:text-md lg:text-lg  hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Home
                        </Link>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Best Sellers
                        </button>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Gift Ideas
                        </button>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Games
                        </button>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Electronic
                        </button>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Home & Garden
                        </button>
                        <button className=" px-4  transition duration-600 focus sm:text-sm md:text-md lg:text-lg hover:bg-rose-100 hover:text-black border-2 border-rose-400 rounded-2xl cursor-pointer">
                            Cloths
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export { UserNavBar };
