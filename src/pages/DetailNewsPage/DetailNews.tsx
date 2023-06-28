import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import "./DetailNews.css";
const DetailNews = () => {
  interface Post {
    Title: string;
    Content: string;
    Thumbnail: string;
  }
  const { Id } = useParams();
  const { baseApi } = useContext(AppContext);
  // const [post, setPost] = useState();
  const [post, setPost] = useState<Post>({ Title: '', Content: '', Thumbnail: '' });
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(() => {
    setLoading(true)
    axios.get(`${baseApi}/News/${Id}`).then(res => {
      setPost(res.data);
    }).catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }, [Id, baseApi])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <>
      <div className="news-container">
        <div style={{ padding: 20 }} className="news-item">
          <div className="news-image">
            <img style={{ width: "62%", height: "20%", marginLeft: "20%", objectFit: "contain" }} src={post.Thumbnail} alt="Rolex Submariner Date 126613LB" />
          </div>
          <div className="news-content">
            <h2 style={{ fontSize: 30, color: "#dbaf56", textAlign: "center", paddingTop: 20, paddingBottom: 20 }} className="news-title">{post.Title}</h2>
            <div className="image-detail-post-content" style={{ paddingLeft: "10%", paddingRight: "10%" }} dangerouslySetInnerHTML={{ __html: post.Content }} />
          </div>
        </div>
      </div>
      {/* <div className="container-detail-news">
        <header>
          <h1 className="heading-1">the light star</h1>
          <div className="sub-heading">
            <p>
              Saterday, <span>june 26, 2021</span>
            </p>
            <p className="importent">your right to know</p>
          </div>
        </header>

        <div className="main">
          <div className="home">
            <div className="left">

              <h2 className="heading-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                cupiditate possimus.
              </h2>
            </div>
          </div>

          <article>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              suscipit labore nihil voluptatum recusandae facere dicta veritatis
              iusto tempore, debitis officia qui nostrum repellendus autem
              numquam obcaecati sunt itaque in repudiandae expedita omnis saepe
              modi explicabo error! Sunt quaerat vitae omnis eaque culpa nihil
              sequi velit ullam fugiat, cupiditate atque quasi eum obcaecati,
              cumque officiis iure ipsam! Inventore voluptate dignissimos nemo!
              In exercitationem rerum sunt quo maxime consequatur ab accusamus
              explicabo voluptatem ratione. Eveniet hic, quibusdam repellendus
              illum quas provident corrupti dolores assumenda quis explicabo
              rerum reiciendis, tempore expedita iure ab numquam, facilis
              officia pariatur veritatis iste mollitia quam neque.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              sint assumenda, alias blanditiis tempora quae, ea necessitatibus
              magnam velit culpa expedita optio voluptatem. Ad tenetur iure
              quisquam inventore! In sunt error quis magni quibusdam quos alias
              id odio eius eum, nostrum odit voluptates iste delectus harum
              labore nulla est quo?
            </p>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              aliquid molestiae, dolore cupiditate iusto cumque et sit
              praesentium magni fuga! Saepe neque rerum, illo possimus quasi
              ipsum nostrum sapiente sequi harum asperiores unde pariatur
              officia magni tempore, ipsa molestias odit eligendi aspernatur
              sunt soluta dolores suscipit? Modi consectetur porro similique.
              Eaque magnam quae doloribus voluptates pariatur nulla beatae non
              tempore nisi, explicabo sequi. Quisquam blanditiis aliquam optio
              culpa! Placeat fugiat a aliquid fuga accusamus non minus
              reiciendis quia delectus! Maxime, facere laborum, reprehenderit
              aut obcaecati cumque cupiditate quam a ex consectetur velit ipsa?
              Repellat dolor voluptate esse, placeat eius veniam quae atque
              sapiente sunt autem. Quod ea ducimus illo voluptatum eveniet in
              assumenda voluptates veritatis numquam magnam consequuntur sunt
              explicabo, harum dolorum nostrum laborum fugiat velit! Perferendis
              consectetur totam voluptatem commodi sapiente quas? Modi voluptas
              laborum officia atque consequuntur quos ipsum incidunt vero
              corrupti fuga maiores, enim at ex dolores!
            </p>
          </article>
        </div>
      </div>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, perferendis
        nisi. Nisi, obcaecati sed. Doloremque omnis minima esse ullam cupiditate
        sint accusantium, itaque temporibus delectus commodi quidem atque id
        aut, nam, dolorum eligendi impedit. Porro labore dolore et accusamus, ea
        alias omnis eveniet dolor voluptate veritatis. Nisi assumenda
        perspiciatis facilis tenetur a ducimus atque dolorum. Non maiores porro
        minima incidunt quod deserunt ullam id error veniam debitis! Quia, nulla
        aspernatur.
      </blockquote>
      <div className="cards-detail-news">
        <div className="card-detail-news">
          <h4 className="heading-4">Title</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            inventore consectetur eveniet assumenda, distinctio vero delectus.
            Dicta temporibus error rerum quas esse incidunt. Pariatur ea
            voluptatibus vitae distinctio cupiditate inventore!
          </p>
        </div>

        <div className="card-detail-news">
          <h4 className="heading-4">Title</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            voluptate ullam exercitationem, optio doloribus, eius possimus modi
            odio esse nobis earum cumque quia perferendis quo. Distinctio ullam
            libero provident atque excepturi cupiditate, autem commodi tempora
            sed, consequuntur dolore corrupti reprehenderit.
          </p>
        </div>

        <div className="card-detail-news">
          <h4 className="heading-4">Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            suscipit corrupti consequuntur nostrum illum alias accusantium sit
            magni. Eaque, libero soluta nam vitae sequi, sapiente quis,
            laboriosam numquam commodi aperiam vero. Voluptates libero delectus
            tenetur, quia ipsum magnam cumque numquam reiciendis. Alias
            architecto sit praesentium sapiente pariatur quas error fugiat?
          </p>
        </div>
      </div> */}

    </>
  );
};

export default DetailNews;
