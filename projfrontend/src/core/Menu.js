import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = () => {
  const history = useLocation();

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-items">
          <Link
            style={currentTab(history.pathname, "/")}
            className="nav-link"
            to="/"
          >
            Home
          </Link>
        </li>

        {isAuthenticated() && (
          <Fragment>
            <li className="nav-items">
              <Link
                style={currentTab(history.pathname, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>

            <li className="nav-items">
              <Link
                style={currentTab(history.pathname, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-items">
              <span
                onClick={() => {
                  signout(() => {
                    history.pathname = "/";
                  });
                }}
                className="nav-link text-danger"
              >
                Signout
              </span>
            </li>
          </Fragment>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-items">
              <Link
                style={currentTab(history.pathname, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-items">
              <Link
                style={currentTab(history.pathname, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Login
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default Menu;
