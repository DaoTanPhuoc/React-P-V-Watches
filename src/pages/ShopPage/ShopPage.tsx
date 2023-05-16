import {
  Button,
  Card,
  notification,
  Pagination,
  Select,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./ShopPage.css";
import { Image } from "antd";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SliderMarks } from "antd/es/slider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AppContext } from "../../App";

// search filter
const initialList = {
  sortby: {
    Newest: true,
    Oldest: false,
    "Lowest Price": false,
    "Highest Price": false,
  },
  size: {
    "44mm": false,
    "32mm": true,
    "36mm": true,
    "40mm": false,
  },
  Movement: {
    automatic: false,
    "Quartz Watch": false,
  },
  brand: {
    Rolex: false,
    Omega: false,
    Hublot: false,
    Chanel: false,
  },
};

//
const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ShopContent = [
  "https://donghotantan.vn/images/products/manufactories//resized/tissot_1663842811.jpg.webp",
  "https://donghotantan.vn/images/products/manufactories//resized/citizen_1663842764.jpg.webp",
];

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const { Meta } = Card;

const marks: SliderMarks = {
  0: "0",
  20: "2000$",
  40: "3000$",
  60: "6000$",
  80: "8000$",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>100.000$</strong>,
  },
};

const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues);
};

const pageSize = 8;
const Context = React.createContext({ name: "Default" });

const ShopPage = () => {
  const navigate = useNavigate();

  const { cartOrders = [], onChangeCartOrders } = useContext(AppContext);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  // list product

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // (chuyen trang)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    axios
      .get(`https://localhost:7182/api/Products`)
      .then((result) => {
        setProducts(result.data);
        filterData(currentPage, result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    filterData(page, products);
  };

  const filterData = (page: number, data: any[]) => {
    let count = 1;
    const productsTmp: any[] = [];
    for (let i = (page - 1) * pageSize; i < data.length; i++) {
      if (count > pageSize || i === data.length) {
        break;
      }
      count++;
      productsTmp.push(data[i]);
    }
    setFilteredProducts(productsTmp);
  };

  const isShow = true;

  // product: OrderProductModel
  function addToCart(orderProduct: any) {
    try {
      const cartOrdersTmp = [...cartOrders];

      const cartOrder = cartOrdersTmp.find(
        (order: any) => order.Id === orderProduct.Id
      );
      if (cartOrder) {
        // cartOrder.Quantity += 1;
        cartOrder.TotalPrice = cartOrder.Quantity * cartOrder.Price;
      } else {
        orderProduct.Quantity = 1;
        orderProduct.TotalPrice = orderProduct.Price;
        cartOrdersTmp.push(orderProduct);
      }

      onChangeCartOrders(cartOrdersTmp);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <section className="ban_sec">
        <div className="container-ban">
          <div className="ban_img">
            <img
              style={{ height: 580, objectFit: "cover" }}
              src="https://theme.hstatic.net/200000596685/1000963076/14/home-banner-three-image.png?v=145"
              alt="banner"
            />
            <div className="ban_text">
              <strong>
                <span>Meeting current</span>
                <br /> needs now
              </strong>
              <p>
                You can prioritize a child’s mental, emotional, <br />
                behavioral, and physical health{" "}
              </p>
              <a href="#">Lend a hand</a>
            </div>
          </div>
        </div>
      </section>

      {/* filter */}
      <div className="Products-container">
        <div className="filter">
          <div className="filter-items">
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Thương Hiệu"
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
                  label: "Rolex",
                },
                {
                  value: 2,
                  label: "Channel",
                },
                {
                  value: 3,
                  label: "Orient",
                },
                {
                  value: 4,
                  label: "Hublot",
                },
              ]}
            />
          </div>
          <div className="filter-items">
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Sắp xếp"
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
                  label: "Tất cả",
                },
                {
                  value: 2,
                  label: "Giảm dần",
                },
                {
                  value: 3,
                  label: "Tăng dần",
                },
              ]}
            />
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <h4 style={{ fontWeight: "bold" }}>Watches For You!</h4>
        </div>
        <Card>
          {filteredProducts.map((watchItem) => (
            <Card.Grid style={gridStyle} key={watchItem.Id}>
              <Link to={`/ProductDetail/${watchItem.BrandName}/${watchItem.Code}`}>
                <Image
                  style={{ height: 250, cursor: "pointer" }}
                  rootClassName="card-item-image"
                  width={250}
                  src={watchItem.Image}
                  alt="Rolex Datejust"
                  preview={false}
                />
              </Link>
              {/* <Button
                icon={<ShoppingCartOutlined />}
                style={{ margin: 20 }}
                size={"large"}
              >
                Add to cart
              </Button> */}
              <h4 style={{ color: "#888888" }}>MSP {watchItem.Code}</h4>
              <h4 style={{ fontWeight: 600 }}>{watchItem.Name}</h4>
              <h4 style={{ color: "#dbaf56" }}>
                {moneyFormatter.format(watchItem.Price)}{" "}
              </h4>

              <Meta
                style={{ padding: 10, textTransform: "uppercase" }}
                title={watchItem.Stock === 0 ? "Hết Hàng" : <br />}
              />

              <Context.Provider value={contextValue}>
                {contextHolder}
                {watchItem.Stock !== 0 ? (
                  <Button
                    className="btn-shopping"
                    icon={<ShoppingCartOutlined style={{ color: "#fff" }} />}
                    style={{
                      margin: 25,
                      color: "#fff",
                      backgroundColor: "#000000",
                    }}
                    size={"large"}
                    onClick={() => {
                      addToCart(watchItem);
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                ) : (
                  ""
                )}
              </Context.Provider>
            </Card.Grid>
          ))}
        </Card>
        <Pagination
          style={{ textAlign: "center", padding: 35 }}
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={(page) => onChangePage(page)}
        />
      </div>
    </div>
  );
};

export default ShopPage;
