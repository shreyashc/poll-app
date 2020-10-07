import React from "react";
import "./style.scss";
const PollCard = ({ poll, ...props }) => {
    const onClick = () => {
        props.history.push(`/poll/${poll._id}`);
    };
    return (
        <div
            className={
                poll.active
                    ? "poll-active card-container"
                    : "poll-ended card-container"
            }
            onClick={onClick}
        >
            <div className="question">{poll.question}</div>
        </div>
    );
};

export default PollCard;
