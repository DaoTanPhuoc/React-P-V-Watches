import { Line, Pie, Stock } from "@ant-design/charts";
import {
  Button,
  Col,
  Input,
  InputRef,
  Result,
  Row,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopOutlined, DollarOutlined } from "@ant-design/icons";
import "./StatisticalPage.css";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "antd/es/list/Item";
import { error } from "console";
import { type } from "os";
import style from "antd/es/alert/style";
import { AppContext } from "../../../App";

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

// tabel

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};
interface DataType {
  key: string;
  Name: string;
  Code: string;
  Image: string;
  Stock: number;
  Price: number;
  BrandName: string;
  tag: string;
}
type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     nameProduct: "ROLEX DAY-DATE 40MM",
//     Code: "126284RBR-0029",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/rolex/day-date-1/thumbs/418x0/rolex-day-date-40mm-228235-0045.png",
//     stock: 10,
//     Price: 32,
//     NameCategories: "male",

//     tag: "success",
//   },
//   {
//     key: "2",
//     nameProduct: "PATEK PHILIPPE COMPLICATIONS",
//     Code: "126284RBR-0028",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
//     stock: 10,
//     Price: 42,
//     NameCategories: "female",

//     tag: "success",
//   },
//   {
//     key: "3",
//     nameProduct: "HUBLOT BIG BANG STEEL DIAMONDS",
//     Code: "126284RBR-0027",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/hublot/big-bang/thumbs/418x0/hublot-big-bang-steel-diamonds-341-sx-130-rx-114.png",
//     stock: 15,
//     Price: 32,
//     NameCategories: "male",

//     tag: "error",
//   },
//   {
//     key: "4",
//     nameProduct: "FRANCK MULLER VANGUARD LADY MOONPHASE",
//     Code: "126284RBR-0026",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",
//     stock: 20,
//     Price: 32,
//     NameCategories: "female",

//     tag: "error",
//   },
//   {
//     key: "5",
//     nameProduct: "PATEK PHILIPPE COMPLICATIONS",
//     Code: "126284RBR-0025",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5905p-001.png",
//     stock: 10,
//     Price: 3550000000,
//     NameCategories: "male",

//     tag: "error",
//   },
//   {
//     key: "6",
//     nameProduct: "PATEK PHILIPPE COMPLICATIONS",
//     Code: "126284RBR-0024",
//     image:
//       "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5905p-001.png",
//     stock: 5,
//     Price: 3550000000,
//     NameCategories: "female",

//     tag: "error",
//   },
// ];

//

const myData = [
  { x: "Thứ hai", y: 3 },
  { x: "Thứ Ba", y: 5 },
  { x: "Thứ Tư", y: 4 },
  { x: "Thứ Năm", y: 6 },
  { x: "Thứ Sáu", y: 8 },
  { x: "Thứ Bảy", y: 7 },
  { x: "Chủ Nhật", y: 9 },
];



// call api chart

const StatisticalPage = () => {

  const { currentToken } = useContext(AppContext)
  // call api table tồn kho
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  const [brandStock, setBrandStock] = useState([]);
  useEffect(() => {
    getData();
    getBrandStock()
    setloading(false);
  }, []);

  const getBrandStock = async () => {
    axios.get("https://localhost:7182/api/Statistics/BrandCountStock", { headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setBrandStock(res.data));
  }

  const getData = async () => {
    await axios.get("https://localhost:7182/api/Products").then((res) => {
      setstate(
        res.data.map(
          (row: {
            Name: string;
            Code: string;
            Image: number;
            Stock: number;
            Price: string;
            BrandName: string;
          }) => ({
            Name: row.Name,
            Code: row.Code,
            Image: row.Image,
            Stock: row.Stock,
            Price: row.Price,
            BrandName: row.BrandName,
          })
        )
      );
    });
  };

  // closed

  // api tổng sản phẩm
  const [countStock, setCountStock] = useState([])
  useEffect(() => {
    axios
      .get("https://localhost:7182/api/Products")
      .then((result) => {
        const countS = result.data;
        setCountStock(countS)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  const countStockProducts = countStock.length;
  // closed

  // Tổng thương hiệu
  const [countBrand, setCountBrand] = useState([])
  useEffect(() => {
    axios
      .get("https://localhost:7182/api/Brands/GetBrands")
      .then((result) => {
        setCountBrand(result.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  const countBrandProducts = countBrand.length;
  // closed


  // call api chart pie
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('https://example.com/api/data')
  //     .then(response => {
  //       const transformedData = response.data.map((item: { BrandName: any; Stock: any; }) => ({
  //         type: item.BrandName,
  //         value: item.Stock
  //       }));
  //       setData(transformedData);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  //

  const RoundChartData = [
    {
      type: "Role",
      value: 27,
    },
    {
      type: "Channel",
      value: 25,
    },
    {
      type: "Orient",
      value: 18,
    },
    {
      type: "Hublot",
      value: 15,
    },
    {
      type: "Citizen",
      value: 10,
    },
  ];
  const config = {
    appendPadding: 10,
    brandStock,
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

  // close

  // call api loại sản phẩm
  // const { brandId } = useParams();

  // const [brandProducts, setbrandProducts] = useState<BrandModel[]>([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://localhost:7182/api/Products/GetProductsByBrand?brandId=${brandId}`
  //     )
  //     .then((result) => {
  //       setbrandProducts(result.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [brandId]);

  //close
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
      title: "Mã sản phẩm",
      dataIndex: "Code",
      width: "15%",
      ...getColumnSearchProps("Code"),
    },
    {
      title: "Sản phẩm",
      dataIndex: "Image",
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
      title: "Tồn kho",
      dataIndex: "Stock",
      width: "10%",
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
      title: "Thương hiệu",
      dataIndex: "BrandName",
      width: "10%",
      //render: (BrandId) => brandProducts[BrandId].Name,
      render: (BrandName) => BrandName,
      ...getColumnSearchProps("BrandName"),
    },
    {
      title: "Tình trạng",
      dataIndex: "Stock",
      width: "10%",
      render: (Stock) => (
        <span>
          {Stock === 0 ? (
            <Tag color="error">Hết hàng</Tag>
          ) : (
            <Tag color="success">Còn hàng</Tag>
          )}
        </span>
      ),
    },
    // {
    //   title: "Chức năng",
    //   width: "15%",
    //   dataIndex: "action",
    //   render: () => (
    //     <Space>
    //       <a>Edit</a>
    //     </Space>
    //   ),
    // },
  ];
  return (
    // <div className="Container-StatisticalPage">
    //   <div className="title-chart-das">Thống Kê Doanh Thu</div>
    //   <div className="chart-das-container">
    //     <div className="left-chart">
    //       {loading ? (
    //         <Spin style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           margin: "20%"
    //         }} delay={1000} />
    //       ) : (
    //         <Table
    //           pagination={{ pageSize: 4 }}
    //           columns={columns}
    //           dataSource={state}
    //         />
    //       )}
    //     </div>
    //     <div className="right-chart">
    //       <div style={{ fontWeight: 600, fontSize: 19, padding: "20px 20px" }}>
    //         Thống kê số lượng tồn kho
    //       </div>
    //       <div className="chart-brand">
    //         <Pie data={RoundChartData} {...config} />
    //       </div>
    //       <div className="container-right">
    //         <Row gutter={20}>
    //           <Col span={12}>
    //             <Statistic
    //               title="Tổng sản phẩm"
    //               value={countStockProducts}
    //               prefix={<ShopOutlined />}
    //             />
    //           </Col>
    //           <Col span={12}>
    //             <Statistic
    //               title="Tổng thương hiệu"
    //               value={countBrandProducts}
    //               prefix={<DollarOutlined />}
    //             />
    //           </Col>
    //         </Row>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <Row gutter={[8, 8]}>
      <Col xs={{ span: 22, offset: 0 }} lg={{ span: 15, offset: 0 }}>
        <div className="left-chart">
          {loading ? (
            <Spin style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20%"
            }} delay={1000} />
          ) : (
            <Table
              pagination={{ pageSize: 4, position: ['bottomCenter'] }}
              columns={columns}
              dataSource={state}
              scroll={{ x: '100%' }}
            />
          )}
        </div>
      </Col>

      <Col xs={{ span: 30, offset: 0 }} lg={{ span: 8, offset: 1 }}>
        <div className="right-chart">
          <div style={{ padding: "20px 20px", textAlign: "center", color: "#4963AF", fontSize: 18 }}>
            Thống kê số lượng tồn kho
          </div>
          <div className="chart-brand">
            <Pie data={brandStock} {...config} />
          </div>
          <div className="container-right">
            <Row gutter={20}>
              <Col span={12}>
                <Statistic
                  title="Tổng sản phẩm"
                  value={countStockProducts}
                  prefix={<ShopOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Tổng thương hiệu"
                  value={countBrandProducts}
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default StatisticalPage;
