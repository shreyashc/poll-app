import React from "react";
import { motion } from "framer-motion";
import "./style.scss";
import { Link } from "react-router-dom";
const Variants = {
    before: {
        opacity: 0,
        y: 50,
        transition: {
            type: "spring",
            damping: 16,
            stiffness: 200,
            duration: 1.5,
        },
    },
    after: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 16,
            stiffness: 200,
        },
    },
};
const Landing = () => {
    return (
        <div className="landing-container">
            <motion.div
                variants={Variants}
                initial="before"
                animate="after"
                className="poll"
            >
                <h1>POLL</h1>
                <div className="txt">
                    A platform to create and manage polls,
                    <br />
                    view results and more.
                </div>
                <div>Get Started Now.</div>
                <div className="buttons">
                    <Link to="/login" className="signup-btn">
                        Sign Up
                    </Link>
                    <Link to="/login" className="login-btn">
                        Login
                    </Link>
                </div>
            </motion.div>
            <div className="poll-svg">
                <img src={require("../../static/chart.svg")} alt="" />
            </div>
        </div>
    );
};

export default Landing;
