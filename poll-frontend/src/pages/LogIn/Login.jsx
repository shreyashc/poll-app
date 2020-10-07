import React from "react";
import LoginForm from "../../components/LogInForm/LoginForm";
import "./style.scss";
const Login = (props) => {
    return (
        <div className="container">
            <h1>LOGIN</h1>
            <LoginForm {...props} />
        </div>
    );
};

export default Login;
