import { Button, message, Tabs, TabsProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Children, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../App';

const InvoiceWait = () => {
    const { baseApi, currentToken } = useContext(AppContext);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [orders, setOrders] = useState<Order[]>([])

    interface Order {
        Id: number;
        FullName: string;
        OrderProducts: any;
        Total: number;
        Address: string;
        Phone: string;
        Status: number;
    }
    const columns: ColumnsType<Order> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'Id',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'FullName',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'OrderProducts',
            render: (orderProducts: any[]) => (
                orderProducts.map(p =>
                    <img
                        src={p.ProductImage}
                        style={{ width: 100, height: 100, objectFit: "cover", margin: 15 }}
                        alt=""
                    />)
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'OrderProducts',
            render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
            </div>
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'Total',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'Address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'Phone',
        }
    ];
    const changeStatus = (status: number) => {
        if (selectedRowKeys.length === 0) return;
        message.open({ key: 'change', content: "Đang cập nhật...", type: 'loading' })
        axios.put(`${baseApi}/Orders/UpdateOrderStatus`, selectedRowKeys, {
            headers: {
                'Authorization': `Bearer ${currentToken}`
            },
            params: {
                status: status
            }
        }).then(res => {
            switch (res.status) {
                case 204:
                    message.open({ key: 'change', content: "Cập nhật thành công", type: 'success' })
                    break;
                default:
                    break;
            }
            fetchData();
            setSelectedRowKeys([])
        }).catch(err => {
            message.open({ key: 'change', content: "Lỗi: " + err.data, type: 'error' })
        })
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[]) => setSelectedRowKeys(selectedRowKeys),
    };
    const fetchData = () => {
        axios.get(`${baseApi}/Orders`, {
            headers: {
                'Authorization': `Bearer ${currentToken}`,
            },
        }).then(res => setOrders(res.data));
    }
    useEffect(() => {
        fetchData();
    }, [baseApi, currentToken])
    const Waitting = () => {
        // table đơn đang chờ xác nhận
        const data = orders.filter(order => order.Status === 0)
        // closed
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}
                    onClick={() => changeStatus(1)}
                >
                    Cập nhật
                </Button>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }

    const WaittingExit = () => {
        // table đơn đang chờ hủy
        const data = orders.filter(order => order.Status === -1)
        // closed
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}
                    onClick={() => changeStatus(0)}
                >
                    Cập nhật
                </Button>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }

    // Đang chuẩn bị hàng
    const PreparingGoods = () => {
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}
                    onClick={() => changeStatus(0)}
                >
                    Cập nhật
                </Button>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    // dataSource={}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }
    // closed

    // đã hoàn thành
    const Complete = () => {
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    // dataSource={}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }
    // closed

    // đã hủy
    const Delivering = () => {
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    // dataSource={}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }
    // closed

    const Cancelled = () => {
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    // dataSource={}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Đang chờ xác nhận`,
            children: <Waitting />,
        },
        {
            key: '2',
            label: `Đang chuẩn bị hàng`,
            children: <PreparingGoods />,
        },
        {
            key: '3',
            label: `Đang giao`,
            children: <Delivering />,
        },
        {
            key: '4',
            label: `Hoàn thành`,
            children: <Complete />,
        },
        {
            key: '5',
            label: `Đơn hàng chờ hủy`,
            children: <WaittingExit />,
        },
        {
            key: '6',
            label: `Đã hủy`,
            children: <Cancelled />,
        },
    ];


    return (
        <div>
            <h4 style={{ color: "#4963af", padding: "2%" }}> Quản lý đơn hàng</h4>
            <Tabs type='card' defaultActiveKey="1" items={items} />
        </div>
    )
}

export default InvoiceWait