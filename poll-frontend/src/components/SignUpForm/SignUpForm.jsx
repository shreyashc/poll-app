import React, { useState } from "react";
import axiosInstance from "../../client/apiClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import Error from "../LogInForm/Error";

const initialValues = {
    username: "",
    password1: "",
    password2: "",
};

const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password1: Yup.string().required("Required"),
    password2: Yup.string()
        .required("Required")
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <Error msg={formik.errors.username} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input
                        type="text"
                        name="password1"
                        id="password1"
                        value={formik.values.password1}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password1 && formik.errors.password1 ? (
                        <Error msg={formik.errors.password1} />
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="text"
                        name="password2"
                        id="password2"
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password2 && formik.errors.password2 ? (
                        <Error msg={formik.errors.password2} />
                    ) : null}
                </div>
                {error && <div>{error}</div>}
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default SignUpForm;
