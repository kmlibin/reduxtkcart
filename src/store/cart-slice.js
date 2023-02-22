import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            console.log(newItem.price)
            //check if item is present, then add to quantity
            const existingItem = state.itemsList.find(item => item.id ===newItem.id);
            if(existingItem) {
                existingItem.quantity++
                existingItem.totalPrice+= newItem.price
                state.totalQuantity++

            } else {
                state.itemsList.push( {
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++
            }
            

        },
        removeFromCart() {

        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;