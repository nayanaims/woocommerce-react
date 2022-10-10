import {GET_PRODUCTS, GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS} from './Types'

const init = {
    items: [],
    perPage: 6,
    totalItems: 0,
    totalPages:0,
    loading: false
}

const products = (state = init, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                items: action.payload,
                loading: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                totalItems: action.headers['x-wp-total'],
                totalPages: action.headers['x-wp-totalpages'],
                loading: false
            }
        case GET_PRODUCTS_FAILED:
            return state
        default:
            return state
    }
}

export default products