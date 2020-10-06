import React, { useReducer, createContext, useEffect } from "react";
import { authReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, {}, () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
