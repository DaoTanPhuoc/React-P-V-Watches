/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { Card, Col, FloatButton, Row } from "antd";
import "react-indiana-drag-scroll/dist/style.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MessageOutlined } from "@ant-design/icons";
import { AppContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { responsiveArray } from "antd/es/_util/responsiveObserver";

const moneyFormatter = new Intl.NumberFormat("vi", {
  style: "currency",
  currency: "VND",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "460px",
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const images = [
  "https://images.squarespace-cdn.com/content/v1/56a9e12ac647ad08eb4453c7/1680528697402-97ENGSTFJ78886WRXP1Q/Banner+nouvelties+home+page.jpg?format=2500w",
  "https://bossluxurywatch.vn/uploads/banner/anh-slide-3.jpg",
  "https://bossluxurywatch.vn/uploads/banner/anh-slide-1.jpg",
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
  const navigate = useNavigate();
  const { baseApi } = useContext(AppContext);
  // GetAvailableProducts
  const [GetAvailableProducts, setGetAvailableProducts] = useState<any[]>([]);
  const [newstProducts, setNewstProducts] = useState<any[]>([]);
  const moneyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
  //avaliableProducts
  useEffect(() => {
    axios
      .get(`${baseApi}/Products/GetAvailableProducts`)
      .then((Result) => {
        const avaliableProducts = Result.data;
        console.log(Result.data);

        setGetAvailableProducts(avaliableProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [baseApi]);

  const fetchNewstProducts = async (categoryId: number) => {
    axios
      .get(`https://localhost:7182/api/Products/GetNewestProduct`, {
        params: { category: categoryId },
      })
      .then((res) => {
        if (res.status === 200) {
          setNewstProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchNewstProducts(1);
  }, []);

  return (
    <>
      <FloatButton icon={<MessageOutlined />} />
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

                <img style={{ width: 130, height: 90 }} src={brandImage} alt="" />

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
            <div style={{ marginBottom: 50 }}>
              <h2 style={{ textTransform: "uppercase" }}>Sản Phẩm nổi bật</h2>
              <hr />
            </div>


            <Slider {...setting2}>
              {GetAvailableProducts.map((brandImage) => (
                <div>
                  <div>
                    <Link to={`/ProductDetail/${brandImage.BrandName}/${brandImage.Code}`}>
                      <img
                        style={{
                          height: 300,
                          width: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        src={brandImage.Image}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div
                    style={{
                      padding: 20,
                      textAlign: "center",
                    }}
                  >
                    <h4 style={{ color: "#888888" }}>{brandImage.Code}</h4>
                    <h4 style={{ fontWeight: 600 }}>{brandImage.Name}</h4>
                    <h4 style={{ color: "#dbaf56" }}>
                      {moneyFormatter.format(brandImage.Price)}
                    </h4>
                  </div>
                </div>
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
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="https://bossluxurywatch.vn/uploads/anh-dong-ho-dang-bao/5004/4-mau-dong-ho-ngay-cua-me/watches-her-main-750x375.jpg"
                alt=""
              />

              <div className="bottom-left">
                <h3 style={{ color: "white" }}>Đồng Hồ Nữ</h3>
                <button>Xem Thêm</button>
              </div>
            </div>

            <div className="card">
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="https://luxshopping.vn/Uploads/_Temp_/UploadsNewstourneau-plungejpg_400_0.jpg"
                alt=""
              />
              <div className="bottom-left">
                <h3 style={{ color: "white" }}>Đồng Hồ Nam</h3>
                <button>Xem Thêm</button>
              </div>
            </div>
            <div className="card">
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src="https://www.elleman.vn/wp-content/uploads/2015/12/10/LG-G-Watch-R-paired-models-757x426.jpg"
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
              Sản phẩm mới nhất
            </h2>
            <hr />
            <div className="multi-button">
              <button onClick={() => fetchNewstProducts(1)}>Nam</button>
              <button onClick={() => fetchNewstProducts(2)}>Nu</button>
            </div>
          </div>
          <div className="galleryContainer">
            {newstProducts && newstProducts.map((item) => (
              <div className="galleryItem">
                <Link to={`/ProductDetail/${item.BrandName}/${item.Code}`}>
                  <img
                    style={{ cursor: "pointer" }}
                    src={item.Image}
                    key={item.id}
                    alt=""
                  // onClick={() =>
                  //   navigate(
                  //     `/productdetail/${item.Id}/${item.BrandId}/${item.CaseSize}`
                  //   )
                  // }
                  />
                </Link>
                {/* <h3 style={{ textAlign: "center", padding: 10 }}>{item.name}</h3> */}
                <div className="btn-inStore">
                  {/* <button className="btn-item">Buy Now</button> */}
                  <div
                    style={{
                      padding: 20,
                      textAlign: "center",
                    }}
                  >
                    <h4 style={{ color: "#888888" }}>MSP: {item.Code}</h4>
                    <h4>{item.Name}</h4>
                    <h4 style={{ color: "#dbaf56" }}>{moneyFormatter.format(item.Price)}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* blog  */}
        <div className="blog-section">
          <div className="section-content">
            <div className="title">
              <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
                Tin tức
              </h2>
              <hr
                style={{
                  display: "block",
                  margin: "auto",
                  width: 100,
                  height: 3,
                  backgroundColor: "#169010",
                }}
              />
              <p></p>
            </div>
            <div className="cards-blog">
              <div className="card-blog">
                <div className="image-section">
                  <img
                    src="https://bossluxurywatch.vn/uploads/tao/0-0d/thumbs/418x0/rolex-cosmograph-daytona-meteorite-2021-1.jpg"
                    alt=""
                  />
                </div>
                <div className="article">
                  <h4>Title one</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                    explicabo voluptatem dignissimos, est, nulla placeat
                    molestias praesentium ex consequatur voluptate nemo fuga
                    labore? Cum.
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
                    src="https://bossluxurywatch.vn/uploads/tao/0-00/thumbs/418x0/2023-rolex-cosmograph-daytona-steel-ceramic-white-dial-126500ln-calibre-4131-hands-on-review-13-2048x1365.jpg"
                    alt=""
                  />
                </div>
                <div className="article">
                  <h4>Title two</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                    explicabo voluptatem dignissimos, est, nulla placeat
                    molestias praesentium ex consequatur voluptate nemo fuga
                    labore? Cum.
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
                    src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-4/b11/thumbs/418x0/rolex-submariner-6538-5d3-1281-1.jpg"
                    alt=""
                  />
                </div>
                <div className="article">
                  <h4>Title three</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Molestiae laudantium nihil eius nobis! Deserunt quibusdam
                    explicabo voluptatem dignissimos, est, nulla placeat
                    molestias praesentium ex consequatur voluptate nemo fuga
                    labore? Cum.
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
                  Nhà phân phối chính thức
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
                  Đa dạng mẫu mã
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
                  Chính sách bảo hành
                </h4>
              </div>
            </Card.Grid>
          </div>
        </div>

        {/* comment */}
        <div className="comments">
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>
            Đánh Giá
          </h2>
          <hr />

          <div className="comment-container">
            <figure className="snip1204">
              <blockquote>
                Calvin: Sometimes when I'm talking to other people, my words
                can't keep up with my thoughts. I wonder why we think faster
                than we speak. Hobbes: Probably so we can think twice.{" "}
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
                report is in a professional, clear plastic binder...When a
                report looks this good, you know it'll get an A. That's a tip
                kids. Write it down.
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
    </>
  );
};
export default HomePage;
