import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../client/apiClient";
import PollCard from "../../components/PollCard/PollCard";
import Logout from "../../components/Logout/Logout";
import "./style.scss";

import { AuthContext } from "../../contexts/AuthContext";
const Dashboard = (props) => {
    const [polls, setPolls] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosInstance
            .get("polls/user/124")
            .then((response) => {
                setPolls(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addPoll = () => {
        props.history.push("/create-poll");
    };
    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="user">
                <div className="username">{user.username}</div>
                <Logout />
            </div>
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
