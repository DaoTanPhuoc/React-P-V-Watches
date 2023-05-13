import { Card, Col, Row, Select, Space } from "antd";
import React from "react";
import "./RosPage.css";
import { Column, Pie } from "@ant-design/charts";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const RosPage = () => {
  const data = [
    {
      type: "Rolex",
      sales: 38,
    },
    {
      type: "Orient",
      sales: 52,
    },
    {
      type: "Hublot",
      sales: 61,
    },
    {
      type: "Channel",
      sales: 145,
    },
    {
      type: "Richard Mille",
      sales: 48,
    },
    {
      type: "Franck Muller",
      sales: 38,
    },
    {
      type: "Patek Philippe",
      sales: 60,
    },
    {
      type: "Citizen",
      sales: 61,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",

    columnWidthRatio: 0.5,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "Doanh thu",
      },
    },
  };
  // số lượng sản phẩm (theo thương hiệu) bán ra trong tuần
  const dataBrandSales = [
    {
      typeBrandSales: "Thứ hai",
      salesBrandSales: 38,
    },
    {
      typeBrandSales: "Thứ ba",
      salesBrandSales: 52,
    },
    {
      typeBrandSales: "Thứ tư",
      salesBrandSales: 61,
    },
    {
      typeBrandSales: "Thứ năm",
      salesBrandSales: 145,
    },
    {
      typeBrandSales: "Thứ sáu",
      salesBrandSales: 48,
    },
    {
      typeBrandSales: "Thứ bảy",
      salesBrandSales: 38,
    },
    {
      typeBrandSales: "Chủ nhật",
      salesBrandSales: 38,
    },
  ];
  const configBrandSales = {
    dataBrandSales,
    xField: "typeBrandSales",
    yField: "salesBrandSales",
    columnWidthRatio: 0.5,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      typeBrandSales: {
        alias: "phuoc",
      },
      salesBrandSales: {
        alias: "Số lượng",
      },
    },
  };
  // thống kê số lượng tồn kho của từng brand
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
  const configRoundChart = {
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
  return (
    <div className="container-Ros">
      <div className="header-Ros">
        <div className="header-Ros-Items">
          <h4 style={{ color: "red", fontWeight: 700 }}>Chọn tháng thống kê</h4>
          <h4>Năm 2023</h4>
        </div>
        <div className="select-month">
          <Select
            defaultValue="Tháng 1"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "Tháng 1", label: "Tháng 1" },
              { value: "Tháng 2", label: "Tháng 2" },
              { value: "Tháng 3", label: "Tháng 3" },
              { value: "Tháng 4", label: "Tháng 4" },
              { value: "Tháng 5", label: "Tháng 5" },
              { value: "Tháng 6", label: "Tháng 6" },
              { value: "Tháng 7", label: "Tháng 7" },
              { value: "Tháng 8", label: "Tháng 8" },
              { value: "Tháng 9", label: "Tháng 9" },
              { value: "Tháng 10", label: "Tháng 10" },
              { value: "Tháng 11", label: "Tháng 11" },
              { value: "Tháng 12", label: "Tháng 12" },
            ]}
          />
        </div>
      </div>
      <div className="content-Ros">
        <div style={{ paddingTop: 30 }} className="content-Ros-items">
          <Row gutter={[1, 1]}>
            <Col span={6}>
              <Space direction="vertical" size={16}>
                <Card style={{ width: 250 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng doanh thu
                  </h4>
                  <h4 style={{ textAlign: "center" }}>12000000000</h4>
                </Card>
                <Card size="small" style={{ width: 250 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng đơn hàng
                  </h4>
                  <h4 style={{ textAlign: "center" }}>1200 đơn</h4>
                </Card>
                <Card size="small" style={{ width: 250 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Tổng nhập sản phẩm
                  </h4>
                  <h4 style={{ textAlign: "center" }}>12000000000</h4>
                </Card>
                <Card size="small" style={{ width: 250 }}>
                  <h4
                    style={{
                      textAlign: "center",
                      padding: 10,
                      fontWeight: 700,
                    }}
                  >
                    Lợi nhuận
                  </h4>
                  <h4 style={{ textAlign: "center" }}>12000000000</h4>
                </Card>
              </Space>
            </Col>
            <Col span={18}>
              <div style={{ border: "1px solid black " }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Doanh thu theo thương hiệu
                </h4>
                <Column {...config} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="content-ros-two">
        <div style={{ display: "flex" }}>
          <div className="header-Ros-Items">
            <h4 style={{ color: "red", fontWeight: 700 }}>
              Chọn thương hiệu thống kê
            </h4>
          </div>
          <div className="select-month">
            <Select
              defaultValue="Rolex"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "Rolex", label: "Rolex" },
                { value: "Hublot", label: "Hublot" },
                { value: "Channel", label: "Channel" },
                { value: "Citizen", label: "Citizen" },
                { value: "Orient", label: "Orient" },
                { value: "Richard Mille", label: "Richard Mille" },
              ]}
            />
          </div>
        </div>
        <div style={{ paddingTop: 30, paddingBottom: 50 }}>
          <Row gutter={[4, 4]}>
            <Col span={14}>
              <div style={{ border: "1px solid black " }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng sản phẩm
                </h4>
                <Column data={dataBrandSales} {...configBrandSales} />
              </div>
            </Col>
            <Col span={10}>
              <div>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng tồn kho
                </h4>
                <Pie data={RoundChartData} {...configRoundChart} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RosPage;
