import React from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import CustomPage from "../../../Customs/CustomPage";
import TitleLocation from "../../../components/TitleLocation";
import Title from "antd/lib/typography/Title";
import { useLocation } from "react-router";
import TabsPage from "../../../components/TabsPage";
ProductDetail.propTypes = {};

function ProductDetail(props) {
  let location = useLocation();
  return (
    <>
      <Header />
      <Sidebar />
      <CustomPage>
        <TitleLocation location={location} />
        <div className="container">
          <Title level={4}>Chi tiết sản phẩm</Title>
          <TabsPage />
        </div>
      </CustomPage>
    </>
  );
}

export default ProductDetail;
