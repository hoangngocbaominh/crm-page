import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Modal, notification, Spin } from "antd";
import { requester } from "../../../services/axios";

ModalEdit.propTypes = {
  handleEditProduct: PropTypes.func,
};
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 21,
  },
};

function ModalEdit(props) {
  const { visibleEdit, onCancel, editProductItem, filter, handleEditProduct, categories } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const editProduct = (values) => {
    console.log(values);
    const newValues = {
      ...values,
      price: Number.parseFloat(values.price),
    };
    setIsLoading(true);
    requester()
      .update(`products/${editProductItem.id}`, newValues)
      .then(() => {
        requester()
          .get("products", filter)
          .then((res) => {
            let result = res.data.data;
            result = result.map((item) => {
              const findName = categories.find((c) => item.categoryId === c.id);
              return {
                ...item,
                categoryName: findName.name,
              };
            });
            if (!handleEditProduct) return;
            handleEditProduct(result);
            setIsLoading(false);
            notification["success"]({
              message: `Chỉnh sửa sản phẩm có id: "${editProductItem.id}" thành công`,
            });
          });
      });
  };
  useEffect(() => {
    form.setFieldsValue(editProductItem);
  }, [form, editProductItem]);
  return (
    <Modal
      visible={visibleEdit}
      title="Edit product"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={null}
    >
      <Spin spinning={isLoading}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            name: editProductItem.name,
            price: editProductItem.price,
            color: editProductItem.color,
          }}
          onFinish={editProduct}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
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
                message: "Please input color",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} style={{ textAlign: "end" }}>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ModalEdit;
