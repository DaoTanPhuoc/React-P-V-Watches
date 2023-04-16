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
    axios
      .get(`https://localhost:7182/api/Products`)
      .then((result) => {
        setProducts(result.data);
        filterData(currentPage, result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <Card title="News">
        <Card.Grid style={gridStyle}>
          <div className="Card">
            <img
              style={{
                height: 250,
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
