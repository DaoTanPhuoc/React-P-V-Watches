/* eslint-disable no-template-curly-in-string */
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Result,
  Row,
  Select,
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
      content: "Đặt hàng thành công",
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
    // giá trị mặc định địa chỉ của user 
    const defaultAddress = currentUser.Address;
    // closed
    const dataToPost = {
      Name: values.customerName,
      Email: values.email,
      //Address: addressOrder === "" ? currentUser.Address : addressOrder,// state
      Address: addressOrder === "" ? defaultAddress : addressOrder,
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
          // thông báo thành công
          success()
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
          style={{ width: 100, height: 100, objectFit: "cover" }}
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
  // cập nhật địa chỉ 
  const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
  const [provices, setProvices] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [addressForm] = Form.useForm();
  const base_api = "https://provinces.open-api.vn/api";
  //const [addressOrder, setAddressOrder] = useState(currentUser.Address)
  const [addressOrder, setAddressOrder] = useState("")

  function markRequireAll(query: string) {
    const words = query.split(/\s+/);
    return words.map((w) => `+${w}`).join(" ");
  }
  const showModalAddres = () => {
    setIsModalOpenAddress(true);
  };
  const saveAddress = async (values: any) => {
    const userAddress = `${values["address"]}, ${values["ward"]}, ${values["district"]}, ${values["provice"]}`;
    setAddressOrder(userAddress);
    axios
      .post(
        `${baseApi}/Accounts/UpdateUserInfo`,
        { ...currentUser, Address: userAddress },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          message.open({
            key: "save",
            content: "Cập nhật thành công",
            type: "success",
          });
          addressForm.resetFields();
          setIsModalOpenAddress(false);
        }
      })
      .catch((error) =>
        message.open({
          key: "save",
          content: "Lỗi: " + error.response.data,
          type: "error",
        })
      );
  };
  const handleCancelAddress = () => {
    setIsModalOpenAddress(false);
  };
  const fetchProvices = async () => {
    const res = await axios.get(`${base_api}/p`);
    setProvices(res.data);
  };

  const searchProvice = async (name: string) => {
    addressForm.resetFields(["district", "ward"]);
    const res = await axios.get(`${base_api}/p/search/`, {
      params: { q: markRequireAll(name) },
    });
    const district = await res.data[0].code;
    await fetchDistricts(district);
  };
  const searchDistrict = async (name: string) => {
    addressForm.resetFields(["ward"]);
    const res = await axios.get(`${base_api}/d/search/`, {
      params: { q: markRequireAll(name) },
    });
    const district = await res.data[0].code;
    await fetchWards(district);
  };

  const fetchDistricts = async (value: number) => {
    const res = await axios.get(`${base_api}/p/${value}`, {
      params: { depth: 2 },
    });
    setDistricts(res.data.districts);
  };
  const fetchWards = async (value: number) => {
    const res = await axios.get(`${base_api}/d/${value}`, {
      params: { depth: 2 },
    });
    setWards(res.data.wards);
  };
  useEffect(() => {
    fetchProvices();
  }, []);
  //

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className="small-container cart-page">
        {contextHolder}

        <Table
          // className="table-cart-responsive"
          scroll={{ x: true }}
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
                <div style={{ paddingTop: 50 }}>
                  <Row >
                    <Col span={14} style={{}}>
                      <span className="title-paymethod-responsive" style={{ fontSize: 20, margin: "8%" }}>
                        1. Thông tin đặt hàng
                      </span>
                      <Form
                        className="container-info-order-responsive"
                        ref={formRef}
                        onFinish={onFinish}
                        initialValues={{ customerName: currentUser.Name, email: currentUser.Email, phone: currentUser.Phone }}
                        {...layout}
                        name="nest-messages"
                        //onFinish={onFinish}
                        style={{ maxWidth: 600, marginTop: 50 }}
                        validateMessages={validateMessages}
                      >
                        <Form.Item
                          name={"customerName"}
                          label="Tên người nhận"
                          rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
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
                        <Form.Item name="address" label="Địa chỉ">
                          {/* <Input /> */}
                          <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            {/* <p>43 Nguyễn Chí Thanh,Ngọc Khánh, Ba Đình, Hà Nội</p> */}
                            <p className="address-info-order-responsive">{addressOrder === "" ? currentUser.Address : addressOrder}</p>
                            <a className="address-info-order-responsive" style={{ width: 86 }} onClick={showModalAddres}>Cập nhật</a>
                            <Modal
                              title="Cập Nhật Địa Chỉ"
                              open={isModalOpenAddress}
                              onCancel={handleCancelAddress}
                              footer={null}
                              className="modal-update-address-orders-responsive"
                            >
                              <Form
                                name="FormAddress"
                                form={addressForm}
                                onFinish={saveAddress}
                                layout="vertical"
                              >
                                <Form.Item
                                  name="provice"
                                  label="Tỉnh/ Thành phố"
                                  rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}
                                >
                                  <Select placeholder="Tỉnh..." onChange={searchProvice}>
                                    {provices &&
                                      provices.map((p: any) => (
                                        <Select.Option key={p.code} value={p.name}>
                                          {p.name}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="district"
                                  label="Quận/ Huyện"
                                  rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}
                                >
                                  <Select placeholder="Huyện..." onChange={searchDistrict}>
                                    {districts &&
                                      districts.map((p: any) => (
                                        <Select.Option key={p.code} value={p.name}>
                                          {p.name}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="ward"
                                  label="Xã"
                                  rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}
                                >
                                  <Select placeholder="Xã...">
                                    {wards &&
                                      wards.map((p: any) => (
                                        <Select.Option key={p.code} value={p.name}>
                                          {p.name}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="address"
                                  label="Địa chỉ"
                                  rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}
                                >
                                  <Input placeholder="Số nhà, Tên đường" />
                                </Form.Item>
                                <Form.Item>
                                  <Button
                                    htmlType="submit"
                                    style={{
                                      color: "#fff",
                                      backgroundColor: "#000000",
                                      marginTop: 20,
                                    }}
                                  >
                                    Cập nhật
                                  </Button>
                                </Form.Item>
                              </Form>
                            </Modal>
                          </div>
                        </Form.Item>

                        <Form.Item
                          wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                        >
                          <Button
                            // onClick={success}
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
                    <Col className="container-PaymentMethods" span={10}>
                      <span className="title-paymethod-responsive" style={{ fontSize: 20 }}>
                        2. PHƯƠNG THỨC THANH TOÁN
                      </span>
                      <div>
                        <span className="title2-paymethod-responsive" style={{ padding: 20 }}>Quý khách vui lòng chọn một hình thức thanh toán ở dưới:</span>
                        <br />

                        {/* <Checkbox.Group style={{ width: '100%' }} >
                          <Row>
                            <Col span={24}>
                              <Checkbox className="code-block" value="A">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ margin: 20 }}>Thanh toán qua ngân hàng</p>
                                  <img style={{ width: 60, height: 60, objectFit: "cover", margin: 10, marginLeft: 40 }} src="https://cdn-icons-png.flaticon.com/512/2910/2910254.png" alt="Bank Icon" />
                                </div>
                              </Checkbox>
                            </Col>
                            <Col span={24}>
                              <Checkbox className="code-block" value="B">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p style={{ margin: 20 }}>Thanh toán khi nhận hàng</p>
                                  <img style={{ width: 60, height: 60, objectFit: "cover", margin: 10, marginLeft: 40 }} src="https://cdn-icons-png.flaticon.com/512/5578/5578525.png" alt="Bank Icon" />
                                </div>
                              </Checkbox>
                            </Col>
                            <Col span={24}>
                              <Button style={{ backgroundColor: "#000000", color: "#fff", left: "25%", marginTop: 20 }}>Xác nhận</Button>
                            </Col>
                          </Row>
                        </Checkbox.Group> */}

                        <Radio.Group onChange={handleOptionChange} value={selectedOption}>
                          <Row>
                            <Col span={24}>
                              <Radio className="code-block" value="A">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p className="title-option-paymethod" style={{ margin: 20 }}>Thanh toán qua ngân hàng</p>
                                  <img style={{ width: 60, height: 60, objectFit: "cover", margin: 10, marginLeft: 40 }} src="https://cdn-icons-png.flaticon.com/512/2910/2910254.png" alt="Bank Icon" />
                                </div>
                              </Radio>
                            </Col>
                            <Col span={24}>
                              <Radio className="code-block" value="B">
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <p className="title-option-paymethod" style={{ margin: 20 }}>Thanh toán khi nhận hàng</p>
                                  <img style={{ width: 60, height: 60, objectFit: "cover", margin: 10, marginLeft: 40 }} src="https://cdn-icons-png.flaticon.com/512/5578/5578525.png" alt="Cash Icon" />
                                </div>
                              </Radio>
                            </Col>
                            <Col span={24}>
                              <Button className="btn-chose-payMethod" style={{ backgroundColor: "#000000", color: "#fff", left: "25%", marginTop: 20 }}>Xác nhận</Button>
                            </Col>
                          </Row>
                        </Radio.Group>


                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default CartPage;
