import React from "react";

const Poll = ({ poll }) => {
    return (
        <div>
            <div>{poll.question}</div>
            <div>{poll._id}</div>
            <div>{poll.active}</div>
            <div>{poll.createdAt}</div>
            <div>
                {poll.options.map((opt) => {
                    return (
                        <div key={Math.random * 10}>
                            <div>{opt.option}</div>
                            <div>{opt.votes}</div>
                            <div>
                                {opt.voters.map((voter) => {
                                    return (
                                        <div key={Math.random * 10}>
                                            {voter}
                                        </div>
                                    );
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
