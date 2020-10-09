import React from "react";
import Moment from "react-moment";
import "./style.scss";
const PollCard = ({ poll, ...props }) => {
    const onClick = () => {
        props.history.push(`/poll/${poll._id}`);
    };
    const date = new Date(poll.createdAt);
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
            <div className="date">
                <Moment date={date} format="DD/MM/YYYY" />
            </div>
        </div>
    );
};

export default PollCard;
