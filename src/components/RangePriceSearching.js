import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

RangePriceSearching.propTypes = {
  handleSearchRangePrice: PropTypes.func,
};
RangePriceSearching.propDefault = {
  handleSearchRangePrice: null,
};
const { Option } = Select;
function RangePriceSearching(props) {
  const [rangePrice, setRangePrice] = useState("");
  const { handleSearchRangePrice, filter } = props;
  // useEffect(() => {
  //   // if (!localStorage.getItem("rangePrice")) return;
  //   // handleSearchRangePrice(localStorage.getItem("rangePrice"));
  //   setTimeout(() => {
  //     if (!sessionStorage.getItem("rangePrice")) return;
  //     handleSearchRangePrice(sessionStorage.getItem("rangePrice"));
  //   }, 600);
  //   return clearTimeout();
  // }, []);
  const searchRangePrice = (value) => {
    console.log(value);
    setRangePrice(value);
  };
  const handleRangePrice = () => {
    if(!rangePrice) return;
    if (!handleSearchRangePrice) return;
    handleSearchRangePrice(rangePrice);
    // sessionStorage.setItem("rangePrice", rangePrice);
  };
  return (
    <Input.Group>
      <Select
        defaultValue= {filter.price_lte>=0 && filter.price_gte>=0 ? `${filter.price_gte}-${filter.price_lte}` :  
             "Chọn khoảng giá"}
        onChange={(e) => searchRangePrice(e)}
        style={{width:"150px"}}
      >
        <Option value="0 10000">Mặc định</Option>
        <Option value="0 100">0-100</Option>
        <Option value="100 200">100-200</Option>
        <Option value="200 300">200-300</Option>
        <Option value="300 400">300-400</Option>
        <Option value="400 1000">400-1000</Option>
        {/* <Option value="400">400 Trở lên </Option> */}
      </Select>
      <Button onClick={handleRangePrice}>
        <SearchOutlined />
      </Button>
    </Input.Group>
  );
}

export default RangePriceSearching;
