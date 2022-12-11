import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "rohit@nobelitsol.in",
    password: "12345",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });

  const { name, email, password, error, success, loading, didRedirect } =
    values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log("Data", data);
        if (data.token) {
          // let sessionToken = data.token;
          authenticate(data, () => {
            console.log("TOKEN ADDED");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performNevigate = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-right">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account created Successfully. Please
            <Link to="signin"> Login now. </Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-right">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Please Fill all fields.
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email: </label>
              <input
                type="text"
                value={email}
                className="form-control"
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password: </label>
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={handleChange("password")}
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="SignIn" description="Please Signin first">
      {loadingMessage()}
      {signInForm()}
      <p className="text-center">{JSON.stringify(values)}</p>
      {performNevigate()}
    </Base>
  );
};

export default Signin;
