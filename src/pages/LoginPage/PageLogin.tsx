import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useMemo, useState } from "react";
import { Layout } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import axios from "axios";
import { url } from "inspector";
import FormItem from "antd/es/form/FormItem";
import "./PageLogin.css";
const { Header, Footer, Sider, Content } = Layout;

const PageLogin = () => {
  const { isAdminAuthenticated, setIsAdminAuthenticated } =
    useContext(AppContext);

  const onFinish = async (values: any) => {
    // if (values.username === "hau" && values.password === "hau") {
    //   const user = {
    //     username: "hau",
    //   };
    //   console.log(user);
    //   localStorage.setItem("user", JSON.stringify(user));
    //   setIsAuth(true);
    // }

    const res = await axios.post(
      "https://localhost:7182/api/Accounts/Login",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      localStorage.setItem("adminInfo", JSON.stringify(res.data));
      // window.location.reload();
      // setIsAdminAuthenticated(true);
      window.location.href = "/admin";
    }

    // const loginResult = await axios.post('/login', values);
    // if(loginResult.status === 200){
    //   localStorage.setItem("user", JSON.stringify(loginResult.data));
    //   setIsAuth(true);
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
          height: 520,
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
          name="Email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <label
            style={{
              display: "block",
              marginTop: 20,
              fontSize: 16,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Email
          </label>
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <label
            style={{
              display: "block",
              marginTop: 18,
              fontSize: 16,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Mật Khẩu
          </label>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          {/* <Button htmlType="submit" className="login-form-button">
            Log in
          </Button> */}
          <button className="login-form-button">Đăng Nhập</button>
        </Form.Item>
        <FormItem>
          <span style={{ color: "#fff", marginLeft: 15 }}>
            Nếu như bạn chưa có tài khoản? <a href="#">Đăng Ký</a>
          </span>{" "}
        </FormItem>
      </Form>
    </div>
  );
};
export default PageLogin;
