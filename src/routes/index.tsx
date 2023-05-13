import path from "path";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetail from "../pages/ProductDetailPage/ProductDetailPage";
import ShopPage from "../pages/ShopPage/ShopPage";
import CartPage from "../pages/CartPage/CartPage";
import PageLogin from "../pages/LoginPage/PageLogin";
import Dashboard from "../pages/DashboardPage/DashboardPage";
import News from "../pages/NewsPage/NewsPage";
import HomeDas from "../pages/DashboardPage/HomeDashboard/HomeDashboard";
import DetailNews from "../pages/DetailNewsPage/DetailNews";
import ProductsDashboard from "../pages/DashboardPage/ProductsDashboard/ProductsDashboard";
import PostDashboard from "../pages/DashboardPage/PostDashboard/PostDashboard";
import BillingDashboard from "../pages/DashboardPage/BillingDashboard/BillingDashboard";
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage";
import UserLayout from "../layouts/UserLayout";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import StatisticalPage from "../pages/DashboardPage/Statistical/StatisticalPage";
import RosPage from "../pages/DashboardPage/RosPage/RosPage";

export const userRoutes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/ProductDetail/:id/:brandId/:caseSize",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/news",
        element: <News />,
      },

      {
        path: "/detailNews",
        element: <DetailNews />,
      },
      {
        path: "/dasProducts",
        element: <ProductsDashboard />,
      },

      {
        path: "/myAccount",
        element: <MyAccountPage />,
      },
    ],
  },
  {
    path: "/admin/*",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomeDas />,
      },
      {
        path: "dasProducts",
        element: <ProductsDashboard />,
      },
      {
        path: "statistical",
        element: <StatisticalPage />,
      },
      {
        path: "dasBilling",
        element: <BillingDashboard />,
      },
      {
        path: "dasPost",
        element: <PostDashboard />,
      },
      {
        path: "ros",
        element: <RosPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
