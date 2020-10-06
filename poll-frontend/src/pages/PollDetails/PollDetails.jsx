import React, { useState, useEffect } from "react";
import Option from "../../components/Option/Option";
import axiosInstance from "../../client/apiClient";

const PollDetails = (props) => {
    const [poll, setPoll] = useState(null);
    const id = props.match.params.id;
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
                    <div className="question">{poll.question}</div>
                    {poll.options.map((opt) => (
                        <Option opt={opt} key={opt._id} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default PollDetails;
