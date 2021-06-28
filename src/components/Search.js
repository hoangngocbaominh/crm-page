import React, {useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

Search.propTypes = {
  handleSearchProduct: PropTypes.func,
};
Search.propsDefault = {
  handleSearchProduct: null,
};

function Search(props) {
  const { handleSearchProduct, filter } = props;
  const valueCurentRef = useRef();
  const searchProduct = (e) => {
    const value = e.target.value;
    if (valueCurentRef.current) {
      clearTimeout(valueCurentRef.current);
    }
    valueCurentRef.current = setTimeout(() => {
      if (!handleSearchProduct) return;
      handleSearchProduct(value);
    }, 300);
  };

  return (
    <>
      <Input
        placeholder="Nhập tên sản phẩm"
        onChange={(e) => searchProduct(e)}
        defaultValue={filter.name_like}
      />
    </>
  );
}

export default Search;
