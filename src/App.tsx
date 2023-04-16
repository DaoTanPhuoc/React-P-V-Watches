import React, { createContext, useEffect, useState } from "react";
import { Route, RouterProvider } from "react-router-dom";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import { adminRoutes, authRoutes, routes } from "./routes";
import PageLogin from "./pages/LoginPage/PageLogin";
import Dashboard from "./pages/DashboardPage/DashboardPage";

export const AppContext = createContext<any>(null);

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [cartOrders, setCartOrders] = useState<any[]>([]);
  // Check is AdminPage
  const pathname = window.location.pathname.split("/")[1];
  const isAdminPage = pathname === "admin" || pathname === "login";
  // check is UserPage

  useEffect(() => {
    const userString = localStorage.getItem("adminInfo");
    if (userString) {
      const user = JSON.parse(userString);
      if (user) {
        setIsAdminAuthenticated(true);
      }
    }

    const cartOrdersString = localStorage.getItem("cartOrders");
    if (cartOrdersString) {
      const cartOrdersTmp = JSON.parse(cartOrdersString);
      setCartOrders(cartOrdersTmp);
    }
  }, []);
  // Auth
  useEffect(() => {
    if (pathname === "login" && isAdminAuthenticated) {
      window.location.replace("/admin");
    }
  }, [pathname, isAdminAuthenticated]);

  const onChangeCartOrders = (orders: any[]) => {
    const cartOrdersString = JSON.stringify(orders);
    localStorage.setItem("cartOrders", cartOrdersString);

    setCartOrders(orders);
  };

  return (
    <AppContext.Provider
      value={{
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        cartOrders,
        onChangeCartOrders,
      }}
    >
      {isAdminPage ? (
        isAdminAuthenticated ? (
          <AdminLayout>
            {/* <AdminRoutes /> */}
            <RouterProvider router={adminRoutes} />
          </AdminLayout>
        ) : (
          <BlankLayout>
            <RouterProvider router={authRoutes} />
          </BlankLayout>
        )
      ) : (
        <UserLayout>
          <RouterProvider router={routes} />
        </UserLayout>
      )}
    </AppContext.Provider>
  );
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard />;
};

const BlankLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLogin />;
};

export default App;
