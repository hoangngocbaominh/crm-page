import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Modal, Spin, notification, Select } from "antd";
import { requester } from "../../../services/axios";
const { Option } = Select;
ModalCreate.propTypes = {
  onCancel: PropTypes.func,
};
ModalCreate.propDefault = {
  onCancel: null,
};
function ModalCreate(props) {
  const {
    visible,
    onCancel,
    filter,
    requestNewProductListCreated,
    categories,
  } = props;
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 3,
      span: 21,
    },
  };
  const [isLoading, setIsLoading] = useState(false);

  const getValueCreated = (values) => {
    console.log(values);
    setIsLoading(true);
    requester()
      .post("products", values)
      .then(() => {
        requester()
          .get("products", filter)
          .then((res) => {
            const result = res.data.data;
            console.log(result);
            if (!requestNewProductListCreated) return;
            requestNewProductListCreated(result);
            setIsLoading(false);

            notification["success"]({
              message: "Tạo sản phẩm thành công",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new products"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={null}
    >
      <Spin spinning={isLoading}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={getValueCreated}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Please input color",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Category"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input category name",
              },
            ]}
          >
            <Select placeholder="Chọn loại sản phẩm" style={{ width: "100%" }}>
              {categories.map((item) => {
                return <Option value={item.name}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item> */}
          <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ModalCreate;
