import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import axiosInstance from "../../client/apiClient";
import "./style.scss";
const Logout = (props) => {
    const { dispatch } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState(false);
    const handleClick = async () => {
        setLoggingOut(true);
        axiosInstance
            .get("auth/logout")
            .then(() => {
                setLoggingOut(false);
                localStorage.clear("user");
                dispatch({ type: "LOGGED_OUT" });
                props.history.replace("/");
            })
            .catch((err) => {
                setLoggingOut(false);
                console.log(err);
            });
    };
    return (
        <div>
            <button onClick={handleClick} className="logout-btn">
                {loggingOut ? "Logging out" : "Logout"}
            </button>
        </div>
    );
};

export default withRouter(Logout);
