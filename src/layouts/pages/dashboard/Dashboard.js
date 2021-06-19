import React from "react";
import { useLocation } from "react-router";
// import PropTypes from "prop-types";
import TitleLocation from "../../../components/TitleLocation";
import CustomPage from "../../../Customs/CustomPage";
import { Card, Col, Row } from "antd";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";

// Dashboard.propTypes = {};

function Dashboard(props) {
  let location = useLocation();

  return (
    <>
      <Header />
      <Sidebar />
      <CustomPage>
        <TitleLocation location={location} />
        <div className="site-card-wrapper">
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Card title="Tổng doanh số" bordered={false}>
                <strong>1000</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Người dùng" bordered={false}>
                <strong>2545</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Doanh thu" bordered={false}>
                <strong>5005</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Số lượng nhập vào" bordered={false}>
                <strong>1254</strong>
              </Card>
            </Col>

            <Col span={6}>
              <Card title="Số lượng xuất ra" bordered={false}>
                <strong>1268</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Phản hồi" bordered={false}>
                356<strong>1022220</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Thu chi" bordered={false}>
                <strong>5569889</strong>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Khách hàng" bordered={false}>
                <strong>1022220</strong>
              </Card>
            </Col>
          </Row>
        </div>
      </CustomPage>
    </>
  );
}

export default Dashboard;
