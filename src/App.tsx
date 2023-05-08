import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { userRoutes } from "./routes";

export const AppContext = createContext<any>(null);

function App() {
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [cartOrders, setCartOrders] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        const userInfo: any = await jwtDecode(token);
        setCurrentUser({
          name: userInfo.Name,
          email: userInfo.Email,
          avatar:
            "https://www.facebook.com/photo/?fbid=2838561319801692&set=a.2030018630655969",
        });
        console.log(currentUser);
      }
    })();

    const cartOrdersString = localStorage.getItem("cartOrders");
    if (cartOrdersString) {
      const cartOrdersTmp = JSON.parse(cartOrdersString);
      setCartOrders(cartOrdersTmp);
    }
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
        currentUser,
        setCurrentUser,
        isAuthenticatedAdmin,
        setIsAuthenticatedAdmin,
        cartOrders,
        onChangeCartOrders,
      }}
    >
      {<RouterProvider router={userRoutes} />}
    </AppContext.Provider>
  );
}

export default App;
