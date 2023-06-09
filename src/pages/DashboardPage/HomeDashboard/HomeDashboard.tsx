import { Column, TinyLine } from "@ant-design/charts";
import { Card, Col, Row, Space, Table, Tag, Timeline } from "antd";
import { Content } from "antd/es/layout/layout";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { ClockCircleOutlined, SmileOutlined } from "@ant-design/icons";

import "./HomeDashboard.css";
const HomeDas = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data1: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  //data chart

  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
  };
  //Chart

  const data2 = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];
  const config1 = {
    data2,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "diamond",
    },
  };
  return (
    <>
      <Content
        style={{
          padding: 10,
          minHeight: 280,
          background: "white",
        }}
      >
        <div className="banner-das-home">
          <div className="background-container">
            {" "}
            <span className="background-overlay"></span>
            <div className="background-cover container">
              <div className="line-heading">
                <div className="line-heading-left">
                  <h2>Say hello to us</h2>
                  <h4>Talk to us</h4>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div
          style={{
            width: "92%",
          }}
          className="content-das"
        >
          <Row justify="space-between">
            <Col span={4}>
              <Card
                style={{
                  width: 290,
                  borderRadius: 12,
                  boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                }}
              >
                <Row>
                  <Col flex={3}>
                    <Col style={{ fontWeight: 600, color: "#8c8c8c" }} flex={1}>
                      Today Sales
                    </Col>
                    <Col
                      flex={1}
                      style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}
                    >
                      $ 53,000
                    </Col>
                  </Col>
                  <Col flex={1}>
                    <div className="icon-money">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
                          fill="white"
                        />
                        <path
                          d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{
                  width: 290,
                  borderRadius: 12,
                  boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                }}
              >
                <Row>
                  <Col flex={3}>
                    <Col style={{ fontWeight: 600, color: "#8c8c8c" }} flex={1}>
                      User
                    </Col>
                    <Col
                      flex={1}
                      style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}
                    >
                      3000
                    </Col>
                  </Col>
                  <Col flex={1}>
                    <div className="icon-money">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                          fill="white"
                        />
                        <path
                          d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                          fill="white"
                        />
                        <path
                          d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                          fill="white"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{
                  width: 290,
                  borderRadius: 12,
                  boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                }}
              >
                <Row>
                  <Col flex={3}>
                    <Col style={{ fontWeight: 600, color: "#8c8c8c" }} flex={1}>
                      Products
                    </Col>
                    <Col
                      flex={1}
                      style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}
                    >
                      2000
                    </Col>
                  </Col>
                  <Col flex={1}>
                    <div className="icon-money">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{
                  width: 290,
                  borderRadius: 12,
                  boxShadow: "0 5px 10px rgba(0,0,0,.12)",
                }}
              >
                <Row>
                  <Col flex={3}>
                    <Col style={{ fontWeight: 600, color: "#8c8c8c" }} flex={1}>
                      Products
                    </Col>
                    <Col
                      flex={1}
                      style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}
                    >
                      2000
                    </Col>
                  </Col>
                  <Col flex={1}>
                    <div className="icon-money">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        {/* chart */}
        <div className="chart">
          <Timeline
            items={[
              {
                color: "green",
                children: "Create a services site 2015-09-01",
              },
              {
                color: "green",
                children: "Create a services site 2015-09-01",
              },
              {
                color: "red",
                children: (
                  <>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 2015-09-01</p>
                  </>
                ),
              },
              {
                children: (
                  <>
                    <p>Technical testing 1</p>
                    <p>Technical testing 2</p>
                    <p>Technical testing 3 2015-09-01</p>
                  </>
                ),
              },
              {
                color: "gray",
                children: (
                  <>
                    <p>Technical testing 1</p>
                    <p>Technical testing 2</p>
                    <p>Technical testing 3 2015-09-01</p>
                  </>
                ),
              },
              {
                color: "gray",
                children: (
                  <>
                    <p>Technical testing 1</p>
                    <p>Technical testing 2</p>
                    <p>Technical testing 3 2015-09-01</p>
                  </>
                ),
              },
              {
                color: "#00CCFF",
                dot: <SmileOutlined />,
                children: <p>Custom color testing</p>,
              },
            ]}
          />
          {/* <div>
    <Card
      style={{
        width: 290,
        borderRadius: 12,
        boxShadow: "0 5px 10px rgba(0,0,0,.12)",
      }}
    >
      <Row>
        <Col flex={3}>
          <Col style={{ fontWeight: 600, color: "#8c8c8c" }} flex={1}>
            Products
          </Col>
          <Col
            flex={1}
            style={{ fontWeight: 700, fontSize: 30, lineHeight: 2 }}
          >
            2000
          </Col>
        </Col>
        <Col flex={1}>
          <div className="icon-money">
            <svg
              width="22"
              height="22"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"
                fill="white"
              />
            </svg>
          </div>
        </Col>
      </Row>
    </Card>
  </div> */}
          <div className="right-chart">
            <Column data={data2} {...config1} />
          </div>
        </div>
        {/* TABLE */}
        <Table columns={columns} dataSource={data1} />
      </Content>
    </>
  );
};

export default HomeDas;
