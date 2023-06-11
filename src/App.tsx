/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { userRoutes } from "./routes";

export const AppContext = createContext<any>(null);

function App() {
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);
  const [cartOrders, setCartOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const baseApi = "https://localhost:7182/api"

  const loadUser = async () => {
    setLoading(true)
    const token: any = localStorage.getItem("userToken")
    if (currentToken === null && token) {
      setCurrentToken(token)
    }
    if (currentToken || token) {
      axios.get(`${baseApi}/Accounts/GetCurrentUserInfo`, {
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Authorization": `Bearer ${currentToken ? currentToken : token}`
        }
      }).then(async res => {
        const data = await res.data
        const jwt: any = await jwtDecode(token)
        const role = jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        if (role === "User") {
          setCurrentUser(data)
        } else if (role === "Admin") {
          setCurrentAdmin(data)
        }
      }).catch(err => {
        console.error("Lỗi: " + err);
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    (async () => {
      await loadUser()
    })();

    const cartOrdersString = localStorage.getItem("cartOrders");
    if (cartOrdersString) {
      const cartOrdersTmp = JSON.parse(cartOrdersString);
      setCartOrders(cartOrdersTmp);
    }
  }, [currentToken]);
  // Auth
  const onChangeCartOrders = (orders: any[]) => {
    const cartOrdersString = JSON.stringify(orders);
    localStorage.setItem("cartOrders", cartOrdersString);
    setCartOrders(orders);
  };

  return (
    <AppContext.Provider
      value={{
        baseApi,
        currentToken,
        setCurrentToken,
        loadUser,
        currentUser,
        setCurrentUser,
        currentAdmin,
        setCurrentAdmin,
        cartOrders,
        onChangeCartOrders,
      }}
    >
      {loading ? <Skeleton active loading={loading} /> : <RouterProvider router={userRoutes} />}
    </AppContext.Provider>
  );
}

export default App;
