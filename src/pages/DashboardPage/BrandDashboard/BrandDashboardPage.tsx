import { Line, Pie } from "@ant-design/charts";
import { Button, Card, Col, Input, InputRef, Row, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import "./BrandDashboardPage.css";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
const BrandDashboardPage = () => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  interface DataType {
    key: string;
    nameProduct: string;
    categories: string;
    image: string;
    Price: number;
    caseSize: number;
  }
  type DataIndex = keyof DataType;

  const data: DataType[] = [
    {
      key: "1",
      nameProduct: "ROLEX DAY-DATE 40MM",
      categories: "Nam",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png",
      Price: 32,
      caseSize: 40,
    },
    {
      key: "2",
      nameProduct: "PATEK PHILIPPE COMPLICATIONS",
      categories: "Nữ",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
      Price: 42,
      caseSize: 40,
    },
    {
      key: "3",
      nameProduct: "HUBLOT BIG BANG STEEL DIAMONDS",
      categories: "Nam",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/hublot/big-bang/thumbs/418x0/hublot-big-bang-steel-diamonds-341-sx-130-rx-114.png",

      Price: 32,
      caseSize: 33,
    },
    {
      key: "4",
      nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
      categories: "Nam",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",

      Price: 32,
      caseSize: 30,
    },
    {
      key: "5",
      nameProduct: "PATEK PHILIPPE COMPLICATIONS",
      categories: "Nữ",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
      Price: 42,
      caseSize: 40,
    },
    {
      key: "6",
      nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
      categories: "Nam",
      image:
        "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",

      Price: 32,
      caseSize: 42,
    },
  ];

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
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      width: "25%",
      ...getColumnSearchProps("nameProduct"),
    },
    {
      title: "Hình ảnh",
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
      title: "Giá Tiền",
      dataIndex: "Price",
      key: "Price",
      width: "10%",
      // ...getColumnSearchProps("Price"),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "categories",
      key: "categories",
      width: "10%",
      ...getColumnSearchProps("categories"),
    },
    {
      title: "Kích thước vỏ",
      dataIndex: "caseSize",
      key: "caseSize",
      width: "10%",
    },
    {
      title: "Chức năng",
      width: "10%",
      dataIndex: "action",
      render: () => (
        <Space>
          <a href="#">Edit</a>
        </Space>
      ),
    },
  ];

  // thống kê loại sản phẩm bán được trong tuần (Số lượng)
  const dataBrand = [
    {
      month: "Thứ hai",
      key: "series1",
      value: 125,
    },
    {
      month: "Thứ hai",
      key: "series2",
      value: 51,
    },
    {
      month: "Thứ ba",
      key: "series1",
      value: 132,
    },
    {
      month: "Thứ ba",
      key: "series2",
      value: 91,
    },
    {
      month: "Thứ tư",
      key: "series1",
      value: 141,
    },
    {
      month: "Thứ tư",
      key: "series2",
      value: 34,
    },
    {
      month: "Thứ năm",
      key: "series1",
      value: 158,
    },
    {
      month: "Thứ năm",
      key: "series2",
      value: 47,
    },
    {
      month: "Thứ sáu",
      key: "series1",
      value: 133,
    },
    {
      month: "Thứ sáu",
      key: "series2",
      value: 63,
    },
    {
      month: "Thứ bảy",
      key: "series1",
      value: 143,
    },
    {
      month: "Thứ bảy",
      key: "series2",
      value: 58,
    },
    {
      month: "Chủ nhật",
      key: "series1",
      value: 133,
    },
    {
      month: "Chủ nhật",
      key: "series2",
      value: 63,
    },
  ];
  const config = {
    dataBrand,
    xField: "month",
    yField: "value",
    seriesField: "key",
    stepType: "hvh",
  };
  // pie
  const RoundChartData = [
    {
      type: "Nam",
      value: 27,
    },
    {
      type: "Nữ",
      value: 25,
    },
  ];
  const configRoundChart = {
    appendPadding: 10,
    RoundChartData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div className="Brand-Dash-container">
      <div className="header-Brand-dash">
        <div className="header-Brand-dash-Items">
          <h4 style={{ color: "#4963AF", fontWeight: 700 }}>
            Thống kê loại sản phẩm
          </h4>
          <Button style={{ color: "#fff", backgroundColor: "#000000" }}>
            Thêm loại
          </Button>
        </div>
      </div>
      <div className="brand-dash-container">
        <Row gutter={[1, 1]}>
          <Col span={6}>
            <Space direction="vertical" size={16}>
              <Card style={{ width: 250 }}>
                <h4
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontWeight: 700,
                  }}
                >
                  Tổng loại sản phẩm
                </h4>
                <h4 style={{ textAlign: "center" }}>2</h4>
              </Card>
              <Card size="small" style={{ width: 250 }}>
                <h4
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontWeight: 700,
                  }}
                >
                  Tổng sản phẩm
                </h4>
                <h4 style={{ textAlign: "center" }}>1200</h4>
              </Card>
              <Card size="small" style={{ width: 250 }}>
                <h4
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontWeight: 700,
                  }}
                >
                  Tổng tiền đồng hồ nam
                </h4>
                <h4 style={{ textAlign: "center" }}>12000000000</h4>
              </Card>
              <Card size="small" style={{ width: 250 }}>
                <h4
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontWeight: 700,
                  }}
                >
                  Tổng tiền đồng hồ nữ
                </h4>
                <h4 style={{ textAlign: "center" }}>12000000000</h4>
              </Card>
            </Space>
          </Col>
          <Col span={18}>
            <div style={{ border: "1px solid black " }}>
              <h4
                style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
              >
                Số lượng sản phẩm bán theo loại
              </h4>
              <Line data={dataBrand} {...config} />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ paddingTop: 50, paddingBottom: 50 }}>
        <Row gutter={[4, 4]}>
          <Col span={16}>
            <div style={{ border: "1px solid black " }}>
              <h4
                style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
              >
                Số lượng sản phẩm
              </h4>
              <Table
                pagination={{ pageSize: 4 }}
                columns={columns}
                dataSource={data}
              />
            </div>
          </Col>
          <Col span={8}>
            <div>
              <h4
                style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
              >
                Thống kê sản phẩm theo loại
              </h4>
              <Pie
                style={{ marginLeft: 60 }}
                data={RoundChartData}
                {...configRoundChart}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BrandDashboardPage;
