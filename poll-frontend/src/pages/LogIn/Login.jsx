import React from "react";
import LoginForm from "../../components/LogInForm/LoginForm";

const Login = (props) => {
    return (
        <div>
            <LoginForm {...props} />
        </div>
    );
};

export default Login;
