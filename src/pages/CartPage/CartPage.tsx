/* eslint-disable no-template-curly-in-string */
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Result,
  Row,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useRef, useState } from "react";
import "./CartPage.css";
import { AppContext } from "../../App";
import axios from "axios";
import { FormInstance } from "antd/es/form";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


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
  const { cartOrders, onChangeCartOrders, baseApi, currentToken } = useContext(AppContext);
  const { currentUser } = useContext(AppContext)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  // order status (modal antd)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  // close
  const formRef = useRef<FormInstance<any>>(null);
  useEffect(() => {
    formRef.current?.setFieldsValue({
      customerName: currentUser.FullName,
      email: currentUser.Email,
      address: currentUser.Address,
      phone: currentUser.Phone
    })
  }, [currentUser])
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const onFinish = (values: any) => {
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
      .post(`${baseApi}/Orders/CreateOrder`, dataToPost, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      })
      .then((result) => {
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
      title: "Hình ảnh",
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
      title: "Tên sản phẩm",
      dataIndex: "Name",
      key: "Name",
      render: (name) => (
        <div>
          {name}
        </div>
      ),
    },
    {
      title: "Số lượng",
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
      title: "Đơn giá",
      dataIndex: "Price",
      key: "Price",
      render: (price) => moneyFormatter.format(price),
    },
    {
      title: "Tổng",
      dataIndex: "Price",
      key: "Price",
      render: (price) => moneyFormatter.format(price),
    },
    {
      title: "Chức năng",
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
                <span style={{ color: "grey" }}>Tổng tiền sản phẩm: </span>{" "}
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  {moneyFormatter.format(totalProductsprice)}
                </span>
              </div>

              <br />

              <div style={{ position: "relative" }}>
                <span style={{ color: "grey" }}>Vận chuyển: </span>
                <span style={{ position: "absolute", top: 0, right: 0 }}>
                  $0
                </span>
              </div>

              <br />
              <hr style={{ width: "100%" }} />
              <br />

              <div style={{ position: "relative" }}>
                <span style={{ color: "grey" }}>Tổng cộng: </span>{" "}
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
                    disabled={cartOrders.length === 0 ? true : false}
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
                    <Button style={{ backgroundColor: "#000000", color: "#fff" }} type="primary" onClick={() => navigate("/login")}>Đăng Nhập</Button>
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
                          label="Tên người nhận"
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

                        <Form.Item name="address" label="Địa chỉ">
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name="phone"
                          label="Số điện thoại"
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
