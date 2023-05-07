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

export const routes = createBrowserRouter([
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
    path: "/dasHome",
    element: <HomeDas />,
  },
  {
    path: "/dasProducts",
    element: <ProductsDashboard />,
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
    path: "/dasPost",
    element: <PostDashboard />,
  },
  {
    path: "/dasBilling",
    element: <BillingDashboard />,
  },
  {
    path: "/myAccount",
    element: <MyAccountPage />,
  },
]);

export const adminRoutes = createBrowserRouter([
  {
    path: "/HomeDashboard",
    element: <Dashboard />,
  },
]);

export const authRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <PageLogin />,
  },
]);
