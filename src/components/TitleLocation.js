import React from "react";
import PropTypes from "prop-types";
import { Space, Typography } from "antd";
import { AntCloudOutlined } from "@ant-design/icons";

TitleLocation.propTypes = {
  location: PropTypes.string,
};
function TitleLocation(props) {
  const { location } = props;
  return (
    <Space align="center" style={{ marginBottom: "20px" }}>
      <AntCloudOutlined />
      <Typography.Title level={5} style={{ marginBottom: "1px" }}>
        Admin {location.pathname}
      </Typography.Title>
    </Space>
  );
}

export default TitleLocation;
