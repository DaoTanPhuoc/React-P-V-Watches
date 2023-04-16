// import React from "react";

import { Descriptions, Input, ListProps, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
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

interface ListingProps {
  products: ProductModel[];
}

const ListingComponents = ({ products }: ListingProps) => {
  return;
};

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
    <Row>
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
          <Descriptions.Item label="Kính:">Sapphire</Descriptions.Item>
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
            Vàng hồng 18k
          </Descriptions.Item>
          <Descriptions.Item label="Bezel: ">Nạm kim cương</Descriptions.Item>
          <Descriptions.Item label="dây đeo: ">
            President, liên kết ba mảnh hình bán nguyệt
          </Descriptions.Item>
          <Descriptions.Item label="Chất liệu dây đeo: ">
            Vàng hồng 18k
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Details`,
    children: <Details />,
  },
  {
    key: "2",
    label: `Policy`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Tab 3`,
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
              <span className="product-name">{productDetail?.Name}</span>
              <span className="product-price">{productDetail?.Price} vnd</span>

              <p className="product-description">
                {productDetail?.Description}
              </p>
              <div className="btn-groups">
                <button type="button" className="add-cart-btn">
                  Add to cart
                </button>
              </div>

              {/* TabContainer */}
              <div className="wrapper">
                <ReactPlayer
                  className="player"
                  controls
                  muted
                  autoplay={false}
                  url="https://www.youtube.com/watch?v=18XnJ2J-NsI&pp=ugMICgJ2aRABGAE%3D"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        size="small"
        style={{ background: "white", paddingLeft: 90 }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />

      <div className="App">
        <h2 style={{ textAlign: "center", padding: 20 }}>Similar Product</h2>
        <Slider {...settings}>
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct.Id}>
              <img
                style={{ height: 350, width: "100%", objectFit: "cover" }}
                src={similarProduct.Image}
                alt={similarProduct.Name}
              />
              <h3 style={{ padding: 15 }}>{similarProduct.Name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetail;
