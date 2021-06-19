import React from "react";
import PropTypes from "prop-types";

Form.propTypes = {};

function Form(props) {
  return (
    <Form.List>
      {(fields) => (
        <div>
          {fields.map((field) => (
            <Form.Item {...field}>
              <Input />
            </Form.Item>
          ))}
        </div>
      )}
    </Form.List>
  );
}

export default Form;
