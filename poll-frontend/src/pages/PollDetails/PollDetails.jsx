import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Option from "../../components/Option/Option";
import axiosInstance from "../../client/apiClient";
import "./style.scss";

import { BG_COLORS, FRONTEND_URL } from "../../utils/constants";
const options = {
    title: {
        display: true,
        text: "Info Graphics",
        responsive: true,
        maintainAspectRatio: false,
        defaultFontSize: "14px",
    },
};
const PollDetails = (props) => {
    const [poll, setPoll] = useState(null);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [ending, setEnding] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const id = props.match.params.id;
    const pollUrl = `${FRONTEND_URL}#/vote/${id}`;

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setLoading(true);
        axiosInstance
            .get(`polls/${id}`)
            .then((response) => {
                if (isMounted) setLoading(false);
                setPoll(response.data);
            })
            .catch((err) => {
                if (isMounted) setLoading(false);
                console.log(err);
            });
        return () => {
            return (isMounted = false);
        };
    }, [id]);

    useEffect(() => {
        let tempData = [];
        let tempLabel = [];
        if (poll) {
            poll.options.forEach((opt) => {
                tempLabel.push(opt.option);
                tempData.push(opt.votes);
            });
            setData({
                labels: tempLabel,
                datasets: [
                    {
                        label: "Chart",
                        data: tempData,
                        backgroundColor: BG_COLORS,
                    },
                ],
            });
        }
    }, [poll]);

    const handleDelete = () => {
        setDeleting(true);
        axiosInstance
            .delete(`polls/${id}`)
            .then(() => {
                setDeleting(false);
                props.history.replace("/dashboard");
            })
            .catch((err) => {
                setDeleting(false);
                console.log(err);
            });
    };
    const handleEnd = () => {
        setEnding(true);
        axiosInstance
            .patch(`polls/${id}/end`)
            .then((response) => {
                setEnding(false);
                setPoll(response.data);
            })
            .catch((err) => {
                setEnding(false);
                console.log(err);
            });
    };

    return (
        <>
            {loading ? (
                <div className="poll-details-loading">
                    <div className="loading-spinner-container">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            ) : null}
            {poll ? (
                <div>
                    <h1>Poll details</h1>
                    <div className="poll-details-question">{poll.question}</div>
                    <div className="poll-details-continer">
                        <div className="poll-left-container">
                            <div className="link-details">
                                <div className="link-text">poll url:</div>
                                <div className="link">
                                    <a href={pollUrl}>{pollUrl}</a>
                                </div>
                            </div>
                            <div className="options-list">
                                {poll.options.map((opt) => (
                                    <Option opt={opt} key={opt._id} />
                                ))}
                            </div>
                            {!poll.active ? (
                                <div className="ended">Poll has been Ended</div>
                            ) : null}
                            <div className="btns-wrap">
                                {poll.active ? (
                                    <button
                                        id="end-poll-btn"
                                        onClick={handleEnd}
                                    >
                                        {ending ? "Ending" : "End Poll"}
                                    </button>
                                ) : null}
                                <div>
                                    <button
                                        onClick={handleDelete}
                                        id="delete-poll-btn"
                                    >
                                        {deleting ? "Deleting" : "Delete Poll"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="chart-container">
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default PollDetails;
