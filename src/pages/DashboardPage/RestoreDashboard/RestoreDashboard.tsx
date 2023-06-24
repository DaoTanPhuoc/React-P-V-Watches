import React, { useContext, useEffect, useRef, useState } from 'react'
import './RestoreDashboard.css'
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Input, InputRef, Modal, Space, Spin, message } from 'antd';
import axios from 'axios';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import { AppContext } from "../../../App";
import { useParams } from 'react-router-dom';
import { error } from 'console';
const RestoreDashboard = () => {
    const moneyFormatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "Mã sản phẩm",
            dataIndex: "Code",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "Name",
            // render: (text) => <a>{text}</a>,
        },
        {
            title: "Hình ảnh",
            dataIndex: "Image",
            render: (theImageURL) => <img alt={theImageURL} src={theImageURL} />,
        },
        {
            title: "Giá tiền",
            dataIndex: "Price",
            render: (Price) => moneyFormatter.format(Price),
        },
        {
            title: "Nhãn hiệu",
            dataIndex: "BrandName",
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "CategoryName",
        },
        {
            title: "Chức năng",
            dataIndex: "Id",
            render: (Id) => (
                <Space size="middle">
                    <Button size="small" type="ghost">Khôi phục</Button>
                </Space>
            ),
        },
    ];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    // call api danh sách sản phẩm 
    const [state, setstate] = useState<any[]>([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getData();
        getSelection();
    }, []);

    const getData = async () => {
        await axios.get("https://localhost:7182/api/Products").then((res) => {
            setloading(false);
            const deletedProducts = res.data.filter((product: any) => product.IsDelete === true);
            setstate(deletedProducts);
        });
    };

    // đây là cate 
    // chức năng khôi phục của cate
    const [messageApi, contextHolder] = message.useMessage();
    const successCate = () => {
        messageApi.open({
            type: "success",
            content: "Khôi phục thành công",
        });
    };
    const recoveyCategories = (Id: number) => {
        if (Id) {
            axios
                .put(`https://localhost:7182/api/Categories/Recovery?id=${Id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(Id);
                    successCate();
                    fetch();
                })
                .catch((error) => {
                    console.log(error);
                    console.log(Id);
                })
        }
    }

    // xác nhậ khôi phục
    function DefindRecoveryCate(Id: number) {
        if (Id) {
            Modal.confirm({
                title: 'Bạn có chắc muốn khôi phục?',
                //icon: <ExclamationCircleOutlined />,
                okText: 'Có',
                cancelText: 'Không',
                className: "delete-brand-modal",
                onOk() {
                    console.log();
                    recoveyCategories(Id);
                },
            });
        }
    }
    // đóng 
    interface DataType {
        Id: number;
        Name: string;
        Description: string;
    }
    type DataIndex = keyof DataType;

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
    ): ColumnType<DataType> => ({
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
                        onClick={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        icon={<SearchOutlined style={{ color: "#fff" }} />}
                        size="small"
                        style={{ width: 90, color: "#fff", backgroundColor: "#000000" }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90, color: "#fff", backgroundColor: "#000000" }}
                    >
                        Reset
                    </Button>
                    <Button
                        style={{ color: "#fff", backgroundColor: "#000000" }}
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        style={{ color: "#fff", backgroundColor: "#000000" }}
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
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

    const columnsCate: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'Id',
            width: '30%',
            ...getColumnSearchProps('Id'),
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'Name',
            width: '30%',
            ...getColumnSearchProps('Name'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'Description',
            ...getColumnSearchProps('Description'),
        },
        {
            title: "Chức năng",
            width: "10%",
            dataIndex: "Id",
            render: (Id) => (
                <Space>
                    <Button onClick={() => DefindRecoveryCate(Id)} style={{ backgroundColor: "#000000", color: "#fff" }}>Khôi Phục</Button>
                </Space>
            ),
        },
    ];


    // call api danh sáchn danh mục
    const fetch = () => {
        axios
            .get(`https://localhost:7182/api/Categories/GetTrashed`, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
            })
            .then((res) => setCategory(res.data))
    }
    const [category, setCategory] = useState<any[]>([])
    useEffect(() => {
        axios
            .get(`https://localhost:7182/api/Categories/GetTrashed`, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
            })
            .then((res) => {
                setCategory(
                    res.data.map(
                        (row: {
                            Id: number
                            Name: string;
                            Description: string;
                        }) => ({
                            Id: row.Id,
                            Name: row.Name,
                            Description: row.Description,
                        })
                    )
                );
            })

    }, [])
    //

    // đây là brand 
    // chức năng khôi phục của Brand
    const fetchBrand = () => {
        axios
            .get(`https://localhost:7182/api/Brands/GetTrashed`, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
            })
            .then((res) => setstateBrand(res.data))
    }
    const recoveyBrand = (Id: number) => {
        if (Id) {
            axios
                .put(`https://localhost:7182/api/Brands/Recovery?id=${Id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    console.log(Id);
                    successCate();
                    fetchBrand();
                })
                .catch((error) => {
                    console.log(error);
                    console.log(Id);
                })
        }
    }

    // xác nhậ khôi phục
    function DefindRecoveryBrand(Id: number) {
        if (Id) {
            Modal.confirm({
                title: 'Bạn có chắc muốn khôi phục?',
                //icon: <ExclamationCircleOutlined />,
                okText: 'Có',
                cancelText: 'Không',
                className: "delete-brand-modal",
                onOk() {
                    console.log();
                    recoveyBrand(Id);
                },
            });
        }
    }
    // đóng
    useEffect(() => {
        getDataBrand();
    }, []);
    const [stateBrand, setstateBrand] = useState<any[]>([]);
    interface DataTypeBrand {
        key: string;
        Id: number;
        Name: string;
        Description: string;
    }

    type DataIndexBrand = keyof DataTypeBrand;

    const { currentToken } = useContext(AppContext);
    const getDataBrand = async () => {
        await axios.get("https://localhost:7182/api/Brands/GetTrashed", {
            headers: {
                'Authorization': `Bearer ${currentToken}`,
            },
        }).then((res) => {

            setstateBrand(res.data)
            setloading(false);
        });
    };
    // tìm kiếm theo list brand 

    const handleSearchBrand = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndexBrand
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleResetBrand = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchPropsBrand = (
        dataIndex: DataIndexBrand
    ): ColumnType<DataTypeBrand> => ({
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
                        handleSearchBrand(selectedKeys as string[], confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearchBrand(selectedKeys as string[], confirm, dataIndex)
                        }
                        icon={<SearchOutlined style={{ color: "#fff" }} />}
                        size="small"
                        style={{ width: 90, color: "#fff", backgroundColor: "#000000" }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleResetBrand(clearFilters)}
                        size="small"
                        style={{ width: 90, color: "#fff", backgroundColor: "#000000" }}
                    >
                        Reset
                    </Button>
                    <Button
                        style={{ color: "#fff", backgroundColor: "#000000" }}
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        style={{ color: "#fff", backgroundColor: "#000000" }}
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
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
    // closed
    const { Text } = Typography;
    const columnsBrand: ColumnsType<any> = [
        {
            title: "Tên thương hiệu",
            dataIndex: "Name",
            width: "25%",
            ...getColumnSearchPropsBrand("Name")
        },
        {
            title: "Mô tả",
            dataIndex: "Description",
            width: "10%",
            render: (description) => (
                <Text ellipsis style={{ width: 200 }}>{description}</Text>
            )
        },
        {
            title: "Chức năng",
            width: "10%",
            dataIndex: "Id",
            render: (Id) => (
                <Space>
                    <Button onClick={() => DefindRecoveryBrand(Id)} style={{ backgroundColor: "#000000", color: "#fff" }}>Khôi Phục</Button>
                </Space>
            ),
        },
    ];

    //
    return (
        <div className='container-recovery-responsive'>
            {contextHolder}
            <div>
                <h4 style={{ color: "#4963af", padding: "2%", textTransform: 'uppercase', fontWeight: 'bold' }}> Khôi Phục sản phẩm</h4>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    columns={columns}
                    dataSource={state}
                    scroll={{ x: '100%' }} />
            </div>
            <div className='container-brand-cate'>
                <div className='restore-brand-cate'>
                    <div className='responsive-brandAndCate' style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <h4 style={{ color: "#4963af", padding: "2%", textTransform: 'uppercase', fontWeight: 'bold' }}> Khôi Phục thương hiệu</h4>
                        </div>
                        <div>
                            {loading ? (
                                <Spin style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "25%"
                                }} />
                            ) : (<Table
                                style={{
                                    paddingTop: 20
                                }}
                                pagination={{ pageSize: 4, position: ['bottomCenter'] }}
                                columns={columnsBrand}
                                dataSource={stateBrand}
                                scroll={{ x: '100%' }}
                            />)}
                        </div>
                    </div>

                </div>
                <div className='restore-brand-cate'>
                    <div className='responsive-brandAndCate' style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <h4 style={{ color: "#4963af", padding: "2%", textTransform: 'uppercase', fontWeight: 'bold' }}> Khôi Phục danh mục</h4>
                        </div>
                        <div >
                            <Table
                                style={{
                                    paddingTop: 20
                                }}
                                columns={columnsCate}
                                dataSource={category}
                                pagination={{ pageSize: 4, position: ['bottomCenter'] }}
                                scroll={{ x: '100%' }}
                            />
                        </div>
                    </div>

                </div>
            </div></div>
    )
}

export default RestoreDashboard