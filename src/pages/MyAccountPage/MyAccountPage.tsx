import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Result,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  TabsProps,
  Tag,
  TreeSelect,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  MenuUnfoldOutlined,
  AimOutlined,
  UserOutlined,
  AntDesignOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import ImgCrop from "antd-img-crop";
import "./MyAccountPage.css";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import axios from "axios";

const onChangee = (key: string) => {
  console.log(key);
};

const MyOrder = () => {
  const OrderAll = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#E8EAE9",
            border: "1px solid #BAC0BD",
            marginTop: 10,
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
      </>
    );
  };

  const ExitOrder = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#E8EAE9",
            border: "1px solid #BAC0BD",
            marginTop: 10,
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
              <Tag color="error">Đã hủy</Tag>
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
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

const AddressOrder = () => {
  const { currentToken, currentUser } = useContext(AppContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provices, setProvices] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [wards, setWards] = useState<any[]>([])
  const [addressForm] = Form.useForm()
  const base_api = "https://provinces.open-api.vn/api"

  function markRequireAll(query: string) {
    const words = query.split(/\s+/)
    return words.map(w => `+${w}`).join(' ')
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const saveAddress = async (values: any) => {
    const userAddress = `${values['address']} ${values['ward']} ${values['district']} ${values['provice']}`
    axios.post("https://localhost:7182/api/Accounts/UpdateUserInfo",
      { ...currentUser, Address: userAddress }
      , {
        headers: {
          "Access-Control-Allow-Origin": '*',
          'Authorization': `Bearer ${currentToken}`
        }
      }).then(res => {
        switch (res.status) {
          case 204:
            message.open({ 'key': 'save', content: "Cập nhật thành công", type: 'success' })
            break;
          case 400:
            message.open({ 'key': 'save', content: "Cập nhật không thành công: " + res.data, type: 'error' })
            break;
          default:
            break;
        }
        addressForm.resetFields();
        setIsModalOpen(false)
      }).catch(err => console.log(err))
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchProvices = async () => {
    const res = await axios.get(`${base_api}/p`)
    setProvices(res.data)
  }

  const searchProvice = async (name: string) => {
    addressForm.resetFields(["district", "ward"])
    const res = await axios.get(`${base_api}/p/search/`, { params: { q: markRequireAll(name) } })
    const district = await res.data[0].code
    await fetchDistricts(district)
  }
  const searchDistrict = async (name: string) => {
    addressForm.resetFields(["ward"])
    const res = await axios.get(`${base_api}/d/search/`, { params: { q: markRequireAll(name) } })
    const district = await res.data[0].code
    await fetchWards(district)
  }

  const fetchDistricts = async (value: number) => {
    const res = await axios.get(`${base_api}/p/${value}`, { params: { depth: 2 } })
    setDistricts(res.data.districts)
  }
  const fetchWards = async (value: number) => {
    const res = await axios.get(`${base_api}/d/${value}`, { params: { depth: 2 } })
    setWards(res.data.wards)
  }
  useEffect(() => {
    fetchProvices()
  }, [])
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
          <div style={{ width: "87%" }}>
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
                <Form.Item name='provice' label="Tỉnh/ Thành phố" rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}>
                  <Select placeholder="Tỉnh..." onChange={searchProvice}>
                    {provices && provices.map((p: any) => (
                      <Select.Option key={p.code} value={p.name}>{p.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="district" label="Quận/ Huyện" rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}>
                  <Select placeholder="Huyện..." onChange={searchDistrict}>
                    {districts && districts.map((p: any) => (
                      <Select.Option key={p.code} value={p.name}>{p.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="ward" label="Xã" rules={[{ required: true, message: "Vui lòng chọn dữ liệu" }]}>
                  <Select placeholder="Xã...">
                    {wards && wards.map((p: any) => (
                      <Select.Option key={p.code} value={p.name}>{p.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập dữ liệu" }]}>
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
            <p>
              {currentUser.Address}
            </p>
          </div>
        </Descriptions>
      </div>
    </>
  );
};

const { TextArea } = Input;

const InfoAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AppContext)
  const { currentToken, setCurrentToken } = useContext(AppContext)
  const [infoForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const navigate = useNavigate()
  useEffect(() => {
    infoForm.setFieldsValue({
      name: currentUser.FullName,
      email: currentUser.Email,
      dob: moment(currentUser.DateOfBirth),
      phone: currentUser.Phone
    })
  }, [])
  const saveProfile = async (values: any) => {
    message.open({ 'key': 'save', content: "Saving...", type: 'loading' })
    const dataPost = {
      Id: currentUser.Id,
      Address: currentUser.Address,
      Avatar: currentUser.Avatar,
      FullName: values['name'],
      Email: values['email'],
      DateOfBirth: moment(values['dob']).format("YYYY-MM-DD"),
      Phone: values['phone'],
    }
    axios.post("https://localhost:7182/api/Accounts/UpdateUserInfo", dataPost, {
      headers: {
        "Access-Control-Allow-Origin": '*',
        'Authorization': `Bearer ${currentToken}`
      }
    }).then(res => {
      switch (res.status) {
        case 204:
          message.open({ 'key': 'save', content: "Cập nhật thành công", type: 'success' })
          break;
        case 400:
          message.open({ 'key': 'save', content: "Cập nhật không thành công: " + res.data, type: 'error' })
          break;
        default:
          break;
      }
    }).catch(err => console.log(err))
  }
  const changePassword = async (values: any) => {
    message.open({ 'key': 'change', content: "Changing...", type: 'loading' })
    axios.post("https://localhost:7182/api/Accounts/Changepassword",
      {
        Id: currentUser.Id,
        Password: values['oldPassword'],
        NewPassword: values['newPassword']
      }, {
      headers: {
        "Access-Control-Allow-Origin": '*',
        'Authorization': `Bearer ${currentToken}`
      }
    }).then(res => {
      switch (res.status) {
        case 204:
          message.open({ 'key': 'change', content: "Cập nhật thành công. Vui lòng đăng nhập lại", type: 'success' })
          passwordForm.resetFields()
          setCurrentUser(null)
          setCurrentToken(null)
          localStorage.removeItem("userToken")
          navigate('/login')
          break;
        case 400:
          message.open({ 'key': 'change', content: "Cập nhật không thành công: " + res.data, type: 'error' })
          break;
        default:
          break;
      }
    }).catch(err => { })
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
              <Form.Item label="Họ và Tên" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ Email" name="email">
                <Input type="email" />
              </Form.Item>

              <Form.Item label="Ngày Sinh" name="dob">
                <DatePicker />
              </Form.Item>

              <Form.Item label="Sô điện thoại" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Ghi chú">
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
            title="Basic Modal"
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
              <Form.Item label="Mật khẩu cũ " name="oldPassword" rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }, { pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/), message: "Vui lòng nhập đúng yêu cầu" }]}>
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item label="Mật khẩu mới" name='newPassword' rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }, { pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/), message: "Vui lòng nhập đúng yêu cầu" }]}>
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item label="Nhập lại mật khẩu" name="confirmPassword" rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu" }, ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Không trùng với mật khẩu mới');
                },
              }),]}>
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
  const [file, setFile] = useState("");
  const { currentUser, setCurrentUser } = useContext(AppContext)
  const navigate = useNavigate()
  return (
    currentUser ? <>
      <div style={{ marginLeft: "13%", padding: 20 }}>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
        <h2>Đào Tấn Phước</h2>
      </div>

      <Tabs
        style={{
          marginLeft: "10%",
          marginRight: "10%",
          padding: 50,
        }}
        tabPosition={"left"}
        type="card"
        defaultActiveKey="1"
        size="large"
        items={items}
        onChange={onChangee}
      />
    </>
      :
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => navigate('/login')}>LOGIN</Button>}
      />
  );
};

export default MyAccountPage;
