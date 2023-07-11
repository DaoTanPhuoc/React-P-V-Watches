import { Avatar, Button, Col, Form, Input, message, Modal, Row } from 'antd'
import { useContext, useEffect, useState } from 'react'
import {
    AntDesignOutlined,
    KeyOutlined,
} from "@ant-design/icons";
import { AppContext } from '../../../App';
import axios from 'axios';
const AdminSettingDas = () => {
    const [form] = Form.useForm()
    const { currentToken, currentUser, baseApi } = useContext(AppContext);
    const onFinish = (values: any) => {
        message.open({ key: 'save', content: 'Đang xử lý', type: 'loading' })
        axios.post(`${baseApi}/Accounts/UpdateUserInfo`, {
            ...values, Id: currentUser.Id
        }, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(() => {
            message.open({ key: 'save', content: 'Thành công', type: 'success' })
        }).catch(error => {
            message.open({ key: 'save', content: 'Thất bại: ' + error.response.data, type: 'error' })
        })
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const changePassword = (values: any) => {
        message.open({ key: 'password', content: 'Đang xử lý...', type: 'loading' })
        axios.post(`${baseApi}/Accounts/ChangePassword`, {
            ...values, Id: currentUser.Id
        }, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(() => {
            message.open({ key: 'password', content: 'Thành công', type: 'success' })
        }).catch((error) => {
            message.open({ key: 'password', content: 'Thất bại: ' + error.respose.data, type: 'error' })
        })
    }
    useEffect(() => {
        currentUser && form.setFieldsValue({
            FullName: currentUser.FullName,
            Email: currentUser.Email,
            PhoneNumber: currentUser.PhoneNumber,
        })
    }, [currentUser, form])
    return (
        <div style={{ width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3%"
                }}
            >
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                />
            </div>
            <div style={{ paddingLeft: "20%", paddingTop: "2%" }}>
                <Row gutter={[48, 48]}>
                    <Col span={12}>
                        <div style={{ paddingTop: 20 }}>
                            <Form
                                onFinish={onFinish}
                                form={form}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                style={{ maxWidth: 600 }}

                            >
                                <Form.Item
                                    style={{ color: "#000000" }}
                                    label={<span style={{ color: "#000000" }}>Họ và Tên</span>}
                                    name="FullName"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Địa chỉ mail</span>}
                                    name="Email"
                                >
                                    <Input type="email" />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Số điện thoại</span>}
                                    name="PhoneNumber"
                                >
                                    <Input />
                                </Form.Item>
                                <Button
                                    htmlType="submit"
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
                    <Col span={12}>
                        <span
                            style={{
                                fontSize: 16,
                                fontWeight: 500,
                            }}
                        >
                            Mật khẩu
                        </span>
                        <br />
                        <KeyOutlined style={{ fontSize: 20 }} /> ********* {"     "}
                        <Button
                            onClick={toggleModal}
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
                            onCancel={toggleModal}
                        >
                            <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                                onFinish={changePassword}
                                layout="horizontal"
                                style={{ maxWidth: 1200 }}
                            >
                                <Form.Item
                                    label="Mật khẩu cũ "
                                    name="oldPassword"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập mật khẩu cũ" },
                                        {
                                            pattern: new RegExp(
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/
                                            ),
                                            message: "Vui lòng nhập đúng yêu cầu",
                                        },
                                    ]}
                                >
                                    <Input.Password type="password" />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập mật khẩu mới" },
                                        {
                                            pattern: new RegExp(
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,32}$/
                                            ),
                                            message: "Vui lòng nhập đúng yêu cầu",
                                        },
                                    ]}
                                >
                                    <Input.Password type="password" />
                                </Form.Item>
                                <Form.Item
                                    label="Nhập lại mật khẩu"
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: "Vui lòng nhập lại mật khẩu" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("newPassword") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject("Không trùng với mật khẩu mới");
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password type="password" />
                                </Form.Item>
                                <Button
                                    htmlType="submit"
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
            </div>



        </div>
    )
}

export default AdminSettingDas