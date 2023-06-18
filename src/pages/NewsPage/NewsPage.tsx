import React, { useCallback, useContext, useEffect, useState } from "react";
import "./NewsPage.css";
import { Button, Card, Pagination, PaginationProps } from "antd";
import axios from "axios";
import { AppContext } from "../../App";
const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};
// chuyen trang


const News = () => {
  const { baseApi } = useContext(AppContext)
  const [posts, setPosts] = useState<any[]>([])
  const [newPosts, setNewPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = useCallback(() => {
    setLoading(true)
    axios.get(`${baseApi}/News/GetPosts`).then(res => {
      setPosts(res.data)
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
  const onChangePage = (current: number, pageSize: number) => {
    return posts.slice((current - 1) * pageSize, current * pageSize);
  }
  useEffect(() => {
    fetchData()
    fetchNewstPost()
  }, [fetchData, fetchNewstPost])
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
            {/* <>
              {newPosts && newPosts.map(p => (
                <div className="card-blog">
                  <div className="image-section">
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: "cover",
                      }}
                      src={p.Thumbnail}
                      alt=""
                    />
                  </div>
                  <div className="article">
                    <h4>{p.Title}</h4>
                    <p>
                      {p.Description}
                    </p>
                  </div>
                  <div className="blog-view">
                    <Link to={`/detailNews/${p.Id}`} className="btn-blog">
                      Xem chi tiết
                    </Link>
                  </div>
                  <div className="posted-date">
                    <p>{moment(p.CreateAt).fromNow()}</p>
                  </div>
                </div>
              ))}
            </> */}
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
          {posts && posts.map(p => (
            <Card.Grid style={gridStyle}>
              <div className="Card">
                <img
                  style={{
                    height: 250,
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={p.Thumbnail}
                  alt=""
                />
                <h4>{p.Title}</h4>
                <p>
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
        pageSize={8}
        total={posts.length}
        onChange={(current, pagesize) => onChangePage(current, pagesize)}
      />
      ;
    </>
  );
};
export default News;
