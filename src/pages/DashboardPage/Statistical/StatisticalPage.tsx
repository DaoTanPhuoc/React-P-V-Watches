import { Line, Pie } from "@ant-design/charts";
import { Col, Row, Statistic } from "antd";
import React from "react";
import { ShopOutlined, DollarOutlined } from "@ant-design/icons";
import "./StatisticalPage.css";
const myData = [
  { x: "Thứ hai", y: 3 },
  { x: "Thứ Ba", y: 5 },
  { x: "Thứ Tư", y: 4 },
  { x: "Thứ Năm", y: 6 },
  { x: "Thứ Sáu", y: 8 },
  { x: "Thứ Bảy", y: 7 },
  { x: "Chủ Nhật", y: 9 },
];

const RoundChartData = [
  {
    type: "Rolex",
    value: 27,
  },
  {
    type: "Channel",
    value: 25,
  },
  {
    type: "Orient",
    value: 18,
  },
  {
    type: "Hublot",
    value: 15,
  },
  {
    type: "Citizen",
    value: 10,
  },
];
const config = {
  appendPadding: 10,
  RoundChartData,
  angleField: "value",
  colorField: "type",
  radius: 0.8,
  label: {
    type: "outer",
  },
  interactions: [
    {
      type: "element-active",
    },
  ],
};

const StatisticalPage = () => {
  return (
    <div className="Container-StatisticalPage">
      <div className="title-chart-das">Thống Kê Doanh Thu</div>
      <div className="chart-das-container">
        <div className="left-chart">
          <div className="chart-products">
            <h4 style={{ fontWeight: 500, paddingBottom: 40 }}>
              Tổng doanh thu: <span style={{ fontWeight: 400 }}>600000</span>
            </h4>
            <Line
              data={myData}
              height={500}
              xField="x"
              yField="y"
              point={{ size: 5, shape: "diamon" }}
              color="blue"
            />
          </div>
        </div>
        <div className="right-chart">
          <div style={{ fontWeight: 600, fontSize: 19, padding: "20px 20px" }}>
            Thống kê số lượng tồn kho
          </div>
          <div className="chart-brand">
            <Pie data={RoundChartData} {...config} />
          </div>
          <div className="container-right">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Tổng sản phẩm bán"
                  value={128}
                  prefix={<ShopOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Doanh thu tháng"
                  value={1121393}
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalPage;
