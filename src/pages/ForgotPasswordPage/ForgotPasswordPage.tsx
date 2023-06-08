import React, { useState } from 'react'
import "./ForgotPassword.css"
import { Button, Form, Input, Steps, message, theme } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const onFinish = (values: any) => {
    console.log(values);
};


// const steps = [
//     {
//         title: 'Nhập Email',
//         content: (
//             <Form
//                 {...layout}
//                 name="nest-messages"
//                 onFinish={onFinish}
//                 style={{ maxWidth: 600, marginLeft: "18%", padding: 30 }}
//                 validateMessages={validateMessages}
//             >
//                 <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
//                     <Input placeholder='Nhập địa chỉ email đăng kí ?' />
//                 </Form.Item>
//                 <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//                     {/* <Button style={{ backgroundColor: "#000000", color: "#fff" }} htmlType="submit">
//                         Xác nhận
//                     </Button> */}

//                 </Form.Item>
//             </Form>
//         )
//     },
//     {
//         title: 'Nhập Mật khẩu mới',
//         content: (
//             <Form
//                 {...layout}
//                 name="nest-messages"
//                 onFinish={onFinish}
//                 style={{ maxWidth: 600, marginLeft: "18%", padding: 30 }}
//                 validateMessages={validateMessages}
//             >
//                 <Form.Item
//                     label="Nhập Password mới"
//                     name="password"
//                     rules={[{ required: true, message: 'Please input your Password!' }]}
//                 >
//                     <Input
//                         prefix={<LockOutlined className="site-form-item-icon" />}
//                         type="password"
//                         placeholder="Nhập Password mới "
//                     />
//                 </Form.Item>
//                 <Form.Item
//                     label="Nhập lại Password"
//                     name="Repassword"
//                     rules={[{ required: true, message: 'Mời bạn nhập mật khẩu?' }]}
//                 >
//                     <Input
//                         prefix={<LockOutlined className="site-form-item-icon" />}
//                         type="password"
//                         placeholder="Nhập lại Password mới"
//                     />
//                 </Form.Item>
//             </Form>
//         )
//     },

// ];





const ForgotPasswordPage = () => {
    // const { token } = theme.useToken();
    // const [current, setCurrent] = useState(0);

    // const next = () => {
    //     setCurrent(current + 1);
    // };

    // const prev = () => {
    //     setCurrent(current - 1);
    // };

    // const items = steps.map((item) => ({ key: item.title, title: item.title }));

    // const contentStyle: React.CSSProperties = {
    //     lineHeight: '260px',
    //     textAlign: 'center',
    //     color: token.colorTextTertiary,
    //     backgroundColor: token.colorFillAlter,
    //     borderRadius: token.borderRadiusLG,
    //     border: `1px dashed ${token.colorBorder}`,
    //     marginTop: 16,
    // };
    return (
        <div style={{ margin: "10%" }}>
            {/* <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button style={{ backgroundColor: "#000000", color: "#fff" }} onClick={() => next()}>
                        Xác nhận
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button style={{ backgroundColor: "#000000", color: "#fff" }} onClick={() => message.success('Hoàn tất !')}>
                        Xác nhận
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px', backgroundColor: "#000000", color: "#fff" }} onClick={() => prev()}>
                        Lùi về
                    </Button>
                )}
            </div> */}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600, marginLeft: "18%", padding: 30 }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Nhập Password mới"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập Password mới "
                    />
                </Form.Item>
                <Form.Item
                    label="Nhập lại Password"
                    name="Repassword"
                    rules={[{ required: true, message: 'Mời bạn nhập mật khẩu?' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập lại Password mới"
                    />
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPasswordPage