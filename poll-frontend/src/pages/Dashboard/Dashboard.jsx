import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../client/apiClient";
import PollCard from "../../components/PollCard/PollCard";

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
    return (
        <div>
            {user.username}
            {user.userId}
            {polls.map((poll, index) => (
                <PollCard poll={poll} key={index} {...props} />
            ))}
        </div>
    );
};

export default Dashboard;
