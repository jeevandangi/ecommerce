import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AdminNavBar } from '../admin/pages/AdminNavBar'
import { SideBar } from '../admin/pages/SideBar'
import { AuthContext } from '../context/userContext'


const AdminLayout = () => {
    const { navClick } = useContext(AuthContext)
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    const parseUser = JSON.parse(user)


    useEffect(() => {
        if (!parseUser) {
            navigate('/')
        }
        if (parseUser.role === "user") {
            navigate('/userhome')
        }
        if (parseUser.role !== "admin") {
            navigate('/unAuthorized')
        }
    }, [user, navigate])


    return (
        <>
            <AdminNavBar />

            <div className="flex">
                <div className={`${navClick ? ' w-80  ' : " w-0  "} transition-all duration-500`}>
                    <SideBar />
                </div>
                <div className=" w-full mt-20 py-4    px-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export { AdminLayout }