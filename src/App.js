import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
//grabs from store
import { useSelector } from "react-redux";
import Notification from "./components/Notification";

function App() {
  //grab cart state, then send https rquest
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    //created a realtime database, updated rules, then grabbed url for the new created api. added 'cartItems.json'. .json always needs to be there
    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxcart-d3878-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await response.json();
    };
    sendRequest();
  }, [cart]);

  return (
    <div className="App">
      <Notification type='success' message={'dummy message'}/>
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
