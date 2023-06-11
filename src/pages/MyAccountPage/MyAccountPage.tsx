/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  TabsProps,
  Tag,
  UploadFile,
  UploadProps,
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import {
  MenuUnfoldOutlined,
  AimOutlined,
  UserOutlined,
  AntDesignOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import "./MyAccountPage.css";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import moment, { updateLocale } from "moment";
import axios from "axios";
import Upload, { RcFile } from "antd/es/upload";
import { render } from "@testing-library/react";
import { error } from "console";
import { LoadingOutlined } from '@ant-design/icons';

const MyOrder = () => {
  const moneyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
  const OrderAll = () => {
    const { currentToken } = useContext(AppContext);
    const formRef = useRef<FormInstance<any>>(null);
    const [orderByUser, setOrderByUser] = useState<any[]>([]);
    // chuyen trang
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(2);
    // closed

    // loading
    const [loading, setLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    //closed


    const handleCancelOrder = (orderId: number) => {
      axios
        .post(`https://localhost:7182/api/Orders/DeleteOrder`, null, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
          },
          params: {
            id: orderId
          }
        })
        .then((result) => {
          const updatedOrderByUser = orderByUser.map((order) => {
            if (order.Id === orderId) {
              return { ...order, Status: -1 }; // Thay đổi trạng thái thành -1 (Đang chờ hủy)
            }
            return order;
          });
          setOrderByUser(updatedOrderByUser);
          setLoading(true)
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
    }
    // closed


    // Lấy dữ liệu đơn hàng (chuyen trang)
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      axios
        .get(`https://localhost:7182/api/Orders/GetOrdersByUserId`, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
          },
        })
        .then((result) => {
          setOrderByUser(result.data);
          setFilteredProducts(result.data.slice(0, pageSize));
        })
        .catch((error) => {
          console.log(error);
        })
    }, [currentToken, pageSize]);
    // close

    // Lọc dữ liệu đơn hàng theo trang và kích thước trang
    const filterData = (page: number, data: any[]) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setFilteredProducts(data.slice(startIndex, endIndex));
    };

    // Xử lý sự kiện chuyển trang
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      filterData(page, orderByUser);
    };

    function StatusOrder(status: number) {
      switch (status) {
        case -2:
          return (<Tag color="error">Đã Hủy</Tag>);
        case -1:
          return (<Tag color="warning">Chờ Hủy</Tag>);
        case 0:
          return (<Tag color="processing">Chờ xác nhận</Tag>);
        case 1:
          return (<Tag color="lime">Đang chuẩn bị</Tag>);
        case 2:
          return (<Tag color="lime">Đang Giao</Tag>);
        default:
          return (<Tag color="success">Đã Giao</Tag>);
      }
    }

    const orders = filteredProducts.map((order) => {
      const products = order.OrderProducts.map((product: any) => {
        return (
          <div style={{ padding: 10 }}>
            <Card type="inner" title="Sản phẩm" extra={<a href="#">More</a>}>
              <div className="card-myacc-responsive" style={{ display: 'flex', justifyContent: "space-between" }}>
                <p className="name-fontSize-responsive" style={{ width: "10%" }} ><img style={{ width: 100, height: 100, objectFit: "cover" }} src={product.ProductImage} alt="" /></p>
                <p className="name-fontSize-responsive" style={{ width: "25%" }}> {product.ProductName}</p>
                <p className="name-fontSize-responsive" style={{ width: "10%" }}>Số lượng: {product.Quantity}</p>
                <p className="name-fontSize-responsive" style={{ width: "15%" }}>{moneyFormatter.format(product.Price)}</p>
              </div>
            </Card>
          </div>
        );
      }
      );

      // tổng tiền 
      const totalPrice = order.OrderProducts.reduce((total: any, product: any) => {
        return total + product.Price * product.Quantity;
      }, 0);
      // closed

      // message

      // closed
      const confirm = (e: any) => {
        console.log(e);
        message.success('Hủy đơn thành công');
      };

      const cancel = (e: any) => {
        console.log(e);
        message.error('Thoát');
      };
      return (
        <Card style={{ marginTop: 16 }} type="inner" title={`Mã đơn hàng #${order.Id} `}>
          <div >
            {products}
            <div className="Container-myacc-orderStatus-address" style={{ display: 'flex', justifyContent: "space-between" }}>
              <div style={{ padding: 26, display: 'flex', flexDirection: "column" }}>
                <p style={{ padding: 5, fontSize: 15 }}>
                  <span className="name-fontSizeLable-responsive" style={{ fontWeight: 700 }}>Trạng thái:</span> {StatusOrder(order.Status)}
                </p>
                <p style={{ padding: 5, fontSize: 15 }}>
                  <span className="name-fontSizeLable-responsive" style={{ fontWeight: 700 }}>Nhận hàng vào:</span> {order.UpdatedAt}
                </p>
                <p style={{ padding: 5, fontSize: 15 }}>
                  <span className="name-fontSizeLable-responsive" style={{ fontWeight: 700 }}>Địa chỉ:</span> {order.Address}
                </p>
                <p style={{ padding: 5, fontSize: 15 }}>
                  <span className="name-fontSizeLable-responsive" style={{ fontWeight: 700 }}>Tổng tiền :</span> {moneyFormatter.format(totalPrice)}
                </p>
              </div>
              <Popconfirm
                title="HỦy đơn"
                description="Bạn có chắc muốn hủy đơn hàng ?"
                onConfirm={() => { handleCancelOrder(order.Id) }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="btn-myacc-exit-order"
                  style={{ backgroundColor: "#000000", color: "#fff", marginTop: "8%" }}
                  disabled={order.Status == 0 ? false : true}

                // onClick={() => { handleCancelOrder(order.Id) }}
                >
                  {loading && (
                    <div className="overlaySpin">
                      <Spin indicator={antIcon} />;
                    </div>
                  )} Hủy Đơn
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Card>
      );
    });

    return (
      <>
        {orders}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orderByUser.length}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: "center" }}
        />
      </>
    );
  };

  // tab đã hủy
  const ExitOrder = () => {
    const [exitOrderProducts, setExitOrderProducts] = useState<any[]>([])
    const { currentToken } = useContext(AppContext);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      axios
        .get(`https://localhost:7182/api/Orders/GetOrdersByUserId`, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
          }
        })
        .then((result) => {
          setExitOrderProducts(result.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }, [currentToken])

    function StatusOrder(status: number) {
      switch (status) {
        case -2:
          return (<Tag color="error">Đã Hủy</Tag>);
        case -1:
          return (<Tag color="warning">Chờ Hủy</Tag>);
        case 0:
          return (<Tag color="processing">Chờ xác nhận</Tag>);
        case 1:
          return (<Tag color="lime">Đang chuẩn bị</Tag>);
        case 2:
          return (<Tag color="lime">Đang Giao</Tag>);
        default:
          return (<Tag color="success">Đã Giao</Tag>);
      }
    }


    const orders = exitOrderProducts
      .filter((order) => order.Status === -2)
      .map((order) => {
        const products = order.OrderProducts.map((product: any) => {
          return (
            <div className="container-card-responsive-order" style={{ padding: 10 }}>
              <Card className="card-responsive-order" type="inner" title="Sản phẩm" extra={<a href="#">More</a>}>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <p><img src={product.ProductImage} alt="" /></p>
                  <p>{product.ProductName}</p>
                  <p>Số lượng: {product.Quantity}</p>
                  <p>{moneyFormatter.format(product.Price)}</p>
                </div>
              </Card>
            </div>
          );
        });

        return (
          <Card style={{ marginTop: 16 }} type="inner" title={`Mã đơn hàng #${order.Id} `}>
            <div>
              {products}

              <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div style={{ padding: 26, display: 'flex', flexDirection: "column" }}>
                  <p style={{ padding: 5 }}>
                    Trạng thái: {StatusOrder(order.Status)}
                  </p>
                  <p style={{ padding: 5 }}>Nhận hàng vào: {order.UpdatedAt}</p>
                  <p style={{ padding: 5 }}>Địa chỉ: {order.Address}</p>
                  <p style={{ padding: 5 }}>Tổng giá tiền:  </p>
                </div>

              </div>
            </div>
          </Card>
        );
      });
    return (
      <>
        {orders}
      </>
    );
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: <OrderAll />,
    },
    {
      key: "2",
      label: `Đã Hủy`,
      children: <ExitOrder />,
    },
  ];

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

const AddressOrder = () => {
  const { currentToken, currentUser, baseApi, loadUser } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provices, setProvices] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [addressForm] = Form.useForm();
  const base_api = "https://provinces.open-api.vn/api";

  function markRequireAll(query: string) {
    const words = query.split(/\s+/);
    return words.map((w) => `+${w}`).join(" ");
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const saveAddress = async (values: any) => {
    const userAddress = `${values["address"]}, ${values["ward"]}, ${values["district"]}, ${values["provice"]}`;
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
          loadUser()
          addressForm.resetFields();
          setIsModalOpen(false);
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
  const handleCancel = () => {
    setIsModalOpen(false);
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
  return (
    <>
      <div
        style={{
          border: "1px solid #000000",
          paddingTop: 30,
          paddingLeft: 20,
        }}
        className="confirm-order"
      >
        <Descriptions title="Địa chỉ của tôi">
          <div style={{ width: "70%" }}>
            {" "}
            <p>{currentUser.FullName}</p>
            <div
              style={{
                borderLeft: "2px solid #000000",
                paddingLeft: 5,
                marginLeft: 5,
              }}
            >
              {currentUser.Phone}
            </div>
          </div>

          <div>
            <a onClick={showModal}>Cập nhật</a>
            <Modal
              title="Cập nhật địa chỉ"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              className="modal-update-address"
            >
              <Form
                name="FormAddress"
                form={addressForm}
                onFinish={saveAddress}
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
          <br />
          <div>
            <p>{currentUser.Address}</p>
          </div>
        </Descriptions>
      </div>
    </>
  );
};

const { TextArea } = Input;

const InfoAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, setCurrentUser, baseApi, loadUser } = useContext(AppContext);
  const { currentToken, setCurrentToken } = useContext(AppContext);
  const [infoForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    infoForm.setFieldsValue({
      name: currentUser.FullName,
      email: currentUser.Email,
      dob: moment(currentUser.DateOfBirth),
      phone: currentUser.Phone,
    });
  }, [
    currentUser.DateOfBirth,
    currentUser.Email,
    currentUser.FullName,
    currentUser.Phone,
    infoForm,
  ]);
  const saveProfile = async (values: any) => {
    message.open({ key: "save", content: "Saving...", type: "loading" });
    const dataPost = {
      Id: currentUser.Id,
      Address: currentUser.Address,
      Avatar: currentUser.Avatar,
      FullName: values["name"],
      Email: values["email"],
      DateOfBirth: moment(values["dob"]).format("YYYY-MM-DD"),
      Phone: values["phone"],
    };
    axios
      .post(`${baseApi}/Accounts/UpdateUserInfo`, dataPost, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          message.open({
            key: "save",
            content: "Cập nhật thành công",
            type: "success",
          });
          loadUser()
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
  const changePassword = async (values: any) => {
    message.open({ key: "change", content: "Changing...", type: "loading" });
    axios
      .post(
        `${baseApi}/Accounts/Changepassword`,
        {
          Id: currentUser.Id,
          Password: values["oldPassword"],
          NewPassword: values["newPassword"],
        },
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
            key: "change",
            content: "Cập nhật thành công. Vui lòng đăng nhập lại",
            type: "success",
          });
          passwordForm.resetFields();
          setCurrentUser(null);
          setCurrentToken(null);
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      })
      .catch((error) => {
        message.open({
          key: "change",
          content: "Lỗi: " + error.response.data,
          type: "error",
        });
      });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
      </div>
      <Row>
        <Col flex={3}>
          <div style={{ paddingTop: 30 }}>
            <Form
              form={infoForm}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              onFinish={saveProfile}
            >
              <Form.Item
                style={{ color: "#000000" }}
                label={<span style={{ color: "#000000" }}>Họ và Tên:</span>}
                name="name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Địa chỉ mail:</span>}
                name="email"
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#000000" }}>Ngày Sinh:</span>}
                name="dob"
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#000000" }}>Số điện thoại:</span>}
                name="phone"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "#000000" }}>Ghi chú:</span>}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Button
                htmlType="submit"
                style={{
                  color: "#fff",
                  backgroundColor: "#000000",
                  marginLeft: 96,
                }}
              >
                Lưu thay đổi
              </Button>
            </Form>
          </div>
        </Col>
        <Col flex={2}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Mật khẩu:
          </span>
          <br />
          <KeyOutlined style={{ fontSize: 20 }} /> ********* {"     "}
          <Button
            onClick={showModal}
            style={{
              fontSize: 10,
              color: "#fff",
              backgroundColor: "#000000",
            }}
          >
            Cập nhật
          </Button>
          <Modal
            className="change-password"
            footer={null}
            title="Thay đổi mật khẩu"
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <Form
              form={passwordForm}
              onFinish={changePassword}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 1200 }}
            >
              <Form.Item
                label="Mật khẩu cũ "
                name="oldPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu cũ" },
                  {
                    pattern: new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/
                    ),
                    message: "Vui lòng nhập đúng yêu cầu",
                  },
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                  {
                    pattern: new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/
                    ),
                    message: "Vui lòng nhập đúng yêu cầu",
                  },
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Không trùng với mật khẩu mới");
                    },
                  }),
                ]}
              >
                <Input.Password type="password" />
              </Form.Item>
              <Button
                htmlType="submit"
                style={{
                  color: "#fff",
                  backgroundColor: "#000000",
                  marginLeft: 96,
                }}
              >
                Lưu thay đổi
              </Button>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Card>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span>
        <MenuUnfoldOutlined style={{ fontSize: 20 }} /> Đơn hàng của tôi
      </span>
    ),
    children: <MyOrder />,
  },
  {
    key: "2",
    label: (
      <span>
        <AimOutlined /> Địa chỉ đặt hàng
      </span>
    ),
    children: <AddressOrder />,
  },
  {
    key: "3",
    label: (
      <span>
        <UserOutlined /> Thông tin tài khoản
      </span>
    ),
    children: <InfoAccount />,
  },
];
// image

const MyAccountPage = () => {
  // anh avartar upload
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [visibleTab, setVisibleTab] = useState(false);
  return currentUser ? (
    <>
      <div style={{ marginLeft: 50, padding: 20 }}>
        <Upload
          accept="image/png"
          beforeUpload={(file) => {
            console.log(file);
            return false;
          }}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
        <h2>{currentUser.FullName}</h2>
      </div>

      <Tabs
        className="responsive-tab-myAcc"
        // style={{
        //   marginLeft: 60,
        //   marginRight: "8%",
        //   //padding: 50,
        //   paddingTop: 30,
        //   paddingBottom: 50,
        //   paddingLeft: 0
        // }}
        tabPosition={"left"}
        type="card"
        defaultActiveKey="1"
        //size="large"
        items={items}
      />
    </>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate("/login")}>
          LOGIN
        </Button>
      }
    />
  );
};

export default MyAccountPage;
