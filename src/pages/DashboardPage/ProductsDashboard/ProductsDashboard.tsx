import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Tag,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import "./ProductsDashboard.css";
import { Line, Pie } from "@ant-design/charts";
import { ShopOutlined, DollarOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { render } from "@testing-library/react";
import { RcFile } from "antd/es/upload";
import ImgCrop from "antd-img-crop";
interface DataType {
  key: string;
  name: string;
  image: string;
  price: number;
  stock: number;

  CaseMeterial: string;
  CaseSize: number;
  GlassMaterial: string;
  Movement: string;

  Warranty: number;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (theImageURL) => <img alt={theImageURL} src={theImageURL} />,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },

  {
    title: "CaseMeterial",
    dataIndex: "CaseMeterial",
    key: "CaseMeterial",
  },
  {
    title: "CaseSize",
    dataIndex: "CaseSize",
    key: "CaseSize",
  },
  {
    title: "GlassMaterial",
    dataIndex: "GlassMaterial",
    key: "GlassMaterial",
  },
  {
    title: "Movement",
    dataIndex: "Movement",
    key: "Movement",
  },

  {
    title: "Warranty",
    dataIndex: "Warranty",
    key: "Warranty",
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a href="#">Edit</a>
      </Space>
    ),
  },
];

// const data: DataType[] = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: data[i].key,
//     name: data[i].name,
//     image: data[i].image,
//     price: data[i].price,
//     stock: data[i].stock,
//     color: data[i].color,
//     CaseMeterial: data[i].CaseMeterial,
//     CaseSize: data[i].CaseSize,
//     GlassMaterial: data[i].GlassMaterial,
//     Movement: data[i].Movement,
//     WaterResistant: data[i].WaterResistant,
//     Description: data[i].Description,
//     Warranty: data[i].Warranty,
//     tags: data[i].tags,
//   });
// }

const data: DataType[] = [
  {
    key: "1",
    name: "Rolex",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date/thumbs/645x0/rolex-day-date-40mm-228235-0025.png",
    price: 1620000000,
    stock: 4,

    CaseMeterial: "Vàng vàng 18k",
    CaseSize: 40,
    GlassMaterial: "Sapphire",
    Movement: " Automatic - Caliber 3255",

    Warranty: 21,
  },
  {
    key: "2",
    name: "Hublot",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/645x0/dong-ho-rolex-datejust-31-278285rbr-0036.png",
    price: 29,
    stock: 9,

    CaseMeterial: "nạm kim cương",
    CaseSize: 39,
    GlassMaterial: "Sapphire",
    Movement: " Automatic - Caliber 3255",

    Warranty: 5,
  },
  {
    key: "3",
    name: "Channel",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/daytona/thumbs/645x0/116505-0008.png",
    price: 98,
    stock: 10,

    CaseMeterial: "dsadsad",
    CaseSize: 40,
    GlassMaterial: "dsfdssdf",
    Movement: "dsadsdd",

    Warranty: 2,
  },
  {
    key: "4",
    name: "Channel",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/daytona/thumbs/645x0/116505-0008.png",
    price: 98,
    stock: 10,

    CaseMeterial: "dsadsad",
    CaseSize: 40,
    GlassMaterial: "dsfdssdf",
    Movement: "dsadsdd",

    Warranty: 2,
  },
];

const ProductsDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // them san pham (them anh)
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/xxx.png",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="table-das-container"
      >
        <div className="title-das-products">Danh sách sản phẩm</div>
        <div>
          <Button
            onClick={showModal}
            style={{ color: "#fff", backgroundColor: "#000000" }}
          >
            Thêm sản phẩm
          </Button>
          <Modal
            title="Thêm sản phẩm"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label={<span style={{ color: "#000000" }}>Mã sản phẩm:</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Tên sản phẩm:</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Giá tiền:</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Số lượng:</span>}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Hình ảnh:</span>}
              >
                <ImgCrop rotationSlider>
                  <Upload
                    accept="image/png"
                    beforeUpload={(file) => {
                      console.log(file);
                      return false;
                    }}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Màu sắc:</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="InputNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Switch" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Button">
                <Button>Thêm sản phẩm</Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default ProductsDashboard;
