import { Button, Checkbox, Form, Input } from "antd";
import { useContext, useMemo, useState } from "react";
import { Layout } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import axios from "axios";
import { url } from "inspector";

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
    <div
      className="container-login"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("https://robbreport.com/wp-content/uploads/2023/03/Rolex.jpg?w=1000")`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="item-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="Email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              style={{ color: "#fff", backgroundColor: "green" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default PageLogin;
