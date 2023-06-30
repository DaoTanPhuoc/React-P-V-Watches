import { Card, Col, Row, Select, Skeleton, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./RosPage.css";
import { Column, Pie } from "@ant-design/charts";
import { AppContext } from "../../../App";
import axios from "axios";
import moment from "moment";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const RosPage = () => {
  const { baseApi, currentToken } = useContext(AppContext);
  const date = new Date();
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [orderSales, setOrderSales] = useState<number>(0);
  const [importCost, setImportCost] = useState<number>(0);
  const [countOrder, setCountOrder] = useState<number>(0);
  const [brandSales, setBrandSale] = useState([]);
  const [brandStock, setBrandStock] = useState([])
  const [loading, setloading] = useState<boolean>(true)

  useEffect(() => {
    setloading(true)
    axios.get(`${baseApi}/Statistics/OrderSalesTotalMonth/${month}`,{ headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setOrderSales(res.data))
    axios.get(`${baseApi}/Statistics/CountOrdersMonth/${month}`,{ headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setCountOrder(res.data))
    axios.get(`${baseApi}/Statistics/ImportTotalMonth/${month}`,{ headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setImportCost(res.data))
    axios.get(`${baseApi}/Statistics/BrandCountSales/${month}`,{ headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setBrandSale(res.data))
    axios.get(`${baseApi}/Statistics/BrandCountStock`,{ headers: { 'Access-Control-Allow-Origin': "*", 'Authorization': `Bearer ${currentToken}` } }).then(res => setBrandStock(res.data))
    setloading(false)
  }, [baseApi, month])
  const moneyFormatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
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
    brandSales,
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
    brandStock,
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
          <h4 style={{ color: "#4963AF", fontWeight: 700 }}>Chọn tháng thống kê</h4>
          <h4>Năm 2023</h4>
        </div>
        <div className="select-month">
          <Select
            defaultValue={date.getMonth() + 1}
            style={{ width: 120 }}
            onChange={(value) => setMonth(value)}
            options={[
              { value: 1, label: "Tháng 1" },
              { value: 2, label: "Tháng 2" },
              { value: 3, label: "Tháng 3" },
              { value: 4, label: "Tháng 4" },
              { value: 5, label: "Tháng 5" },
              { value: 6, label: "Tháng 6" },
              { value: 7, label: "Tháng 7" },
              { value: 8, label: "Tháng 8" },
              { value: 9, label: "Tháng 9" },
              { value: 10, label: "Tháng 10" },
              { value: 11, label: "Tháng 11" },
              { value: 12, label: "Tháng 12" },
            ]}
          />
        </div>
      </div>
      <div className="content-Ros">
        <div style={{ paddingTop: 30 }} className="content-Ros-items">
          <Row gutter={[1, 1]}>
            <Col xs={24} xl={6} >
              <Skeleton active loading={loading}>
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
                    <h4 style={{ textAlign: "center" }}>{moneyFormatter.format(orderSales)}</h4>
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
                    <h4 style={{ textAlign: "center" }}>{countOrder} đơn</h4>
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
                    <h4 style={{ textAlign: "center" }}>{moneyFormatter.format(importCost)}</h4>
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
                    <h4 style={{ textAlign: "center" }}>{moneyFormatter.format(orderSales - importCost)}</h4>
                  </Card>
                </Space>
              </Skeleton>
            </Col>
            <Col xs={24} xl={18} >
              <div style={{ border: "1px solid black " }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Doanh thu theo thương hiệu
                </h4>
                <Column loading={loading} data={brandSales} {...config} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="content-ros-two">
        <div style={{ display: "flex" }}>
          <div className="header-Ros-Items">
            <h4 style={{ color: "#4963AF", fontWeight: 700 }}>
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
            <Col xs={24} xl={18} span={14}>
              <div style={{ border: "1px solid black " }}>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng sản phẩm
                </h4>
                <Column loading={loading} data={dataBrandSales} {...configBrandSales} />
              </div>
            </Col>
            <Col xs={24} xl={6} span={10}>
              <div>
                <h4
                  style={{ padding: 10, textAlign: "center", color: "#4963AF" }}
                >
                  Số lượng tồn kho
                </h4>
                <Pie loading={loading} data={brandStock} {...configRoundChart} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RosPage;
