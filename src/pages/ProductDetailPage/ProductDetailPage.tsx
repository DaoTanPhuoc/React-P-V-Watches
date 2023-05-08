// import React from "react";

import {
  Button,
  Card,
  Descriptions,
  Input,
  ListProps,
  Space,
  Tabs,
  TabsProps,
} from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetailPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductModel } from "../../models/ProductModel";
import { Content } from "antd/es/layout/layout";
import TabPane from "antd/es/tabs/TabPane";
import {
  TagsOutlined,
  GoldOutlined,
  SketchOutlined,
  SafetyCertificateOutlined,
  ApartmentOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { AppContext } from "../../App";

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const images = [
  {
    id: 1,
    title: "Rolex Date",
    price: "$59.99",
    category: "Rolex",
    linkImg:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0031.png",
  },
  {
    id: 2,
    title: "Rolex GMT master",
    price: "$59.99",
    category: "Rolex",
    linkImg:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0031.png",
  },
  {
    id: 3,
    title: "Rolex Datejust",
    price: "$59.99",
    category: "Rolex",
    linkImg:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0025.png",
  },
  {
    id: 4,
    title: "Rolex Datejust",
    price: "$59.99",
    category: "Rolex",
    linkImg:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0028.png",
  },
  {
    id: 4,
    title: "Rolex Datejust",
    price: "$59.99",
    category: "Rolex",
    linkImg:
      "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0027.png",
  },
];

// const images = [
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0031.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-1/278341rbr-0029.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0025.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0032.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0028.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/278341rbr-0027.png"
// ];

// carousel

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
//

// interface ListingProps {
//   products: ProductModel[];
// }

// const ListingComponents = ({ products }: ListingProps) => {
//   return;
// };

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const onChange = (key: string) => {
  console.log(key);
};

const Details = () => {
  const [product, setProduct] = useState<ProductModel>();
  const { id } = useParams();
  const params = useParams();
  useEffect(() => {
    axios
      .get<ProductModel>(`https://localhost:7182/api/Products/${params.id}`)
      .then((result) => {
        const product = result.data;
        setProduct(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container-tab-detail">
      <div className="container-right">
        <Col span={13}>
          <Descriptions
            style={{ padding: 30, width: 800 }}
            bordered
            column={1}
            size="small"
          >
            <Descriptions.Item label="Mã:">{product?.Code}</Descriptions.Item>
            <Descriptions.Item label="Tình Trạng">New</Descriptions.Item>
            <Descriptions.Item label="Xuất xứ:">Thụy Sĩ</Descriptions.Item>
            <Descriptions.Item label="Kích thước:">
              {product?.CaseSize}
            </Descriptions.Item>
            <Descriptions.Item label="Kính:">
              {product?.GlassMaterial}
            </Descriptions.Item>
            <Descriptions.Item label="Mặt số:">Khảm trai</Descriptions.Item>
            <Descriptions.Item label="Bộ máy:">
              {product?.Movement}
            </Descriptions.Item>
            <Descriptions.Item label="Dự trữ năng lượng: ">
              55 giờ
            </Descriptions.Item>
            <Descriptions.Item label="Chức năng: ">
              Giờ, Phút, Giây, Ngày
            </Descriptions.Item>
            <Descriptions.Item label="Chất liệu: ">
              {product?.CaseMeterial}
            </Descriptions.Item>
            <Descriptions.Item label="Bezel: ">Nạm kim cương</Descriptions.Item>
            <Descriptions.Item label="dây đeo: ">
              President, liên kết ba mảnh hình bán nguyệt
            </Descriptions.Item>
            <Descriptions.Item label="Chất liệu dây đeo: ">
              {product?.Color}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </div>
      <div className="container-left">
        <div style={{ padding: 18 }}>
          <h4
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Tại sao quý khách nên chọn P-watches
          </h4>
          <Col span={14}>
            <Descriptions.Item style={{ display: "block" }} label="Config Info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 15,
                }}
              >
                <div>
                  <SafetyCertificateOutlined style={{ fontSize: 32 }} />
                </div>
                <h4 style={{ fontSize: 16 }}>
                  Dịch vụ hậu mãi và sửa chữa hàng đầu theo tiêu chuẩn Thụy Sĩ
                </h4>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 15,
                }}
              >
                <div>
                  <SketchOutlined style={{ fontSize: 32 }} />
                </div>
                <h4 style={{ fontSize: 16 }}>
                  Luôn luôn cập nhật những sản phẩm mới phù hợp với lứa tuổi
                </h4>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 15,
                }}
              >
                <div>
                  <ApartmentOutlined style={{ fontSize: 32 }} />
                </div>
                <h4 style={{ fontSize: 16 }}>
                  Dịch vụ hậu mãi và sửa chữa hàng đầu theo tiêu chuẩn Thụy Sĩ
                </h4>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 15,
                }}
              >
                <div>
                  <TagsOutlined style={{ fontSize: 32 }} />
                </div>
                <h4 style={{ fontSize: 16 }}>
                  Dịch vụ hậu mãi và sửa chữa hàng đầu theo tiêu chuẩn Thụy Sĩ
                </h4>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 15,
                }}
              >
                <div>
                  <GoldOutlined style={{ fontSize: 32 }} />
                </div>
                <h4 style={{ fontSize: 16 }}>
                  Dịch vụ hậu mãi và sửa chữa hàng đầu theo tiêu chuẩn Thụy Sĩ
                </h4>
              </div>
              <br />
            </Descriptions.Item>
          </Col>
        </div>
      </div>
    </div>
  );
};

const PostProducts = () => {
  return (
    <section id="blog">
      <div className="blog-box">
        <div className="blog-image">
          <img
            src="https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Blog"
          />
        </div>
        <div className="blog-details">
          <h4>Good as Gold Blog</h4>
          <p>
            A lot of the time when lists like this are put together, the
            emphasis is usually placed on small business blogs that talk about
            how to run and manage a business. And while such lists are certainly
            useful, I thought it would be a good idea to put together a list of
            blogs actually created and managed by retail store owners. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsam
            magnam quaerat reprehenderit dolores, nisi atque itaque enim nihil
            eius nam veritatis animi maiores! Autem nesciunt voluptatibus
            doloribus aut nisi.
          </p>
          <a href="#">Continue reading</a>
        </div>
        <h1>01/22</h1>
      </div>
      <div className="blog-box">
        <div className="blog-image">
          <img
            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Blog"
          />
        </div>
        <div className="blog-details">
          <h4>10 Menswear Blogs Every Guy Should Know</h4>
          <p>
            A decade ago, you could count the number of men’s style bloggers on
            one hand. Clearly those days are long gone. Today, sifting through
            all of them would take an eternity. So we’ve gathered 10 that
            inspire us so you can bookmark them and get inspired too. Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Est cumque
            adipisci dolorem officia, beatae modi aspernatur hic rem iure
            mollitia placeat cupiditate eum corporis ullam expedita, non ipsam
            et fugit!
          </p>
          <a href="#">Continue reading</a>
        </div>
        <h1>01/19</h1>
      </div>
      <div className="blog-box">
        <div className="blog-image">
          <img
            src="https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Blog"
          />
        </div>
        <div className="blog-details">
          <h4>8 Beauty bloggers you should be following</h4>
          <p>
            {" "}
            On the weekend (or whenever—who are we kidding?), we love nothing
            more than checking out what our favorite influencers are posting,
            from the products they're raving about or the makeup tutorials
            they're loving. While makeup and skincare blogs launch all the time,
            we continue to go back to certain experts over and over again Lorem
            ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati,
            perspiciatis est ipsum aliquid itaque earum omnis quo at atque
            rerum. Harum dolor officiis impedit, cupiditate laborum vitae
            corrupti sapiente quas....
          </p>
          <a href="#">Continue reading</a>
        </div>
        <h1>10/22</h1>
      </div>
      <div className="blog-box">
        <div className="blog-image">
          <img
            src="https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Blog"
          />
        </div>
        <div className="blog-details">
          <h4>Good, Better, Best</h4>
          <p>
            Learning how to choose what kind of t-shirt to use for your craft or
            screen-printing project depends on your crafting or screen-printing
            business needs. Some fabric and screen-printing choices make more
            sense for your bottom line than others. Or perhaps you’re looking
            for a different kind of t-shirt for your business due to changing
            needs. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolorum necessitatibus ex commodi assumenda praesentium, ea iste
            perspiciatis aperiam explicabo exercitationem odit inventore qui
            rerum voluptatum est nesciunt, cum eaque? Quod.
          </p>
          <a href="#">Continue reading</a>
        </div>
        <h1>09/15</h1>
      </div>
      <div className="blog-box">
        <div className="blog-image">
          <img
            src="https://images.pexels.com/photos/1266139/pexels-photo-1266139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Blog"
          />
        </div>
        <div className="blog-details">
          <h4>3 keys to healthy grocery shopping</h4>
          <p>
            With the New Year a few months behind us now, hectic schedules and
            daily distractions have gotten in the way of our most well intended
            resolutions. If you are still looking to work on being healthier
            this year, eating healthier is a good option that may be easier than
            it seems. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugit dolorum obcaecati blanditiis id quidem sequi esse non,
            molestiae sunt reiciendis natus error pariatur odit rem sapiente
            facere? Distinctio, autem ex.
          </p>
          <a href="#">Continue reading</a>
        </div>
        <h1>08/21</h1>
      </div>
    </section>
  );
};

// const [products, setProducts] = useState<ProductModel[]>([]);
// useEffect(() => {
//   axios
//     .get(`https://localhost:7182/api/Products`)
//     .then((result) => {
//       setProducts(result.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Chi tiết sản phẩm`,
    children: <Details />,
  },
  {
    key: "2",
    label: `Bài viết liên quan`,
    children: <PostProducts />,
  },
  {
    key: "3",
    label: `Chính sách`,
    children: `Content of Tab Pane 3`,
  },
];

// const previewItems = [
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/645x0/rolex-datejust-36-126284rbr-0029.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/thumbs/418x0/rolex-datejust-31-278384rbr-0008.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-28/thumbs/418x0/rolex-datejust-28-279381rbr-0011.png",
//   "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-31/1/thumbs/418x0/rolex-datejust-31-278384rbr-0008.png",
// ];

const ProductDetail = () => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [defaultImage, setDefaultImage] = useState({});
  const [productDetail, setProductDetail] = useState<ProductModel>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // SimilarProduct
  const [similarProducts, setSimilarProducts] = useState<ProductModel[]>([]);

  const { brandId, caseSize } = useParams();

  // so lan click đặt hàng

  useEffect(() => {
    axios
      .get(
        `https://localhost:7182/api/Products/SimilarProduct?brandId=${brandId}&caseSize=${caseSize}`
      )
      .then((result) => {
        const similarProduct = result.data;
        setSimilarProducts(similarProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [brandId, caseSize]);
  //

  const { id } = useParams();

  // get api (id)
  const params = useParams();

  useEffect(() => {
    axios
      .get<ProductModel>(`https://localhost:7182/api/Products/${params.id}`)
      .then((result) => {
        const product = result.data;
        setProductDetail(product);
        const images: string[] = JSON.parse(product.PreviewImages);
        setPreviewImages(images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // add cart
  const { cartOrders = [], onChangeCartOrders } = useContext(AppContext);
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
  // close

  return (
    <div>
      <div className="main-wrapper">
        <div className="container">
          <div className="product-div">
            <div className="product-div-left">
              <div className="img-container">
                <img
                  src={previewImages[currentPreviewIndex]}
                  alt="Rolex Datejust"
                />
              </div>
              <div className="hover-container">
                {previewImages.map((previewItem, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentPreviewIndex(index)}
                    className={`img-item${
                      currentPreviewIndex === index ? " active" : ""
                    }`}
                  >
                    <img src={previewItem} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="product-div-right">
              <span style={{ color: "#dbaf56" }} className="product-name">
                {productDetail?.Name}
              </span>
              <span className="product-price">
                {" "}
                {moneyFormatter.format(Number(productDetail?.Price))}
              </span>
              <p className="product-description">
                {productDetail?.Description}
              </p>
              <div className="btn-groups">
                {productDetail?.Stock != 0 ? (
                  <button
                    onClick={() => {
                      addToCart(productDetail);
                    }}
                    style={{
                      marginTop: 10,
                      marginBottom: 15,
                      textTransform: "uppercase",
                    }}
                    type="button"
                    className="add-cart-btn"
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ShoppingCartOutlined
                        style={{
                          paddingRight: 10,
                          fontSize: 30,
                          color: "#fff",
                        }}
                      />{" "}
                      Mua Hàng
                    </span>
                  </button>
                ) : (
                  <Meta
                    className="btn-out-stock"
                    style={{ padding: 10, textTransform: "uppercase" }}
                    title={productDetail?.Stock == 0 ? "Hết Hàng" : <br />}
                  />
                )}

                {/* <button type="button" className="add-cart-btn">
                  Add to cart
                </button> */}
              </div>

              {/* TabContainer */}
              <div className="wrapper">
                <ReactPlayer
                  className="player"
                  controls
                  muted
                  autoplay={false}
                  url="https://www.youtube.com/watch?v=GGFUgyWwW20"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        size="large"
        style={{
          background: "white",
          paddingLeft: 90,
          paddingBottom: 20,
        }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />

      <div
        style={{
          width: "100%",
          height: 150,
          backgroundColor: "black",
        }}
        className="banner-row-container"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Card.Grid style={gridStyle}>
            <div className="card-banner-items-image">
              <img
                style={{
                  width: 60,
                  height: 60,
                }}
                src="https://donghotantan.vn/images/strengths/original/stg21_1659589070.png"
                alt=""
              />
            </div>
            <div className="card-banner-items-content">
              <h4 style={{ fontWeight: 700, padding: 10, color: "#fff" }}>
                Đồng hồ chính hảng
              </h4>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="card-banner-items-image">
              <img
                style={{
                  width: 60,
                  height: 60,
                }}
                src="https://donghotantan.vn/images/strengths/original/stg22_1659589113.png"
                alt=""
              />
            </div>
            <div className="card-banner-items-content">
              <h4 style={{ fontWeight: 700, padding: 10, color: "#fff" }}>
                Nhà Phân Phối Chính Thức
              </h4>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="card-banner-items-image">
              <img
                style={{
                  width: 60,
                  height: 60,
                }}
                src="https://donghotantan.vn/images/strengths/original/stg24_1659589157.png"
                alt=""
              />
            </div>
            <div className="card-banner-items-content">
              <h4 style={{ fontWeight: 700, padding: 10, color: "#fff" }}>
                Nhiều Mẫu Mã
              </h4>
            </div>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="card-banner-items-image">
              <img
                style={{
                  width: 60,
                  height: 60,
                }}
                src="https://donghotantan.vn/images/strengths/original/stg23_1659589133.png"
                alt=""
              />
            </div>
            <div className="card-banner-items-content">
              <h4 style={{ fontWeight: 700, padding: 10, color: "#fff" }}>
                Ủy quyền bảo hành
              </h4>
            </div>
          </Card.Grid>
        </div>
      </div>

      <div className="Similar-Product-container">
        <div className="App">
          <h2
            style={{
              textAlign: "center",
              padding: 70,
              textTransform: "uppercase",
            }}
          >
            Sản Phẩm Tương tự
          </h2>
          <Slider {...settings}>
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct.Id}>
                <img
                  style={{ height: 300, width: "100%", objectFit: "cover" }}
                  src={similarProduct.Image}
                  alt={similarProduct.Name}
                />
                <div style={{ padding: 20, textAlign: "center" }}>
                  <h4 style={{ color: "#888888" }}>
                    MSP {similarProduct.Code}
                  </h4>
                  <h4 style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                    {similarProduct.Name}
                  </h4>

                  <h4 style={{ color: "#ecbf37" }}>
                    {moneyFormatter.format(similarProduct.Price)}
                  </h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
