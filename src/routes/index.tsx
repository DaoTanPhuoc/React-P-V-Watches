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
import HomeDas from "../pages/DashboardPage/HomeDashboard";

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
