import React from "react";
import Moment from "react-moment";
import { motion } from "framer-motion";
import "./style.scss";

const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: {
        duration: 0.1,
    },
};
const PollCard = ({ poll, ...props }) => {
    const onClick = () => {
        props.history.push(`/poll/${poll._id}`);
    };
    const date = new Date(poll.createdAt);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
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
        </motion.div>
    );
};

export default PollCard;
