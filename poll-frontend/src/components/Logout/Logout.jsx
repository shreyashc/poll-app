import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import axiosInstance from "../../client/apiClient";
import "./style.scss";
const Logout = (props) => {
    const { dispatch } = useContext(AuthContext);

    const handleClick = async () => {
        axiosInstance
            .get("auth/logout")
            .then(() => {
                localStorage.clear("user");
                dispatch({ type: "LOGGED_OUT" });
                props.history.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <button onClick={handleClick} className="logout-btn">
                Logout
            </button>
        </div>
    );
};

export default withRouter(Logout);
