import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Input, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SearchDate from "./SearchDate";
const { Option } = Select;
RangePriceSearching.propTypes = {
  handleSearchRangePrice: PropTypes.func,
};
RangePriceSearching.propDefault = {
  handleSearchRangePrice: null,
};
function RangePriceSearching(props) {
  const [form] = Form.useForm();
  const { handleSearchRangePrice, filter } = props;
  const statusRef = useRef();
  // const editedDateRef = useRef();
  const getValueStatus = (valueStatus) => {
    statusRef.current = valueStatus;
  };
  const handleRangePrice = (value) => {
    console.log(value);
    // const newDate = editedDateRef.current;
    // console.log(newDate);
    if (value.min === "") {
      value.min = null;
    }
    if (value.max === "") {
      value.max = null;
    }
    if (statusRef.current === undefined) return;

    if (!handleSearchRangePrice) return;
    handleSearchRangePrice({
      ...value,
      status: statusRef.current,
      // createAt: newDate.update,
      // updateAt: newDate.create,
    });
  };

  // const getEditedDate = (editedDate) => {
  //   editedDateRef.current = editedDate;
  // };
  return (
    <>
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={handleRangePrice}
        initialValues={
          filter.price_lte >= 0 && filter.price_gte >= 0
            ? {
                min: filter.price_gte,
                max: filter.price_lte,
              }
            : { min: null, max: null }
        }
        form={form}
      >
        <Form.Item name="min">
          <Input placeholder="Nhập giá tối thiểu" />
        </Form.Item>
        <Form.Item name="max">
          <Input placeholder="Nhập giá tối đa" />
        </Form.Item>
        <Form.Item name="status">
          <Select
            showSearch
            style={{ width: 180 }}
            placeholder="Chọn trạng thái"
            onChange={getValueStatus}
            defaultValue={
             filter.status && filter.status !== undefined && filter.status !== null
                ? filter.status === "true"
                  ? "Hoạt động"
                  : "Tạm ngưng"
                : "Tất cả trạng thái"
            }
          >
            <Option>Tất cả</Option>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Tạm ngưng</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item>
          <SearchDate getEditedDate={getEditedDate} />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default RangePriceSearching;
