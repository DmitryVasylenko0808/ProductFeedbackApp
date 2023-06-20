import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Main from "../pages/Main.jsx";
import Inner from "../pages/Inner.jsx";
import Create from "../pages/Create.jsx"
import Edit from "../pages/Edit.jsx";

import Registration from "../pages/Registration.jsx";
import LogIn from "../pages/LogIn.jsx";

import RequireAuthAdmin from "../hoc/RequireAuthAdmin.jsx";

import "../styles/normalize.scss";
import "../styles/index.scss";
import { fetchMe } from "../http/usersApi.js";

import { UserContext, AuthTokenContext } from "../context.js";

const App = () => {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const getMe = async (token) => {
            const data = await fetchMe(token);
            setUserData(data);
        }

        if (!token) {
            setUserData(null);
            return;
        }
        getMe(token);
    }, [token]);

    return (
        <AuthTokenContext.Provider 
            value={{ logIn: setToken, logOut: () => setToken(''), token }}
        >
            <UserContext.Provider value={userData}>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="/inner/:id" element={<Inner />} />
                    <Route path="/create" element={
                        <RequireAuthAdmin>
                            <Create />
                        </RequireAuthAdmin>
                    } />
                    <Route path="/edit/:id" element={
                        <RequireAuthAdmin>
                            <Edit />
                        </RequireAuthAdmin>
                    } />
                    <Route path="/signin" element={<LogIn />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </UserContext.Provider>
        </AuthTokenContext.Provider>
    )
}

export default App;