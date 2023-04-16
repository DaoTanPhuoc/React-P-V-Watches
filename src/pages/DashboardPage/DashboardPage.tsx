import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  FolderOpenOutlined,
  TagsOutlined,
  TagOutlined,
  MenuOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Input,
  MenuProps,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { Layout, Menu, theme } from "antd";
import { AppContext } from "../../App";
import { spaceChildren } from "antd/es/button";
import { ColumnsType } from "antd/es/table";
import { Column, Line, TinyLine, XFlowAppProvider } from "@ant-design/charts";
import axios from "axios";
import { inflate } from "zlib";
import { ProductModel } from "../../models/ProductModel";
import ProductDetail from "../ProductDetailPage/ProductDetailPage";
import path from "path";
import "./DashboardPage.css";
import Item from "antd/es/list/Item";
import { useParams } from "react-router";
import HomeDas from "./HomeDashboard";
import News from "../NewsPage/NewsPage";

const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps["items"] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

interface ChartModel {
  x: string;
  y: number;
}

// const data2 = [
//   { x: "January", y: 2 },
//   { x: "February", y: 3 },
//   { x: "March", y: 4 },
//   { x: "April", y: 1 },
//   { x: "May", y: 2 },
//   { x: "June", y: 3 },
//   { x: "July", y: 0 },
//   { x: "August", y: 0 },
//   { x: "September", y: 2 },
//   { x: "October", y: 3 },
//   { x: "November", y: 4 },
//   { x: "December", y: 0 },
// ];

const Dashboard: React.FC = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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

  const data1: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  //data chart

  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
  };
  //Chart

  const data2 = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];
  const config1 = {
    data2,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };

  const { Meta } = Card;
  const { Search } = Input;
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(AppContext);
  const handleLogout = () => {
    //localStorage.clear();
    localStorage.removeItem("adminInfo");
    setIsAdminAuthenticated(false);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // menu
  // const [selectedMenu, setSelectedMenu] =useState('menu1');
  // const handleMenuClick = (e:any) =>{
  //   setSelectedMenu(e.key)
  // }
  const menuItems = [
    { key: 1, icon: <UserOutlined />, label: "Home", compoment: <HomeDas /> },
    { key: 2, icon: <UserOutlined />, label: "Home", compoment: <News /> },
  ];
  const [render, SetRender] = useState(<HomeDas />);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems.map((i) => ({
            key: i.key,
            icon: i.icon,
            label: i.label,
            onClick: () => {
              SetRender(i.compoment);
            },
          }))}
          //[
          //   {
          //     key: "1",
          //     icon: <UserOutlined />,
          //     label: "Home",
          //   },
          //   {
          //     key: "2",
          //     icon: <VideoCameraOutlined />,
          //     label: <Link to="/hi" />,
          //   },
          //   {
          //     key: "3",
          //     icon: <UploadOutlined />,
          //     label: "nav 3",
          //   },
          // ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          // style={{ padding: 0, background: colorBgContainer }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            background: "#fff",
          }}
        >
          <div style={{ width: "100%" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>

          <Search
            className="search-global-input"
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
          />
          <a>
            <UserOutlined className="User-icon-global" />
          </a>
          <Button
            // style={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => handleLogout()}
            type="primary"
            icon={<PoweroffOutlined />}
          ></Button>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {render}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
