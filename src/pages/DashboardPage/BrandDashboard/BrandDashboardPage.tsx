import { Line, Pie } from "@ant-design/charts";
import { Button, Card, Checkbox, Col, Form, FormInstance, Input, InputRef, Modal, Row, Space, Spin, Table, message, DatePicker, Popconfirm } from "antd";
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
import { useParams } from "react-router-dom";
import moment, { updateLocale } from "moment";
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

  // brand (thương hiệu)1
  const [stateBrand, setstateBrand] = useState();
  interface DataTypeBrand {
    key: string;
    Id: number;
    Name: string;
    Description: string;
    IsDeleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date;
  }

  type DataIndexBrand = keyof DataTypeBrand;

  const getDataBrand = async () => {
    await axios.get("https://localhost:7182/api/Brands/GetBrands").then((res) => {
      setloading(false);
      setstateBrand(
        res.data.map(
          (row: {
            Id: number;
            Name: string;
            Description: string;
            CreatedAt: Date,
            UpdatedAt: Date
          }) => ({
            Id: row.Id,
            Name: row.Name,
            Description: row.Description,
            CreatedAt: row.CreatedAt,
            UpdatedAt: row.UpdatedAt
          })
        )
      );
    });
  };

  //closed

  // moda brand 
  const [isModalOpenBrand, setIsModalOpenBrand] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<number>();
  // const [currentCreatedAt, setCurrentCreatedAt] = useState(new Date());

  const showModalBrand = (Id: any) => {
    setIsModalOpenBrand(true);
    setCurrentBrand(Id);
  };

  const handleOkBrand = () => {
    setIsModalOpenBrand(false);
  };

  const handleCancelBrand = () => {
    setIsModalOpenBrand(false);
  };
  // closed

  interface DataType {
    key: string;
    Name: string;
    Image: string;
    Price: number;
    CategoryName: string;
    CaseSize: number;
  }
  type DataIndex = keyof DataType;



  // call api table products

  const [state, setstate] = useState();
  const [loading, setloading] = useState(true);
  const [dataChart, setDataChart] = useState([]);
  // delete Brand 
  const [selectedId, setSelectedId] = useState(null);
  // closed


  useEffect(() => {
    getData();
    getDataBrand();
    fetchChart();
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

  const fetchChart = () => {
    axios.get("https://localhost:7182/api/Statistics/TotalProductsCategoryOfWeek").then(res => {
      setDataChart(res.data)
    })
  }

  const fetch = () => {
    axios.get("https://localhost:7182/api/Brands/GetBrands").then((res) => {
      setstateBrand(res.data);
    })
  }

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
  ];


  // call api sửa thương hiệu
  const onFinishBrand = (values: any) => {
    const { Name, Id, CreatedAt } = values;
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const data = {
      Id: currentBrand,
      Name,
      CreatedAt: currentDate,
    };


    axios.put(`https://localhost:7182/api/Brands/${currentBrand}`, data, {
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
      });
  };
  // closed sửa thương hiệu

  // call api xóa thương hiệu
  const handleDelete = (Id: number) => {
    if (Id) {
      axios
        .delete(`https://localhost:7182/api/Brands/${Id}`, {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          success();
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
        onOk() {
          console.log();
          handleDelete(Id);
        },
      });
    }
  }
  // clossed


  const columnsBrand: ColumnsType<DataTypeBrand> = [
    {
      title: "Id Brand",
      dataIndex: "Id",
      width: "10%",
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "Name",
      width: "25%",
      ...getColumnSearchPropsBrand("Name")
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      width: "10%",
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
    dataChart,
    xField: "date",
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
      content: "Thành công",
    });
  };
  const Error = () => {
    messageApi.open({
      type: "error",
      content: "Thêm không thành công",
    });
  }
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
          success();
        }
      })
      .catch((error) => {
        console.log(error);
        Error();
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
              Thêm Thương Hiệu
            </Button>
            {/* modal sửa thương hiệu */}
            <Modal title="Sửa Thương Hiệu" open={isModalOpenBrand} onOk={handleOkBrand} onCancel={handleCancelBrand}>
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onFinish={onFinishBrand}
              // initialValues={{
              //   Id: currentBrand,
              // }}
              >
                <Form.Item hidden
                  name="Id"
                >
                  <Input hidden />
                </Form.Item>

                <Form.Item label="Tên thương hiệu" name="Name" rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span style={{ color: "#000000" }}>Ngày đăng ký</span>}
                  name="CreatedAt"
                >
                  <DatePicker />
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
                <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Description" name="Description">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button style={{
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
          <Row className="brand-das-container-responsive" gutter={[1, 1]}>
            <Col span={6}>
              <Space direction="vertical" size={16}>
                <Card style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                    className="label-brand-das-responsive"
                  >
                    Tổng loại sản phẩm
                  </h4>
                  <h4 className="label-brand-das-responsive" style={{ textAlign: "center" }}>{countCateProducts}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                    className="label-brand-das-responsive"
                  >
                    Tổng sản phẩm
                  </h4>
                  <h4 className="label-brand-das-responsive" style={{ textAlign: "center" }}>{totalStock}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                    className="label-brand-das-responsive"
                  >
                    Tổng số lượng đồng hồ nam
                  </h4>
                  <h4 className="label-brand-das-responsive" style={{ textAlign: "center" }}>{wacthesMan}</h4>
                </Card>
                <Card size="small" style={{ width: 270 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                    className="label-brand-das-responsive"
                  >
                    Tổng số lượng đồng hồ nữ
                  </h4>
                  <h4 className="label-brand-das-responsive" style={{ textAlign: "center" }}>{WatchesWoman}</h4>
                </Card>
              </Space>
            </Col>
            <Col span={18}>
              <div className="chart-brand-das-container-responsive" style={{ border: "1px solid black" }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng sản phẩm bán theo loại
                </h4>
                <Line style={{ height: 456 }} data={dataChart} {...config} />
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Row className="brand-dash-container-responsive2" gutter={[16, 4]}>
            <Col span={10}>
              <div className="table-brand-list-responsive">
                <h4 className="title-brand-das-responsive"
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Danh sách thương hiệu
                </h4>
                {/* <Pie
                  style={{}}
                  data={RoundChartData}
                  {...configRoundChart} /> */}
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
                  pagination={{ pageSize: 4, position: ['bottomCenter'] }}
                  columns={columnsBrand}
                  dataSource={stateBrand}
                  scroll={{ x: '100%' }}
                />)}
              </div>
            </Col>
            <Col span={14}>
              <div className="table-brand-list-responsive">
                <h4
                  className="title-brand-das-responsive"
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
                  scroll={{ x: '100%' }}
                />)}
              </div>
            </Col>
          </Row>
        </div>
      </div></>
  );
};

export default BrandDashboardPage;
