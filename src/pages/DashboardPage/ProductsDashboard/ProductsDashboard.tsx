import { Button, Col, Row, Space, Statistic, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import "./ProductsDashboard.css";
import { Line, Pie } from "@ant-design/charts";
import { ShopOutlined, DollarOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { render } from "@testing-library/react";
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
          <Button style={{ color: "#fff", backgroundColor: "#000000" }}>
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </>
  );
};

export default ProductsDashboard;
