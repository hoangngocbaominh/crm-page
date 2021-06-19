import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { requester } from "../services/axios";
import ModalCreate from "../layouts/pages/products/ModalCreate";
import ModalEdit from "../layouts/pages/products/ModalEdit";
import Search from "./Search";
import RangePriceSearching from "./RangePriceSearching";
import queryString from "query-string";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
function TableList(props) {
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editProductItem, seteditProductItem] = useState({});
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
  const showModalEdit = (recordItemProduct) => {
    setVisibleEdit(true);
    seteditProductItem({
      ...recordItemProduct,
    });
  };
  const hideModalCreate = () => {
    setVisible(false);
  };
  const hideModalEdit = () => {
    setVisibleEdit(false);
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
      render: (record) => <Tag color="green"> {record.price} </Tag>,
    },
    {
      title: "Màu",
      key: "color",
      width: "10%",
      align: "center",
      render: (record) => <Tag>{record.color}</Tag>,
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

      render: (record) =>
        productList.length >= 1 ? (
          <Space size="middle">
            <Button
              style={{ color: "#1890ff", borderColor: "#1890ff" }}
              onClick={() => showModalEdit(record)}
            >
              <EditOutlined />
              Edit
            </Button>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteProductItem(record)}
            >
              <Button danger>
                <DeleteOutlined />
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
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
            const result = res.data.data;
            setProductList(result);
            setLoading(false);
          });
      });
  };

  const getPageNumber = (value, pageSize) => {
    console.log("page", pageSize);
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
  const handleEditProduct = (productEdited) => {
    setProductList(productEdited);
    setVisibleEdit(false);
  };
  const handleSearchProduct = (searchTerm) => {
    setFilter({
      ...filter,
      _page: 1,
      name_like: searchTerm,
    });
  };
  const handleSearchRangePrice = (rangePrice) => {
    const splitString = rangePrice.split(" ");
    const min = parseInt(splitString[0]);
    const max = parseInt(splitString[1]);
    console.log(min, max);
    setFilter({
      ...filter,
      _page: 1,
      price_lte: max,
      price_gte: min,
    });
  };
  // const handleCategoriesProduct = (value) => {
  //   console.log(value)

  // }
  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Search handleSearchProduct={handleSearchProduct} filter={filter} />
        </Col>
        <Col span={12}>
          <RangePriceSearching
            handleSearchRangePrice={handleSearchRangePrice}
            filter={filter}
          />
        </Col>
        {/* <Col span={4} style={{paddingRight:"33px"}}>
          <CategoriesSort categories={categories} handleCategoriesProduct={handleCategoriesProduct}/>
        </Col> */}
        <Col span={6}>
          <Button
            style={{
              textAlign: "end",
              float: "right",
              marginRight: "17px",
              marginBottom: "11px",
            }}
            type="primary"
            onClick={showModalCreate}
          >
            <PlusOutlined /> Create
          </Button>
        </Col>
      </Row>

      <Table dataSource={productList} columns={columns} pagination={false} />

      <Pagination
        style={{ textAlign: "end", marginTop: "25px", marginRight: "43px" }}
        onChange={getPageNumber}
        pageSize={initialFilter._limit || 5}
        total={totalRows}
        current={pageNumberRef.current}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 15, 20, 30, , 40, , 50, 100]}
      />
      <ModalCreate
        visible={visible}
        onCancel={hideModalCreate}
        requestNewProductListCreated={getNewProductListCreated}
        filter={filter}
        categories={categories}
      />
      <ModalEdit
        filter={filter}
        visibleEdit={visibleEdit}
        onCancel={hideModalEdit}
        editProductItem={editProductItem}
        handleEditProduct={handleEditProduct}
      />
    </Spin>
  );
}

export default TableList;
