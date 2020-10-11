import React from "react";
import "./style.scss";
import { FRONTEND_URL } from "../../utils/constants";
const Success = () => {
    return (
        <div className="success-container">
            <h1>Your response was recorded</h1>
            <h4>
                create your own poll <a href={FRONTEND_URL}>here</a>
            </h4>
        </div>
    );
};

export default Success;
