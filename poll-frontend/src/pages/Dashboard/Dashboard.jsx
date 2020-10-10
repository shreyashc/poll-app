import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../client/apiClient";
import PollCard from "../../components/PollCard/PollCard";
import "./style.scss";

import { AuthContext } from "../../contexts/AuthContext";
const Dashboard = (props) => {
    const [polls, setPolls] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setLoading(true);
        axiosInstance
            .get("polls/user/124")
            .then((response) => {
                if (isMounted) setLoading(false);
                setPolls(response.data);
            })
            .catch((err) => {
                if (isMounted) setLoading(false);
                console.log(err);
            });
        return () => {
            return (isMounted = false);
        };
    }, []);

    const addPoll = () => {
        props.history.push("/create-poll");
    };
    return (
        <div className="container">
            <div className="user">
                <div className="username">
                    Welcome, <span>{user.username}</span>
                </div>
            </div>
            <h1>Dashboard</h1>

            {loading ? (
                <div className="dashboard-loading">
                    <div className="loading-spinner-container">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            ) : null}
            <div className="heading">My Polls</div>
            <div className="polls">
                <div className="add-poll card-container" onClick={addPoll}>
                    <div className="fas fa-plus"></div>
                    <div className="text">New Poll</div>
                </div>

                {polls.map((poll, index) => (
                    <PollCard poll={poll} key={index} {...props} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
