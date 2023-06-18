import { useContext } from 'react'
import "./ForgotPassword.css"
import { Button, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


const ForgotPasswordPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [form] = Form.useForm()
    const { baseApi } = useContext(AppContext)
    const onFinish = (values: any) => {
        message.open({ key: 'reset', content: 'Đang cập nhật...', type: 'loading' })
        const payload = {
            password: values['Password'],
            email: searchParams.get("email"),
            token: searchParams.get("token")
        }
        axios.post(`${baseApi}/accounts/ConfirmResetPassword`, {}, {
            params: payload
        }).then(res => {
            form.resetFields()
            message.open({ key: 'reset', content: 'Thành công', type: 'success' })
            window.location.href = "/login"
        }).catch((err) => {
            message.open({ key: 'reset', content: err.response.data, type: 'error' })
        })
    };
    return (
        <div style={{ margin: "10%" }}>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600, marginLeft: "18%", padding: 30 }}
                form={form}
            >
                <Form.Item
                    label="Nhập Password mới"
                    name="Password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }, {
                        pattern: new RegExp(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/
                        ),
                        message: "Vui lòng nhập đúng yêu cầu",
                    },]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập Password mới "
                    />
                </Form.Item>
                <Form.Item
                    label="Nhập lại Password"
                    name="rePassword"
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("Password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Không trùng với mật khẩu mới");
                        },
                    }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập lại Password mới"
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary' style={{ backgroundColor: 'cyan' }}>Xác nhận</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPasswordPage