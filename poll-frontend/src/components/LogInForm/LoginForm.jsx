import React, { useState, useContext } from "react";
import axiosInstance from "../../client/apiClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import Error from "./Error";
import { AuthContext } from "../../contexts/AuthContext";
import "../SignUpForm/style.scss";
import { Link } from "react-router-dom";
const initialValues = {
    username: "",
    password: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
});

const LoginForm = (props) => {
    const [error, setError] = useState(null);
    const { dispatch } = useContext(AuthContext);
    const onSubmit = async (values) => {
        axiosInstance
            .post("auth/login/", values)
            .then((response) => {
                setError(null);
                const { id, username } = response.data;
                dispatch({
                    type: "LOGGED_IN",
                    payload: { username, userId: id },
                });
                props.history.replace("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                setError("Invalid Username/password");
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <Error msg={formik.errors.password} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Error msg={formik.errors.password} />
                    ) : null}
                </div>
                {error && <div className="error">{error}</div>}
                <input type="submit" value="Login" id="submit" />
                <div className="info">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
