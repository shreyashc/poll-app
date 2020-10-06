import React from "react";

const Poll = ({ poll }) => {
    return (
        <div key={poll._id}>
            <div>
                {poll.question} -{poll._id}- {poll.active}-{poll.createdAt}
            </div>
            <div>
                {poll.options.map((opt, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {opt.option}-{opt.votes}
                            </div>

                            <div>
                                {opt.voters.map((voter, index) => {
                                    return <div key={index}>{voter}</div>;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Poll;
