import React, { useContext, useEffect, useRef, useState } from 'react'
import './CategoryDashPage.css'
import { Button, Form, FormInstance, Input, InputRef, Modal, Space, message } from 'antd'
import Table, { ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import axios from 'axios';
import { AppContext } from "../../../App";

interface DataType {
    Id: number;
    Name: string;
    Description: string;
}
type DataIndex = keyof DataType;


const CategoryDashPage = () => {
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

    const columns: ColumnsType<DataType> = [
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
                    <Button onClick={() => showModalBrand(Id)} style={{ backgroundColor: "#000000", color: "#fff" }}>Sửa</Button>
                    <Button onClick={() => deleteBrand(Id)} style={{ backgroundColor: "#000000", color: "#fff" }}>Xóa</Button>
                </Space>
            ),
        },
    ];


    // call api danh sách
    const [category, setCategory] = useState<any[]>([])
    useEffect(() => {
        axios
            .get(`https://localhost:7182/api/Categories/GetCategories`)
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

    // modal thêm category

    const { currentToken } = useContext(AppContext);
    // const addCategory = async () => {
    //     await axios
    //         .post(`https://localhost:7182/api/Categories/AddCategory`, {
    //             headers: {
    //                 'Authorization': `Bearer ${currentToken}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //             setAddCategory(
    //                 res.data.map(
    //                     (row: {
    //                         Name: string;
    //                     }) => ({
    //                         Name: row.Name
    //                     })
    //                 )
    //             );
    //         })
    // }


    // thông báo
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Thành công",
        });
    };
    const Error = () => {
        messageApi.open({
            type: "error",
            content: "Thêm không thành công",
        });
    }
    const formRef = useRef<FormInstance<any>>(null);
    //



    // const fetch = () => {
    //     axios.post("https://localhost:7182/api/Categories/AddCategory").then((res) => {
    //         setAddCategory(res.data);
    //     })
    // }
    // closed

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
    // closed

    // onfinish add
    const [AddCategory, setAddCategory] = useState([])
    const onFinishAddCategory = (values: any) => {
        const CategoryProducts = AddCategory.map((cate: any) => {
            return {
                Name: cate.Name,
                Description: cate.Description
            };
        });
        console.log(AddCategory);

        const dataToPost = {
            Name: values.Name || "",
            Description: values.Description,
            CategoryProducts: CategoryProducts
        };
        axios
            .post(`https://localhost:7182/api/Categories/AddCategory`, dataToPost, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
            })
            .then((result) => {
                if (result.status === 200) {
                    formRef.current?.resetFields();
                    setAddCategory([])
                    setIsModalOpen(false)
                    success();
                }
            })
            .catch((error) => {
                console.log(error);
                Error();
            });
    };
    //

    // sửa category
    const editRef = useRef<FormInstance<any>>(null);
    const [isModalOpenBrand, setIsModalOpenBrand] = useState(false);
    const [currentBrand, setCurrentBrand] = useState<number>();

    const showModalBrand = (Id: any) => {
        const cate = category.find(b => b.Id === Id);
        setCurrentBrand(Id);
        editRef.current?.setFieldsValue({
            Id: cate.Id,
            Name: cate.Name,
            Description: cate.Description
        })
        setIsModalOpenBrand(true);
    };

    const handleOkBrand = () => {
        setIsModalOpenBrand(false);
    };

    const handleCancelBrand = () => {
        setIsModalOpenBrand(false);
    };

    const fetch = () => {
        axios
            .get(`https://localhost:7182/api/Categories/GetCategories`)
            .then((res) => setCategory(res.data))
    }

    const onFinishBrand = (values: any) => {
        axios.post(`https://localhost:7182/api/Categories/UpdateCategory?id=${currentBrand}`, values, {
            headers: {
                'Authorization': `Bearer ${currentToken}`,
            },
        })
            .then(response => {
                console.log(response);
                setIsModalOpenBrand(false);
                fetch();
                success();
            })
            .catch(error => {
                console.log(error);
                console.log(values);
            });
    };
    // closed sửa category

    // delete category 
    const handleDelete = (Id: number) => {
        if (Id) {
            axios
                .post(`https://localhost:7182/api/Categories/DeteleCategory?id=${Id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    success();
                    fetch();
                })
                .catch(error => {
                    console.error('Error:', error);
                    console.log(Id);
                });
        }
    }
    function deleteBrand(Id: number) {
        if (Id) {
            Modal.confirm({
                title: 'Bạn có chắc muốn xóa?',
                //icon: <ExclamationCircleOutlined />,
                okText: 'Có',
                cancelText: 'Không',
                // dùng chung với brand 
                className: "delete-brand-modal",
                onOk() {
                    console.log();
                    handleDelete(Id);
                },
            });
        }
    }
    // clossed

    return (
        <>{contextHolder}
            <div style={{ display: 'flex', justifyContent: "space-between", padding: 15 }}>
                <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23 }}>
                    Thống kê danh mục sản phẩm
                </h4>
                <Button onClick={showModal} style={{ color: "#fff", backgroundColor: "#000000" }}>Thêm danh mục</Button>
                <Modal
                    className="moadal-add-brand"
                    footer={null}
                    title="Thêm danh mục"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Form
                        onFinish={onFinishAddCategory}
                        ref={formRef}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}

                    >
                        <Form.Item label="Tên danh mục" name="Name" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Mô tả" name="Description" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button style={{
                                backgroundColor: "#000000",
                                color: "#fff",
                                marginLeft: "68%"
                            }}
                                htmlType="submit">Thêm danh mục
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* modal sửa thương hiệu */}
                <Modal className="edit-category-dash" footer={null} title="Sửa danh mục" open={isModalOpenBrand} onOk={handleOkBrand} onCancel={handleCancelBrand}>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        onFinish={onFinishBrand}
                        ref={editRef}
                    >
                        <Form.Item hidden
                            name="Id"
                        >
                            <Input hidden name="Id" />
                        </Form.Item>

                        <Form.Item label="Tên thương hiệu" name="Name" rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}>
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label={<span style={{ color: "#000000" }}>Mô tả</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                            name="Description"
                        >
                            <Input name="Description" />
                        </Form.Item>

                        <Form.Item>
                            <Button style={{
                                backgroundColor: "#000000",
                                color: "#fff",
                                marginLeft: "68%"
                            }}
                                htmlType="submit">Cập Nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* đóng modal sửa thương hiệu */}
            </div>
            <div style={{ paddingTop: 100 }}>
                <Table
                    columns={columns}
                    dataSource={category}
                    pagination={{ pageSize: 4, position: ['bottomCenter'] }}
                    scroll={{ x: '100%' }}
                />
            </div></>
    )
}

export default CategoryDashPage