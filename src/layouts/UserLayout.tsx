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
            <div className="centered">
              <section className="cards">
                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>What's new</h2>
                      <div className="card-content-items">
                        <img
                          style={{ width: 172, height: 80, objectFit: "cover" }}
                          src="https://luxuo.vn/wp-content/uploads/2020/11/https___hypebeast.com_image_2020_11_rolex-a-z-modern-rolex-watch-guide-01-930x620.jpg"
                          alt=""
                        />
                        <p>Automatic</p>
                        <p>Quartz</p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Man watches</h2>
                      <img
                        style={{ width: 172, height: 80, objectFit: "cover" }}
                        src="https://watchmydiamonds.com/media/catalog/product/cache/1/thumbnail/1280x/040ec09b1e35df139433887a97daa66f/5/2/527a7533.jpg"
                        alt=""
                      />
                      <p>Leather Strap</p>
                      <p>Metal Strap</p>
                      <p>Mother-Of-Pearl Dial</p>
                    </div>
                  </a>
                </div>

                {/* <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Woman watches</h2>
                      <img
                        style={{ width: 172, height: 80, objectFit: "cover" }}
                        src="https://www.themanual.com/wp-content/uploads/sites/9/2022/05/best-watches-for-men.jpg?resize=1200%2C630&p=1"
                        alt=""
                      />
                      <p>Men</p>
                      <p>Women</p>
                      <p>Couple</p>
                    </div>
                  </a>
                </div> */}

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Woman watches</h2>
                      <img
                        style={{ width: 172, height: 80, objectFit: "cover" }}
                        src="https://www.themanual.com/wp-content/uploads/sites/9/2022/05/best-watches-for-men.jpg?resize=1200%2C630&p=1"
                        alt=""
                      />
                      <p>Men</p>
                      <p>Women</p>
                      <p>Couple</p>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <div className="card-content-items">
                        <h2>Watch segment</h2>
                        <img
                          style={{ width: 172, height: 80, objectFit: "cover" }}
                          src="https://i.ytimg.com/vi/PGl7f2zd9vM/maxresdefault.jpg"
                          alt=""
                        />
                        <p>Dưới 200 triệu</p>
                        <p>Từ 200 triệu đến 500 triệu</p>
                        <p>Từ 500 triệu đến 1 tỷ</p>
                        <p>Từ 1 tỷ trở lên</p>
                      </div>
                    </div>
                  </a>
                </div>
              </section>
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
          height: "79px",
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "#fff",
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
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[activeMenu]}
          items={[
            {
              key: 1,
              label: "Trang chủ",
              onClick: () => window.location.replace("/"),
            },
            {
              key: 2,
              label: "Sản phẩm",
              onClick: () => window.location.replace("/shop"),
            },

            {
              key: 3,
              label: "Đồng hồ Nam",
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 4,
              label: "Đồng hồ Nữ",
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 5,
              label: "Đồng hồ Đôi",
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 6,
              label: "Tin tức",
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
              <ShoppingCartOutlined style={{ fontSize: 28 }} />
            </Badge>
          </a>

          <a href="/login">
            <UserOutlined style={{ fontSize: 24, margin: "25px 0" }} />
          </a>
        </Space>
        <div
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
              <h4>company</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
                <li>
                  <a href="#">affiliate program</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">shipping</a>
                </li>
                <li>
                  <a href="#">returns</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
                <li>
                  <a href="#">payment options</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <a href="#">watch</a>
                </li>
                <li>
                  <a href="#">bag</a>
                </li>
                <li>
                  <a href="#">shoes</a>
                </li>
                <li>
                  <a href="#">dress</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
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
