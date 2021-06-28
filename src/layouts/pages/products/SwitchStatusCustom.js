import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Spin, Tooltip } from "antd";
import { requester } from "../../../services/axios";
SwitchStatusCustom.propTypes = {};

function SwitchStatusCustom(props) {
  const { record } = props;
  const [statusProduct, setStatusProduct] = useState(record.status);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setStatusProduct(record.status);
  }, [record]);

  const productStatus = (event, record) => {
    setLoading(true);
    const value = { ...record, status: event };
    requester()
      .update(`products/${record.id}`, value)
      .then((res) => {
        console.log(res.data);
        setStatusProduct(value.status);
        setLoading(false);
      });
  };
  return (
    <Spin spinning={loading}>
      <Tooltip title="Trạng thái sản phẩm" color="blue">
        <Switch
          checkedChildren="Hiện"
          unCheckedChildren="Ẩn"
          checked={statusProduct}
          style={{ marginBottom: "2.5px" }}
          onClick={(event) => productStatus(event, record)}
        />
      </Tooltip>
    </Spin>
  );
}

export default SwitchStatusCustom;
