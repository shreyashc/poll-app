import React from "react";
import CreatePollForm from "../../components/CreatePollForm/CreatePollForm";

const CreatePoll = (props) => {
   return (
      <div>
         <CreatePollForm {...props} />
      </div>
   );
};

export default CreatePoll;
