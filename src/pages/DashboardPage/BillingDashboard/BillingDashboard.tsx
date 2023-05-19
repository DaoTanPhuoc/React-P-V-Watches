import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  Select,
  Space,
  Tag,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./BillingDashboard.css";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";

import { SearchOutlined } from "@ant-design/icons";
import { TinyArea, TinyColumn } from "@ant-design/charts";
import axios from "axios";
import { AppContext } from "../../../App";
import { error } from "console";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

interface DataType {
  key: string;
  name: string;
  image: string;
  nameProduct: string;
  Price: number;
  address: string;
  phone: string;
  tag: string;
}
type DataIndex = keyof DataType;




const data: DataType[] = [
  {
    key: "1",
    name: "Đào Tấn Phước",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png",
    nameProduct: "ROLEX DAY-DATE 40MM",
    Price: 32,
    address: "số 5, Đường Nguyễn Trung Ngạn, Quận 1, TP. Hồ Chí Minh",
    phone: "0909970879",
    tag: "success",
  },
  {
    key: "2",
    name: "Joe Black",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
    nameProduct: "PATEK PHILIPPE COMPLICATIONS",
    Price: 42,
    address: "London No. 1 Lake Park",
    phone: "0909970878",
    tag: "success",
  },
  {
    key: "3",
    name: "Jim Green",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/hublot/big-bang/thumbs/418x0/hublot-big-bang-steel-diamonds-341-sx-130-rx-114.png",
    nameProduct: "HUBLOT BIG BANG STEEL DIAMONDS",
    Price: 32,
    address: "Sydney No. 1 Lake Park",
    phone: "0909970877",
    tag: "processing",
  },
  {
    key: "4",
    name: "Jim Red",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",
    nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
    Price: 32,
    address: "London No. 2 Lake Park",
    phone: "0909970877",
    tag: "error",
  },
  {
    key: "5",
    name: "Jim yellow",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5905p-001.png",
    nameProduct: "PATEK PHILIPPE COMPLICATIONS",
    Price: 3550000000,
    address: "Đồng Nai",
    phone: "0901605536",
    tag: "processing",
  },
  {
    key: "6",
    name: "Jim yellow",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5905p-001.png",
    nameProduct: "PATEK PHILIPPE COMPLICATIONS",
    Price: 3550000000,
    address: "Thành Phố Hồ Chí Minh, Quận 1",
    phone: "0901605535",
    tag: "processing",
  },
  {
    key: "7",
    name: "Jim yellow",
    image:
      "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5905p-001.png",
    nameProduct: "PATEK PHILIPPE COMPLICATIONS",
    Price: 3550000000,
    address: "Thành Phố Hồ Chí Minh, Quận 1",
    phone: "0901605535",
    tag: "processing",
  },
];

// data tổng chốt đơn
const dataSumBill = [274, 337, 81, 497, 666, 219, 269];
const configClBill = {
  height: 64,
  autoFit: false,
  dataSumBill,
  tooltip: {
    customContent: function (x: any, dataSumBill: any) {
      return `Thứ.${x}: ${dataSumBill[0]?.dataSumBill?.y.toFixed(2)}`;
    },
  },
};

// data tổng hủy đơn
const dataExitBill = [278, 337, 79, 407, 646, 279, 239];
const configClExitBill = {
  height: 64,
  autoFit: false,
  dataExitBill,
  tooltip: {
    customContent: function (x: any, dataExitBill: any) {
      return `Thứ.${x}: ${dataExitBill[0]?.dataExitBill?.y.toFixed(2)}`;
    },
  },
};

// tổng tiền bán
const dataTotalSales = [546, 983, 340, 539, 243, 226, 192];
const configTotalSales = {
  height: 60,
  autoFit: false,
  dataTotalSales,
  smooth: true,
  areaStyle: {
    fill: "#d6e3fd",
  },
};

const BillingDashboard = () => {



  // moadal
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

  //
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
            type="primary"
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
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "image",
      width: "10%",
      render: (image: string) => (
        <img
          src={image}
          style={{ width: 100, height: 100, objectFit: "cover" }}
          alt=""
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      width: "25%",
      ...getColumnSearchProps("nameProduct"),
    },
    {
      title: "Giá Tiền",
      dataIndex: "Price",
      key: "Price",
      width: "10%",
      // ...getColumnSearchProps("Price"),
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      width: "25%",
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Tình trạng",
      dataIndex: "tag",
      render: (tag: string) => (
        <span>
          <Tag color={tag}>
            {tag === "processing"
              ? "Đang chờ"
              : tag === "success"
                ? "Đã xác nhận"
                : "Đã hủy"}
          </Tag>
        </span>
      ),
      // ...getColumnSearchProps("tag"),
    },
    {
      title: "Chức năng",
      width: "15%",
      dataIndex: "action",
      render: () => (
        <Space>
          <a onClick={showModal}>Edit</a>
        </Space>
      ),
    },
  ];

  // call api danh sach hóa đơn
  // const { currentToken } = useContext(AppContext);
  // const formRef = useRef<FormInstance<any>>(null);
  // const [billdash, setBillDash] = useState([])
  // const [loading, setloading] = useState(true);
  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:7182/api/Orders`, {
  //       headers: {
  //         'Authorization': `Bearer ${currentToken}`,
  //       },
  //     })
  //     .then((result) => {
  //       setloading(false);
  //       if (result.status === 200) {
  //         formRef.current?.resetFields();
  //       }
  //       setBillDash(
  //         result.data.map(
  //           (row: {
  //             CustomerName: string;
  //             Address: string;
  //             Total: number;

  //           }) => ({
  //             CustomerName: row.CustomerName,
  //             Address: row.Address,
  //             Total: row.Total,
  //           })
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // })
  // const [orders, setOrders] = useState([])
  // const [ordersProducts, setOrdersProducts] = useState([])
  // useEffect(() => {
  //   axios.get('https://localhost:7182/api/Orders')
  //     .then(response => {
  //       setOrders(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

  //   axios.get('https://api2.example.com/data')
  //     .then(response => {
  //       setOrdersProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  // closed

  return (
    <>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-bill-dash"
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label={<span style={{ color: "#000000" }}>Họ tên: </span>}>
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#000000" }}>Tên sản phẩm: </span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#000000" }}>Địa chỉ: </span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#000000" }}>Số điện thoại: </span>}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Button">
            <Button style={{ backgroundColor: "#000000", color: "#fff" }}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="container-bill">
        <div className="body-container">
          <div className="table-billing">
            <h5
              style={{
                fontWeight: 700,
                fontSize: 20,
                paddingTop: 30,
                paddingLeft: 10,
                paddingBottom: 50,
              }}
            >
              Danh sách hóa đơn
            </h5>
            <div style={{ textAlign: "center", paddingBottom: 50 }}>
              <Space direction="horizontal" size={16}>
                <Card
                  style={{
                    width: 300,
                    borderRadius: 12,
                    boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                  }}
                >
                  <h4 style={{ fontWeight: 600, color: "#8c8c8c" }}>
                    Tổng chốt đơn
                  </h4>
                  <p style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}>
                    1200 đơn
                  </p>
                  <TinyColumn data={dataSumBill} {...configClBill} />
                </Card>
                <Card
                  style={{
                    width: 300,
                    borderRadius: 12,
                    boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                  }}
                >
                  <h4 style={{ fontWeight: 600, color: "#8c8c8c" }}>
                    Tổng đơn đã hủy
                  </h4>
                  <p style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}>
                    100 đơn
                  </p>
                  <TinyColumn data={dataExitBill} {...configClExitBill} />
                </Card>
                <Card
                  style={{
                    width: 300,
                    borderRadius: 12,
                    boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                  }}
                >
                  <h4 style={{ fontWeight: 600, color: "#8c8c8c" }}>
                    Tổng Tiền bán
                  </h4>
                  <p style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}>
                    1000000000 đ
                  </p>
                  <TinyArea data={dataTotalSales} {...configTotalSales} />
                </Card>
              </Space>
            </div>
            <div className="table-item">
              <Table
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDashboard;
