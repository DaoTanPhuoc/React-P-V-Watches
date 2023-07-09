import { Button, Input, InputRef, message, Space, Tabs, TabsProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Children, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../../App';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from "@ant-design/icons";

const InvoiceWait = () => {
    const moneyFormatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
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
            render: ((Total) => moneyFormatter.format(Total))
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
                case 200:
                    message.open({ key: 'change', content: "Cập nhật thành công", type: 'success' })
                    break;
                default:
                    break;
            }
            fetchData();
            setSelectedRowKeys([])
        }).catch(err => {
            message.open({ key: 'change', content: "Lỗi: " + err.response.data, type: 'error' })
            fetchData();
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
        // tim kiem rieng cho cho xac nhan
        interface Order {
            Id: number;
            FullName: string;
            OrderProducts: any;
            Total: number;
            Address: string;
            Phone: string;
            Status: number;
        }
        type DataIndex = keyof Order;


        //chức năng tìm kiếm
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<InputRef>(null);

        const handleSearch = (
            selectedKeys: string[],
            confirm: (param?: FilterConfirmProps) => void,
            dataIndex: DataIndex
        ) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
        };

        const getColumnSearchProps = (
            dataIndex: DataIndex
        ): ColumnType<Order> => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        // placeholder={`Search ${dataIndex}`}
                        placeholder="Tìm kiếm"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm, dataIndex)
                            }
                            icon={<SearchOutlined style={{ color: "#fff" }} />}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Khôi phục
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        });
        // đóng

        const columns: ColumnsType<Order> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'Id',
                ...getColumnSearchProps("Id"),
                width: "11%"
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'FullName',
                render: (text: string) => <a>{text}</a>,
                width: "12%",
                ...getColumnSearchProps("FullName"),
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
                ...getColumnSearchProps("OrderProducts"),
                render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                    {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
                </div>
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Total',
                render: ((Total) => moneyFormatter.format(Total))
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                ...getColumnSearchProps("Address"),
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                width: "12%",
                ...getColumnSearchProps("Phone"),
            }
        ];
        // đóng tìm kiếm cho việc tìm kiếm cho đang chờ xác nhận
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
                    disabled={data.length === 0}
                >
                    Xác nhận đơn hàng
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
                    scroll={{ x: '100%' }}
                />
            </>
        )
    }

    const WaittingExit = () => {
        // table đơn đang chờ hủy
        const data = orders.filter(order => order.Status === -1)
        // tim kiem rieng cho cho xac nhan
        interface Order {
            Id: number;
            FullName: string;
            OrderProducts: any;
            Total: number;
            Address: string;
            Phone: string;
            Status: number;
        }
        type DataIndex = keyof Order;


        //chức năng tìm kiếm
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<InputRef>(null);

        const handleSearch = (
            selectedKeys: string[],
            confirm: (param?: FilterConfirmProps) => void,
            dataIndex: DataIndex
        ) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
        };

        const getColumnSearchProps = (
            dataIndex: DataIndex
        ): ColumnType<Order> => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        // placeholder={`Search ${dataIndex}`}
                        placeholder="Tìm kiếm"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm, dataIndex)
                            }
                            icon={<SearchOutlined style={{ color: "#fff" }} />}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Khôi phục
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        });
        // đóng

        const columns: ColumnsType<Order> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'Id',
                ...getColumnSearchProps("Id"),
                width: "11%"
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'FullName',
                render: (text: string) => <a>{text}</a>,
                width: "12%",
                ...getColumnSearchProps("FullName"),
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
                ...getColumnSearchProps("OrderProducts"),
                render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                    {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
                </div>
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Total',
                render: ((Total) => moneyFormatter.format(Total))
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                ...getColumnSearchProps("Address"),
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                width: "12%",
                ...getColumnSearchProps("Phone"),
            }
        ];
        // đóng tìm kiếm cho việc tìm kiếm cho đang chờ xác nhận
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
                    onClick={() => changeStatus(-2)}
                    disabled={data.length === 0}
                >
                    Xác nhận hủy
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
                    scroll={{ x: '100%' }}
                />
            </>
        )
    }

    // Đang chuẩn bị hàng
    const PreparingGoods = () => {
        const data = orders.filter(order => order.Status === 1)
        // tim kiem rieng cho cho xac nhan
        interface Order {
            Id: number;
            FullName: string;
            OrderProducts: any;
            Total: number;
            Address: string;
            Phone: string;
            Status: number;
        }
        type DataIndex = keyof Order;


        //chức năng tìm kiếm
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<InputRef>(null);

        const handleSearch = (
            selectedKeys: string[],
            confirm: (param?: FilterConfirmProps) => void,
            dataIndex: DataIndex
        ) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
        };

        const getColumnSearchProps = (
            dataIndex: DataIndex
        ): ColumnType<Order> => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        // placeholder={`Search ${dataIndex}`}
                        placeholder="Tìm kiếm"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm, dataIndex)
                            }
                            icon={<SearchOutlined style={{ color: "#fff" }} />}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Khôi phục
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        });
        // đóng

        const columns: ColumnsType<Order> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'Id',
                ...getColumnSearchProps("Id"),
                width: "11%"
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'FullName',
                render: (text: string) => <a>{text}</a>,
                width: "12%",
                ...getColumnSearchProps("FullName"),
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
                ...getColumnSearchProps("OrderProducts"),
                render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                    {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
                </div>
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Total',
                render: ((Total) => moneyFormatter.format(Total))
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                ...getColumnSearchProps("Address"),
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                width: "12%",
                ...getColumnSearchProps("Phone"),
            }
        ];
        // đóng tìm kiếm cho việc tìm kiếm cho đang chờ xác nhận
        return (
            <>
                <Button
                    style={{
                        backgroundColor: "#000000",
                        color: "#fff",
                        marginBottom: "40px",
                        marginTop: "20px"
                    }}
                    onClick={() => changeStatus(2)}
                    disabled={data.length === 0}
                >
                    Cập nhật trạng thái
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
                    scroll={{ x: '100%' }}
                />
            </>
        )
    }
    //Đang giao
    const Delivering = () => {
        const data = orders.filter(order => order.Status === 2)
        // tim kiem rieng cho cho xac nhan
        interface Order {
            Id: number;
            FullName: string;
            OrderProducts: any;
            Total: number;
            Address: string;
            Phone: string;
            Status: number;
        }
        type DataIndex = keyof Order;


        //chức năng tìm kiếm
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<InputRef>(null);

        const handleSearch = (
            selectedKeys: string[],
            confirm: (param?: FilterConfirmProps) => void,
            dataIndex: DataIndex
        ) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
        };

        const getColumnSearchProps = (
            dataIndex: DataIndex
        ): ColumnType<Order> => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        // placeholder={`Search ${dataIndex}`}
                        placeholder="Tìm kiếm"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm, dataIndex)
                            }
                            icon={<SearchOutlined style={{ color: "#fff" }} />}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Khôi phục
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        });
        // đóng

        const columns: ColumnsType<Order> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'Id',
                ...getColumnSearchProps("Id"),
                width: "11%"
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'FullName',
                render: (text: string) => <a>{text}</a>,
                width: "12%",
                ...getColumnSearchProps("FullName"),
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
                ...getColumnSearchProps("OrderProducts"),
                render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                    {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
                </div>
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Total',
                render: ((Total) => moneyFormatter.format(Total))
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                ...getColumnSearchProps("Address"),
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                width: "12%",
                ...getColumnSearchProps("Phone"),
            }
        ];
        // đóng tìm kiếm cho việc tìm kiếm cho đang chờ xác nhận
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: '100%' }}
                />
            </>
        )
    }
    // đã hoàn thành
    const Complete = () => {
        const data = orders.filter(order => order.Status === 3)
        // tim kiem rieng cho cho xac nhan
        interface Order {
            Id: number;
            FullName: string;
            OrderProducts: any;
            Total: number;
            Address: string;
            Phone: string;
            Status: number;
        }
        type DataIndex = keyof Order;


        //chức năng tìm kiếm
        const [searchText, setSearchText] = useState("");
        const [searchedColumn, setSearchedColumn] = useState("");
        const searchInput = useRef<InputRef>(null);

        const handleSearch = (
            selectedKeys: string[],
            confirm: (param?: FilterConfirmProps) => void,
            dataIndex: DataIndex
        ) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
        };

        const getColumnSearchProps = (
            dataIndex: DataIndex
        ): ColumnType<Order> => ({
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                close,
            }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        // placeholder={`Search ${dataIndex}`}
                        placeholder="Tìm kiếm"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(selectedKeys as string[], confirm, dataIndex)
                            }
                            icon={<SearchOutlined style={{ color: "#fff" }} />}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{ width: 100, color: "#fff", backgroundColor: "#000000" }}
                        >
                            Khôi phục
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        });
        // đóng

        const columns: ColumnsType<Order> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'Id',
                ...getColumnSearchProps("Id"),
                width: "11%"
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'FullName',
                render: (text: string) => <a>{text}</a>,
                width: "12%",
                ...getColumnSearchProps("FullName"),
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
                ...getColumnSearchProps("OrderProducts"),
                render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
                    {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
                </div>
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'Total',
                render: ((Total) => moneyFormatter.format(Total))
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'Address',
                ...getColumnSearchProps("Address"),
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'Phone',
                width: "12%",
                ...getColumnSearchProps("Phone"),
            }
        ];
        // đóng tìm kiếm cho việc tìm kiếm cho đang chờ xác nhận
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: '100%' }}
                />
            </>
        )
    }

    const Cancelled = () => {
        const data = orders.filter(order => order.Status === -2)
        return (
            <>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    rowKey="Id"
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: '100%' }}
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
            <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23, textTransform: "uppercase", padding: "20px 20px" }}>
                Quản lý đơn hàng
            </h4>
            <Tabs onChange={() => setSelectedRowKeys([])} type='card' defaultActiveKey="1" items={items} />
        </div>
    )
}

export default InvoiceWait