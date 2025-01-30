import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineMenuOpen } from "react-icons/md";
import Button from '@mui/material/Button';
import { CiDark } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";



import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from "../../context/userContext";
import { ThemeContext } from "@emotion/react";
import { apiResponseHandler } from "../../apiResponse/apiResponse";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AdminNavBar = () => {
    const { removeUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const { setNavClick } = useContext(AuthContext)
    const handleNavClick = () => {
        setNavClick((pre) => !pre)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAvatarClick = () => {
        setAnchorEl(null);
    };
    const handleClickNotification = () => {
        setAnchorEl(null);
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

    return (
        <>
            <div className=" shadow-lg bg-white h-16 flex fixed top-0 left-0 right-0 items-center justify-between px-7 " style={{ zIndex: '999' }} >
                <div className=" flex items-center justify-center gap-16 ">
                    <div className="">
                        <h1 className=" text-3xl  font-extrabold text-blue-500">SnapDeal</h1>
                    </div>
                    <div className="flex w-10 items-center justify-center rounded-full overflow-hidden" onClick={handleNavClick}>
                        <Button>  <MdOutlineMenuOpen className=" text-3xl  " /></Button>
                    </div>
                    <div className=" flex rounded-lg   cursor-pointer items-center gap-3 w-auto px-4 py-2" style={{ backgroundColor: "#f7f7ff" }}>
                        <IoSearchOutline className=" border-b-2 border-gray-300 font-bold text-2xl  text-gray-400 " />
                        <input type="text" placeholder="Search" className=" outline-none w-auto bg-transparent h-full underline  text-lg text-gray-400" />
                    </div>
                </div>
                <div className=" flex items-center justify-center gap-4">
                    <div className=" overflow-hidden rounded-full flex items-center justify-center w-12"  >
                        <Button ><CiDark className=" text-3xl text-black border-b-2 border-gray-200" /></Button>
                    </div>
                    <div className=" overflow-hidden  rounded-full flex items-center justify-center w-12" onClick={handleClick}>
                        <Button ><IoNotificationsOutline className=" text-3xl text-black border-b-2 border-gray-200" /></Button>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClickNotification}
                        onClick={handleClickNotification}
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
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClickNotification}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClickNotification}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClickNotification}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClickNotification}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClickNotification}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>



                    <div className=" overflow-hidden cursor-pointer  rounded-lg flex items-center justify-center  " onClick={handleClick}>
                        <Button >
                            <div className="flex items-center gap-3 ">
                                <img src="../../public/image/profile.JPG" alt="" className=" h-12 rounded-full w-12" />
                                <div className="">
                                    <p className=" text-gray-500 font-extrabold">Jeevan Dangi</p>
                                    <p className=" text-gray-400 font-extrabold " style={{ fontSize: '10px' }}>Web Developer</p>
                                </div>
                            </div>
                        </Button>
                    </div>
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
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleCloseAvatarClick}>
                            <Avatar /> Profile
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
            </div >
        </>
    )
}

export { AdminNavBar }