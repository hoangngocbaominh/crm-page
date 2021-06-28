import React from "react";
import PropTypes from "prop-types";

SearchStatus.propTypes = {};

function SearchStatus(props) {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
     
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
  );
}

export default SearchStatus;
