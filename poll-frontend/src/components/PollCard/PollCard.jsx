import React from "react";

const PollCard = ({ poll, ...props }) => {
    const onClick = () => {
        props.history.push(`/poll/${poll._id}`);
    };
    return (
        <div>
            <div onClick={onClick}>{poll.question}</div>
            <div>{poll.active ? "active" : "ended"} </div>
        </div>
    );
};

export default PollCard;
