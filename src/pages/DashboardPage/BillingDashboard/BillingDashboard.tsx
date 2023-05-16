import { Button, Input, InputRef, Select, Space, Tag } from "antd";
import React, { useRef, useState } from "react";
import "./BillingDashboard.css";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";

import { SearchOutlined } from "@ant-design/icons";

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

const BillingDashboard = () => {
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
          <a href="#">Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-bill">
      <div className="body-container">
        <div className="table-billing">
          <h5
            style={{
              fontWeight: 700,
              fontSize: 20,
              paddingTop: 0,
              paddingLeft: 0,
            }}
          >
            Danh sách hóa đơn
          </h5>
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
  );
};

export default BillingDashboard;
