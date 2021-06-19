import React from "react";
import { useLocation } from "react-router";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
// import PropTypes from "prop-types";

import TitleLocation from "../../../components/TitleLocation";
import CustomPage from "../../../Customs/CustomPage";

// Orders.propTypes = {};

function Orders(props) {
  let location = useLocation();

  return (
    <>
      <Header />
      <Sidebar />
      <CustomPage>
        <TitleLocation location={location} />

        <h1 style={{ textAlign: "center" }}>ORDERS</h1>
      </CustomPage>
    </>
  );
}

export default Orders;
