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
  Spin,
  Statistic,
  Switch,
  Tag,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "./ProductsDashboard.css";
import { Line, Pie } from "@ant-design/charts";
import { ShopOutlined, DollarOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { render } from "@testing-library/react";
import { RcFile } from "antd/es/upload";
import ImgCrop from "antd-img-crop";
import { ProductModel } from "../../../models/ProductModel";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

interface DataType {
  key: string;
  Name: string;
  Image: string;
  Price: number;
  Stock: number;

  CaseMeterial: string;
  CaseSize: number;
  GlassMaterial: string;
  Movement: string;

  Warranty: number;
}
const columns: ColumnsType<DataType> = [

  {
    title: "Hình ảnh",
    dataIndex: "Image",
    render: (theImageURL) => <img alt={theImageURL} src={theImageURL} />,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "Name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },

  {
    title: "Giá tiền",
    dataIndex: "Price",
    key: "price",
    render: (Price) => moneyFormatter.format(Price),
  },
  {
    title: "Tồn kho",
    dataIndex: "Stock",
    key: "stock",
  },



  {
    title: "Bộ máy",
    dataIndex: "Movement",
    key: "Movement",
  },


  {
    title: "Chức năng",
    key: "action",
    render: () => (
      <Space size="middle">
        <a href="#">Edit</a>
      </Space>
    ),
  },
];

// const data: DataType[] = [
//   {
//     key: "1",
//     Name: "Rolex",
//     Image:
//       "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date/thumbs/645x0/rolex-day-date-40mm-228235-0025.png",
//     Price: 1620000000,
//     Stock: 4,

//     CaseMeterial: "Vàng vàng 18k",
//     CaseSize: 40,
//     GlassMaterial: "Sapphire",
//     Movement: " Automatic - Caliber 3255",

//     Warranty: 21,
//   },
//   {
//     key: "2",
//     Name: "Hublot",
//     Image:
//       "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/645x0/dong-ho-rolex-datejust-31-278285rbr-0036.png",
//     Price: 29,
//     Stock: 9,

//     CaseMeterial: "nạm kim cương",
//     CaseSize: 39,
//     GlassMaterial: "Sapphire",
//     Movement: " Automatic - Caliber 3255",

//     Warranty: 5,
//   },
//   {
//     key: "3",
//     Name: "Channel",
//     Image:
//       "https://bossluxurywatch.vn/uploads/san-pham/rolex/daytona/thumbs/645x0/116505-0008.png",
//     Price: 98,
//     Stock: 10,

//     CaseMeterial: "dsadsad",
//     CaseSize: 40,
//     GlassMaterial: "dsfdssdf",
//     Movement: "dsadsdd",

//     Warranty: 2,
//   },
//   {
//     key: "4",
//     Name: "Channel",
//     Image:
//       "https://bossluxurywatch.vn/uploads/san-pham/rolex/daytona/thumbs/645x0/116505-0008.png",
//     Price: 98,
//     Stock: 10,

//     CaseMeterial: "dsadsad",
//     CaseSize: 40,
//     GlassMaterial: "dsfdssdf",
//     Movement: "dsadsdd",

//     Warranty: 2,
//   },
// ];

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
      // url: "https://eltallerdehector.com/wp-content/uploads/2022/10/spiderman-png-free.png",
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
  // closed


  // preview image
  const [fileListPreview, setfileListPreview] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      // url: "https://eltallerdehector.com/wp-content/uploads/2022/10/spiderman-png-free.png",
    },
  ]);

  const onChangePreview: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setfileListPreview(newFileList);
  };

  const onPreviewImage = async (file: UploadFile) => {
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
  //closed

  // api danh sách sản phẩm
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("https://localhost:7182/api/Products").then((res) => {
      setloading(false);
      setstate(
        res.data.map(
          (row: {
            Name: string;
            Image: string;
            Price: number;
            Stock: number;
            CaseMeterial: string;
            CaseSize: number;
            Movement: string;

          }) => ({
            Name: row.Name,
            Image: row.Image,
            Price: row.Price,
            Stock: row.Stock,
            CaseMeterial: row.CaseMeterial,
            CaseSize: row.CaseSize,
            Movement: row.Movement,

          })
        )
      );
    });
  };

  //
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
            className="modal-add-products"
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label={<span style={{ color: "#000000" }}>Mã sản phẩm</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Tên sản phẩm</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Giá tiền</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Hình ảnh</span>}
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
                label={<span style={{ color: "#000000" }}>Màu sắc</span>}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Màu sắc"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: "Vàng",
                    },
                    {
                      value: 2,
                      label: "Hồng",
                    },
                    {
                      value: 3,
                      label: "Bạch Kim",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Preview Image</span>}
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
                    fileList={fileListPreview}
                    onChange={onChangePreview}
                    onPreview={onPreviewImage}
                  >
                    {fileListPreview.length < 4 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Chất liệu vỏ</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Kích thước</span>}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Thương Hiệu"
                  optionFilterProp="children"
                  options={[
                    {
                      value: 1,
                      label: 40,
                    },
                    {
                      value: 2,
                      label: 31,
                    },
                    {
                      value: 3,
                      label: 44,
                    },
                    {
                      value: 4,
                      label: 30,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Mặt kính</span>}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Loại kính"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: "Sapphire",
                    },
                    {
                      value: 2,
                      label: " Acrylic Crystal",
                    },
                    {
                      value: 3,
                      label: "Mineral Crystal",
                    },
                    {
                      value: 4,
                      label: "Hardlex Crystal",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Bộ máy</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Kháng nước</span>}
              >
                <Select
                  showSearch
                  style={{
                    width: 150,
                    fontWeight: "bold",
                  }}
                  placeholder="Mức ATM"
                  optionFilterProp="children"
                  options={[
                    {
                      value: 1,
                      label: 3,
                    },
                    {
                      value: 2,
                      label: 5,
                    },
                    {
                      value: 3,
                      label: 10,
                    },
                    {
                      value: 4,
                      label: 20,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Mô tả</span>}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Bảo hành</span>}
              >
                <InputNumber min={1} />
              </Form.Item>


              <Form.Item >
                <Button style={{ color: "#fff", backgroundColor: "#000000", marginLeft: "70%" }}>
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div>
        {loading ? (
          <Spin style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20%"
          }} delay={1000} />
        ) : (
          <Table
            style={{ paddingTop: "3%" }}
            columns={columns}
            dataSource={state}
            pagination={{ pageSize: 5, position: ['bottomCenter'] }}
            scroll={{ x: '100%' }}
          />
        )}
      </div>
    </>
  );
};

export default ProductsDashboard;
