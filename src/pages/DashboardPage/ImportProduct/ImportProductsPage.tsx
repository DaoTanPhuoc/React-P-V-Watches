import React, { useContext, useEffect, useState } from 'react'
import "./ImportProductsPage.css"
import { Button, Form, Input, InputNumber, message, Modal, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/es/table';
import { AppContext } from '../../../App';
import axios from 'axios';

const ImportProductsPage = () => {
    const { baseApi, currentToken } = useContext(AppContext);
    const [data, setData] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
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
    const fetchData = () => {
        axios.get(`${baseApi}/Imports`, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(res => {
            setData(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    // danh sach dat hang
    interface DataType {
        Id: number;
        Total: number;
        FullName: string;
        SupplierName: string;
        CreateAt: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Nhà Cung Cấp',
            dataIndex: 'SupplierName',
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'Total',
        },
        {
            title: 'Người nhập',
            dataIndex: 'FullName',
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'CreatedAt',
        },
    ];

    const onFinish = (values: any) => {
        message.open({ key: 'save', content: "Đang nhập...", type: 'loading' })
        axios.post(`${baseApi}/Imports`, values, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(res => {
            switch (res.status) {
                case 204:
                    message.open({ key: 'save', content: "Nhập thành công!", type: 'success' })
                    fetchData()
                    break;

                default:
                    break;
            }
        }).catch(err => message.open({ key: 'save', content: "Lỗi: " + err.data, type: 'error' }))
    };
    return (
        <div className="container-import-products">
            <div className="header-import-products">
                <h4 style={{
                    color: "#4963AF",
                    fontSize: 22,
                    paddingTop: 30,
                    paddingBottom: 30,
                }}>Quản Lý Hóa Đơn Nhập</h4>
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
                            <Form.Item
                                name='supplierId'
                                initialValue={1}
                            >
                                <Select
                                    style={{ width: '100%', marginBottom: 10 }}
                                    options={[
                                        { value: 1, label: 'Rolex Factory' },
                                        { value: 2, label: 'Lucy' },
                                        { value: 3, label: 'yiminghe' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.List name="ImportProducts">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'ProductCode']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}
                                                >
                                                    <Input placeholder="Mã sản phẩm" />
                                                </Form.Item>
                                                <Form.Item
                                                    initialValue={1}
                                                    {...restField}
                                                    name={[name, 'Price']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                                >
                                                    <Input placeholder="Số lượng" type='number' />
                                                </Form.Item>
                                                <Form.Item
                                                    initialValue={1}
                                                    {...restField}
                                                    name={[name, 'Quantity']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập đơn giá' }]}
                                                >
                                                    <Input placeholder="Đơn giá nhập" type='number' />
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
                    <Table loading={loading} columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    )
}

export default ImportProductsPage