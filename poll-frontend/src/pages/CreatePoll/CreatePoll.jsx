import React from "react";
import CreatePollForm from "../../components/CreatePollForm/CreatePollForm";

const CreatePoll = (props) => {
    return (
        <div className="container">
            <h1>Create New Poll</h1>
            <CreatePollForm {...props} />
        </div>
    );
};

export default CreatePoll;
