import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, notification, Spin } from "antd";
import { requester } from "../../../services/axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

ProductDescriptions.propTypes = {};

function ProductDescriptions(props) {
  const { descriptions } = props;
  console.log(descriptions);
  const [form] = Form.useForm();
  const [descriptionValue, setDescriptionValue] = useState(descriptions.description);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // form.setFieldsValue(descriptions);
    setDescriptionValue(descriptions.description);
  }, [descriptions]);

  const getValueDescription = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
  };
  return (
    <Spin spinning={isLoading}>
      <CKEditor
        editor={ClassicEditor}
        data={`<p>${descriptionValue}</p>`}
        config={
          {
            ckeditor:{
              uploadUrl:'/uploads'
            }
          }
        }
        onChange={getValueDescription}
      />

      <Button type="primary" htmlType="submit">
        Cập nhật
      </Button>
    </Spin>
  );
}

export default ProductDescriptions;
