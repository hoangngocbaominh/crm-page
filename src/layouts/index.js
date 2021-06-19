import React from "react";
import PropTypes from "prop-types";
import { Route, Router, Switch } from "react-router";
import { Col, Row } from "antd";
import Sidebar from "../components/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";

function Layout(props) {
  return (
    <>
      <Router>
        <Sidebar />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </Router>
    </>
  );
}

export default Layout;
