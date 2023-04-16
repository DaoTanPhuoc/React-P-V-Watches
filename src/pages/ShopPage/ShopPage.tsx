import {
  Alert,
  Button,
  Card,
  Checkbox,
  notification,
  Pagination,
  Slider,
  Space,
  Tag,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./ShopPage.css";
import { Col, Row } from "antd";
import { Image } from "antd";
import {
  ShoppingCartOutlined,
  FilterFilled,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { Drawer } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SliderMarks } from "antd/es/slider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductModel } from "../../models/ProductModel";
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

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // (chuyen trang)
  useEffect(() => {
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

  const filterData = (page: number, data: ProductModel[]) => {
    let count = 1;
    const productsTmp: ProductModel[] = [];
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
        cartOrder.Quantity += 1;
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
    <>
      <>
        <Space>
          <Button type="primary" onClick={showDrawer}>
            <p style={{ color: "black" }}>
              <FilterFilled className="btn-filter" /> Filter
            </p>
          </Button>
        </Space>
        <Drawer
          title="VP-Watches"
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          {/* brand */}
          <p
            color="black"
            style={{ fontWeight: "bold", textAlign: "center", margin: 15 }}
          >
            Brand
          </p>
          <Checkbox.Group style={{ width: "100%" }} onChange={onChangeCheckBox}>
            <Row>
              <Col span={8}>
                <Checkbox value="A">Rolex</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="B">Citizen</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="C">Orient</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="D">Omega</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">Hublot</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="E">Chanel</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>

          <p
            color="black"
            style={{ fontWeight: "bold", textAlign: "center", margin: 15 }}
          >
            Price Range
          </p>
          <>
            <Slider marks={marks} step={null} defaultValue={37} />
          </>
        </Drawer>
      </>
      <div>
        <Card title="Card Title">
          {filteredProducts.map((watchItem) => (
            <Card.Grid style={gridStyle} key={watchItem.Id}>
              <Image
                onClick={() =>
                  navigate(
                    `/productdetail/${watchItem.Id}/${watchItem.BrandId}/${watchItem.CaseSize}`
                  )
                }
                style={{ height: 250, cursor: "pointer" }}
                rootClassName="card-item-image"
                width={250}
                src={watchItem.Image}
                alt="Rolex Datejust"
                preview={false}
              />
              {/* <Button
                icon={<ShoppingCartOutlined />}
                style={{ margin: 20 }}
                size={"large"}
              >
                Add to cart
              </Button> */}
              <Meta style={{ padding: 10 }} title={watchItem.Name} />
              <Meta style={{ padding: 10 }} title={watchItem.Price} />
              <Meta
                style={{ padding: 10 }}
                title={watchItem.Stock == 0 ? "het hang" : <br />}
              />
              {/* <div>het hang</div> */}
              <Context.Provider value={contextValue}>
                {contextHolder}
                {watchItem.Stock != 0 ? (
                  <Button
                    className="btn-shopping"
                    icon={<ShoppingCartOutlined />}
                    style={{ margin: 25 }}
                    size={"large"}
                    onClick={() => {
                      addToCart(watchItem);
                    }}
                  >
                    Add to cart
                    {/* `/cart/${watchItem.Id}/${watchItem.BrandId}/${watchItem.CaseSize}` */}
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
    </>
  );
};

export default ShopPage;
