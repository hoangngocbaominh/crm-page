import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductContent from "../layouts/pages/products/ProductContent";
import ProductDescriptions from "../layouts/pages/products/ProductDescriptions";
import { Tabs } from "antd";
import { requester } from "../services/axios";
const { TabPane } = Tabs;
Tabs.propTypes = {};

function TabsPage(props) {
  const [descriptions, setDescriptions] = useState({});

  

  const callback = (key) => {
    console.log(key);
  };
  const getDescriptions = (values) => {
    setDescriptions(values);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Thông tin cơ bản" key="1">
        <ProductContent getDescriptions={getDescriptions} />
      </TabPane>
      <TabPane tab="Nội dung mô tả" key="2">
        <ProductDescriptions descriptions={descriptions}/>
      </TabPane>
    </Tabs>
  );
}

export default TabsPage;
