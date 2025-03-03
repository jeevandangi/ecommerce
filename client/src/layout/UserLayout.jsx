import React, { useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


import { UserNavBar } from '../user/UserNavBar'


const UserLayout = () => {

    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    const parseUser = JSON.parse(user)

    useEffect(() => {
        if (!parseUser) {
            navigate('/')
        }
        if (parseUser.role === "admin") {
            navigate('/admin')
        }
        if (parseUser.role !== "user") {
            navigate('/unAuthorized')
        }

    }, [user, navigate])

    return (
        <>

            <UserNavBar />


            <div className="px-1 mt-36 py-3">

                <Outlet className=" py-10" />
            </div>
            <Footer />
        </>

    )
}

export { UserLayout }