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
  Row,
  Select,
  Switch,
  Tabs,
  TabsProps,
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

const onChangee = (key: string) => {
  console.log(key);
};

const MyOrder = () => {
  return <p>Phuoc ne</p>;
};

const { RangePicker } = DatePicker;
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
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
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
    children: `Content of Tab Pane 2`,
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
