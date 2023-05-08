import {
  Alert,
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Result,
  Row,
  Space,
  Table,
  Tabs,
  TabsProps,
  Tag,
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
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";

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
  const { currentUser, setCurrentUser } = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  // order status (modal antd)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen)
  // close order status

  // tab order status
  const onChange = (key: string) => {
    console.log(key);
  };

  // staus đặt hàng
  const ConfirmOrder = () => {
    const stausOrder = 1;
    // 1: chờ đặt hàng
    // 2: đã xác nhận
    // 3: đã hủy
    return (
      <div className="confirm-order-container">
        <div
          style={{ backgroundColor: "#E8EAE9", border: "1px solid #BAC0BD" }}
          className="order-id"
        >
          ID Đơn Hàng: #32131
        </div>
        <div
          style={{
            display: "flex",
            paddingBottom: 20,
            border: "1px solid #000000",
            paddingTop: 30,
          }}
          className="confirm-order"
        >
          <img
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5930g-010.png"
            alt=""
          />
          <div
            style={{
              // whiteSpace: "nowrap",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              width: 110,
            }}
          >
            <Descriptions.Item>
              PATEK PHILIPPE COMPLICATIONS 5930G-010s
            </Descriptions.Item>
          </div>
          <p style={{ paddingLeft: 20 }}>
            <span style={{ color: "#6f6e77" }}>Số lượng: </span>1
          </p>
          <div>
            <Space style={{ paddingLeft: 30 }} size={[0, 2]} wrap>
              {" "}
              <Tag color={stausOrder == 1 ? "processing" : "success"}>
                Chờ xác nhận
              </Tag>
            </Space>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
              paddingLeft: 20,
              color: "#33CC33",
            }}
          >
            Nhận hàng vào <Descriptions.Item>2018-04-24</Descriptions.Item>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
            }}
          >
            <Descriptions.Item>
              Số 06, Đường Cao Bát Quát, Phường Bến Nghé, Quận 1, Thành Phố Hồ
              Chí Minh
            </Descriptions.Item>
          </div>
          <div style={{ paddingLeft: 20, width: 125 }}>1.140.000.000 ₫</div>
          <div>
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                fontWeight: "bold",
                marginLeft: 30,
              }}
            >
              Hủy Đơn
            </Button>
          </div>
        </div>

        {/* 2 */}
        <div
          style={{
            backgroundColor: "#E8EAE9",
            border: "1px solid #BAC0BD",
            marginTop: 30,
          }}
          className="order-id"
        >
          ID Đơn Hàng: #32131
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #000000",
            paddingTop: 30,
          }}
          className="confirm-order"
        >
          <img
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src="https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png"
            alt=""
          />
          <div
            style={{
              // whiteSpace: "nowrap",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              width: 110,
            }}
          >
            <Descriptions.Item>
              PATEK PHILIPPE COMPLICATIONS 5930G-010s
            </Descriptions.Item>
          </div>
          <p style={{ paddingLeft: 20 }}>
            <span style={{ color: "#6f6e77" }}>Số lượng: </span>1
          </p>
          <div>
            <Space style={{ paddingLeft: 30 }} size={[0, 8]} wrap>
              {" "}
              <Tag color="success">Đã xác nhận</Tag>
            </Space>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
              paddingLeft: 20,
              color: "#33CC33",
            }}
          >
            Nhận hàng vào <Descriptions.Item>2018-04-24</Descriptions.Item>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
            }}
          >
            <Descriptions.Item>
              Số 5, Đường Nguyễn Trung Ngạn, Phường Bến Nghé, Quận 1, Thành Phố
              Hồ Chí Minh
            </Descriptions.Item>
          </div>
          <div style={{ paddingLeft: 20, width: 130 }}>360.000.000 đ</div>
          <div>
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                fontWeight: "bold",
                marginLeft: 30,
              }}
            >
              Hủy Đơn
            </Button>
          </div>
        </div>
        {/* 3 */}
        <div
          style={{
            backgroundColor: "#E8EAE9",
            border: "1px solid #BAC0BD",
            marginTop: 30,
          }}
          className="order-id"
        >
          ID Đơn Hàng: #32131
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #000000",
            paddingTop: 30,
          }}
          className="confirm-order"
        >
          <img
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src="https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png"
            alt=""
          />
          <div
            style={{
              // whiteSpace: "nowrap",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              width: 110,
            }}
          >
            <Descriptions.Item>
              PATEK PHILIPPE COMPLICATIONS 5930G-010s
            </Descriptions.Item>
          </div>
          <p style={{ paddingLeft: 20 }}>
            <span style={{ color: "#6f6e77" }}>Số lượng: </span>1
          </p>
          <div>
            <Space style={{ paddingLeft: 30 }} size={[0, 8]} wrap>
              {" "}
              <Tag color="success">Đã xác nhận</Tag>
            </Space>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
              paddingLeft: 20,
              color: "#33CC33",
            }}
          >
            Nhận hàng vào <Descriptions.Item>2018-04-24</Descriptions.Item>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
            }}
          >
            <Descriptions.Item>
              Số 5, Đường Nguyễn Trung Ngạn, Phường Bến Nghé, Quận 1, Thành Phố
              Hồ Chí Minh
            </Descriptions.Item>
          </div>
          <div style={{ paddingLeft: 20, width: 130 }}>360.000.000 đ</div>
          <div>
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                fontWeight: "bold",
                marginLeft: 30,
              }}
            >
              Hủy Đơn
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // status đơn đã hủy
  const ExitOrder = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#E8EAE9",
            border: "1px solid #BAC0BD",
            marginTop: 30,
          }}
          className="order-id"
        >
          ID Đơn Hàng: #32131
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #000000",
            paddingTop: 30,
          }}
          className="confirm-order"
        >
          <img
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src="https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png"
            alt=""
          />
          <div
            style={{
              // whiteSpace: "nowrap",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              width: 110,
            }}
          >
            <Descriptions.Item>
              PATEK PHILIPPE COMPLICATIONS 5930G-010s
            </Descriptions.Item>
          </div>
          <p style={{ paddingLeft: 20 }}>
            <span style={{ color: "#6f6e77" }}>Số lượng: </span>1
          </p>
          <div>
            <Space style={{ paddingLeft: 30 }} size={[0, 8]} wrap>
              {" "}
              <Tag color="error">Đã xác nhận</Tag>
            </Space>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
              paddingLeft: 20,
              color: "#33CC33",
            }}
          >
            Nhận hàng vào <Descriptions.Item>2018-04-24</Descriptions.Item>
          </div>
          <div
            style={{
              textOverflow: "ellipsis",
              width: 150,
            }}
          >
            <Descriptions.Item>
              Số 5, Đường Nguyễn Trung Ngạn, Phường Bến Nghé, Quận 1, Thành Phố
              Hồ Chí Minh
            </Descriptions.Item>
          </div>
          <div style={{ paddingLeft: 20, width: 130 }}>360.000.000 đ</div>
        </div>
      </>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Chờ xác nhận`,
      children: <ConfirmOrder />,
    },
    {
      key: "2",
      label: `Đã Hủy`,
      children: <ExitOrder />,
    },
  ];
  // close
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

  const removeOrderProduct = (index: number) => {
    const productsTmp = [...cartOrders];
    productsTmp.splice(index, 1); // Remove item by index
    console.log(productsTmp);

    onChangeCartOrders(productsTmp);
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
        <DeleteOutlined
          style={{ fontSize: 20 }}
          onClick={() => removeOrderProduct(index)}
        />
      ),
    },
  ];

  const totalProductsprice = cartOrders.reduce(
    (preVal: any, currentVal: any) => {
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
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      fontWeight: "bold",
                    }}
                    disabled={cartOrders.length == 0 ? true : false}
                    onClick={() => {
                      currentUser ? setShowInfoCard(true) : toggleModal()
                    }}
                  >
                    Mua Hàng
                  </Button>
                </span>
              </div>
              <Modal
                open={isModalOpen}
                onCancel={toggleModal}
                footer={null}
              >
                <Result
                  style={{ maxWidth: '30wv' }}
                  title="Bạn chưa đăng nhập vào hệ thống!"
                  subTitle="Vui lòng đăng nhập để tiếp tục"
                  extra={
                    <Button type="primary" onClick={() => navigate("/login")}>Đăng Nhập</Button>
                  }
                />
              </Modal>
              <br />
              <br />
              <br />
              {currentUser && showInfoCard && (
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

                        <Form.Item
                          name="phone"
                          label="Phone"
                          rules={[
                            {
                              pattern: new RegExp(
                                "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
                              ),
                              message: "Số điện thoại không hợp lệ",
                            },
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại",
                            },
                          ]}
                        >
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
                            disabled={cartOrders.length > 0 ? false : true}
                          >
                            Mua Hàng
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
                            Thoát
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
