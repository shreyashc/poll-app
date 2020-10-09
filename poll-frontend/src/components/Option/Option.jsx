import React, { useState } from "react";
import Voters from "../voters/Voters";
import "./style.scss";

const Option = ({ opt }) => {
    const [toShow, toSetShow] = useState(false);
    const handleClick = () => {
        toSetShow((initiaValue) => !initiaValue);
    };
    return (
        <div className="option-details-container">
            <div className="wrapper">
                <div className="option-name">{opt.option}</div>
                <div className="option-votes">{opt.votes}</div>
                <div className="arrow" onClick={handleClick}>
                    <i className="fa fa-angle-down"></i>
                </div>
            </div>
            <div className={toShow === true ? "voters show" : "voters"}>
                <div>voters:</div>
                {opt.voters.map((voter, index) => {
                    return <Voters key={index} name={voter} />;
                })}
            </div>
        </div>
    );
};

export default Option;
