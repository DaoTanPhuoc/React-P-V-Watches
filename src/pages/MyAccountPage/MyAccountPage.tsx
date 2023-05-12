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
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  TabsProps,
  Tag,
  TreeSelect,
} from "antd";
import React, { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <p>Đào Tấn Phước</p>
            <div
              style={{
                borderLeft: "2px solid #000000",
                paddingLeft: 5,
                marginLeft: 5,
              }}
            >
              0909970879
            </div>
          </div>

          <div>
            <a onClick={showModal}>Cập nhật</a>
            <Modal
              title="Cập nhật địa chỉ"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              className="modal-update-address"
            >
              <Form>
                <Form.Item name="name" label="Địa chỉ">
                  <Input placeholder="Nhập địa chỉ mới" />
                  <Button
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
              Số 5 ,Đường nguyễn trung ngạn Phường Bến Nghé, Quận 1, TP. Hồ Chí
              Minh
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
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Họ và Tên">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ Email">
                <Input type="email" />
              </Form.Item>

              <Form.Item label="Ngày Sinh">
                <DatePicker />
              </Form.Item>

              <Form.Item label="Sô điện thoại">
                <Input />
              </Form.Item>
              <Form.Item label="Ghi chú">
                <TextArea rows={4} />
              </Form.Item>
              <Button
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
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 1200 }}
            >
              <Form.Item label="Mật khẩu cũ ">
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item label="Mật khẩu mới">
                <Input.Password type="password" />
              </Form.Item>
              <Form.Item label="Nhập lại mật khẩu">
                <Input.Password type="password" />
              </Form.Item>
              <Button
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

  return (
    <>
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
  );
};

export default MyAccountPage;
