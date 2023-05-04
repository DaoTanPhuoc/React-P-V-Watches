import {
  Layout,
  Menu,
  Breadcrumb,
  theme,
  Space,
  Typography,
  Tag,
  Badge,
  Avatar,
  Input,
  Row,
  Col,
  Descriptions,
  Button,
  RadioChangeEvent,
  Divider,
  message,
} from "antd";
import {
  CoffeeOutlined,
  HeartOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { useContext, useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import { TypeFlags } from "typescript";
import "./UserLayout.css";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const UserLayout = (props: Props) => {
  const { children } = props;
  const { cartOrders, setCartOrders } = useContext(AppContext);

  const [hoverMenu, setHoverMenu] = useState(0);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const path = useMemo(
    () => window.location.pathname.split("/")[1],
    [window.location]
  );

  const onSearch = (value: string) => console.log(value);

  const activeMenu = useMemo(() => {
    switch (path) {
      case "shop":
        return "2";

      default:
        return "1";
    }
  }, [path]);

  const renderMenuDropdown = () => {
    switch (hoverMenu) {
      case 1:
        return <div>Menu 111111111111111</div>;
      case 2:
        return <div></div>;
      case 3:
        return (
          <>
            <div className="container-submenu">
              <div className="grid grid--reverse">
                <div className="grid__item">
                  <h3>Phân khúc</h3>
                  <p>100 triệu đến 200 triệu</p>
                  <p>200 triệu đến 500 triệu</p>
                  <p>500 triệu đến 1 tỷ</p>
                  <p>Trên 1 tỷ</p>
                </div>
                <div className="grid__item">
                  <h3>Sản phẩm mới</h3>
                  <p>Automatic</p>
                  <p>Quartz</p>
                </div>
                <div className="grid__item">
                  <h3>Chăm sóc & Dịch vụ</h3>
                  <p>Phân biệt thật giả</p>
                  <p>Hỗ trợ tư vấn</p>
                </div>
                <div className="grid__item">
                  <h3>Sản phẩm nổi bật</h3>
                  <p>Tin tức & Thương hiệu</p>
                  <p>Tư vấn</p>
                  <p>Chính sách</p>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return;
    }
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          height: 90,
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "#000",
        }}
      >
        <img
          src="https://benhviendongho.com/wp-content/uploads/2019/05/744px-Rolex_logo.svg.png"
          style={{
            float: "left",
            width: 240,
            height: 48,
            margin: "16px 24px 16px 0",
            objectFit: "contain",
          }}
        />

        <Menu
          // theme="light"
          style={{
            backgroundColor: "#000",
          }}
          mode="horizontal"
          defaultSelectedKeys={[activeMenu]}
          items={[
            {
              key: 1,
              label: <span style={{ color: "#fff" }}>TRANG CHỦ</span>,
              onClick: () => window.location.replace("/"),
            },
            {
              key: 2,
              label: <span style={{ color: "#fff" }}>SẢN PHẨM</span>,
              onClick: () => window.location.replace("/shop"),
            },

            {
              key: 3,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ NAM</span>,
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 4,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ NỮ</span>,
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 5,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ ĐÔI</span>,
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 6,
              label: <span style={{ color: "#fff" }}>TIN TỨC</span>,
              onClick: () => window.location.replace("/news"),
            },
            {
              key: 7,
              label: <span style={{ color: "#fff" }}>GIỚI THIỆU</span>,
              onClick: () => window.location.replace("/news"),
            },
          ]}
        />
        <Space size={"large"}>
          {/* <Search
            placeholder="Nhập tên sản phẩm"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={onSearch}
          /> */}
          <Search placeholder="Nhập sản phẩm" />

          <a href="/cart">
            <Badge count={cartOrders.length}>
              {/* <Avatar shape="square" size="large" /> */}
              <ShoppingCartOutlined style={{ fontSize: 28, color: "#fff" }} />
            </Badge>
          </a>

          <a href="/login">
            <UserOutlined
              style={{ fontSize: 24, margin: "25px 0", color: "#fff" }}
            />
          </a>
        </Space>
        {/* submenu */}
        <div
          style={{
            marginTop: 13,
            width: "100%",
            textAlign: "center",
            backgroundColor: "#2d2d2dbf",
          }}
          className={"main-dropdown-menu" + (hoverMenu > 0 ? " show" : "")}
          onMouseEnter={() => {
            setHoverMenu(hoverMenu);
          }}
          onMouseLeave={() => {
            setHoverMenu(0);
          }}
        >
          {renderMenuDropdown()}
        </div>
      </Header>

      <Content className="site-layout">{children}</Content>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Cửa hàng chúng tôi</h4>
              <ul>
                <li>
                  <a href="#">Hotline tư vấn- hỗ trợ: 0909970879</a>
                </li>
                <li>
                  <a href="#">Hotline khiếu nại: 0908970879</a>
                </li>
                <li>
                  <a href="#">
                    Địa chỉ: Số 5, Nguyễn Trung Ngạn, Phường Bến Nghé, Quận 1,
                    Thành Phố Hồ Chí Minh
                  </a>
                </li>
                <li>
                  <a href="#">Email: 0306201063@caothang.edu.vn</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>V-P Watches</h4>
              <ul>
                <li>
                  <a href="#">Trang chủ</a>
                </li>
                <li>
                  <a href="#">Sản phẩm</a>
                </li>
                <li>
                  <a href="#">Tin tức</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Liên kết với các hãng</h4>
              <ul>
                <li>
                  <a href="#">Rolex</a>
                </li>
                <li>
                  <a href="#">Hublot</a>
                </li>
                <li>
                  <a href="#">Channel</a>
                </li>
                <li>
                  <a href="#">Orient</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Theo dõi & Liên hệ</h4>
              <div className="social-links">
                <a href="#">
                  <i className="fab fa-facebook-f">
                    <img
                      src="https://donghotantan.vn/images/config/zalo.png"
                      alt=""
                    />
                  </i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter">
                    <img
                      src="https://donghotantan.vn/images/config/message.png"
                      alt=""
                    />
                  </i>
                </a>

                <a href="#">
                  <i className="fab fa-linkedin-in">
                    <img
                      src="https://ssr-resource-prod.gosell.vn/images/icon/instagram-icon.png"
                      alt=""
                    />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

function MegaMenu() {
  return (
    <div>
      <Card title="Card Title">
        <Card.Grid style={gridStyle}>Rolex</Card.Grid>

        <Card.Grid style={gridStyle}>Hublot</Card.Grid>
        <Card.Grid style={gridStyle}>Citizen</Card.Grid>
        <Card.Grid style={gridStyle}>Orient</Card.Grid>

        <Card.Grid style={gridStyle}>Omega</Card.Grid>
        <Card.Grid style={gridStyle}>Tissot</Card.Grid>
        <Card.Grid style={gridStyle}>Mido</Card.Grid>
        <Card.Grid style={gridStyle}>Chanel</Card.Grid>
      </Card>
    </div>
  );
}

export default UserLayout;
