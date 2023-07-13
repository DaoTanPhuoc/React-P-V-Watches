import {
    Button,
    Card,
    notification,
    Pagination,
    Select,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./FilterProductsByCartier.css";
import { Image } from "antd";
import {
    ShoppingCartOutlined,
} from "@ant-design/icons";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SliderMarks } from "antd/es/slider";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProductModel } from "../../../models/ProductModel";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AppContext } from "../../../App";
import { error } from "console";

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

const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
};

const pageSize = 8;
const Context = React.createContext({ name: "Default" });

const FilterProductsByCartier = () => {

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
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // diem so luong san pham tra ve
    const [countProducts, setCountProducts] = useState(0)
    // const { brandId, categoryId } = useParams();
    // (chuyen trang)
    // test chức năng lọc nâng cao
    const [tempProducts, setTempProducts] = useState<ProductModel[]>([]);
    //
    const { categoryId } = useParams();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        axios
            .get(`https://localhost:7182/api/Products`)
            .then((result) => {
                const filteredProducts = result.data.filter((product: { BrandName: string; }) => product.BrandName === "Cartier");
                setProducts(filteredProducts);
                const count = filteredProducts.length;
                filterData(currentPage, filteredProducts);
                setCountProducts(count)
                setTempProducts(filteredProducts)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };

    const onChangePage = (page: number) => {
        setCurrentPage(page);
        filterData(page, products);
        // chuyển trang scroll tới vì trí chọn sản phẩm
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

    // lọc sản phẩm theo thương hiệu của sản phẩm
    const [selectedBrand, setSelectedBrand] = useState(0)
    useEffect(() => {
        if (selectedBrand === 0) {
            return;
        }
        axios
            .get(`https://localhost:7182/api/Products/GetProductsByBrand?brandId=${selectedBrand}`)
            .then((result) => {
                //filterData(currentPage, result.data);
                const filterman = result.data.filter((manpro: any) => manpro.CategoryName === "male")
                filterData(currentPage, filterman)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedBrand, currentPage]);

    // const handleBrandChange = (value: number) => {
    //     if (value === 0) {
    //         setSelectedBrand(value);
    //         setCurrentPage(1);
    //         filterData(1, products)
    //     } else {
    //         setSelectedBrand(value);
    //         setCurrentPage(1);
    //         axios
    //             .get(`https://localhost:7182/api/Products/GetProductsByBrand?brandId=${value}`)
    //             .then((result) => {
    //                 //const filterMan = result.data.filter((manproducts: any) => manproducts.categoryId === 1)
    //                 setFilteredProducts(result.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // };

    // phuoc viet
    // const handleBrandChange = (value: string) => {
    //     if (value == "") {
    //         filterData(currentPage, products)
    //     } else {
    //         var filterPro = products.filter(p => p.BrandName === value);
    //         filterData(currentPage, filterPro)
    //     }
    // }
    //

    // closed
    const isShow = true;

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

        if (caseSize !== 0) {
            filteredProducts = filteredProducts.filter(p => p.CaseSize === caseSize);
        }

        if (brand !== "") {
            filteredProducts = filteredProducts.filter(p => p.BrandName === brand);
        }

        setProducts(filteredProducts);
        filterData(currentPage, filteredProducts);
    };
    // clossed



    return (
        <div>
            <section className="ban_sec">
                <div className="container-ban">
                    <div className="ban_img">
                        <img
                            style={{ height: 580, objectFit: "cover" }}
                            src="https://zadok.com/wp-content/uploads/banner-blp-cartier-2560x870-pasha-steel-wspa0009.jpg"
                            alt="banner"
                        />
                        {/* <div className="ban_text">
                            <strong>
                                <span>VP - Watch</span>
                               
                            </strong>
                            <p>
                                VP Watch rất vui vì được phục vụ quý khách<br />
                                Chuyên cung cấp các đồng hồ <br /> chính hãng đến tay khách hàng{" "}
                            </p>
                            <a href="#">Mua Ngay!</a>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* filter */}
            <div className="Products-container">
                <div className="filter">
                    <div className="filter-items">
                        {/* <Select
                            showSearch
                            style={{
                                width: 150,
                                fontWeight: "bold",
                            }}
                            placeholder="Thương Hiệu"
                            optionFilterProp="children"
                            value={selectedBrand}
                            defaultValue={0}
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
                                    value: 0,
                                    label: "Thương Hiệu",
                                },
                                {
                                    value: 1,
                                    label: "Rolex",
                                },
                                {
                                    value: 2,
                                    label: "Hublot",
                                },
                                {
                                    value: 3,
                                    label: "Orient",
                                },
                                {
                                    value: 4,
                                    label: "Channel",
                                },
                            ]}
                        /> */}

                        {/* <Select
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
                                    value: "Orient",
                                    label: "Orient",
                                },
                                {
                                    value: "Channel",
                                    label: "Channel",
                                },
                            ]}
                        /> */}
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
                    </div>
                    <div className="filter-items">
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
                    <h4 style={{ fontWeight: "bold" }}>Kết quả tìm kiếm ({countProducts}) </h4>
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
                                            // margin: 53,
                                            marginTop: 25,
                                            color: "#fff",
                                            backgroundColor: "#000000",
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
}

export default FilterProductsByCartier