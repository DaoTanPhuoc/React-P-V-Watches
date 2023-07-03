import React, { useContext, useState } from "react";
import {
  ShopOutlined,
  UserOutlined,
  BellOutlined,
  FormOutlined,
  SettingFilled,
  AuditOutlined,
  PoweroffOutlined,
  DashboardOutlined,
  WalletOutlined,
  BookOutlined,
  DollarOutlined,
  UnorderedListOutlined,
  RestOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
  ContainerOutlined,
  EditOutlined,
  BankOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  MenuProps,
  Modal,
  Result,
  Space,
  Tag,
} from "antd";
import { Layout, Menu, theme } from "antd";
import { AppContext } from "../../App";
import { ColumnsType } from "antd/es/table";
import "./DashboardPage.css";
import HomeDas from "./HomeDashboard/HomeDashboard";
import ProductsDashboard from "./ProductsDashboard/ProductsDashboard";
import PostDashboard from "./PostDashboard/PostDashboard";
import BillingDashboard from "./BillingDashboard/BillingDashboard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import StatisticalPage from "./Statistical/StatisticalPage";
import logo from '../../assets/1.png'
const { Header, Content, Footer, Sider } = Layout;
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
  const navigate = useNavigate();
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
  const { currentAdmin, setCurrentAdmin } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setCurrentAdmin(null);
    navigate("/");
  };

  const [render, SetRender] = useState(<HomeDas />);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const navigator = useNavigate();
  const MenuClickHandle = (e: any) => {
    navigator("/admin" + e.key);
  };

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(<Link to="/admin">Dashboard</Link>, "1", <DashboardOutlined />),
    getItem("Sản Phẩm", "sub1", <ShopOutlined />, [
      getItem(
        <Link to="/admin/dasProducts">Danh Sách</Link>,
        "2",
        <UnorderedListOutlined />
      ),
      getItem(
        <Link to="/admin/statistical">Tồn Kho</Link>,
        "3",
        <ProfileOutlined />
        // <WalletOutlined />
      ),
      getItem(
        <Link to="/admin/brandDash">Loại Sản Phẩm</Link>,
        "4",
        <WalletOutlined />
      ),
      getItem(
        <Link to="/admin/categoryDash">Danh mục</Link>,
        "5",
        <UnorderedListOutlined />
      ),
      getItem(
        <Link to="/admin/RestoreDashboard">Khôi Phục</Link>,
        "6",
        <RestOutlined />
        // <WalletOutlined />
      ),
    ]),
    getItem("Hóa đơn", "sub2", <FormOutlined />, [
      getItem(
        <Link to="/admin/dasBilling">Danh Sách</Link>,
        "7",
        <ContainerOutlined />
      ),
      getItem(
        <Link to="/admin/importProducts">Nhập Hàng</Link>,
        "8",
        <ReconciliationOutlined />
        // <BookOutlined />
      ),
      getItem(
        <Link to="/admin/invoiceWait">Đơn Hàng</Link>,
        "9",
        <AuditOutlined />
      )
    ]),
    getItem(
      <Link to="/admin/dasPost">Bài Viết</Link>,
      "10",
      <EditOutlined />
    ),
    getItem(<Link to="/admin/ros">Doanh Thu</Link>, "11", <DollarOutlined />),
    getItem(<Link to="/admin/settingAccount">Tài Khoản</Link>, "12", <SettingFilled />),
    getItem(<Link to="/admin/SuppilersDashboard">Nhà cung cấp</Link>, "13", <BankOutlined />),
    getItem(<Link to="/admin/LogsDashboard">Lịch sử thao tác</Link>, "14", <ReloadOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  return (
    <Layout >
      <Sider
        style={{ boxShadow: " 0 0 10px rgba(0, 0, 0, 0.5)" }}
        breakpoint="lg"
        collapsedWidth="70"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="slider-menu"
      >


        <div
          //  style={{
          //   width: 200,
          //   height: 64,
          //   objectFit: "cover",
          // }} 
          className="logo" />
        <img
          style={{
            width: 200,
            height: 120,
            objectFit: "contain"
          }}
          src={logo}
          alt="1"
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          className="menu-dashboard-container"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="header-page-dashboard-responsive"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            background: " #222222",
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{ fontSize: "22px" }}>
              {/* <SearchOutlined style={{ color: "#fff" }} /> */}
            </div>
          </div>

          <a>
            <BellOutlined
              style={{ color: "#fff" }}
              className="User-icon-global"
            />
          </a>
          <Button
            onClick={() => handleLogout()}
            type="primary"
            icon={<PoweroffOutlined />}
          ></Button>
          <Space style={{ paddingLeft: 20 }} size={16} wrap>
            <Avatar
              size={40}
              src={"https://i.ytimg.com/vi/y-Tut29zvPE/maxresdefault.jpg"}
            />
          </Space>
        </Header>

        <Content
          style={{
            padding: 10,
            minHeight: 950,
          }}
        >
          <div className="contain-dashboardPage-responsive">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
