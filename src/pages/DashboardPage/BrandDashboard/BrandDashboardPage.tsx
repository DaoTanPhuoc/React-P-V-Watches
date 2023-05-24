import { Line, Pie } from "@ant-design/charts";
import { Button, Card, Checkbox, Col, Form, FormInstance, Input, InputRef, Modal, Row, Space, Spin, Table, message } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./BrandDashboardPage.css";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { error } from "console";
import { AppContext } from "../../../App";

// function call tổng sản phẩm
function SumStock() {
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    axios.get("https://localhost:7182/api/Products")
      .then((response) => {
        let sum = 0;
        response.data.forEach((product: any) => {
          sum += product.Stock;
        });
        setTotalStock(sum);
      })
      .catch((error) => console.error(error));
  }, []);

  return totalStock;
}
// closed

// function tổng sản phẩm đồng hồ nam
function SumPriceMan() {
  const [totalProPriceMan, setTotalProPriceMan] = useState(0)

  useEffect(() => {
    axios
      .get("https://localhost:7182/api/Products/GetProductsByCategory?categoryId=1")
      .then((result) => {
        let totalPrceMan = 0;
        result.data.forEach((product: any) => {
          totalPrceMan += product.Stock
        });
        setTotalProPriceMan(totalPrceMan);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return totalProPriceMan;
}
// closed

// function tổng sản phẩm đồng hồ nam
function SumPriceWoman() {
  const [totalProPriceWoMan, setTotalProPriceWoman] = useState(0)

  useEffect(() => {
    axios
      .get("https://localhost:7182/api/Products/GetProductsByCategory?categoryId=2")
      .then((result) => {
        let totalPrceMan = 0;
        result.data.forEach((product: any) => {
          totalPrceMan += product.Stock
        });
        setTotalProPriceWoman(totalPrceMan);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return totalProPriceWoMan;
}
// closed





const BrandDashboardPage = () => {
  // checkbox
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(event.target.checked);
  };
  //

  // modal
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



  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // format money
  const moneyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  interface DataType {
    key: string;
    Name: string;
    Image: string;
    Price: number;
    CategoryName: string;
    CaseSize: number;
  }
  type DataIndex = keyof DataType;

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     nameProduct: "ROLEX DAY-DATE 40MM",
  //     categories: "Nam",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png",
  //     Price: 32,
  //     caseSize: 40,
  //   },
  //   {
  //     key: "2",
  //     nameProduct: "PATEK PHILIPPE COMPLICATIONS",
  //     categories: "Nữ",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
  //     Price: 42,
  //     caseSize: 40,
  //   },
  //   {
  //     key: "3",
  //     nameProduct: "HUBLOT BIG BANG STEEL DIAMONDS",
  //     categories: "Nam",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/hublot/big-bang/thumbs/418x0/hublot-big-bang-steel-diamonds-341-sx-130-rx-114.png",

  //     Price: 32,
  //     caseSize: 33,
  //   },
  //   {
  //     key: "4",
  //     nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
  //     categories: "Nam",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",

  //     Price: 32,
  //     caseSize: 30,
  //   },
  //   {
  //     key: "5",
  //     nameProduct: "PATEK PHILIPPE COMPLICATIONS",
  //     categories: "Nữ",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
  //     Price: 42,
  //     caseSize: 40,
  //   },
  //   {
  //     key: "6",
  //     nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
  //     categories: "Nam",
  //     image:
  //       "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",

  //     Price: 32,
  //     caseSize: 42,
  //   },
  // ];

  // call api table products

  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("https://localhost:7182/api/Products").then((res) => {
      setloading(false);
      setstate(
        res.data.map(
          (row: {
            Name: string;
            Image: number;
            Price: string;
            CategoryName: string,
            CaseSize: number,
          }) => ({
            Name: row.Name,
            Image: row.Image,
            Price: row.Price,
            CategoryName: row.CategoryName,
            CaseSize: row.CaseSize
          })
        )
      );
    });
  };

  // api tông sản phẩm
  const [countCate, setCountCate] = useState([])
  useEffect(() => {
    axios
      .get("https://localhost:7182/api/Categories/GetCategories")
      .then((result) => {
        setCountCate(result.data)
      })
      .catch((error) => {
        console.log(error);
      })
  })

  const countCateProducts = countCate.length;


  // call function tổng sản phẩm
  const totalStock = SumStock();
  // closed
  //call fuction tổng sl đồng hồ nam
  const wacthesMan = SumPriceMan();
  //closed
  //call fuction tổng sl đồng hồ nam
  const WatchesWoman = SumPriceWoman();
  //closed

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
      dataIndex: "Name",
      width: "25%",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "Image",
      width: "10%",
      render: (Image: string) => (
        <img
          src={Image}
          style={{ width: 100, height: 100, objectFit: "cover" }}
          alt=""
        />
      ),
    },
    {
      title: "Giá Tiền",
      dataIndex: "Price",
      key: "Price",
      render: (Price) => moneyFormatter.format(Price),
      width: "10%",
      // ...getColumnSearchProps("Price"),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "CategoryName",
      key: "CategoryName",
      width: "10%",
      ...getColumnSearchProps("CategoryName"),
    },
    {
      title: "Kích thước vỏ",
      dataIndex: "CaseSize",
      key: "CaseSize",
      render: (CaseSize) => CaseSize + "mm",
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
      key: "Nam",
      value: 125,
    },
    {
      month: "Thứ hai",
      key: "Nữ",
      value: 51,
    },
    {
      month: "Thứ ba",
      key: "Nam",
      value: 132,
    },
    {
      month: "Thứ ba",
      key: "Nữ",
      value: 91,
    },
    {
      month: "Thứ tư",
      key: "Nam",
      value: 141,
    },
    {
      month: "Thứ tư",
      key: "Nữ",
      value: 34,
    },
    {
      month: "Thứ năm",
      key: "Nam",
      value: 158,
    },
    {
      month: "Thứ năm",
      key: "Nữ",
      value: 47,
    },
    {
      month: "Thứ sáu",
      key: "Nam",
      value: 133,
    },
    {
      month: "Thứ sáu",
      key: "Nữ",
      value: 63,
    },
    {
      month: "Thứ bảy",
      key: "Nam",
      value: 143,
    },
    {
      month: "Thứ bảy",
      key: "Nữ",
      value: 58,
    },
    {
      month: "Chủ nhật",
      key: "Nam",
      value: 133,
    },
    {
      month: "Chủ nhật",
      key: "Nữ",
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
      type: "33mm",
      value: 20,
    },
    {
      type: "40mm",
      value: 25,
    },
    {
      type: "44mm",
      value: 15,
    },
    {
      type: "28mm",
      value: 5,
    },
  ];
  // call api chart casesize 
  // const [caseSize, setcaseSize] = useState([]);

  //   useEffect(() => {
  //     axios.get("https://localhost:7182/api/Products")
  //       .then((response) => {
  //         const formattedData = response.data.map((item :any) => ({
  //           type: item.CaseSize,
  //           value: item.value,
  //         }));
  //         setcaseSize(formattedData);
  //       })
  //       .catch((error) => console.error(error));
  //   }, []);
  // closed

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

  // api add brand
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm thành công",
    });
  };
  const [addBrand, setAddBrand] = useState([])
  const { currentToken } = useContext(AppContext);
  const formRef = useRef<FormInstance<any>>(null);
  const onFinish = (values: any) => {
    const BrandProducts = addBrand.map((Brand: any) => {
      return {
        Name: Brand.Name,
        Description: Brand.Description,
      };
    });
    console.log(BrandProducts);

    const dataToPost = {
      Name: values.Name,
      Description: values.Description,
      BrandProducts: BrandProducts,
    };
    axios
      .post(`https://localhost:7182/api/Brands`, dataToPost, {
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          formRef.current?.resetFields();
          setAddBrand([])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // closed

  return (
    <>{contextHolder}<></>
      <div className="Brand-Dash-container">
        <div className="header-Brand-dash">
          <div className="header-Brand-dash-Items">
            <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23 }}>
              Thống kê loại sản phẩm
            </h4>
            <Button onClick={showModal} style={{ color: "#fff", backgroundColor: "#000000" }}>
              Thêm loại sản phẩm
            </Button>
            <Modal
              className="moadal-add-brand"
              footer={null}
              title="Thêm Thương hiệu"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <Form
                onFinish={onFinish}
                ref={formRef}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}

              >
                <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Description" name="Description">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button onClick={success} style={{
                    backgroundColor: "#000000",
                    color: "#fff",
                    marginLeft: "68%"
                  }}
                    htmlType="submit">Thêm thương hiệu
                  </Button>
                </Form.Item>
              </Form>


            </Modal>
          </div>
        </div>
        <div className="brand-dash-container">
          <Row gutter={[1, 1]}>
            <Col span={6}>
              <Space direction="vertical" size={16}>
                <Card style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng loại sản phẩm
                  </h4>
                  <h4 style={{ textAlign: "center" }}>{countCateProducts}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng sản phẩm
                  </h4>
                  <h4 style={{ textAlign: "center" }}>{totalStock}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng số lượng đồng hồ nam
                  </h4>
                  <h4 style={{ textAlign: "center" }}>{wacthesMan}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng số lượng đồng hồ nữ
                  </h4>
                  <h4 style={{ textAlign: "center" }}>{WatchesWoman}</h4>
                </Card>
              </Space>
            </Col>
            <Col span={18}>
              <div style={{ border: "1px solid black" }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng sản phẩm bán theo loại
                </h4>
                <Line style={{ height: 456 }} data={dataBrand} {...config} />
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Row gutter={[16, 4]}>
            <Col span={6}>
              <div>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Thống kê sản phẩm theo loại
                </h4>
                <Pie
                  style={{}}
                  data={RoundChartData}
                  {...configRoundChart} />
              </div>
            </Col>
            <Col span={18}>
              <div>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng sản phẩm
                </h4>
                {loading ? (
                  <Spin style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "25%"
                  }} />
                ) : (<Table
                  style={{
                    paddingTop: 40
                  }}
                  pagination={{ pageSize: 3, position: ['bottomCenter'] }}
                  columns={columns}
                  dataSource={state}
                />)}
              </div>
            </Col>
          </Row>
        </div>
      </div></>
  );
};

export default BrandDashboardPage;
