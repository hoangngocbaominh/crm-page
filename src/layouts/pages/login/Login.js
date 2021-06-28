import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  notification,
  Spin,
} from "antd";
import "./login.css";
import { requester } from "../../../services/axios";

function Login(props) {
  const [isLoading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 6,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 6,
    },
  };
  const buttonLayout = {
    wrapperCol: {
      offset: 14,
      span: 10,
    },
  };
  const onFinish = (values) => {
    setLoading(true);
    requester()
      .post("auth/login", values)
      .then((res) => {
        const access_token = res.data.data.accessToken;
        if (!access_token) return;
        localStorage.setItem("accessToken", access_token);
        window.location.replace("/dashboard");
        notification["success"]({
          message: "Đăng nhập thành công",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        notification["error"]({
          message: "Sai mật khẩu hoặc tài khoản",
        });
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Spin spinning={isLoading}>
      <div className="container">
        <Typography.Title style={{ textAlign: "center", marginTop: "120px" }}>
          LOGIN
        </Typography.Title>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...buttonLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

export default Login;
