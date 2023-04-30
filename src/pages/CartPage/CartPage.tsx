import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Table,
} from "antd";
import Item from "antd/es/list/Item";
import { ColumnsType } from "antd/es/table";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ProductModel } from "../../models/ProductModel";
import "./CartPage.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import ShoppingCart from "./components/ShoppingCart";
import { AppContext } from "../../App";
import axios from "axios";
import { type } from "os";
import form, { FormInstance } from "antd/es/form";
import {
  ShoppingCartOutlined,
  FilterFilled,
  InfoCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import { log } from "console";
import { json } from "stream/consumers";
const onChange = (value: number) => {
  console.log("changed", value);
};

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const cartProductsDumpData = [
  {
    id: 1,
    price: 125000,
    productName: "Product 1",
    quantity: 1,
    productThumbnailUrl:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/418x0/rolex-datejust-31-278285rbr-0005.png",
  },
  {
    id: 2,
    price: 25000,
    productName: "Product 2",
    quantity: 1,
    productThumbnailUrl:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/418x0/rolex-datejust-31-278285rbr-0005.png",
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const CartPage = () => {
  const [showInfoCard, setShowInfoCard] = useState(false);
  const { cartOrders, onChangeCartOrders } = useContext(AppContext);
  const [messageApi, contextHolder] = message.useMessage();

  const formRef = useRef<FormInstance<any>>(null);
  // clear form
  // const [deleteCard, setDeleteCard] = useState();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const onFinish = (values: any) => {
    console.log(values);
    console.log(cartOrders);
    localStorage.removeItem("cartOrders");

    formRef.current?.resetFields();

    const orderProducts = cartOrders.map((cardOrder: any) => {
      return {
        ProductId: cardOrder.Id,
        Quanlity: cardOrder.Quantity,
      };
    });
    console.log(orderProducts);

    const dataToPost = {
      Name: values.customerName,
      Email: values.email,
      Address: values.address,
      Phone: values.phone,
      orderProducts: orderProducts,
    };
    axios
      .post("https://localhost:7182/api/Orders/CreateOrder", dataToPost)
      .then((result) => {
        console.log(result);

        if (result.status === 200) {
          formRef.current?.resetFields();
          onChangeCartOrders([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeQuantity = (quantity: number, index: number) => {
    const productsTmp = [...cartOrders];

    const orderProduct = productsTmp[index];

    orderProduct.Quantity = quantity;
    orderProduct.TotalPrice = quantity * orderProduct.Price;
    onChangeCartOrders(productsTmp);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      width: 100,
      align: "center",
      render: (url) => (
        <img
          className="card-product-thumbnail"
          alt="productThumnail"
          src={url}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "Name",
      key: "Name",
      render: (name, product) => (
        <div>
          {name} ({product.Stock})
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (value, product, index) => {
        return (
          <InputNumber
            min={1}
            max={product.Stock}
            value={value}
            onChange={(val) => onChangeQuantity(val, index)}
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      render: (price) => moneyFormatter.format(price),
    },
    {
      title: "Total Price",
      dataIndex: "Price",
      key: "Price",
      render: (totallPrice, record) => moneyFormatter.format(totallPrice),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (value, product, index) => (
        <DeleteOutlined style={{ fontSize: 20 }} />
      ),
    },
  ];

  const totalProductsprice = cartOrders.reduce(
    (preVal: any, currentVal: any) => {
      console.log(preVal, currentVal);
      return preVal + (currentVal.TotalPrice ?? 0);
    },
    0
  );
  //formRef.current.re
  //console.log(cartOrders);
  return (
    <>
      <div className="small-container cart-page">
        {contextHolder}

        <Table
          pagination={false}
          columns={columns}
          dataSource={cartOrders}
          footer={() => (
            <div style={{ fontWeight: "bold" }}>
              <div style={{ position: "relative" }}>
                <span style={{ color: "grey" }}>Total Products Price: </span>{" "}
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  {moneyFormatter.format(totalProductsprice)}
                </span>
              </div>

              <br />

              <div style={{ position: "relative" }}>
                <span style={{ color: "grey" }}>Ship: </span>
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  $0
                </span>
              </div>

              <br />
              <hr style={{ width: "100%" }} />
              <br />

              <div style={{ position: "relative" }}>
                <span style={{ color: "grey" }}>Total Price: </span>{" "}
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  {moneyFormatter.format(totalProductsprice)}
                </span>
              </div>

              <br />
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  <button onClick={() => setShowInfoCard(true)}>Buy Now</button>
                </span>
              </div>
              <br />
              <br />
              {showInfoCard && (
                <>
                  <Row>
                    <Col span={12}>
                      <Form
                        ref={formRef}
                        onFinish={onFinish}
                        {...layout}
                        name="nest-messages"
                        //onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                      >
                        <Form.Item
                          name={"customerName"}
                          label="CustomerName"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name={"email"}
                          label="Email"
                          rules={[{ type: "email" }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item name={"address"} label="Address">
                          <Input />
                        </Form.Item>

                        <Form.Item name="phone" label="Phone">
                          <Input />
                        </Form.Item>

                        <Form.Item
                          wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                        >
                          <Button
                            onClick={success}
                            style={{
                              color: "white",
                              backgroundColor: "black",
                              fontWeight: "bold",
                            }}
                            type="primary"
                            htmlType="submit"
                          >
                            BUY NOW
                          </Button>

                          <Button
                            onClick={() => setShowInfoCard(false)}
                            style={{
                              color: "white",
                              backgroundColor: "black",
                              fontWeight: "bold",
                              margin: 10,
                            }}
                            type="primary"
                            htmlType="submit"
                          >
                            CANCEL
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                    <Col span={12}>
                      <span style={{ fontSize: 20 }}>
                        PHƯƠNG THỨC THANH TOÁN
                      </span>
                      <div>
                        <span>Quý khách vui lòng chuyển tài khoản:</span>
                        <br />
                        <span>
                          Ngân hàng Vietcombank - Đào Tấn Phước :
                          <span style={{ fontWeight: "bold" }}>
                            1111009999999 Chi nhánh Thành Phố Hồ Chí Minh
                          </span>
                          <br />
                          <span>
                            Quý khách có thể chỉ cần đặt cọc trước một phần và
                            thanh toán toàn đầy đủ sau khi nhận hàng.
                          </span>
                          <br />
                          <span>
                            Mọi thắc mắc vui lòng liên hệ:{" "}
                            <span style={{ color: "red" }}>0909970879 </span>
                            để được hỗ trợ
                          </span>
                        </span>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default CartPage;
