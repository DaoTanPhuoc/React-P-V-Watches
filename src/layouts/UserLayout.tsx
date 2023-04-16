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

  function dropdownMan() {
    <>
      <div className="Container-Man">
        <li className="nav-item">
          <a href="#" className="desktop-item shadow_one">
            Services
          </a>
          <input type="checkbox" id="showMega" />
          <label htmlFor="showMega" className="mobile-item">
            Services
          </label>
          <div className="mega-box">
            <div className="content"></div>
            <div className="row">
              <h4>
                <a href="{{route('frontend.leadgeneration')}}">
                  Lead Generation
                </a>
              </h4>
              <ul className="mega-links">
                <li>
                  <a href="#">B2B lead Generation</a>
                </li>
                <li>
                  <a href="#">PPC Lead Generation</a>
                </li>
                <li>
                  <a href="#">B2B lead Generation</a>
                </li>
                <li>
                  <a href="#">PPC Lead Generation</a>
                </li>
              </ul>
            </div>
            <div className="row">
              <h4>Web Development</h4>
              <ul className="mega-links">
                <li>
                  <a href="#">WordPress Development</a>
                </li>
                <li>
                  <a href="#">MERN Development</a>
                </li>
                <li>
                  <a href="#">Web Application</a>
                </li>
                <li>
                  <a href="#">Custom Website</a>
                </li>
              </ul>
            </div>
            <div className="row">
              <h4>Email Services</h4>
              <ul className="mega-links">
                <li>
                  <a href="#">Email Template</a>
                </li>
                <li>
                  <a href="#">Email Marketing</a>
                </li>
                <li>
                  <a href="#">Mailchimp</a>
                </li>
                <li>
                  <a href="#">Campain</a>
                </li>
              </ul>
            </div>
            <div className="row">
              <h4>Graphics Services</h4>
              <ul className="mega-links">
                <li>
                  <a href="#">Photo Retoucing</a>
                </li>
                <li>
                  <a href="#">Background Removal</a>
                </li>
                <li>
                  <a href="#">Photo Manipulation</a>
                </li>
                <li>
                  <a href="#">Banner Design</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </div>
    </>;
  }

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
                      <h2>Caliber</h2>
                      <div className="card-content-items">
                        <p>Automatic</p>
                        <p>Quartz</p>
                        <p>Manual winding machine</p>
                        <p> In-house</p>
                        <p>Ronda</p>
                        <p>Sellita</p>
                        <p>ETA</p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Strap</h2>
                      <p>Leather Strap</p>
                      <p>Metal Strap</p>
                      <p>Mother-Of-Pearl Dial</p>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Classify</h2>
                      <p>Men</p>
                      <p>Women</p>
                      <p>Couple</p>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <h2>Diameter</h2>
                      <p>29MM</p>
                      <p>29MM - 33MM</p>
                      <p>33MM - 37MM</p>
                      <p>37MM - 40MM</p>
                    </div>
                  </a>
                </div>

                <div className="card">
                  <a href="#">
                    <div className="card-content">
                      <div className="card-content-items">
                        <h2>Watch segment</h2>
                        <p>Dưới 200 triệu</p>
                        <p>Từ 200 triệu đến 500 triệu</p>
                        <p>Từ 500 triệu đến 1 tỷ</p>
                        <p>Từ 1 tỷ đến 2 tỷ</p>
                        <p>Từ 2 tỷ trờ lên</p>
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
            width: 120,
            height: 31,
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
              key: "1",
              label: "Home",
              onClick: () => window.location.replace("/"),
            },
            {
              key: "2",
              label: "Shop",
              onClick: () => window.location.replace("/shop"),
            },

            {
              key: 4,
              label: "Brand",
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
            {
              key: 5,
              label: "News",
              onClick: () => window.location.replace("/news"),
            },
          ]}
        />

        <Search
          className="search-global-input"
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />

        <a href="/login">
          <UserOutlined className="User-icon-global" />
        </a>

        <a href="/cart">
          <Badge count={cartOrders.length}>
            {/* <Avatar shape="square" size="large" /> */}
            <ShoppingCartOutlined style={{ fontSize: 30 }} />
          </Badge>
        </a>

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
      {/* <footer className="footer-distributed">
      <Footer style={{ textAlign: "center" }}>
          <div className="footer-left">
            <h3>
              Rolex <span>Watches</span>
            </h3>

            <p className="footer-links">
              <a href="#">Home</a>|<a href="#">About</a>|<a href="#">Contact</a>
            </p>
            <p className="footer-company-name">
              Coppyright 2023 <strong>Rolex</strong> all rights @2023
            </p>
          </div>
          <div className="footer-center">
            <i>
              <EnvironmentOutlined />
            </i>
            <p>
              <span>TP Ho Chi Minh</span>Q.1
            </p>
            <div>
              <i>
                <SettingOutlined />
              </i>

              <p>0909970879</p>
            </div>
            <div>
              <i>
                <MailOutlined />
              </i>

              <p>
                <a href="#">doatanphuco@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>about the company</span>
              <span>Rolex - by Dao Tan Phuoc</span> is a YouTube channel where
              you can find watch
            </p>
          </div>
          <div className="footer-icon">
            <i>
              <CrownOutlined />
            </i>
            <i>
              <CloudOutlined />
            </i>
            <i>
              <HeartOutlined />
            </i>
            <i>
              <CoffeeOutlined />
            </i>
          </div>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </footer>
      
      , */}

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
