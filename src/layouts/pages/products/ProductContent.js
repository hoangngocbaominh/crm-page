import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Descriptions,
  Input,
  Form,
  Spin,
  Button,
  notification,
  Tag,
  Select,
} from "antd";
import { useLocation } from "react-router";
import { requester } from "../../../services/axios";
import "../products/products.css";
import moment from "moment";
import UploadImg from "../../../components/UploadImg";
import { ChromePicker } from "react-color";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import axios from 'axios';
const { Option } = Select;

function ProductContent(props) {
  const { getDescriptions } = props;
  let location = useLocation();
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailList, setThumbnailList] = useState([]);
  const [form] = Form.useForm();
  const locationPath = location.pathname;
  const splitString = locationPath.split("/");
  const productId = splitString[2];
  const statusRef = useRef(true);

  const [color, setColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [categories, setCategories] = useState([]);

  const getProductUpdated = () =>
    requester()
      .get(`products/${productId}`)
      .then((res) => {
        const result = res.data;
        const findName = categories.find((c) => result.categoryId === c.id);
        const thumbnailUrlList = res.data.thumbnailUrl;
        getDescriptions(res.data);
        setColor(res.data.color);
        setThumbnailList(thumbnailUrlList);
        const newValue = {
          ...result,
          categoryName: findName.name,
        };
        setProductDetail(newValue);
        form.setFieldsValue(newValue);

        setIsLoading(false);
      });

  useEffect(() => {
    setIsLoading(true);
    if (!categories.length) return;
    getProductUpdated().catch((error) => {
      console.log("error", error);
    });
  }, [categories]);

  useEffect(() => {
    requester()
      .get("categories")
      .then((response) => {
        const categoriesList = response.data;
        setCategories(categoriesList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   form.setFieldsValue(productDetail);
  // }, [form, productDetail]);

  const timeCreateAt = moment(productDetail.createAt).format("L, h:mm:ss a  ");
  const timeUpdateAt = moment(productDetail.updateAt).format("L, h:mm:ss a  ");

  const editProduct = (values) => {
    setIsLoading(true);
    const newValues = {
      ...productDetail,
      name: values.name,
      price: values.price,
      updateAt: Date.now(),
    };
    requester()
      .update(`products/${productId}`, newValues)
      .then(() => {
        getProductUpdated();
        notification["success"]({
          message: "Chỉnh sửa sản phẩm thành công",
        });
      })
      .catch((error) => {
        console.log("error", error);
        notification["error"]({
          message: "Chỉnh sửa sản phẩm thất bại",
        });
      });
  };
  const valueStatus = (value) => {
    statusRef.current = value;
    setProductDetail({ ...productDetail, status: statusRef.current });
  };

  const updateThumbnailList = (values) => {
    console.log(values)
    axios.post('http://localhost:8000/upload', values[0], {
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res)=>{
        console.log(res)
    })
    // setIsLoading(true);
    // const newThumbnailList = {
    //   ...productDetail,
    //   thumbnailUrl: values,
    // };
    // requester()
    //   .update(`products/${productId}`, newThumbnailList)
    //   .then(() => {
    //     // getProductUpdated();
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     notification["error"]({
    //       message: "Tải hình ảnh thất bại",
    //     });
    //   });
  };
  const colorHex = (value) => {
    console.log(value.hex);
    const newValues = { ...productDetail, color: value.hex };
    setProductDetail(newValues);
    setColor(value.hex);
  };
  return (
    <Spin spinning={isLoading}>
      <Row gutter={[12, 12]}>
        <Col span={6}>
          <Row gutter={[6, 6]} style={{ marginTop: "7px" }}>
            <Col span={24}>
              <UploadImg
                thumbnailList={thumbnailList}
                updateThumbnailList={updateThumbnailList}
              />
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <Form
            initialValues={{
              name: productDetail.name,
              price: productDetail.price,
              status: productDetail.status,
              createAt: timeCreateAt,
              updateAt: timeUpdateAt,
              description: productDetail.description,
            }}
            form={form}
            onFinish={editProduct}
          >
            <Descriptions bordered layout="horizontal" column={1}>
              <Descriptions.Item label="Tên sản phẩm">
                <Form.Item name="name">
                  <Input />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Giá sản phẩm">
                <Form.Item name="price">
                  <Input />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Màu sản phẩm">
                <Form.Item name="color">
                  <Row>
                    <Col span={22}>
                      <Row>
                        <Col span={14}>
                          <Tag
                            style={{
                              height: "30px",
                              paddingTop: "3px",
                              backgroundColor: productDetail.color,
                            }}
                          >
                            {productDetail.color}
                          </Tag>
                        </Col>
                        <Col span={10}>
                          {showColorPicker && (
                            <ChromePicker color={color} onChange={colorHex} />
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={2}>
                      <Button
                        onClick={() =>
                          setShowColorPicker(
                            (showColorPicker) => !showColorPicker
                          )
                        }
                      >
                        {showColorPicker ? <CheckOutlined /> : <EditOutlined />}
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Descriptions.Item>

              <Descriptions.Item label="Trạng thái">
                <Form.Item name="status">
                  <Row>
                    <Col span={19}>
                      {productDetail.status === true ? (
                        <Tag
                          style={{ height: "30px", paddingTop: "3px" }}
                          color="blue"
                        >
                          Hoạt động
                        </Tag>
                      ) : (
                        <Tag
                          style={{ height: "30px", paddingTop: "3px" }}
                          color="red"
                        >
                          Tạm ngưng
                        </Tag>
                      )}
                    </Col>
                    <Col span={5}>
                      <Select
                        showSearch
                        style={{ width: 116 }}
                        placeholder="Chỉnh sửa"
                        onChange={valueStatus}
                      >
                        <Option value={true}>Hoạt động</Option>
                        <Option value={false}>Tạm ngưng</Option>
                      </Select>
                    </Col>
                  </Row>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Phân loại">
                <Form.Item name="description">
                  <Tag
                    style={{
                      height: "30px",
                      paddingTop: "3px",
                    }}
                    color="blue"
                  >
                    {productDetail.categoryName}
                  </Tag>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                <Form.Item name="createAt">{timeCreateAt}</Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                <Form.Item name="updateAt">{timeUpdateAt}</Form.Item>
              </Descriptions.Item>
            </Descriptions>
            <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
}

export default ProductContent;
