import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Logo from "../../assets/image/brand/brHublot.jpg";
import {
  Avatar,
  Card,
  Carousel,
  Col,
  Dropdown,
  List,
  Row,
  Space,
  Tabs,
  TabsProps,
} from "antd";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { clearScreenDown } from "readline";
import { GalleryData } from "./ProductsData";
import categoryData from "./CategoryData.json";
import { ProductModel } from "../../models/ProductModel";
import { useParams } from "react-router";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Meta from "antd/es/card/Meta";

const setting2 = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const settings1 = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

// slider
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        autoplay: true,
        autoplaySpeed: 3000,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      },
    },
  ],
};

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "460px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const brandStyle: React.CSSProperties = {
  margin: 0,
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ImageOurFeatured = [
  "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/thumbs/418x0/5961p-001.png",
  "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-5930g-010.png",
  "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png",
  "https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130r-013.png",
  "https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/418x0/rolex-datejust-36-126284rbr-0029.png",
  "https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png",
];

const images = [
  "https://images.squarespace-cdn.com/content/v1/56a9e12ac647ad08eb4453c7/1680528697402-97ENGSTFJ78886WRXP1Q/Banner+nouvelties+home+page.jpg?format=2500w",
  "https://bossluxurywatch.vn/uploads/banner/anh-slide-3.jpg",
  "https://www.shutterstock.com/image-photo/bangkok-thailand-january-282021close-rolex-260nw-2140440439.jpg",
  "https://hodinkee.imgix.net/uploads/images/f4843bf6-0ce8-415f-a8b2-79e4c801d92f/Hero-rolex-pre-owned.jpg?ixlib=rails-1.1.0&fm=jpg&q=55&auto=format&usm=12",
];

const brandImages = [
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-hublot.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-patek.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-rolex.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-iwc.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-longines.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-breitling.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-cartier.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-omega.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-gucci.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-michael-kors.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-yoko-london.png",
  "https://usacareers.thewosgroup.com/jobs/custom/Aurum_02/resources/images/logos/logo-swarovski.png",
];

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const HomePage = () => {
  // product Gallery
  const [data, setData] = useState<any[]>([]);
  const [collection, setCollection] = useState<any[]>([]);
  const [gender, setGender] = useState<"male" | "female">("male");

  useEffect(() => {
    // setCollection([... new Set(Category.map((item)=>item.name))])
  });

  //
  //BRAND PRODUCTS
  const [similarProducts, setSimilarProducts] = useState<ProductModel[]>([]);

  const { brandId } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:7182/api/Products/BrandProduct=${brandId}`)
      .then((result) => {
        const similarProduct = result.data;
        setSimilarProducts(similarProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [brandId]);

  // CLOSE BRAND PRODUCTS

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    console.log(gender);
    const filteredData = categoryData.filter(
      (cData) => cData.Gender === gender
    );
    setData(filteredData);
  }, [gender]);

  return (
    <div>
      <div>
        {/* <Carousel afterChange={onChange}>
          {images.map((image) => (
            <div className="home-image">
              <h3 style={contentStyle}>
                <img src={image} alt="" />
              </h3>
            </div>
          ))}
        </Carousel> */}
        <Slider {...settings1}>
          {images.map((image) => (
            <div className="home-image">
              <h3 style={contentStyle}>
                <img src={image} alt="" />
              </h3>
            </div>
          ))}
        </Slider>
      </div>

      {/* Brand */}
      <div className="brand-container-grid">
        <div style={{ marginBottom: 20, marginTop: 40 }}>
          <h2
            style={{
              textAlign: "center",
              padding: 10,
              textTransform: "uppercase",
            }}
          >
            Thương hiệu nổi bật
          </h2>
          <hr />
        </div>
        <div className="main-container">
          <ul className="grid-wrapper">
            {brandImages.map((brandImage) => (
              <li>
                <img src={brandImage} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <section id="brand" className="container">
        <ScrollContainer>
          <div className="img-brand">
            {brandImages.map((brandImage) => (
              <img src={brandImage} alt="" />
            ))}
          </div>
        </ScrollContainer>
        
      </section> */}

      <section id="new" className="our-featured">
        <div
          style={{ width: "90%", margin: "auto", marginTop: 50, padding: 36 }}
        >
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ textTransform: "uppercase" }}>Our featured</h2>
            <hr />
          </div>
          <Slider {...setting2}>
            {ImageOurFeatured.map((brandImage) => (
              <img
                style={{
                  height: 300,
                  width: "100%",
                  objectFit: "cover",
                }}
                src={brandImage}
                alt=""
              />
            ))}
          </Slider>
        </div>
      </section>

      <div
        className="btn-all-product"
        style={{ textAlign: "center", paddingBottom: 20 }}
      >
        <a
          style={{ fontSize: 15, letterSpacing: 1.5 }}
          href="/shop"
          className="button"
        >
          Xem tất cả . Sản Phẩm
        </a>
      </div>

      {/* banner */}

      <div className="row-banner">
        <div className="container-section">
          <div className="card">
            <img
              src="https://1.bp.blogspot.com/-cIbJyMvnyJI/XqyzIYY99iI/AAAAAAAAI-M/G0TK7WfNl8Me7sZ_d0WUmk-seYMPry4kgCLcBGAsYHQ/s1600/ant_index_banner_1.jpg"
              alt=""
            />

            <div className="bottom-left">
              <h3 style={{ color: "white" }}>Đồng Hồ Nữ</h3>
              <button>Xem Thêm</button>
            </div>
          </div>

          <div className="card">
            <img
              src="https://1.bp.blogspot.com/-cvyeFonElH4/XqyzWAmIfCI/AAAAAAAAI-Q/rkZ1ck_p58IUS9ZotsnL6E0IzVnQxKW9QCLcBGAsYHQ/s1600/ant_index_banner_2.jpg"
              alt=""
            />
            <div className="bottom-left">
              <h3 style={{ color: "white" }}>Đồng Hồ Nam</h3>
              <button>Xem Thêm</button>
            </div>
          </div>
          <div className="card">
            <img
              src="https://1.bp.blogspot.com/-CYeaWBm7L4c/Xqyzmr3NQoI/AAAAAAAAI-c/5TEpHJoYurwPJ0JBr2n_eF6-7iOzFGclACLcBGAsYHQ/s1600/ant_index_banner_3.jpg"
              alt=""
            />
            <div className="bottom-left">
              <h3 style={{ color: "white" }}>Đồng Hồ Đôi</h3>
              <button>Xem Thêm</button>
            </div>
          </div>
        </div>
      </div>

      <div className="galleryWrapper">
        <div>
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            FEATURE
          </h2>
          <hr />
          <div className="multi-button">
            <button onClick={() => setGender("male")}>Nam</button>
            <button onClick={() => setGender("female")}>Nu</button>
          </div>
        </div>
        <div className="galleryContainer">
          {data.map((item) => (
            <div className="galleryItem">
              <img src={item.image} key={item.id} alt="" />
              <h3 style={{ textAlign: "center", padding: 10 }}>{item.name}</h3>
              <div className="btn-inStore">
                <button className="btn-item">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* blog  */}
      <div className="blog-section">
        <div className="section-content">
          <div className="title">
            <h2>Blog & News</h2>
            <hr
              style={{
                display: "block",
                margin: "auto",
                width: 100,
                height: 3,
                backgroundColor: "#169010",
              }}
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              voluptates in nobis quia recusandae quibusdam quae incidunt
            </p>
          </div>
          <div className="cards-blog">
            <div className="card-blog">
              <div className="image-section">
                <img
                  src="https://bossluxurywatch.vn/uploads/anh-dong-ho-dang-bao/5004/1-5-mau-dong-ho-sanh-dieu-va-thoi-thuong-danh-cho-phai-dep/audemars-piguet-fpj-h-moser-cie-va-zenith-dat-gia-pha-ky-luc-tai-only-watch-2021/24-mau-patek-philippe-ngung-san-xuat-tu-nam-2022/bao-cao-nganh-dong-ho-thuy-si-nam-2022-xu-huong-tiep-tuc-tang/thumbs/418x0/1-iws-reportmorganstanley-2-1024x683-lo-n.png"
                  alt=""
                />
              </div>
              <div className="article">
                <h4>Title one</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                  explicabo voluptatem dignissimos, est, nulla placeat molestias
                  praesentium ex consequatur voluptate nemo fuga labore? Cum.
                </p>
              </div>
              <div className="blog-view">
                <a href="#" className="btn-blog">
                  Xem chi tiet
                </a>
              </div>
              <div className="posted-date">
                <p>Posted 22 July 2023</p>
              </div>
            </div>
            {/* 2 */}
            <div className="card-blog">
              <div className="image-section">
                <img
                  src="https://bossluxurywatch.vn/uploads/anh-dong-ho-dang-bao/5004/1-5-mau-dong-ho-sanh-dieu-va-thoi-thuong-danh-cho-phai-dep/audemars-piguet-fpj-h-moser-cie-va-zenith-dat-gia-pha-ky-luc-tai-only-watch-2021/richard-mille-ra-mat-sieu-pham-rm-88-tourbillon-smiley-vui-tuoi-va-day-mau-sac/thumbs/418x0/richard-mille-rm-88-tourbillon-smiley.jpg"
                  alt=""
                />
              </div>
              <div className="article">
                <h4>Title two</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                  explicabo voluptatem dignissimos, est, nulla placeat molestias
                  praesentium ex consequatur voluptate nemo fuga labore? Cum.
                </p>
              </div>
              <div className="blog-view">
                <a href="#" className="btn-blog">
                  Xem chi tiet
                </a>
              </div>
              <div className="posted-date">
                <p>Posted 22 July 2023</p>
              </div>
            </div>
            {/* 3 */}
            <div className="card-blog">
              <div className="image-section">
                <img
                  src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-1/7/thumbs/418x0/luxexpose-spirit-of-big-bang-bla.jpg"
                  alt=""
                />
              </div>
              <div className="article">
                <h4>Title three</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                  explicabo voluptatem dignissimos, est, nulla placeat molestias
                  praesentium ex consequatur voluptate nemo fuga labore? Cum.
                </p>
              </div>
              <div className="blog-view">
                <a href="#" className="btn-blog">
                  Xem chi tiet
                </a>
              </div>
              <div className="posted-date">
                <p>Posted 22 July 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* banner freeship */}

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
        </div>
      </div>

      {/* comment */}
      <div className="comments">
        <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
          Đánh Giá Của Khách Hàng
        </h2>
        <hr />

        <div className="comment-container">
          <figure className="snip1204">
            <blockquote>
              Calvin: Sometimes when I'm talking to other people, my words can't
              keep up with my thoughts. I wonder why we think faster than we
              speak. Hobbes: Probably so we can think twice.{" "}
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample7.jpg"
                alt="sq-sample7"
              />
              <h5>Pelican Steve</h5>
              <span>LittleSnippets</span>
            </div>
          </figure>
          <figure className="snip1204 hover">
            <blockquote>
              Thank you. before I begin, I'd like everyone to notice that my
              report is in a professional, clear plastic binder...When a report
              looks this good, you know it'll get an A. That's a tip kids. Write
              it down.
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample10.jpg"
                alt="sq-sample10"
              />
              <h5>Max Conversion</h5>
              <span>LittleSnippets</span>
            </div>
          </figure>
          <figure className="snip1204">
            <blockquote>
              My behaviour is addictive functioning in a disease process of
              toxic co-dependency. I need holistic healing and wellness before
              I'll accept any responsibility for my actions.
            </blockquote>
            <div className="author">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample12.jpg"
                alt="sq-sample12"
              />
              <h5>Eleanor Faint</h5>
              <span>LittleSnippets</span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
