import { Button, Checkbox, Form, Input, message, Tabs, TabsProps } from "antd";
import { useContext, useMemo, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";
import "./PageLogin.css";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PageLogin = () => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const {isAuthenticatedAdmin, setIsAuthenticatedAdmin} = useContext(AppContext);

  const onFinish = async (values: any) => {
    message.open({type:'loading', content:'Đang đăng nhập...', key: 'login'})
    axios.post(
      "https://localhost:7182/api/Accounts/Login",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res: any)=>{
      if(res.status === 200){
        localStorage.setItem("userToken", res.data.token);
        message.open({type:'success', content:'Đăng nhập thành công!', key: 'login'})
        const userInfo: any = await jwtDecode(res.data.token);
        const role = userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        if(role ==="User"){
          navigate('/');
        }
        else if(role === "Admin"){
          setIsAuthenticatedAdmin(true)
          navigate('/admin')
        }
      }
    }).catch(error=>{
      message.open({type:'error', content:'Đăng nhập thất bại: '+error.message, key: 'login'})
    })
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
        layout = "vertical"
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
          rules={[{ required: true, message: "Please input your Email!" }, {type:'email', message: "Please input valid Email!"}]}
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
          name='button'
        >
          <Button htmlType="submit" className="login-form-button">Đăng Nhập</Button>
        </Form.Item>
        <FormItem>
          <span style={{ color: "#fff", marginLeft: 15 }}>
            Nếu như bạn chưa có tài khoản? <a href="#">Đăng Ký</a>{" "}
          </span>{" "}
        </FormItem>
      </Form>
    </div>
  );
};
export default PageLogin
