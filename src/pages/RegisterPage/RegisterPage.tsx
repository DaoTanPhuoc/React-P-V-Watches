import { Button, DatePicker, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./RegisterPage.css";
import { useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { baseApi } = useContext(AppContext)
  const [registerForm] = Form.useForm()
  const navigate = useNavigate()

  const Register = async (values: any) => {
    console.log(values);
    message.open({ key: 'register', content: "Đang đăng ký...", type: 'loading' })
    axios.post(`${baseApi}/accounts/register`, values).then(() => {
      message.open({ key: 'register', content: "Đăng ký thành công!", type: 'success' })
      navigate('/login')
    }).catch(error => {
      console.log(error);

      message.open({ key: 'register', content: "Lỗi: " + error.response.data, type: 'error' })
    })
  }
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
        form={registerForm}
        style={{
          width: 450,
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
        initialValues={{ remember: true }}
        onFinish={Register}
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
          name="Email"
          rules={[
            { required: true, message: "Vui lòng nhập Email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
          label={<span style={{ color: "#fff" }}>Email</span>}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="FullName" label={<span style={{ color: "#fff" }}>Họ Tên</span>} rules={[{ required: true, message: "Vui lòng nhập họ tên" }, { pattern: new RegExp(/[^a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u), message: "Tên không hợp lệ" }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Nhập họ tên"
          />
        </Form.Item>
        <Form.Item
          name="Password"
          label={<span style={{ color: "#fff" }}>Mật khẩu</span>}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="ConfirmPassword"
          label={<span style={{ color: "#fff" }}>Nhập lại mật khẩu</span>}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }, ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("Password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Không trùng với mật khẩu");
            },
          }),]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Nhập lại Password"
          />
        </Form.Item>
        <FormItem name="Phone" label={<span style={{ color: "#fff" }}>Số điện thoại</span>} rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }, {
          pattern: new RegExp(
            "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
          ),
          message: "Số điện thoại không hợp lệ",
        },]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Số điện thoại"
          />
        </FormItem>

        <Form.Item>
          <Button htmlType="submit" className="login-form-button">
            Đăng Ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
