import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { isAuthenticated } from "./index";

const PrivateRouts = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin"></Navigate>;
};

export default PrivateRouts;
