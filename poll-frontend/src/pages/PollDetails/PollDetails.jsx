import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Option from "../../components/Option/Option";
import axiosInstance from "../../client/apiClient";
import "./style.scss";
import { BG_COLORS, FRONTEND_URL } from "../../utils/constants";
const PollDetails = (props) => {
    const [poll, setPoll] = useState(null);
    const [data, setData] = useState({});
    const id = props.match.params.id;
    const pollUrl = `${FRONTEND_URL}/vote/${id}`;
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

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(pollUrl);
    };
    const options = {
        title: {
            display: true,
            text: "Info Graphics",

            responsive: true,
            maintainAspectRatio: true,
            defaultFontSize: "14px",
        },
    };

    return (
        <div className="poll-details-continer">
            {poll ? (
                <div className="poll-left-container">
                    <div className="question">{poll.question}</div>
                    <div className="link-details">
                        <div className="link-text">poll url:</div>
                        <div className="link">
                            {pollUrl}
                            <button
                                className="clipboard-btn"
                                onClick={copyToClipBoard}
                            >
                                {" "}
                                <i className="fa fa-clipboard"></i>{" "}
                            </button>
                        </div>
                    </div>
                    <div className="options-list">
                        {poll.options.map((opt) => (
                            <Option opt={opt} key={opt._id} />
                        ))}
                    </div>

                    {poll.active ? (
                        <button id="end-poll-btn" onClick={handleEnd}>
                            End Poll
                        </button>
                    ) : (
                        <div className="ended">Poll has Ended</div>
                    )}
                    <div>
                        <button onClick={handleDelete} id="delete-poll-btn">
                            Delete Poll
                        </button>
                    </div>
                </div>
            ) : null}
            <div className="chart-container">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default PollDetails;
