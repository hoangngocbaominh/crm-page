import React from "react";
// import PropTypes from "prop-types";
import TableList from "../../../components/TableList";
import CustomPage from "../../../Customs/CustomPage";
import { useLocation } from "react-router";
import {Typography } from "antd";
import TitleLocation from "../../../components/TitleLocation";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
const { Title } = Typography;
// Products.propTypes = {};

function Products(props) {
  console.log("props", props)
  let location = useLocation();

  return (
    <>
      <Header />
        <Sidebar />
      <CustomPage>
        <TitleLocation location={location}/>
        <div className="container">
          <Title level={4}>Danh sách sản phẩm</Title>
          <TableList />
        </div>
      </CustomPage>
    </>
  );
}

export default Products;
