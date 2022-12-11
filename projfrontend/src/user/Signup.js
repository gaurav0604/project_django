import React, { useState } from "react";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    error: "",
    success: false,
  });
  const { name, email, password, phone, gender, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone, gender })
      .then((data) => {
        console.log("DATA", data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.log(e));
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

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name: </label>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={handleChange("name")}
              />
            </div>
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
            <div className="form-group">
              <label className="text-light">Phone: </label>
              <input
                type="number"
                value={phone}
                className="form-control"
                onChange={handleChange("phone")}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Gender: </label>
              <input
                type="text"
                value={gender}
                className="form-control"
                onChange={handleChange("gender")}
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
    <Base title="Sign up Page" description="A Sign up Navkar Users">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
