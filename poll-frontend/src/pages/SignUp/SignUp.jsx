import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignUp = (props) => {
    return (
        <div>
            <SignUpForm {...props} />
        </div>
    );
};

export default SignUp;
