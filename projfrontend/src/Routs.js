import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRouts from "./auth/helper/PrivateRouts";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";

const Routs = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route element={<PrivateRouts />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route element={<PrivateRouts />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default Routs;
