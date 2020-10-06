import React from "react";
import { Form, Formik, ErrorMessage, FieldArray, Field } from "formik";
import * as Yup from "yup";
import Error from "./Error";
import axiosInstance from "../../client/apiClient";
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
   console.log(props);
   const onSubmit = (values) => {
      axiosInstance
         .post("polls/", values)
         .then((response) => {
            props.history.replace("/dashboard");
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <Formik
         initialValues={initialValues}
         onSubmit={onSubmit}
         validationSchema={validationSchema}
      >
         <Form>
            <div className="form-control">
               <label htmlFor="question">Question:</label>
               <Field type="text" id="question" name="question" />
               <ErrorMessage name="question" component={Error} />
            </div>
            <div className="form-control">
               <label htmlFor="options">Options</label>
               <ErrorMessage name="options" component={Error} />
               <FieldArray name="options" id="options">
                  {(optionProps) => {
                     const { push, remove, form } = optionProps;
                     const { values } = form;
                     const { options } = values;
                     return (
                        <div>
                           {options.map((opt, index) => (
                              <div key={index}>
                                 <Field name={`options.[${index}].option`} />
                                 <button
                                    type="button"
                                    onClick={() => {
                                       remove(index);
                                    }}
                                 >
                                    remove
                                 </button>
                              </div>
                           ))}
                           <button
                              type="button"
                              onClick={() => {
                                 push("");
                              }}
                           >
                              add
                           </button>
                        </div>
                     );
                  }}
               </FieldArray>
            </div>
            <button type="submit">Submit</button>
         </Form>
      </Formik>
   );
};

export default CreatePollForm;
