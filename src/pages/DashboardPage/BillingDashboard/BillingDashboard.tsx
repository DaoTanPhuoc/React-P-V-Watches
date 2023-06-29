import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  Row,
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
  FullName: string;
  Total: number;
  Status: number;
  Address: string;
  Phone: string;
  Tag: number;
  OrderProducts: []
}
type DataIndex = keyof DataType;

// format money
const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
// closed


// data tổng chốt đơn
const dataSumBill = [274, 337, 81, 497, 666, 219];
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



  // call api danh sach hóa đơn
  const { currentToken } = useContext(AppContext);
  const formRef = useRef<FormInstance<any>>(null);
  const [billdash, setBillDash] = useState([])
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://localhost:7182/api/Orders`, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      })
      .then((result) => {
        setloading(false);
        if (result.status === 200) {
          formRef.current?.resetFields();
        }
        setBillDash(
          result.data.map(
            (row: {
              FullName: string;
              Address: string;
              Total: number;
              Phone: string;
              Status: number;
              OrderProducts: []

            }) => ({
              FullName: row.FullName,
              Address: row.Address,
              Total: row.Total,
              Phone: row.Phone,
              Status: row.Status,
              OrderProducts: row.OrderProducts
            })
          )
        );
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  const columns: ColumnsType<DataType> = [
    {
      title: "Họ Tên",
      dataIndex: "FullName",
      width: "15%",
      ...getColumnSearchProps("FullName"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "OrderProducts",
      width: "10%",
      render: (OrderProducts) => (
        OrderProducts.map((order: { ProductImage: any }) =>
          <img
            src={order.ProductImage}
            style={{ width: 100, height: 100, objectFit: "cover", margin: 15 }}
            alt=""
          />)
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "OrderProducts",
      width: "20%",
      render: (OrderProducts) => <div style={{ whiteSpace: "pre-line" }}>
        {OrderProducts.map((OrderProduct: { ProductName: any; }) => OrderProduct.ProductName).join('\n \n \n \n')}
      </div>
      // ...getColumnSearchProps("nameProduct"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "Total",
      key: "Total",
      width: "10%",
      render: (Total) => moneyFormatter.format(Total)
      // ...getColumnSearchProps("Price"),
    },
    {
      title: "Địa Chỉ",
      dataIndex: "Address",
      key: "Address",
      ...getColumnSearchProps("Address"),
      width: "22%",
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
      width: "15%",
      ...getColumnSearchProps("Phone"),
    },
    {
      title: "Tình trạng",
      dataIndex: "Status",
      render: (tag: number) => (
        <span>
          {StatusOrder(tag)}
        </span>
      ),
    }
    // {
    //   title: "Chức năng",
    //   width: "15%",
    //   dataIndex: "action",
    //   render: () => (
    //     <Space>
    //       <Button onClick={showModal}>Edit</Button>
    //     </Space>
    //   ),
    // },
  ];

  function StatusOrder(status: number) {
    switch (status) {
      case -2:
        return (<Tag color="error">Đã Hủy</Tag>);
      case -1:
        return (<Tag color="warning">Chờ Hủy</Tag>);
      case 0:
        return (<Tag color="processing">Chờ xác nhận</Tag>);
      case 1:
        return (<Tag color="lime">Đang chuẩn bị</Tag>);
      case 2:
        return (<Tag color="lime">Đang Giao</Tag>);
      default:
        return (<Tag color="success">Đã Giao</Tag>);
    }
  }
  // closed

  return (
    <>
      {/* <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-bill-dash"
      >
        <div>
          <div className="moadl-header-bill-das">
            <h4 style={{ fontWeight: 700 }}>Chi tiết hóa đơn</h4>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>Hóa đơn ID: #188</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ paddingRight: 10 }}>in</p>
              <p>xuất Pdf</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ width: 150, height: 100 }}
              src="https://benhviendongho.com/wp-content/uploads/2019/05/744px-Rolex_logo.svg.png"
            />
          </div>
          <div className="container-"></div>
        </div>
      </Modal> */}
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
            <div className="dashbill-Quick-Stats" style={{ textAlign: "center", paddingBottom: 50 }}>
              <Row gutter={[48, 8]}>
                <Col xs={{ span: 6, offset: 8, pull: 8 }} lg={{ span: 6, offset: 2 }}>
                  <Card
                    style={{
                      width: 270,
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
                </Col>
                <Col xs={{ span: 6, offset: 8, pull: 8 }} lg={{ span: 6, offset: 2 }}>
                  <Card
                    style={{
                      width: 270,
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
                </Col>
                <Col xs={{ span: 6, offset: 8, pull: 8 }} lg={{ span: 6, offset: 2 }}>
                  <Card
                    style={{
                      width: 270,
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
                </Col>
              </Row>
              {/* <Space direction="horizontal" size={16}>

              </Space> */}
            </div>
            <div className="table-item">
              <Table
                pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                columns={columns}
                dataSource={billdash}
                bordered
                scroll={{ x: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingDashboard;
