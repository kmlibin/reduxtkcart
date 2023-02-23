import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

//fetch request from firebase data to update to frontend
export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const response = await fetch(
        "https://reduxcart-d3878-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = await response.json();
      return data;
    };
    try {
        const cartData = await fetchHandler();
        dispatch(cartActions.replaceData(cartData))
    }catch(err) {
         dispatch(
        uiActions.showNotification({
          open: true,
          message: "failed request",
          type: "error",
        })
      );
    }
  };
};

//UseEffect in App.js, or OR use a thunnk (below)
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "sending request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        //sends state
        "https://reduxcart-d3878-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await response.json();
      //send state for notification success
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sent request successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "failed request",
          type: "error",
        })
      );
    }
  };
};
