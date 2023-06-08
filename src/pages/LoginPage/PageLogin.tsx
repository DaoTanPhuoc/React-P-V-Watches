import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";
import "./PageLogin.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { log } from "console";

const PageLogin = () => {
  const navigate = useNavigate();
  const { setCurrentToken, baseApi } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const onFinish = async (values: any) => {
    message.open({
      type: "loading",
      content: "Đang đăng nhập...",
      key: "login",
    });
    axios
      .post(`${baseApi}/Accounts/Login`, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res: any) => {
        if (res.status === 200) {
          const token = await res.data;

          if (values["remember"] === true) {
            localStorage.setItem("userToken", token);
            setCurrentToken(token);
          } else {
            setCurrentToken(token);
          }
          message.open({
            type: "success",
            content: "Đăng nhập thành công!",
            key: "login",
          });
          const userInfo: any = await jwtDecode(token);
          const role =
            userInfo[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          if (role === "User") {
            navigate("/");
          } else if (role === "Admin") {
            navigate("/admin");
          }
        }
      })

      .catch((error) => {
        message.open({
          type: "error",
          content: "Đăng nhập thất bại: " + error.response.data,
          key: "login",
        });
      });
  };
  // forgotpassword
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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} không đúng định dạng!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  //
  return (
    <div className="container">
      <div
        style={{
          width: 430,
          height: 520,
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
        name="normal_login"
        style={{
          width: 400,
          height: 540,
          backgroundColor: "rgba(255,255,255,0.13)",
          position: "absolute",
          transform: "Translate(-50%,-50%)",
          top: "50%",
          left: "50%",
          borderRadius: 10,
          backdropFilter: "blur(10)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: "50px 35px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <h3
          style={{
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 3,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Đăng Nhập
        </h3>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please input valid Email!" },
          ]}
          label={<span style={{ color: "#fff" }}>Email</span>}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span style={{ color: "#fff" }}>Mật Khẩu</span>}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox style={{ color: "#fff" }}>Lưu đăng nhập?</Checkbox>
        </Form.Item>
        <Form.Item>
          <span style={{ color: "#fff" }}>
            {/* <Link to="/forgotPassword">Quên mật khẩu? </Link>{" "} */}
            <a onClick={showModal}>Quên mật khẩu ?</a>
          </span>{" "}
          <Modal className="forgotpassword-form-inputEmail" footer={null} title="Nhập email đã đăng ký" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
              {...layout}
              layout="vertical"
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item style={{ marginLeft: "20%" }} name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                <Input placeholder='Nhập địa chỉ email đăng kí ?' />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
                  Xác nhận
                </Button>

              </Form.Item>
            </Form>
          </Modal>
          <Button htmlType="submit" className="login-form-button">
            Đăng Nhập
          </Button>
        </Form.Item>
        <FormItem>
          <span style={{ color: "#fff", marginLeft: 15 }}>
            Nếu như bạn chưa có tài khoản? <Link to="/register">Đăng Ký</Link>{" "}
          </span>{" "}
        </FormItem>
      </Form>
    </div>
  );
};
export default PageLogin;
