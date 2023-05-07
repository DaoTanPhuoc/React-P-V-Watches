import { Col, Row, Space, Statistic, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import "./ProductsDashboard.css";
import { Line, Pie } from "@ant-design/charts";
import { LikeOutlined } from "@ant-design/icons";
import { text } from "stream/consumers";
import { render } from "@testing-library/react";
interface DataType {
  key: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  color: string;
  CaseMeterial: string;
  CaseSize: number;
  GlassMaterial: string;
  Movement: string;
  WaterResistant: string;
  Description: string;
  Warranty: number;
  tags: string[];
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
    title: "Color",
    dataIndex: "color",
    key: "color",
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
    title: "WaterResistant",
    dataIndex: "WaterResistant",
    key: "WaterResistant",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "Warranty",
    dataIndex: "Warranty",
    key: "Warranty",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Rolex",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date/thumbs/645x0/rolex-day-date-40mm-228235-0025.png",
    price: 23,
    stock: 4,
    color: "vàng",
    CaseMeterial: "dsa",
    CaseSize: 40,
    GlassMaterial: "fssdf",
    Movement: "dsad",
    WaterResistant: "10",
    Description: "fdsaf",
    Warranty: 21,
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Hublot",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/645x0/dong-ho-rolex-datejust-31-278285rbr-0036.png",
    price: 29,
    stock: 9,
    color: "role",
    CaseMeterial: "dsa",
    CaseSize: 39,
    GlassMaterial: "fdssdf",
    Movement: "dsadd",
    WaterResistant: "10",
    Description: "fdsadf",
    Warranty: 5,
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Channel",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/daytona/thumbs/645x0/116505-0008.png",
    price: 98,
    stock: 10,
    color: "role",
    CaseMeterial: "dsadsad",
    CaseSize: 40,
    GlassMaterial: "dsfdssdf",
    Movement: "dsadsdd",
    WaterResistant: "10",
    Description: "fdsadsdf",
    Warranty: 2,
    tags: ["cool", "teacher"],
  },
];

const myData = [
  { x: "Thứ hai", y: 3 },
  { x: "Thứ Ba", y: 5 },
  { x: "Thứ Tư", y: 4 },
  { x: "Thứ Năm", y: 6 },
  { x: "Thứ Sáu", y: 8 },
  { x: "Thứ Bảy", y: 7 },
  { x: "Chủ Nhật", y: 9 },
];

const RoundChartData = [
  {
    type: "Rolex",
    value: 27,
  },
  {
    type: "Channel",
    value: 25,
  },
  {
    type: "Orient",
    value: 18,
  },
  {
    type: "Hublot",
    value: 15,
  },
  {
    type: "Citizen",
    value: 10,
  },
];
const config = {
  appendPadding: 10,
  RoundChartData,
  angleField: "value",
  colorField: "type",
  radius: 0.8,
  label: {
    type: "outer",
  },
  interactions: [
    {
      type: "element-active",
    },
  ],
};

const ProductsDashboard = () => {
  return (
    <>
      {/* <div className="banner-products">
        <div className="content-banner-products">
          <h1>Welcome to Dashboard !</h1>
          <button>Get Started</button>
        </div>
      </div> */}
      <div className="title-chart-das">Thống Kê Doanh Thu</div>

      {/* chart */}
      <div className="chart-das-container">
        <div className="left-chart">
          <div className="chart-products">
            <h4 style={{ fontWeight: 500, paddingBottom: 40 }}>
              Tổng doanh thu: <span style={{ fontWeight: 400 }}>600000</span>
            </h4>
            <Line
              data={myData}
              height={500}
              xField="x"
              yField="y"
              point={{ size: 5, shape: "diamon" }}
              color="blue"
            />
          </div>
        </div>
        <div className="right-chart">
          <div className="chart-brand">
            <Pie data={RoundChartData} {...config} />
          </div>
          <div className="container-right">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Feedback"
                  value={1128}
                  prefix={<LikeOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic title="Unmerged" value={93} suffix="/ 100" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="table-das-container">
        <div className="title-das-products">Danh sách sản phẩm</div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1790, y: 300 }}
        />
      </div>
    </>
  );
};

export default ProductsDashboard;
