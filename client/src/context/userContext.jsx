import React, { createContext, useEffect, useState } from "react";


const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [navClick, setNavClick] = useState(false)
    const [userData, setUserData] = useState({
        user: null,
        token: ''
    });

    const saveUser = (data) => {
        setUserData({
            user: data.user,
            token: data.accessToken
        });
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.accessToken)
    }
    const removeUser = () => {
        setUserData({
            user: null,
            token: ''
        });
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }





    return (<>
        <AuthContext.Provider value={{ userData, setNavClick, navClick, saveUser, removeUser }}>
            {children}
        </AuthContext.Provider>
    </>
    )
}

export {
    AuthProvider,
    AuthContext
}

