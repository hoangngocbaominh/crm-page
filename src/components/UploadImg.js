import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
UploadImg.propTypes = {};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function UploadImg(props) {
  const { thumbnailList, updateThumbnailList } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    setFileList(
      thumbnailList.map((item) => {
        return { url: item };
      })
    );
  }, [thumbnailList.length]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = async ({ fileList }) => {

    setFileList(fileList);
    // const newFileList = [];

    // for (const item of fileList) {
    //     newFileList.push(await item.name);
    // }
    
    updateThumbnailList(fileList)
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        style={{width:"146px", height: "146px"}}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadImg;
