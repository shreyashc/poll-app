import React, { useState } from "react";
import { Form, Formik, ErrorMessage, FieldArray, Field } from "formik";
import * as Yup from "yup";
import Error from "./Error";
import axiosInstance from "../../client/apiClient";
import "./style.scss";
const initialValues = {
    question: "",
    options: [
        {
            option: "",
        },
    ],
};
const validationSchema = Yup.object({
    question: Yup.string().required("Required"),
    options: Yup.array()
        .of(
            Yup.object({
                option: Yup.string().required("options can't be empty"),
            })
        )
        .min(1, "atleast one option is required."),
});

const CreatePollForm = (props) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        setLoading(true);
        axiosInstance
            .post("polls/", values)
            .then((response) => {
                setLoading(false);
                props.history.replace("/dashboard");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form className="add-form">
                <div className="form-control">
                    <label htmlFor="question">Question:</label>
                    <Field type="text" id="question" name="question" />
                    <ErrorMessage name="question" component={Error} />
                </div>
                <div className="form-control">
                    <label htmlFor="options">Options:</label>

                    <FieldArray name="options" id="options">
                        {(optionProps) => {
                            const { push, remove, form } = optionProps;
                            const { values } = form;
                            const { options } = values;
                            return (
                                <div className="options-array">
                                    {options.map((opt, index) => (
                                        <div
                                            key={index}
                                            className="option-container"
                                        >
                                            <Field
                                                type="text"
                                                name={`options.[${index}].option`}
                                                placeholder={`option ${
                                                    index + 1
                                                }`}
                                            />
                                            <button
                                                id="remove"
                                                type="button"
                                                onClick={() => {
                                                    remove(index);
                                                }}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <ErrorMessage
                                        name="options"
                                        component={Error}
                                    />
                                    <div className="add">
                                        <button
                                            id="add-btn"
                                            type="button"
                                            onClick={() => {
                                                push("");
                                            }}
                                        >
                                            <i className="fas fa-plus"></i>
                                            &nbsp; option
                                        </button>
                                    </div>
                                </div>
                            );
                        }}
                    </FieldArray>
                </div>
                {loading ? (
                    <div className="loading-spinner-container">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                ) : null}
                <button type="submit" id="submit" disabled={loading}>
                    {loading ? "Please Wait" : "Create"}
                </button>
            </Form>
        </Formik>
    );
};

export default CreatePollForm;
