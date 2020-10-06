import React, { useState, useEffect } from "react";
import axiosInstance from "../../client/apiClient";
const Vote = (props) => {
    const [name, setname] = useState("");
    const [poll, setPoll] = useState(null);
    const [selectedOption, setselectedOption] = useState("");
    const [nameError, setNameError] = useState(null);
    const [optionError, setOptionError] = useState(null);
    const id = props.match.params.id;

    const handleClick = () => {
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
        if (nameError || optionError) {
            return;
        }
        axiosInstance
            .post(`/vote/${id}`, {
                name,
                optionId: selectedOption,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
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
        <div>
            {poll ? (
                <div>
                    <div>{poll.question}</div>
                    <div>
                        {poll.options.map((opt, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setselectedOption(opt._id);
                                    }}
                                >
                                    {opt?.option}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setname(e.target.value);
                    }}
                />
            </div>
            <div className="errors">
                {optionError ? <div>{optionError}</div> : null}
                {nameError ? <div>{nameError}</div> : null}
            </div>
            <button onClick={handleClick}>Vote</button>
        </div>
    );
};

export default Vote;
