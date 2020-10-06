import React from "react";
import Voters from "../voters/Voters";

const Option = ({ opt }) => {
    return (
        <div>
            <div className="name">
                {opt.option}-{opt.votes}-{opt.voters.length}
            </div>
            {opt.voters.map((voter, index) => {
                return <Voters key={index} name={voter} />;
            })}
        </div>
    );
};

export default Option;
