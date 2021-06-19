import React, { useState } from "react";
import { Button, Col, PageHeader, Row, Typography } from "antd";
import "../styles/style.css";
import { DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
function Header(props) {
  const history = useHistory()
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    // sessionStorage.removeItem("searchTerm");
    // sessionStorage.removeItem("rangePrice");
    history.push("/auth/login");
    window.location.reload();
  }
  const showSignOut = () =>{
    document.getElementById("toggle-button").classList.toggle("toggle");
  }
  return (
    <PageHeader className="site-page-header header" title="ANTD ADMIN">
      <div
        style={{
          position: "absolute",
          top: "22px",
          right: "9px",
          width: "13%",
        }}
      >
        <Row>
          <Col span={20}>
            <Typography.Title level={5} style={{cursor:"pointer"}}>admin@gamil.com</Typography.Title>
          </Col>
          <Col span={2} onClick={showSignOut}>
            <DownOutlined style={{ position: "absolute", top: "6px", cursor: "pointer" }} />
          </Col>
          <Col span={24} >
            <Button style={{width:"100%", right:"20px", display:"none"}} id="toggle-button" onClick= {handleSignOut}>Sign Out</Button>
          </Col>
        </Row>
      </div>
    </PageHeader>
  );
}

export default Header;
