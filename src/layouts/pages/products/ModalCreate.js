import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Button,
  Modal,
  Spin,
  notification,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
    const thumbUrlList = values.thumbnailUrl
    const listUrl = thumbUrlList.map((item) => item.thumbUrl);
    console.log(listUrl)
    const newValues = {
      ...values,
      price: Number.parseFloat(values.price),
      thumbnailUrl: listUrl,
    };
    setIsLoading(true);
    requester()
      .post("products", newValues)
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

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
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

          <Form.Item
            name="thumbnailUrl"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="image.jpg"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input category name",
              },
            ]}
          >
            <Select placeholder="Chọn loại sản phẩm" style={{ width: "100%" }}>
              {categories.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
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
