import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
//grabs from store
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";


import { fetchData, sendCartData } from "./store/cart-actions";

//checks if it is first render, then stops the useeffect from rendering the alert that pops up right away.
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  //grab cart state, then send https rquest
  const cart = useSelector((state) => state.cart);
 
 
//there is an issue with this useeffect
  // useEffect(()=> {
  //   dispatch(fetchData())
  // },[dispatch]);

  //this useEffect is hooked up to a thunk...the commented out part is how you can do it without a thunk
  useEffect(() => {
    if(isFirstRender) {
      isFirstRender = false;
      return;
    }
    if(cart.changed) {
      dispatch(sendCartData(cart))
    }
    //update state for notification
    // dispatch(
    //   uiActions.showNotification({
    //     open: true,
    //     message: "sending request",
    //     type: "warning",
    //   })
    // );
    //created a realtime database, updated rules, then grabbed url for the new created api. added 'cartItems.json'. .json always needs to be there
    // const sendRequest = async () => {
    //   const response = await fetch(
    //     //sends state
    //     "https://reduxcart-d3878-default-rtdb.firebaseio.com/cartItems.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   const data = await response.json();
    //   //send state for notification success
    //   dispatch(
    //     uiActions.showNotification({
    //       open: true,
    //       message: "sent request successfully",
    //       type: "success",
    //     })
    //   );
    // };
    // sendRequest().catch((error) => {
      //send state as error
      // dispatch(
      //   uiActions.showNotification({
      //     open: true,
      //     message: "failed request",
      //     type: "error",
      //   })
      // );

      //still have to dispatch the thunk function
      //dispatch(sendCartData(cart))
   
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
