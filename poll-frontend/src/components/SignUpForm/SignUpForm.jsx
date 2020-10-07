import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../client/apiClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.scss";
const initialValues = {
    username: "",
    password1: "",
    password2: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("Required!"),
    password1: Yup.string().required("Required!"),
    password2: Yup.string()
        .required("Required!")
        .oneOf([Yup.ref("password1"), null], "Passwords don't match"),
});

const SignUpForm = (props) => {
    const [error, setError] = useState(null);
    const onSubmit = async (values) => {
        const { password1, username } = values;
        axiosInstance
            .post("auth/signup/", {
                username: username,
                password: password1,
            })
            .then((response) => {
                setError(null);
                console.log(response.data);
                props.history.push("/login");
            })
            .catch((error) => {
                setError(error.response.data.message);
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
                        <div className="error">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password1">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        name="password1"
                        id="password1"
                        placeholder="password"
                        value={formik.values.password1}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password1 && formik.errors.password1 ? (
                        <div className="error">{formik.errors.password1}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password2">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="confirm password"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password2 && formik.errors.password2 ? (
                        <div className="error">{formik.errors.password2}</div>
                    ) : null}
                </div>
                <div className="error">{error}</div>
                <input type="submit" value="Sign Up" id="submit" />
                <div className="info">
                    Have an account?<Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
