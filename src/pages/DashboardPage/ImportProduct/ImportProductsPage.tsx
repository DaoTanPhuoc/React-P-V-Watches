import React, { useContext, useEffect, useState } from 'react'
import "./ImportProductsPage.css"
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Upload, UploadProps } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Table, { ColumnsType, } from 'antd/es/table';
import { AppContext } from '../../../App';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import moment, { updateLocale } from "moment";

const ImportProductsPage = () => {
    // format money
    const moneyFormatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    // closed
    const { baseApi, currentToken } = useContext(AppContext);
    const [data, setData] = useState<DataType[]>([])
    const [suppliers, setSuppliers] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalCSV, setModalCSV] = useState(false)
    const [fileList, setFileList] = useState<any[]>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChangeFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        return false;
    }
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
    const fetchSupplier = () => {
        axios.get(`${baseApi}/Suppliers`, { headers: { 'Authorization': `Bearer ${currentToken}` } }).then(res => setSuppliers(res.data))
    }
    useEffect(() => {
        fetchData()
        fetchSupplier()
    }, [baseApi])
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
            render: ((Total: number) => moneyFormatter.format(Total))
        },
        {
            title: 'Người nhập',
            dataIndex: 'FullName',
        },
        {
            title: 'Ngày nhập',
            dataIndex: 'CreatedAt',
            render: (CreatedAt) => {
                return moment(CreatedAt).format("DD MMMM YYYY");
            }
        },
    ];

    const onFinish = (values: any) => {
        message.open({ key: 'save', content: "Đang nhập...", type: 'loading' })
        axios.post(`${baseApi}/Imports`, values, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        }).then(() => {
            message.open({ key: 'save', content: "Nhập thành công!", type: 'success' })
            fetchData()
        }).catch(err => message.open({ key: 'save', content: "Lỗi: " + err.response.data, type: 'error' }))
    };
    const toggleCSV = () => setModalCSV(!modalCSV)
    const uploadCSV = (values: any) => {
        message.open({ key: 'upload', content: 'Đang xử lý...', type: 'loading' })
        const formData = new FormData()
        formData.append("supplierId", values["supplierId"]);
        formData.append("file", values["file"].file);
        axios.post(`${baseApi}/Imports/ImportFromFile`, formData, {
            headers: {
                'Authorization': `Bearer ${currentToken}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            message.open({ key: 'upload', content: 'Thành công', type: 'success' })
            fetchData();
            setModalCSV(false)
        }).catch(error => {
            message.open({ key: 'upload', content: 'Thất bại: ' + error.response.data, type: 'error' })
        })
    }
    return (
        <div className="container-import-products">
            <div className="header-import-products">
                <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23, textTransform: "uppercase", paddingTop: 20 }}>
                    Quản lý hóa đơn nhập
                </h4>
                <Space direction='vertical'>
                    <Button onClick={showModal} style={{
                        color: "#fff",
                        backgroundColor: "#000000",
                        marginTop: 30
                    }} type="primary">
                        Nhập sản phẩm
                    </Button>
                    <Button onClick={toggleCSV} style={{
                        color: "#fff",
                        backgroundColor: "#000000",
                        marginTop: 30
                    }} type="primary">
                        Nhập sản phẩm CSV
                    </Button>
                </Space>
            </div>
            <div className="content-import-products">
                <Modal footer={null} title="Nhập sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                                    placeholder="Chọn nhà cung cấp"
                                    style={{ width: '100%', marginBottom: 10 }}
                                    options={suppliers.map(supplier => ({ label: supplier.Name, value: supplier.Id }))}
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
                                                    initialValue={100000}
                                                    {...restField}
                                                    name={[name, 'Price']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                                                >
                                                    <Input placeholder="Giá" type='number' />
                                                </Form.Item>
                                                <Form.Item
                                                    initialValue={1}
                                                    {...restField}
                                                    name={[name, 'Quantity']}
                                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                                >
                                                    <Input placeholder="Số lượng" type='number' />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button style={{ color: "#fff", backgroundColor: "#000000" }} type="dashed" onClick={() => add()} block icon={<PlusOutlined style={{ color: "#fff" }} />}>
                                                Lên đơn
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
            <Modal
                footer={null}
                title="Nhập sản phẩm"
                onCancel={toggleCSV}
                open={modalCSV}
            >
                <Form
                    onFinish={uploadCSV}
                >
                    <Form.Item
                        name='supplierId'
                        initialValue={1}
                    >
                        <Select
                            placeholder="Chọn nhà cung cấp"
                            style={{ width: '100%', marginBottom: 10 }}
                            options={suppliers.map(supplier => ({ label: supplier.Name, value: supplier.Id }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="file"
                    >
                        <Upload
                            accept='.csv'
                            fileList={fileList}
                            onChange={onChangeFile}
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            {fileList.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Xác nhận</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ImportProductsPage