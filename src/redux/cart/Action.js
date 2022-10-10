import {ADD_TO_CART} from './Types'

export const addProductToCart = (data) => (dispatch) => {
    console.log("datadata", data);
    dispatch({
        type: ADD_TO_CART,
        payload: data
    })
}