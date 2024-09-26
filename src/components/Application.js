import React, { useState } from "react";
import Popup from "./Popup";
import { Formik } from "formik";
import * as Yup from "yup";

import "./Application.css";

const Application = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    rank: "",
    regulations: false,
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address (e.g., test@test.com)")
      .required("Email is required"),
    password: Yup.string()
      .min(2, "Password must be at least 2 characters long")
      .max(50, "Password can't be longer than 50 characters")
      .required("Password is required"),
    rank: Yup.string()
      .oneOf(
        [
          "junior developer",
          "mid/regular developer",
          "senior developer",
          "boss",
          "other",
        ],
        "Please select a valid rank"
      )
      .required("Rank selection is required"),
    regulations: Yup.boolean()
      .oneOf([true], "You must accept the regulations")
      .required("You must accept the regulations"),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    if (values.length !== 0) {
      setFormSubmitted(true);
      resetForm();
    }
  };

  return (
    <div>
      <h1 className="title-app">Validation Form</h1>
      {formSubmitted ? (
        <Popup setFormSubmitted={setFormSubmitted} />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="box-form" onSubmit={handleSubmit}>
              <input
                className="input-style"
                placeholder="Username"
                type="text"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.userName}
              />
              {errors.userName && touched.userName && (
                <div className="error-msg">{errors.userName}</div>
              )}

              <input
                className="input-style"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="error-msg">{errors.email}</div>
              )}

              <input
                className="input-style"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div className="error-msg">{errors.password}</div>
              )}

              <select
                className="select-style"
                name="rank"
                value={values.rank}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" disabled>
                  Select a rank
                </option>
                <option value="junior developer">Junior Developer</option>
                <option value="mid/regular developer">
                  Mid/Regular Developer
                </option>
                <option value="senior developer">Senior Developer</option>
                <option value="boss">Boss</option>
                <option value="other">Other</option>
              </select>
              {errors.rank && touched.rank && (
                <div className="error-msg">{errors.rank}</div>
              )}

              <label>
                <input
                  className="input-style"
                  type="checkbox"
                  value={values.regulations}
                  name="regulations"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.regulations}
                />{" "}
                Accept regulations
              </label>
              {errors.regulations && touched.regulations && (
                <div className="error-msg">{errors.regulations}</div>
              )}

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Application;
