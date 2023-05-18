import React, { useEffect, useState } from "react";
import "./NewsPage.css";
import { Card, Pagination, PaginationProps } from "antd";
import axios from "axios";
import { ProductModel } from "../../models/ProductModel";
const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
// chuyen trang

//
const pageSize = 8;

const News = () => {
  // chuyen trang
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    axios
      .get(`https://localhost:7182/api/Products`)
      .then((result) => {
        setProducts(result.data);
        filterData(currentPage, result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    filterData(page, products);
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
  // close chuyen trang
  return (
    <>
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
                <a href="/detailNews" className="btn-blog">
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
                  style={{
                    width: '100%',
                    height: 250,
                    objectFit: "cover",
                  }}
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
      <div className="card-news-container">
        <Card title="Tin tức ">
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/0-00000a/thumbs/418x0/screenshot-2.jpg"
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
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  width: '100%',
                  height: 250,

                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/0/thumbs/418x0/h20a4609.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  width: '100%',
                  height: 250,

                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/thumbs/418x0/platinumrolexdaytona.jpeg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  width: '100%',
                  height: 250,

                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/0-0e/thumbs/418x0/curatedition-audemars-piguet-royal-oak-2.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  width: '100%',
                  height: 250,
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/0-0e/thumbs/418x0/screenshot-12.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  width: '100%',
                  height: 250,
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/tao/0-0e/thumbs/418x0/screenshot-2.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-1/5/thumbs/418x0/dong-ho-hublot-lvmh-watch-week-2.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-1/5/thumbs/418x0/dong-ho-hublot-lvmh-watch-week-2.jpg"
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
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <div className="Card">
              <img
                style={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                }}
                src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-1/5/thumbs/418x0/dong-ho-hublot-lvmh-watch-week-2.jpg"
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
          </Card.Grid>
        </Card>
      </div>
      <Pagination
        style={{ textAlign: "center", padding: 35 }}
        current={currentPage}
        pageSize={pageSize}
        total={products.length}
        onChange={(page) => onChangePage(page)}
      />
      ;
    </>
  );
};
export default News;
