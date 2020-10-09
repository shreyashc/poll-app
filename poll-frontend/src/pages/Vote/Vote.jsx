import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../client/apiClient";
import "./style.scss";

const Vote = (props) => {
    const [name, setname] = useState("");
    const [poll, setPoll] = useState(null);
    const [selectedOption, setselectedOption] = useState("");
    const [nameError, setNameError] = useState(null);
    const [optionError, setOptionError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const id = props.match.params.id;

    const handleClick = () => {
        setSubmitError(null);
        if (!name) {
            setNameError("Please Enter your name.");
        } else {
            setNameError(null);
        }
        if (!selectedOption) {
            setOptionError("Please select an option.");
        } else {
            setOptionError(null);
        }
        if (!name || !selectedOption) {
            return;
        }
        let isMounted = true;
        if (isMounted) setLoading(true);
        axiosInstance
            .post(`/vote/${id}`, {
                name,
                optionId: selectedOption,
            })
            .then((response) => {
                if (isMounted) {
                    setLoading(false);
                }
                props.history.push("/success");
                console.log(response);
            })
            .catch((error) => {
                if (isMounted) {
                    setLoading(false);
                    setSubmitError("something Went worng");
                }
                console.log(error);
            });

        return () => (isMounted = false);
    };

    useEffect(() => {
        axiosInstance
            .get(`polls/${id}`)
            .then((response) => {
                setPoll(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className="container">
            <h1>Vote</h1>
            <div className="vote-card">
                {poll ? (
                    <div>
                        <div className="question">{poll.question}</div>
                        <div className="poll-options">
                            {poll.options.map((opt, index) => {
                                return (
                                    <motion.div
                                        key={index}
                                        className={
                                            opt._id === selectedOption
                                                ? "poll-option opt-selected"
                                                : "poll-option"
                                        }
                                        onClick={() => {
                                            setselectedOption(opt._id);
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            originX: 0,
                                            color: "#1466d1",
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        {opt.option}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div>
                            {poll && poll.active ? null : (
                                <div className="poll-has-ended">
                                    Poll has been ended
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                                disabled={poll ? !poll.active : true}
                            />
                            <div className="errors">
                                {optionError ? (
                                    <div className="error">{optionError}</div>
                                ) : null}
                                {nameError ? (
                                    <div className="error">{nameError}</div>
                                ) : null}
                                {submitError ? (
                                    <div className="error">{submitError}</div>
                                ) : null}
                            </div>
                            {loading ? (
                                <div className="loading-spinner-container">
                                    <i className="fas fa-spinner fa-spin"></i>
                                </div>
                            ) : null}
                            <div className="vote-btn">
                                <button
                                    onClick={handleClick}
                                    disabled={
                                        (poll ? !poll.active : true) || loading
                                    }
                                >
                                    {loading ? "Please wait" : "vote"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="dashboard-loading">
                        <div className="loading-spinner-container">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vote;
