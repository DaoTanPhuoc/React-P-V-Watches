import React, { useCallback, useContext, useEffect, useState } from "react";
import "./NewsPage.css";
import { Button, Card, Pagination, PaginationProps } from "antd";
import axios from "axios";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import moment, { updateLocale } from "moment";
const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
// chuyen trang

const pageSize = 8;
const News = () => {
  const { baseApi } = useContext(AppContext)
  const [posts, setPosts] = useState<any[]>([])
  const [newPosts, setNewPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const fetchData = useCallback(() => {
    setLoading(true)
    axios.get(`${baseApi}/News/GetPosts`).then(res => {
      setPosts(res.data)
      filterData(currentPage, res.data);
    }).catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [baseApi])
  const fetchNewstPost = useCallback(() => {
    setLoading(true)
    axios.get(`${baseApi}/News/GetNewestPost`).then(res => {
      setNewPosts(res.data)
    }).catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [baseApi])
  // const onChangePage = (current: number, pageSize: number) => {
  //   return posts.slice((current - 1) * pageSize, current * pageSize);
  // }
  useEffect(() => {
    // về trang đầu
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData()
    fetchNewstPost()
    NewsTop()
  }, [fetchData, fetchNewstPost])

  // call api top ba bài viết mới nhất
  const [topNews, setTopNews] = useState<any[]>([])

  const NewsTop = async () => {
    axios
      .get(`https://localhost:7182/api/News/GetNewestPost`)
      .then((res) => {
        setTopNews(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const filterData = (page: number, data: any[]) => {
    let count = 1;
    const productsTmp: any[] = [];
    for (let i = (page - 1) * pageSize; i < data.length; i++) {
      if (count > pageSize || i === data.length) {
        break;
      }
      count++;
      productsTmp.push(data[i]);
    }
    setFilteredProducts(productsTmp);
  };
  // onchange
  const onChangePage = (page: number) => {
    window.scrollTo({ top: 730, behavior: 'smooth' })
    setCurrentPage(page);
    filterData(page, posts);
  };


  return (
    <>
      <div className="blog-section">
        <div className="section-content">
          <div className="title">
            <h2 style={{ fontFamily: "Times New Roman" }}>Tin Tức</h2>
            <hr
              style={{
                display: "block",
                margin: "auto",
                width: 50,
                height: 3,
                backgroundColor: "#169010",
              }}
            />
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              voluptates in nobis quia recusandae quibusdam quae incidunt
            </p> */}
          </div>
          <div className="cards-blog">
            {topNews.map((news) => (
              <Link to={`/detailNews/${news.Id}`}>
                <div style={{ height: 500 }} className="card-blog">
                  <div className="image-section">
                    <img
                      style={{
                        width: 374,
                        height: 250,
                        objectFit: "cover"
                      }}
                      src={news.Thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="article">
                    <h4>{news.Title}</h4>
                    <p>
                      {news.Description}
                    </p>
                  </div>
                  <div className="blog-view">
                    {/* <a href="#" className="btn-blog">
                Xem chi tiet
              </a> */}
                  </div>
                  <div className="posted-date">
                    <p style={{ textDecoration: "none", color: "#555555" }}>
                      {moment(news.CreatedAt).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
      <div className="card-news-container">
        <Card >
          {filteredProducts.map(p => (
            <Card.Grid style={gridStyle}>
              <div className="Card">
                <Link to={`/detailNews/${p.Id}`}>
                  <img
                    style={{
                      height: 250,
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={p.Thumbnail}
                    alt=""
                  />
                </Link>
                <h4 className="title-news">{p.Title}</h4>
                <p className="description-news">
                  {p.Description}
                </p>
              </div>
            </Card.Grid>
          ))}
        </Card>
      </div>
      <Pagination
        style={{ textAlign: "center", padding: 35 }}
        current={currentPage}
        pageSize={pageSize}
        total={posts.length}
        onChange={(page) => onChangePage(page)}
      />
      ;
    </>
  );
};
export default News;
