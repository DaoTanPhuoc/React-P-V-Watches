import React, { useEffect, useState } from "react";
import "./NewsPage.css";
import { Button, Card, Pagination, PaginationProps } from "antd";
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: "cover",
                  }}
                  src="https://bossluxurywatch.vn/uploads/anh-muc-tin-tuc/thuy-linh/0-2023/thang-4/b11/thumbs/418x0/rolex-submariner-6538-5d3-1281-1.jpg"
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
                    height: '100%',
                    objectFit: "cover",
                  }}
                  src="https://bossluxurywatch.vn/uploads/tao/0-00/thumbs/418x0/2023-rolex-cosmograph-daytona-steel-ceramic-white-dial-126500ln-calibre-4131-hands-on-review-13-2048x1365.jpg"
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: "cover",
                  }}
                  src="https://bossluxurywatch.vn/uploads/tao/thumbs/418x0/screenshot-3.jpg"
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
