import React, { useState } from 'react'
import "./ImportProductsPage.css"
import { Button, Form, Input, InputNumber, Modal, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';

const ImportProductsPage = () => {

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
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    // danh sach dat hang
    interface DataType {
        key: React.Key;
        Total: number;
        UserId: string;
        Supplierld: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên User',
            dataIndex: 'UserId',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'Supplierld',
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'Total',
        },


    ];
    // dư lieu fake
    const data: DataType[] = [
        {
            key: '1',
            UserId: 'John Brown',
            Supplierld: 1,
            Total: 1000000000,
        },
        {
            key: '2',
            UserId: 'John Brown 2',
            Supplierld: 2,
            Total: 2000000000,
        },
        {
            key: '3',
            UserId: 'John Brown 3',
            Supplierld: 1,
            Total: 3000000000,
        },
    ];

    // close

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };
    return (
        <div className="container-import-products">
            <div className="header-import-products">
                <h4 style={{
                    color: "#4963AF",
                    fontSize: 22,
                    paddingTop: 30,
                    paddingBottom: 30,
                }}>Nhập sản phẩm</h4>
                <Button onClick={showModal} style={{
                    color: "#fff",
                    backgroundColor: "#000000",
                    marginTop: 30
                }} type="primary">
                    Nhập sản phẩm
                </Button>
            </div>
            <div className="content-import-products">
                <Modal footer={null} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className="form-import-products">
                        <Form
                            name="dynamic_form_nest_item"
                            onFinish={onFinish}
                            style={{ maxWidth: 600 }}
                            autoComplete="off"
                        >
                            <Form.List name="users">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                >
                                                    <Input placeholder="Mã sản phẩm" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'last']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                    <Input placeholder="Số lượng" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}

                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                    <Input placeholder="Đơn giá nhập" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}

                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                    <Select
                                                        defaultValue="lucy"
                                                        style={{ width: 120 }}
                                                        onChange={handleChange}
                                                        options={[
                                                            { value: 1, label: 'Rolex Factory' },
                                                            { value: 'lucy', label: 'Lucy' },
                                                            { value: 'Yiminghe', label: 'yiminghe' },
                                                        ]}
                                                    />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button style={{ color: "#fff", backgroundColor: "#000000" }} type="dashed" onClick={() => add()} block icon={<PlusOutlined style={{ color: "#fff" }} />}>
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button style={{ color: "#fff", backgroundColor: "#000000" }} type="primary" htmlType="submit">
                                    Nhập hàng
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <div className="table-import-products">
                    <h4 style={{
                        color: "#4963AF",
                        paddingTop: 30,
                        paddingBottom: 30,
                        fontSize: 22
                    }}>Danh sách sản phẩm nhập</h4>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}

export default ImportProductsPage