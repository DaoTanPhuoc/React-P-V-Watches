import { Avatar, Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import {
    MenuUnfoldOutlined,
    AimOutlined,
    UserOutlined,
    AntDesignOutlined,
    KeyOutlined,
} from "@ant-design/icons";
const AdminSettingDas = () => {
    const onFinish = (values: any) => {
        console.log(values);
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
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ width: "100%" }}>
            {/* <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'website']} label="Website">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form> */}


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
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                style={{ maxWidth: 600 }}

                            >
                                <Form.Item
                                    style={{ color: "#000000" }}
                                    label={<span style={{ color: "#000000" }}>Họ và Tên</span>}
                                    name="name"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Địa chỉ mail</span>}
                                    name="email"
                                >
                                    <Input type="email" />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Ngày Sinh</span>}
                                    name="dob"
                                >
                                    <DatePicker />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Số điện thoại</span>}
                                    name="phone"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={<span style={{ color: "#000000" }}>Ghi chú</span>}
                                >
                                    <TextArea rows={4} />
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
                            className="change-password"
                            footer={null}
                            title="Thay đổi mật khẩu"
                            open={isModalOpen}
                            onCancel={handleCancel}
                        >
                            <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
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