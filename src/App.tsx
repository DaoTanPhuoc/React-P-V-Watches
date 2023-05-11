import { Skeleton } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { userRoutes } from "./routes";

export const AppContext = createContext<any>(null);

function App() {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);
  const [cartOrders, setCartOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  const loadUser = async () => {
    const token = localStorage.getItem("userToken")
    if (currentToken === null && token) {
      setCurrentToken(token)
    }
    if (currentToken || token) {
      axios.get('https://localhost:7182/api/Accounts/GetCurrentUserInfo', {
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Authorization": `Bearer ${currentToken ? currentToken : token}`
        }
      }).then(async res => {
        const data = await res.data
        setCurrentUser(data);
      }).catch(err => {
        console.error("Lỗi: " + err);
      })
    }
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
    setLoading(false)
  }, []);
  // Auth
  const onChangeCartOrders = (orders: any[]) => {
    const cartOrdersString = JSON.stringify(orders);
    localStorage.setItem("cartOrders", cartOrdersString);
    setCartOrders(orders);
  };

  return (
    <AppContext.Provider
      value={{
        currentToken,
        setCurrentToken,
        currentUser,
        setCurrentUser,
        isAuthenticatedAdmin,
        setIsAuthenticatedAdmin,
        cartOrders,
        onChangeCartOrders,
      }}
    >
      {loading ? <Skeleton active /> : <RouterProvider router={userRoutes} />}
    </AppContext.Provider>
  );
}

export default App;
