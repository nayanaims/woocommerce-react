import { combineReducers } from "redux"
import products from "./shop/Reducer"
import cart from "./cart/Reducer"

export default combineReducers({
    products: products,
    cart: cart
})