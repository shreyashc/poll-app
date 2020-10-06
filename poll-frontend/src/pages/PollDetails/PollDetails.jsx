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

    const handleDelete = () => {
        axiosInstance
            .delete(`polls/${id}`)
            .then(() => {
                props.history.replace("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleEnd = () => {
        axiosInstance
            .patch(`polls/${id}/end`)
            .then((response) => {
                setPoll(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {poll ? (
                <div>
                    <div className="question">{poll.question}</div>
                    {poll.options.map((opt) => (
                        <Option opt={opt} key={opt._id} />
                    ))}
                    <div className="details">
                        <div className="link">{`/vote/${id}`}</div>
                        {poll.active ? (
                            <button onClick={handleEnd}>End Poll</button>
                        ) : null}
                        <button onClick={handleDelete}>Delete Poll</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PollDetails;
