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
  Button,
  Drawer,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  SearchOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Header, Content } from "antd/es/layout/layout";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./UserLayout.css";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { ProductModel } from "../models/ProductModel";
import logo from '../assets/1.png'
const { Search } = Input;

interface Props {
  children: React.ReactNode;
}

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const UserLayout = () => {

  // responsive 
  const [visible, setVisible] = useState(false);
  const [activeMenuRes, setActiveMenuRes] = useState('1');

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleMenuClick = (e: any) => {
    setActiveMenuRes(e.key);
    onClose();
  };

  //

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

    // if (value.toLowerCase() === 'rolex') {
    //   window.location.href = '/FilterProductsByRolex';
    //   return;
    // }

    // if (value.toLowerCase() === 'hublot') {
    //   window.location.href = '/FilterProductsByHublot';
    //   return;
    // }

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
              <Link to={`/ProductDetail/${item.BrandName}/${item.Code}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.Image} alt={item.Name} style={{ width: 50, height: 50, objectFit: "cover", marginRight: '5px' }} />
                  <div>
                    <div className="name-search-header" style={{ fontWeight: 600, textOverflow: 'ellipsis' }}>{item.Name}</div>
                    <div style={{ color: "#dbaf56" }}>{moneyFormatter.format(item.Price)}</div>
                  </div>
                </div>
              </Link>
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

  // closed
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
                  <p><a href="/ShopFilterPriceOne">100 triệu đến 150 triệu</a></p>
                  <p><a href="/ShopFilterPriceTwo">150 triệu đến 200 triệu</a></p>
                  <p><a href="/ShopFilterPriceThree">200 triệu đến 250 triệu</a></p>
                  <p><a href="/ShopFilterPriceFour">Trên 250 triệu</a></p>
                </div>
                <div className="grid__item">
                  <h3>Đường Kính</h3>
                  <p><a href="/CaseSizeLessThan29">Dưới 29MM</a></p>
                  <p><a href="/CaseSize29to37">29MM - 37MM</a></p>
                  <p><a href="/CaseSize37to42">37MM - 42MM</a></p>
                  <p><a href="/CaseSizeOver42">Trên 42MM</a></p>
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

    <>
      <span className="btn-responsive" onClick={showDrawer}>
        <MenuOutlined style={{ color: "#fff", fontSize: "15vw" }} />
      </span>
      <Drawer
        title={
          <div>
            <img
              src={logo}
              style={{
                textAlign: "center",
                width: 200,
                height: 120,
                // margin: "16px 24px 16px 0",
                objectFit: "cover",
                marginLeft: "20%"
              }} />

          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <span style={{ fontSize: '5vw' }} onClick={onClose}>x</span>
          </Space>
        }
      >
        <Menu
          style={{ fontSize: '5vw' }}
          mode="inline"
          defaultSelectedKeys={[activeMenu]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">
            <Link to="/">
              <span style={{ fontSize: '5vw' }}>TRANG CHỦ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/shop">
              <span style={{ fontSize: '5vw' }}>SẢN PHẨM</span>
            </Link>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            title={<span>
              <span style={{ fontSize: '5vw' }}>ĐỒNG HỒ</span>
            </span>}
          >
            <Menu.Item key="3">
              <Link to={`/shopman/1`}><span style={{ fontSize: '5vw' }}>ĐỒNG HỒ NAM</span></Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/shopwoman/2`}><span style={{ fontSize: '5vw' }}>ĐỒNG HỒ Nữ</span></Link>
            </Menu.Item>
            <Menu.Item key="5"><span style={{ fontSize: '5vw' }}>ĐỒNG HỒ Đôi</span></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="6">
            <Link to="/news">
              <span style={{ fontSize: '5vw' }}>TIN TỨC</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <span style={{ fontSize: '5vw' }}>GIỚI THIỆU</span>
          </Menu.Item>
        </Menu>
      </Drawer>
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
            className="logo-header"
            // src="https://benhviendongho.com/wp-content/uploads/2019/05/744px-Rolex_logo.svg.png"
            src={logo}
            style={{
              float: "left",
              width: 200,
              height: 150,
              margin: "16px 24px 16px 0",
              objectFit: "contain",
            }} />

          <Menu
            className="Menu-in-web"
            // theme="light"
            style={{
              backgroundColor: "#000",
              // responsive
              minWidth: 0,
              flex: "auto"
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
                // label: <span style={{ color: "#fff" }}>ĐỒNG HỒ NAM</span>,
                label: (
                  <Link to={`/shopman/1`}>
                    <span style={{ color: "#fff" }}>ĐỒNG HỒ NAM</span>
                  </Link>
                ),
              },
              {
                key: 4,
                label: (
                  <Link to={`/shopwoman/2`}>
                    <span style={{ color: "#fff" }}>ĐỒNG HỒ NỮ</span>
                  </Link>
                ),
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
                label: <span style={{ color: "#fff" }}>GIỚI THIỆU</span>,
                onMouseEnter: () => {
                  setHoverMenu(3);
                },
                onMouseLeave: () => {
                  setHoverMenu(0);
                },
              },
            ]} />
          <Space size={"large"}>
            <AutoComplete
              className="search-header"
              style={{ width: 250 }}
              options={options}
              onSearch={handleSearch}
              allowClear={true}
              autoFocus={false}
              placeholder="Tìm kiếm sản phẩm"
            >
              <Input suffix={<SearchOutlined className="icon-search-resp" />} />
            </AutoComplete>
            <Link to="/cart">
              <Badge count={cartOrders.length}>
                {/* <Avatar shape="square" size="large" /> */}
                <ShoppingCartOutlined className="shopping-cart-res" style={{ fontSize: 28, color: "#fff" }} />
              </Badge>
            </Link>
            {currentToken && currentUser ? (
              <Dropdown menu={{ items: userItemMenu }}>
                <Avatar
                  src={currentUser.Avatar}
                  shape="circle"
                  style={{ fontSize: 24, margin: "25px 0" }} />
              </Dropdown>
            ) : (
              <Link to="/login">
                <UserOutlined
                  className="avatar-header-res"
                  style={{ fontSize: 24, margin: "25px 0", color: "#fff" }} />
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
                    <a href="/">Trang chủ</a>
                  </li>
                  <li>
                    <a href="/shop">Sản phẩm</a>
                  </li>
                  <li>
                    <a href="/news">Tin tức</a>
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
                      alt="" />

                  </a>
                  <a href="#">

                    <img
                      style={{ width: 40, height: 40 }}
                      src="https://donghotantan.vn/images/config/message.png"
                      alt="" />

                  </a>

                  <a href="#">
                    <img
                      style={{ width: 40, height: 40 }}
                      src="https://ssr-resource-prod.gosell.vn/images/icon/instagram-icon.png"
                      alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Layout>
    </>
  );
};

export default UserLayout;
