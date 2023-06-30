import {
  createBrowserRouter,
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
import BrandDashboardPage from "../pages/DashboardPage/BrandDashboard/BrandDashboardPage";
import ImportProductsPage from "../pages/DashboardPage/ImportProduct/ImportProductsPage";
import InvoiceWait from "../pages/DashboardPage/InvoiceWait/InvoiceWait";
import AdminSettingDas from "../pages/DashboardPage/AdminSetting/AdminSettingDas";
import ShopMan from "../pages/ShopMan/ShopMan";
import ShopWoMan from "../pages/ShopWoman/ShopWoMan";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import CategoryDashPage from "../pages/DashboardPage/CategoryDashboard/CategoryDashPage";
import CheckOut from "../pages/CartPage/Checkout";
import ShopFilterPriceOne from "../pages/ShopFilterPriceOne/ShopFilterPriceOne";
import ShopFilterPriceTwo from "../pages/ShopFilterPriceTwo/ShopFilterPriceTwo";
import ShopFilterPriceThree from "../pages/ShopFilterPriceThree/ShopFilterPriceThree";
import ShopFilterPriceFour from "../pages/ShopFilterPriceFour/ShopFilterPriceFour";
import CaseSizeLessThan29 from "../pages/CaseSizeLessThan29/CaseSizeLessThan29";
import CaseSize29to37 from "../pages/CaseSize29to37/CaseSize29to37";
import CaseSize37to42 from "../pages/CaseSize37to42/CaseSize37to42";
import CaseSizeOver42 from "../pages/CaseSizeOver42/CaseSizeOver42";
import FilterProductsByRolex from "../pages/HomePage/FilterProductsByBrand/FilterProductsByRolex";
import FilterProductsByHublot from "../pages/HomePage/FilterProductsByBrand/FilterProductsByHublot";
import FilterProductsByOmega from "../pages/HomePage/FilterProductsByBrand/FilterProductsByOmega";
import RestoreDashboard from "../pages/DashboardPage/RestoreDashboard/RestoreDashboard";
import FilterProductsByFranckMuller from "../pages/HomePage/FilterProductsByBrand/FilterProductsByFranckMuller";
import SuppilersDashboard from "../pages/DashboardPage/SuppilersDashboard/SuppilersDashboard";
import FilterProductsByCartier from "../pages/HomePage/FilterProductsByBrand/FilterProductsByCartier";
import LogsDashboard from "../pages/DashboardPage/LogsDashboard/LogsDashboard";
import FilterProductsByPatekPhilippe from "../pages/HomePage/FilterProductsByBrand/FilterProductsByPatekPhilippe";
import FilterProductsByGucci from "../pages/HomePage/FilterProductsByBrand/FilterProductsByGucci";
import FilterProductsByLongines from "../pages/HomePage/FilterProductsByBrand/FilterProductsByLongines";
import FilterProductsByBreiting from "../pages/HomePage/FilterProductsByBrand/FilterProductsByBreiting";
import FilterProductsByIWC from "../pages/HomePage/FilterProductsByBrand/FilterProductsByIWC";
import FilterProductsByChopard from "../pages/HomePage/FilterProductsByBrand/FilterProductsByChopard";
import FilterProductsByJaeger from "../pages/HomePage/FilterProductsByBrand/FilterProductsByJaeger";











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
        path: "/ProductDetail/:BrandName/:code",
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
        path: "/detailNews/:Id",
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
      {
        path: "/shopman/:categoryId",
        element: <ShopMan />
      },
      {
        path: "/shopwoman/:categoryId",
        element: <ShopWoMan />
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      },
      {
        path: "/ShopFilterPriceOne",
        element: <ShopFilterPriceOne />
      },
      {
        path: "/ShopFilterPriceTwo",
        element: <ShopFilterPriceTwo />
      },
      {
        path: "/ShopFilterPriceThree",
        element: <ShopFilterPriceThree />
      },
      {
        path: "/ShopFilterPriceFour",
        element: <ShopFilterPriceFour />
      },
      {
        path: "/CaseSizeLessThan29",
        element: <CaseSizeLessThan29 />
      },
      {
        path: "/CaseSize29to37",
        element: <CaseSize29to37 />
      },
      {
        path: "/CaseSize37to42",
        element: <CaseSize37to42 />
      },
      {
        path: "/CaseSizeOver42",
        element: <CaseSizeOver42 />
      },
      {
        path: "/FilterProductsByRolex",
        element: <FilterProductsByRolex />
      },
      {
        path: "/FilterProductsByHublot",
        element: <FilterProductsByHublot />
      },
      {
        path: "/FilterProductsByOmega",
        element: <FilterProductsByOmega />
      },
      {
        path: "/FilterProductsByFranckMuller",
        element: <FilterProductsByFranckMuller />
      },
      {
        path: "/FilterProductsByCartier",
        element: <FilterProductsByCartier />
      },
      {
        path: "/FilterProductsByPatekPhilippe",
        element: <FilterProductsByPatekPhilippe />
      },
      {
        path: "/FilterProductsByGucci",
        element: <FilterProductsByGucci />
      },
      {
        path: "/FilterProductsByLongines",
        element: <FilterProductsByLongines />
      },
      {
        path: "/FilterProductsByBreiting",
        element: <FilterProductsByBreiting />
      },
      {
        path: "/FilterProductsByIWC",
        element: <FilterProductsByIWC />
      },
      {
        path: "/FilterProductsByChopard",
        element: <FilterProductsByChopard />
      },
      {
        path: "/FilterProductsByJaeger",
        element: <FilterProductsByJaeger />
      }
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
      {
        path: "brandDash",
        element: <BrandDashboardPage />,
      },
      {
        path: "importProducts",
        element: <ImportProductsPage />
      },
      {
        path: "invoiceWait",
        element: <InvoiceWait />
      },
      {
        path: "settingAccount",
        element: <AdminSettingDas />
      },
      {
        path: "categoryDash",
        element: <CategoryDashPage />
      },
      {
        path: "RestoreDashboard",
        element: <RestoreDashboard />
      },
      {
        path: "SuppilersDashboard",
        element: <SuppilersDashboard />
      },
      {
        path: "LogsDashboard",
        element: <LogsDashboard />
      }
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
