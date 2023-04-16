import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Logo from "../../assets/image/brand/brHublot.jpg";
import { Card, Carousel, Col, Dropdown, Row, Tabs, TabsProps } from "antd";
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
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-patek-phillipe.svg",
  "https://globalboutique.com/wp-content/uploads/2022/09/brand-richard-mille.svg",
  "https://globalboutique.com/wp-content/uploads/2022/09/brand-franck-muller.svg",
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-audemars-piguet.svg",
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-panieri.svg",
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-audemars-piguet.svg",
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-cartier.svg",
  "https://globalboutique.com/wp-content/uploads/2022/07/brand-rolex.svg",
];

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

      <section id="brand" className="container">
        <ScrollContainer>
          <div className="img-brand">
            {brandImages.map((brandImage) => (
              <img src={brandImage} alt="" />
            ))}
          </div>
        </ScrollContainer>
        {/* <div style={{ padding: 50, textAlign: "center", gap: 40 }}>
          <Slider {...setting2}>
            {brandImages.map((brandImage) => (
              <img style={{ margin: "0 1em" }} src={brandImage} alt="" />
            ))}
          </Slider>
        </div> */}
      </section>

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

      {/* <div className="container1">
        <div className="flex-container1">
          <div className="text">
            <span className="avoid-break">
              Mighty <span className="orange">Thor,</span>
            </span>
            <br />
            <span className="avoid-break">
              Scarlet <span className="orange">Witch</span> &{" "}
            </span>
            <br />
            <span className="avoid-break">
              Black <span className="orange">Widow </span>{" "}
            </span>
            <br />
          </div>
          <div className="collage-container">
            <div className="collage">
              <img
                src="https://estaticos-cdn.sport.es/clip/76d5c74a-111d-4482-896f-4910500d901b_media-libre-aspect-ratio_default_0.jpg"
                className="collage-image1"
                alt="thor"
              />
              <img
                src="https://variety.com/wp-content/uploads/2022/05/SRV-12030_R.jpg"
                className="collage-image2"
                alt="wanda"
              />
              <img
                src="https://free4kwallpapers.com/uploads/originals/2017/01/30/agent-natasha-romanoff-wallpaper.jpg"
                className="collage-image3"
                alt="natasha"
              />
            </div>
          </div>
        </div>
      </div> */}

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

      <div className="banner-card">
        <section id="video-banner">
          {/* <div className="content-video">
          <h3>Explore the ocean</h3>
          <h1>Seiko ORANGE SAMURAI</h1>
          <button className="text-uppercase">Shop Now</button>
        </div> */}

          <video
            src="https://content.rolex.com/dam/homepage/video-banner/rolex-org/one-ocean-foundation/homepage-rolex-org-ppi-one-ocean-foundation.mp4"
            itemType="video/mp4"
            autoPlay
            playsInline
            loop
            preload="auto"
            width="100%"
            height="100%"
            muted
          ></video>
        </section>
        <div className="banner-text">
          <h1>
            SEIKO PROSPEX <br />
            <span style={{ color: "orange" }}> ORANGE SAMURAI</span>
          </h1>
          <button className="btn-video">Tìm hiểu hơn</button>
        </div>
      </div>

      <div className="galleryWrapper">
        <div>
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            available in store
          </h2>
          <hr />
          <div className="multi-button">
            <button onClick={() => setGender("male")}>Nam</button>
            <button onClick={() => setGender("female")}>Nu</button>
          </div>

          {/* <button
            onClick={() => setGender("male")}
            style={{ marginRight: 30, background: "red", padding: "1em" }}
          >
            Nam
          </button>
          <button
            onClick={() => setGender("female")}
            style={{ marginRight: 30, background: "blue", padding: "1em" }}
          >
            Nu
          </button> */}
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
      <div className="App">
        <div style={{ marginBottom: 50 }}>
          <h2 style={{ textAlign: "center", padding: 5 }}>ROLEX</h2>
          <hr />
        </div>
        <Slider {...settings}>
          {/* {similarProducts.map((similarProduct) => (
            <div key={similarProduct.Id}>
              <img
                style={{ height: 350, width: "100%", objectFit: "cover" }}
                src={similarProduct.Image}
                alt={similarProduct.Name}
              />
              <h3 style={{ padding: 15 }}>{similarProduct.Name}</h3>
            </div>
          ))} */}
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/645x0/franck-muller-vanguard-lady-v-32-sc-at-fo-d-cd-bl.png"
              alt=""
            />
            <h4 style={{ padding: 10, color: "#CDC04C" }}>FRANCK MULLER</h4>
            <h4 style={{ color: "#D2D2D2", fontSize: 14 }}>
              V 32 SC AT FO D CD (BL)
            </h4>
            <h4>FRANCK MULLER VANGUARD LADY MOONPHASE</h4>
            <h4 style={{ color: "#CDC04C" }}>515000000 đ</h4>
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/418x0/rolex-datejust-36-126284rbr-0029.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/vacheron-constantin/thumbs/418x0/historiques-cornes-de-vache-1955-5000h-000p-b058-38mm.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/thumbs/418x0/5961p-001.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="App">
        <div style={{ marginBottom: 50 }}>
          <h2
            style={{
              textAlign: "center",
              padding: 10,
              textTransform: "uppercase",
            }}
          >
            vacheron constantin
          </h2>
          <hr />
        </div>

        <Slider {...settings}>
          {/* {similarProducts.map((similarProduct) => (
            <div key={similarProduct.Id}>
              <img
                style={{ height: 350, width: "100%", objectFit: "cover" }}
                src={similarProduct.Image}
                alt={similarProduct.Name}
              />
              <h3 style={{ padding: 15 }}>{similarProduct.Name}</h3>
            </div>
          ))} */}
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/645x0/franck-muller-vanguard-lady-v-32-sc-at-fo-d-cd-bl.png"
              alt=""
            />
            <h4 style={{ padding: 10, color: "#CDC04C" }}>FRANCK MULLER</h4>
            <h4 style={{ color: "#D2D2D2", fontSize: 14 }}>
              V 32 SC AT FO D CD (BL)
            </h4>
            <h4>FRANCK MULLER VANGUARD LADY MOONPHASE</h4>
            <h4 style={{ color: "#CDC04C" }}>515000000 đ</h4>
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/418x0/rolex-datejust-36-126284rbr-0029.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/vacheron-constantin/thumbs/418x0/historiques-cornes-de-vache-1955-5000h-000p-b058-38mm.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/thumbs/418x0/5961p-001.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png"
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="App">
        <div style={{ marginBottom: 50 }}>
          <h2
            style={{
              textAlign: "center",
              padding: 10,
              textTransform: "uppercase",
            }}
          >
            FRANCK MULLER
          </h2>
          <hr />
        </div>
        <Slider {...settings}>
          {/* {similarProducts.map((similarProduct) => (
            <div key={similarProduct.Id}>
              <img
                style={{ height: 350, width: "100%", objectFit: "cover" }}
                src={similarProduct.Image}
                alt={similarProduct.Name}
              />
              <h3 style={{ padding: 15 }}>{similarProduct.Name}</h3>
            </div>
          ))} */}
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/645x0/franck-muller-vanguard-lady-v-32-sc-at-fo-d-cd-bl.png"
              alt=""
            />
            <h4 style={{ padding: 10, color: "#CDC04C" }}>FRANCK MULLER</h4>
            <h4 style={{ color: "#D2D2D2", fontSize: 14 }}>
              V 32 SC AT FO D CD (BL)
            </h4>
            <h4>FRANCK MULLER VANGUARD LADY MOONPHASE</h4>
            <h4 style={{ color: "#CDC04C" }}>515000000 đ</h4>
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/complications/thumbs/418x0/patek-philippe-complications-7130g-016.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/rolex/datejust-36/thumbs/418x0/rolex-datejust-36-126284rbr-0029.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/vacheron-constantin/thumbs/418x0/historiques-cornes-de-vache-1955-5000h-000p-b058-38mm.png"
              alt=""
            />
          </div>

          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/patek-philippe/thumbs/418x0/5961p-001.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ height: 300, width: "100%", objectFit: "cover" }}
              src="https://bossluxurywatch.vn/uploads/san-pham/franck-muller/thumbs/418x0/vanguard-lady-moonphase-v-32-sc-fo-l-d-cd-1p-cold.png"
              alt=""
            />
          </div>
        </Slider>
      </div>

      {/* Our Log */}
      {/* <div className="our-log">
        <div className="container">
          <div className="row">
            <div className="header">
              <h1>Our Blog</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                necessitatibus ea?
              </p>
            </div>
            <div className="content">
              <div className="Card">
                <img
                  style={{
                    height: 250,
                    objectFit: "cover",
                  }}
                  src="https://i.pinimg.com/originals/02/7f/ac/027fac6edcd23f411efaa897507f8c0b.jpg"
                  alt=""
                />
                <h4>Sunset ipsum dolor sit amet consectetur, adipisicing</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus fuga ex sequi eaque ea. Reiciendis recusandae
                  repudiandae delectus deleniti ratione tempora, ullam fuga,
                  consequuntur vitae dolor est, veritatis reprehenderit animi.
                </p>
              </div>

              <div className="Card">
                <img
                  style={{
                    height: 250,
                    objectFit: "cover",
                  }}
                  src="https://i.pinimg.com/originals/d1/bb/23/d1bb230b8205c9312e3ba9ada98fddbc.jpg"
                  alt=""
                />
                <h4>Sunset ipsum dolor sit amet consectetur, adipisicing</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus fuga ex sequi eaque ea. Reiciendis recusandae
                  repudiandae delectus deleniti ratione tempora, ullam fuga,
                  consequuntur vitae dolor est, veritatis reprehenderit animi.
                </p>
              </div>
              <div className="Card">
                <img
                  style={{
                    height: 250,
                    objectFit: "cover",
                  }}
                  src="https://i.pinimg.com/originals/b4/59/d2/b459d27c8ceee7d2a76d8cd6056dfe03.jpg"
                  alt=""
                />
                <h4>Sunset ipsum dolor sit amet consectetur, adipisicing</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus fuga ex sequi eaque ea. Reiciendis recusandae
                  repudiandae delectus deleniti ratione tempora, ullam fuga,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="blog-section">
        <div className="section-content">
          <div className="title">
            <h2>Blog & News</h2>
            <hr
              style={{
                display: "block",
                margin: "auto",
                width: 50,
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
    </div>
  );
};
export default HomePage;
