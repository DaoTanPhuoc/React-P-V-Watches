import {
  Button,
  Card,
  notification,
  Pagination,
  Select,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./ShopPage.css";
import { Image } from "antd";
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SliderMarks } from "antd/es/slider";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProductModel } from "../../models/ProductModel";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AppContext } from "../../App";
import { error } from "console";
import { AnySrvRecord } from "dns";

// search filter
const initialList = {
  sortby: {
    Newest: true,
    Oldest: false,
    "Lowest Price": false,
    "Highest Price": false,
  },
  size: {
    "44mm": false,
    "32mm": true,
    "36mm": true,
    "40mm": false,
  },
  Movement: {
    automatic: false,
    "Quartz Watch": false,
  },
  brand: {
    Rolex: false,
    Omega: false,
    Hublot: false,
    Chanel: false,
  },
};

//
const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ShopContent = [
  "https://donghotantan.vn/images/products/manufactories//resized/tissot_1663842811.jpg.webp",
  "https://donghotantan.vn/images/products/manufactories//resized/citizen_1663842764.jpg.webp",
];

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const { Meta } = Card;

const marks: SliderMarks = {
  0: "0",
  20: "2000$",
  40: "3000$",
  60: "6000$",
  80: "8000$",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>100.000$</strong>,
  },
};
;

const pageSize = 8;
const Context = React.createContext({ name: "Default" });

const ShopPage = () => {
  const navigate = useNavigate();

  const { cartOrders = [], onChangeCartOrders } = useContext(AppContext);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  // list product

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [tempProducts, setTempProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const { brandId, categoryId } = useParams();
  // (chuyen trang)
  // show ket qua tim kiem
  const [countProducts, setCountProducts] = useState(0)
  // dong
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    axios
      .get(`https://localhost:7182/api/Products`)
      .then((result) => {
        setProducts(result.data);
        setTempProducts(result.data);
        filterData(currentPage, result.data);
        const count = result.data.length;
        setCountProducts(count)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    filterData(page, products);
    window.scrollTo({ top: 730, behavior: 'smooth' })
  };

  const filterData = (page: number, data: ProductModel[]) => {
    let count = 1;
    const productsTmp: ProductModel[] = [];
    for (let i = (page - 1) * pageSize; i < data.length; i++) {
      if (count > pageSize || i === data.length) {
        break;
      }
      count++;
      productsTmp.push(data[i]);
    }
    setFilteredProducts(productsTmp);
  };

  const sortByPrice = (value: number) => {
    let temp = products.sort((a, b) => a.Price < b.Price ? 1 : -1);
    if (value === 2) {
      filterData(currentPage, temp);
    } else if (value === 3) {
      filterData(currentPage, temp.reverse())
    } else if (value === 1) {
      filterData(currentPage, products)
    }
  }

  // // lọc sản phẩm theo giá tăng giảm dần
  const [selectedSortBy, setSelectedSortBy] = useState(1);
  const sortProducts = (sortBy: number) => {
    let sortedProducts;
    if (selectedBrand === 0) {
      sortedProducts = [...products];
    }
    else {
      sortedProducts = [...filteredProducts];
    }
    //let sortedProducts = [...products];
    switch (sortBy) {
      case 2:
        // Sắp xếp giá tăng dần
        sortedProducts.sort((a, b) => {
          return a.Price - b.Price;
        });
        setFilteredProducts(sortedProducts);
        setCurrentPage(1);
        filterData(currentPage, sortedProducts);
        break;
      case 3:
        // Sắp xếp giá giảm dần
        sortedProducts.sort((a, b) => {
          return b.Price - a.Price;
        });
        setFilteredProducts(sortedProducts);
        setCurrentPage(1);
        filterData(currentPage, sortedProducts);
        break;
      default:
        // Mặc định không sắp xếp
        setProducts(tempProducts)
        filterData(1, products);
        break;
    }
  };




  // filter theo thương hiệu sản phẩm
  const [selectedBrand, setSelectedBrand] = useState(0);


  useEffect(() => {
    if (selectedBrand === 0) {
      return;
    }
    axios
      .get(`https://localhost:7182/api/Products/GetProductsByBrand?brandId=${selectedBrand}`)
      .then((result) => {
        filterData(currentPage, result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedBrand, currentPage]);



  // const handleBrandChange = (value: string) => {
  //   if (value === "") {
  //     setProducts(tempProducts)
  //     filterData(currentPage, products)
  //   } else {
  //     var tempProduct = tempProducts.filter(p => p.BrandName === value);
  //     setProducts([...tempProduct])
  //     filterData(currentPage, tempProduct)
  //   }
  // };


  // test thử lọc nâng cao
  const [caseSize, setCaseSize] = useState(0);
  const [brand, setBrand] = useState("");

  const handleCaseSizeChange = (value: number) => {
    setCaseSize(value);
    filterProducts(value, brand);
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
    filterProducts(caseSize, value);
  };

  const filterProducts = (caseSize: number, brand: string) => {
    let filteredProducts = tempProducts;
    let count = tempProducts.length;

    if (caseSize !== 0) {
      filteredProducts = filteredProducts.filter(p => p.CaseSize === caseSize);
    }

    if (brand !== "") {
      filteredProducts = filteredProducts.filter(p => p.BrandName === brand);
      count = filteredProducts.length;
    }
    setCountProducts(count)
    setProducts(filteredProducts);
    filterData(currentPage, filteredProducts);
  };
  // clossed


  // product: OrderProductModel
  function addToCart(orderProduct: any) {
    try {
      const cartOrdersTmp = [...cartOrders];

      const cartOrder = cartOrdersTmp.find(
        (order: any) => order.Id === orderProduct.Id
      );
      if (cartOrder) {
        // cartOrder.Quantity += 1;
        cartOrder.TotalPrice = cartOrder.Quantity * cartOrder.Price;
      } else {
        orderProduct.Quantity = 1;
        orderProduct.TotalPrice = orderProduct.Price;
        cartOrdersTmp.push(orderProduct);
      }

      onChangeCartOrders(cartOrdersTmp);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <section className="ban_sec">
        <div className="container-ban">
          <div className="ban_img">
            <img
              style={{ height: 580, objectFit: "cover" }}
              src="https://theme.hstatic.net/200000596685/1000963076/14/home-banner-three-image.png?v=145"
              alt="banner"
            />
            <div className="ban_text">
              <strong>
                <span style={{ fontFamily: "Times New Roman" }}>VP-Watch</span>
                {/* <br /> needs now */}
              </strong>
              <p style={{ fontFamily: "Futura" }}>
                Thời gian là vô hạn, chúng tôi rất vinh dự <br />
                khi là người mang đến giá trị đó thông qua {" "}<br />
                những sản phẩm đầy tính nghệ thuật.
              </p>
              {/* <a href="#">Lend a hand</a> */}
            </div>
          </div>
        </div>
      </section>

      {/* filter */}
      <div className="Products-container">
        <div className="filter">
          <div className="filter-items">
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Thương Hiệu"
              optionFilterProp="children"
              //value={selectedBrand}
              defaultValue={""}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              onChange={handleBrandChange}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "",
                  label: "Thương Hiệu",
                },
                {
                  value: "Rolex",
                  label: "Rolex",
                },
                {
                  value: "Hublot",
                  label: "Hublot",
                },
                {
                  value: "Franck Muller",
                  label: "Franck Muller",
                },
                {
                  value: "Gucci",
                  label: "Gucci",
                },
                {
                  value: "Omega",
                  label: "Omega",
                },
                {
                  value: "Breiting",
                  label: "Breiting",
                },
                {
                  value: "Longines",
                  label: "Longines",
                },
                {
                  value: "IWC",
                  label: "IWC",
                },
                {
                  value: "Cartier",
                  label: "Cartier",
                }
              ]}
            />
          </div>
          <div className="filter-items">
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Sắp xếp"
              optionFilterProp="children"
              defaultValue={1}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              onChange={(value) => sortByPrice(value)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: 1,
                  label: "Tất cả",
                },
                {
                  value: 2,
                  label: "Giảm dần",
                },
                {
                  value: 3,
                  label: "Tăng dần",
                },
              ]}
            />
            {/* <Select
              style={{ width: 150, fontWeight: "bold", marginLeft: 10 }}
              placeholder="Sắp Xếp"
              value={selectedSortBy}
              defaultValue={1}
              onChange={(value: number) => {
                setSelectedSortBy(value);
                sortProducts(value);
              }}
              options={[
                { value: 1, label: "Mặc Định" },
                { value: 2, label: "Giá Tăng Dần" },
                { value: 3, label: "Giá Giảm Dần" },
              ]}
            /> */}
          </div>
          {/* filter casesize */}
          {/* <div className="filter-items">
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Kích thước"
              optionFilterProp="children"
              defaultValue={1}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              onChange={(value: any) => {
                handleCaseSizeChange(value, products);
              }}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: 1,
                  label: "Tất cả",
                },
                {
                  value: 31,
                  label: "31mm",
                },
                {
                  value: 44,
                  label: "44mm",
                },
                {
                  value: 33,
                  label: "33mm",
                },
                {
                  value: 40,
                  label: "40mm",
                },
              ]}
            />
          </div> */}
          <div className="filter-items">

            {/* <Select
              placeholder="Select Case Size"
              value={caseSize}
              onChange={(value: number) => {
                handleCaseSizeChange(value);
              }}
            >
              {caseSizes.map((size, index) => (
                <Select.Option key={index} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select> */}
            <Select
              showSearch
              style={{
                width: 150,
                fontWeight: "bold",
              }}
              placeholder="Kích thước"
              optionFilterProp="children"
              defaultValue={1}
              value={caseSize}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              onChange={(value: number) => {
                handleCaseSizeChange(value);
              }}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: 0,
                  label: "Kích thước",
                },
                {
                  value: 28,
                  label: "28mm",
                },
                {
                  value: 29,
                  label: "29mm",
                },
                {
                  value: 31,
                  label: "31mm",
                },
                {
                  value: 33,
                  label: "33mm",
                },
                {
                  value: 36,
                  label: "36mm",
                },
                {
                  value: 40,
                  label: "40mm",
                },
                {
                  value: 41,
                  label: "41mm",
                },
                {
                  value: 42,
                  label: "42mm"
                },
                {
                  value: 43,
                  label: "43mm"
                },
                {
                  value: 44,
                  label: "44mm",
                }
              ]}
            />
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <h4 style={{ fontWeight: "bold" }}>Tìm thấy {countProducts} đồng hồ !</h4>
        </div>
        <Card className="card-resp">
          {filteredProducts.map((watchItem) => (
            <Card.Grid style={gridStyle} key={watchItem.Id}>
              <Link to={`/ProductDetail/${watchItem.BrandName}/${watchItem.Code}`}>
                <Image
                  style={{ height: 250, cursor: "pointer" }}
                  rootClassName="card-item-image"
                  width={250}
                  src={watchItem.Image}
                  alt="Rolex Datejust"
                  preview={false}
                />
              </Link>
              {/* <Button
                icon={<ShoppingCartOutlined />}
                style={{ margin: 20 }}
                size={"large"}
              >
                Add to cart
              </Button> */}
              <h4 style={{ color: "#888888" }}>MSP {watchItem.Code}</h4>
              <h4 className="Name__products_in_Store" style={{ fontWeight: 600 }}>{watchItem.Name}</h4>
              <h4 style={{ color: "#dbaf56" }}>
                {moneyFormatter.format(watchItem.Price)}{" "}
              </h4>

              <Meta
                style={{ padding: 10, textTransform: "uppercase" }}
                title={watchItem.Stock === 0 ? "Hết Hàng" : <br />}
              />

              <Context.Provider value={contextValue}>
                {contextHolder}
                {watchItem.Stock !== 0 ? (
                  <Button
                    className="btn-shopping"
                    icon={<ShoppingCartOutlined className="icon-btn-shopping" style={{ color: "#fff" }} />}
                    style={{
                      marginTop: 25,
                      color: "#fff",
                      backgroundColor: "#000000",
                      // color: "#000000",
                      // backgroundColor: "#dbaf56",
                      fontWeight: "bold"
                    }}
                    size={"large"}
                    onClick={() => {
                      addToCart(watchItem);
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
                ) : (
                  ""
                )}
              </Context.Provider>
            </Card.Grid>
          ))}
        </Card>

        <Pagination
          style={{ textAlign: "center", padding: 35 }}
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={(page) => onChangePage(page)}
        />
      </div>
    </div>
  );
};

export default ShopPage;
