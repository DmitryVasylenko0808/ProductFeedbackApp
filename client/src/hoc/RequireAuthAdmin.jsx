import React, { useContext } from "react";
import { UserContext } from "../context";
import { Navigate } from "react-router";

const RequireAuthAdmin = ({ children }) => {
    const user = useContext(UserContext);

    if (!user || user.role !== 'Admin') {
        return <Navigate to="/" />
    }
    return children;
}

export default RequireAuthAdmin;