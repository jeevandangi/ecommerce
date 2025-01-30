import React, { useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Outlet, useNavigate } from 'react-router-dom'




const PublicLayout = () => {





    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            const parseUser = JSON.parse(user)
            if (parseUser.role === "admin") {

                navigate('/admin')
            } else if (parseUser.role === "user") {

                navigate('/userhome')
            }
        } else {
            navigate('/')
        }
    }, [navigate])

    return (
        <>

            <Header />
            <div className="px-1 mt-20">

                <Outlet className=" py-10" />
            </div>
            <Footer />
        </>
    )
}

export { PublicLayout }