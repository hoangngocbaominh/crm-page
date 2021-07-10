import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { requester } from "../services/axios";
import ModalCreate from "../layouts/pages/products/ModalCreate";
import Search from "./Search";
import RangePriceSearching from "./RangePriceSearching";
import queryString from "query-string";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import SwitchStatusCustom from "../layouts/pages/products/SwitchStatusCustom";
function TableList(props) {
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [categories, setCategories] = useState([]);
  const pageNumberRef = useRef(0);
  const initialFilter = queryString.parse(window.location.search);

  const [filter, setFilter] = useState({
    _page: initialFilter._page || 1,
    _limit: initialFilter._limit || 5,
    name_like: initialFilter.name_like,
    price_lte: initialFilter.price_lte,
    price_gte: initialFilter.price_gte,
    status: initialFilter.status,
  });

  useEffect(() => {
    const query = queryString.stringify(filter);
    window.history.replaceState(
      null,
      null,
      window.location.origin + window.location.pathname + "?" + query
    );
    console.log(queryString.parse(window.location.search));
    setLoading(true);
    if (!categories.length) return;
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
        const paginationTotalRows = res.data.pagination._totalRows;
        const paginationPageNumber = res.data.pagination._page;
        pageNumberRef.current = paginationPageNumber;
        setTotalRows(paginationTotalRows);
        setProductList(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter, categories]);

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

  const showModalCreate = () => {
    console.log("true");
    setVisible(true);
  };

  const hideModalCreate = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      with: "20%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Giá",
      key: "price",
      width: "10%",
      align: "center",
      render: (record) => <Tag color="green"> {record.price} $ </Tag>,
    },
    {
      title: "Màu",
      key: "color",
      width: "10%",
      align: "center",
      render: (record) => (
        <Tag
          style={{
            height: "30px",
            width: "60px",
            paddingTop: "3px",
            backgroundColor: record.color,
          }}
        >
          {record.color}
        </Tag>
      ),
    },
    {
      title: "Loại sản phẩm",
      key: "categoryName",
      width: "13%",
      align: "center",
      render: (record) => <Tag>{record.categoryName}</Tag>,
    },

    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: "20%",

      render: (record) => {
        return productList.length >= 1 ? (
          <Space size="middle">
            <Tooltip title="Chi tiết sản phẩm" color="blue">
              <Link to={`/products/${record.id}`}>
                <EyeOutlined style={{ fontSize: "25px", color: "#1890ff" }} />
              </Link>
            </Tooltip>

            <SwitchStatusCustom record={record} />
          </Space>
        ) : null;
      },
    },
  ];

  const handleDeleteProductItem = (record) => {
    setLoading(true);
    requester()
      .destroy(`products/${record.id}`)
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
            setProductList(result);
            setLoading(false);
          });
      });
  };

  const getPageNumber = (value, pageSize) => {
    setFilter({
      ...filter,
      _page: value,
      _limit: pageSize,
    });
  };

  const getNewProductListCreated = (newProductList) => {
    setProductList(newProductList);
    setVisible(false);
  };

  const handleSearchProduct = (searchTerm) => {
    setFilter({
      ...filter,
      _page: 1,
      name_like: searchTerm,
    });
  };
  const handleSearchRangePrice = (rangePrice) => {
    console.log(rangePrice);
    // const newDate = rangePrice.updateAt.getTime();
    // const newDate2 = rangePrice.createAt.getTime();

    setFilter({
      ...filter,
      _page: 1,
      price_lte: rangePrice.max,
      price_gte: rangePrice.min,
      status: rangePrice.status,
      // createAt_gte: newDate,
      // createAt_lte: newDate2,
    });
  };

  const pagination = () => (
    <Pagination
      style={{
        textAlign: "end",
        marginTop: "30px",
        marginRight: "35px",
        marginBottom: "10px",
      }}
      onChange={getPageNumber}
      pageSize={initialFilter._limit || 5}
      total={totalRows}
      current={pageNumberRef.current}
      defaultPageSize={10}
      pageSizeOptions={[5, 10, 15, 20, 30, , 40, , 50, 100]}
    />
  );
  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            style={{
              textAlign: "end",
              float: "right",
              marginBottom: "11px",
            }}
            type="primary"
            onClick={showModalCreate}
          >
            <PlusOutlined /> Tạo mới
          </Button>
        </Col>
        <Col span={4}>
          <Search handleSearchProduct={handleSearchProduct} filter={filter} />
        </Col>
        <Col span={20}>
          <RangePriceSearching
            handleSearchRangePrice={handleSearchRangePrice}
            filter={filter}
          />
        </Col>
      </Row>
      {pagination()}
      <Typography.Title
        level={5}
        style={{ float: "right", marginRight: "44px", marginBottom: "15px" }}
      >
        Tổng số sản phẩm: {totalRows}
      </Typography.Title>
      <Table
        dataSource={productList}
        columns={columns}
        pagination={false}
        bordered
      />
      {pagination()}

      <ModalCreate
        visible={visible}
        onCancel={hideModalCreate}
        requestNewProductListCreated={getNewProductListCreated}
        filter={filter}
        categories={categories}
      />
    </Spin>
  );
}

export default TableList;
