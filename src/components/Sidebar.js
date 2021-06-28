import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "../styles/style.css";

function Sidebar(props) {
  let location = useLocation();
  console.log(location.pathname);
  const locationLink = () => {
    switch (true) {
      case location.pathname.includes("/dashboard"):
        return "1";
      case location.pathname.includes("/products"):
        return "2";
      case location.pathname.includes("/orders"):
        return "3";

      default:
        break;
    }
  };

  return (
    <Menu
      defaultSelectedKeys={[locationLink()]}
      defaultOpenKeys={["sub1"]}
      mode="horizontal"
    >
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ApartmentOutlined />}>
        <Link to="/products">Products</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<AppstoreOutlined />}>
        <Link to="/orders">Orders</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Sidebar;
