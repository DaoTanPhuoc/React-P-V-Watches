import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="container">
      <div
        style={{
          width: 630,
          height: 650,
          position: "absolute",
          transform: "Translate(-50%,-50%)",
          top: "50%",
          left: "50%",
        }}
        className="background"
      >
        <div
          style={{
            height: 200,
            width: 200,
            position: "absolute",
            borderRadius: "50%",
          }}
          className="shape"
        ></div>
        <div
          style={{
            height: 200,
            width: 200,
            position: "absolute",
            borderRadius: "50%",
          }}
          className="shape"
        ></div>
      </div>
      <Form
        style={{
          width: 550,
          height: 700,
          backgroundColor: "rgba(255,255,255,0.13)",
          position: "absolute",
          transform: "Translate(-50%,-50%)",
          top: "50%",
          left: "50%",
          borderRadius: 10,
          backdropFilter: "blur(10)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: "0px 30px",
        }}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        layout="vertical"
      >
        <h3
          style={{
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 2,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Đăng Ký
        </h3>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please input valid Email!" },
          ]}
          label="Email"
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật Khẩu"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Nhập mật Khẩu"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Nhập lại Password"
          />
        </Form.Item>

        <FormItem name="FullName" label="Họ Tên">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Nhập họ tên"
          />
        </FormItem>

        <FormItem name="Address" label="Địa chỉ">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Nhập địa chỉ"
          />
        </FormItem>

        <FormItem name="Phone" label="Số điện thoại">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Nhập địa chỉ"
          />
        </FormItem>

        <Form.Item name="button">
          <Button htmlType="submit" className="login-form-button">
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
