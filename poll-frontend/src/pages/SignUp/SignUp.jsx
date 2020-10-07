import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "../LogIn/style.scss";
const SignUp = (props) => {
    return (
        <div className="container">
            <h1>SIGN UP</h1>
            <SignUpForm {...props} />
        </div>
    );
};

export default SignUp;
