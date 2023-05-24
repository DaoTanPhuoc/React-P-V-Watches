import { Button, Tabs, TabsProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react'

const InvoiceWait = () => {

    const Waitting = () => {
        // table đơn đang chờ xác nhận
        interface DataType {
            key: React.Key;
            orderId: string;
            name: string;
            Image: string;
            nameProducts: string;
            quantity: number;
            Price: number;
            Address: string;
            Phone: string;
        }

        const columns: ColumnsType<DataType> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'orderId',
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'name',
                render: (text: string) => <a>{text}</a>,
            },
            {
                title: 'Hình ảnh',
                dataIndex: 'Image',
                render: (Image: string) => <img src={Image} alt="" />
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'nameProducts'
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Price',
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

        const data: DataType[] = [
            {
                key: '1',
                orderId: "1",
                name: 'Đào Tấn Phước',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/418x0/dong-ho-rolex-datejust-31-278285rbr-0036.png',
                nameProducts: "ROLEX DATEJUST 31 278285RBR-0036",
                quantity: 1,
                Price: 320000000,
                Address: 'Ấp Vĩnh Hiệp, xã Tân Bình, Huyện Vĩnh Cứu, tỉnh ĐỒng Nai',
                Phone: "0909970879",
            },
            {
                key: '2',
                orderId: "2",
                name: 'Thái Thị Thu Thảo',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/hublot/sang-bleu/thumbs/645x0/hublot-big-bang-one-click-sang-bleu-steel-pink-diamonds-39mm-465-ss-89p7-vr-1204-mxm20.png',
                nameProducts: "HUBLOT BIG BANG ONE CLICK SANG",
                quantity: 1,
                Price: 400000000,
                Address: 'Số 5, Đường Nguyễn Trung Ngạn, Quận 1, Thành Phố Hồ CHí Minh',
                Phone: "0908970879",
            },
            {
                key: '3',
                orderId: "3",
                name: 'Đào Thanh Phát',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/418x0/rolex-datejust-36-126284rbr-0029.png',
                nameProducts: "HUBLOT BIG BANG ONE CLICK SANG",
                quantity: 1,
                Price: 500000000,
                Address: 'Số 3, Đường Nguyễn Trung Ngạn, Quận 1, Thành Phố Hồ CHí Minh',
                Phone: "0908970899",
            },
            {
                key: '4',
                orderId: "4",
                name: 'Đào Thanh Phương',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-28/thumbs/645x0/rolex-datejust-28-279381rbr-0011.png',
                nameProducts: "ROLEX DATEJUST 28 279381RBR-0011",
                quantity: 1,
                Price: 200000000,
                Address: 'Số 1, Đường Nguyễn Trung Ngạn, Quận 1, Thành Phố Hồ CHí Minh',
                Phone: "0908970889",
            },
        ];

        const rowSelection = {
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: DataType) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        // closed
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}>
                    Cập nhật
                </Button>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }

    const WaittingExit = () => {
        // table đơn đang chờ xác nhận
        interface DataType {
            key: React.Key;
            orderId: string;
            name: string;
            Image: string;
            nameProducts: string;
            quantity: number;
            Price: number;
            Address: string;
            Phone: string;
        }

        const columns: ColumnsType<DataType> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'orderId',
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'name',
                render: (text: string) => <a>{text}</a>,
            },
            {
                title: 'Hình ảnh',
                dataIndex: 'Image',
                render: (Image: string) => <img src={Image} alt="" />
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'nameProducts'
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Price',
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

        const data: DataType[] = [
            {
                key: '1',
                orderId: "1",
                name: 'Đào Tấn Phước',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/thumbs/418x0/dong-ho-rolex-datejust-31-278285rbr-0036.png',
                nameProducts: "ROLEX DATEJUST 31 278285RBR-0036",
                quantity: 1,
                Price: 320000000,
                Address: 'Ấp Vĩnh Hiệp, xã Tân Bình, Huyện Vĩnh Cứu, tỉnh ĐỒng Nai',
                Phone: "0909970879",
            },
            {
                key: '2',
                orderId: "2",
                name: 'Thái Thị Thu Thảo',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/hublot/sang-bleu/thumbs/645x0/hublot-big-bang-one-click-sang-bleu-steel-pink-diamonds-39mm-465-ss-89p7-vr-1204-mxm20.png',
                nameProducts: "HUBLOT BIG BANG ONE CLICK SANG",
                quantity: 1,
                Price: 400000000,
                Address: 'Số 5, Đường Nguyễn Trung Ngạn, Quận 1, Thành Phố Hồ CHí Minh',
                Phone: "0908970879",
            },
            {
                key: '3',
                orderId: "4",
                name: 'Đào Thanh Phương',
                Image: 'https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-28/thumbs/645x0/rolex-datejust-28-279381rbr-0011.png',
                nameProducts: "ROLEX DATEJUST 28 279381RBR-0011",
                quantity: 1,
                Price: 200000000,
                Address: 'Số 1, Đường Nguyễn Trung Ngạn, Quận 1, Thành Phố Hồ CHí Minh',
                Phone: "0908970889",
            },
        ];

        const rowSelection = {
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: (record: DataType) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        // closed
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}>
                    Cập nhật
                </Button>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                />
            </>
        )
    }






    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Đang chờ xác nhận`,
            children: <Waitting />,
        },
        {
            key: '2',
            label: `Đơn hàng chờ hủy`,
            children: <WaittingExit />,
        },
        {
            key: '3',
            label: `Đã xác nhận`,
            children: `Content of Tab Pane 3`,
        },
    ];


    return (
        <div>
            <h4 style={{ color: "#4963af", padding: "2%" }}> Quản lý đơn hàng</h4>
            <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} />

        </div>
    )
}

export default InvoiceWait