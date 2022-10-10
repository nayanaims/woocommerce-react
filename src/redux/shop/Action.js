import api from "../api";
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILED} from './Types'

export const getProducts = (parameters) => async (dispatch) => {
    try{
        dispatch({
            type: GET_PRODUCTS,
            payload: []
        })
        await api.get('/products', {
            params: {
                per_page: parameters.perPage,
                offset: parameters.offSet,
                orderby: parameters.orderby, 
                order: parameters.order, 
                status: parameters.status
            }
        }).then((res) => {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data,
                headers: res.headers
            })
        });
    } catch (e){
        dispatch({
            type: GET_PRODUCTS_FAILED,
            payload: ['Error Occured'],
        })
    }
}