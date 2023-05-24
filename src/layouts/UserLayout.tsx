/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Layout,
  Menu,
  theme,
  Space,
  Badge,
  Avatar,
  Input,
  Dropdown,
  MenuProps,
  AutoComplete,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Header, Content } from "antd/es/layout/layout";
import { useContext, useMemo, useRef, useState } from "react";
import "./UserLayout.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { ProductModel } from "../models/ProductModel";

const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const UserLayout = () => {
  // formart money
  const moneyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  //closed
  const { cartOrders, setCartOrders } = useContext(AppContext);
  const { currentUser, currentToken, setCurrentToken, setCurrentUser } =
    useContext(AppContext);
  const [hoverMenu, setHoverMenu] = useState(0);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const path = useMemo(
    () => window.location.pathname.split("/")[1],
    [window.location]
  );

  const onSearch = (value: string) => console.log(value);

  // search autocomplete
  const [options, setOptions] = useState([]);

  const handleSearch = async (value: any) => {
    if (value.trim().length === 0) {
      setOptions([]);
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7182/api/Products?q=${value.toLowerCase()}`);
      const data = response.data;
      const hasMatch = data.some((item: ProductModel) => item.Name.toLowerCase().includes(value.toLowerCase()));

      if (hasMatch) {
        const newOptions = data
          .filter((item: ProductModel) => item.Name.toLowerCase().includes(value.toLowerCase()))
          .map((item: ProductModel) => ({
            value: item.Name,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.Image} alt={item.Name} style={{ width: 50, height: 50, objectFit: "cover", marginRight: '5px' }} />
                <div>
                  <div style={{ fontWeight: 600, textOverflow: "ellipsis", width: "100%" }}>{item.Name}</div>
                  <div style={{ color: "#dbaf56" }}>{moneyFormatter.format(item.Price)}</div>
                </div>
              </div>
            ),
          }));
        setOptions(newOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // closed autocomplete
  const activeMenu = useMemo(() => {
    switch (path) {
      case "shop":
        return "2";

      default:
        return "1";
    }
  }, [path]);
  const userItemMenu: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to="/myaccount">Tài Khoản</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <a>Đăng Xuất</a>,
      icon: <LogoutOutlined />,
      onClick: () => {
        setCurrentToken(null);
        setCurrentUser(null);
        localStorage.removeItem("userToken");
        navigate("/");
      },
    },
  ];
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
              label: (
                <Link to="/">
                  <span style={{ color: "#fff" }}>TRANG CHỦ</span>
                </Link>
              ),
            },
            {
              key: 2,
              label: (
                <Link to="/shop">
                  <span style={{ color: "#fff" }}>SẢN PHẨM</span>
                </Link>
              ),
            },

            {
              key: 3,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ NAM</span>,

            },
            {
              key: 4,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ NỮ</span>,

            },
            {
              key: 5,
              label: <span style={{ color: "#fff" }}>ĐỒNG HỒ ĐÔI</span>,

            },
            {
              key: 6,
              label: (
                <Link to="/news">
                  <span style={{ color: "#fff" }}>TIN TỨC</span>
                </Link>
              ),
            },
            {
              key: 7,
              label:

                <span style={{ color: "#fff" }}>GIỚI THIỆU</span>,
              onMouseEnter: () => {
                setHoverMenu(3);
              },
              onMouseLeave: () => {
                setHoverMenu(0);
              },
            },
          ]}
        />
        <Space size={"large"}>
          {/* <SearchOutlined style={{ color: "#fff" }} />
          <AutoComplete
            style={{ width: 250 }}
            options={options}
            onSearch={handleSearch}
            allowClear={true}
            autoFocus={false}
            placeholder="Tìm kiếm sản phẩm"
          /> */}
          <AutoComplete
            style={{ width: 250 }}
            options={options}
            onSearch={handleSearch}
            allowClear={true}
            autoFocus={false}
            placeholder="Tìm kiếm sản phẩm"
          >
            <Input suffix={<SearchOutlined />} />
          </AutoComplete>
          <Link to="/cart">
            <Badge count={cartOrders.length}>
              {/* <Avatar shape="square" size="large" /> */}
              <ShoppingCartOutlined style={{ fontSize: 28, color: "#fff" }} />
            </Badge>
          </Link>
          {currentToken && currentUser ? (
            <Dropdown menu={{ items: userItemMenu }}>
              <Avatar
                src={currentUser.Avatar}
                shape="circle"
                style={{ fontSize: 24, margin: "25px 0" }}
              />
            </Dropdown>
          ) : (
            <Link to="/login">
              <UserOutlined
                style={{ fontSize: 24, margin: "25px 0", color: "#fff" }}
              />
            </Link>
          )}
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

      <Content
        className="site-layout"
        style={{ overflow: "hidden", maxWidth: "100vw" }}
      >
        <Outlet />
      </Content>

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

                  <img
                    style={{ width: 40, height: 40 }}
                    src="https://donghotantan.vn/images/config/zalo.png"
                    alt=""
                  />

                </a>
                <a href="#">

                  <img
                    style={{ width: 40, height: 40 }}
                    src="https://donghotantan.vn/images/config/message.png"
                    alt=""
                  />

                </a>

                <a href="#">
                  <img
                    style={{ width: 40, height: 40 }}
                    src="https://ssr-resource-prod.gosell.vn/images/icon/instagram-icon.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default UserLayout;
