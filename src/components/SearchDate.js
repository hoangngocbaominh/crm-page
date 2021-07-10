import React from "react";
import PropTypes from "prop-types";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
SearchDate.propTypes = {};

function SearchDate(props) {
  const { getEditedDate } = props;
  const getDateValue = (values) => {
    console.log(values);
    const editedDate = {
      create: values[0]._d,
      update: values[1]._d,
    };
    if (!getEditedDate) return;
    getEditedDate(editedDate);
  };
  return <RangePicker showTime onChange={getDateValue} />;
}

export default SearchDate;
