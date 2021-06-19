import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, useLocation } from "react-router";

NotLogin.propTypes = {};

const dynamicRedirect = (location) => {
  switch (location) {
    case "/products":
      return <Redirect to={{ pathname: "/products"}} />;
    case "/orders":
      return <Redirect to={{ pathname: "/orders" }} />;
    default:
      return <Redirect to={{ pathname: "/auth/login" }} />;
  }
};
function NotLogin({ children, ...rest }) {
  const token = localStorage.getItem("accessToken");
  const { exact, path } = rest;
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        token ? dynamicRedirect() : children
      }
    />
  );
}

export default NotLogin;
