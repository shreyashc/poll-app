import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axiosInstance from "../../client/apiClient";
const Logout = (props) => {
    const { dispatch } = useContext(AuthContext);

    const handleClick = async () => {
        axiosInstance
            .get("auth/logout")
            .then(() => {
                localStorage.clear("user");
                dispatch({ type: "LOGGED_OUT" });
                props.history.replace("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default Logout;
