import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../client/apiClient";
import Poll from "../../components/Poll/Poll";
import { AuthContext } from "../../contexts/AuthContext";
const Dashboard = () => {
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
            {polls.map((poll) => {
                return <Poll poll={poll} key={poll._id} />;
            })}
        </div>
    );
};

export default Dashboard;
