import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children, role }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('user');
        const parseData = data ? JSON.parse(data) : null;



        if (!parseData) {
            return navigate('/');  // Redirect to login if no user is found
        }
        if (parseData.role !== role) {
            console.log("hello");

            return navigate('/unauthorized')
        }
    }, [navigate, role]);

    return children || null; // Render children (the protected component)
};

export { ProtectedRoute };
