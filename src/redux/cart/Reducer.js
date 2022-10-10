import {ADD_TO_CART} from './Types'
import { placeHolderImage } from '../../assets/images';
const init = {
    cartTotal: 0,
    itemsTotal: 0,
    items: []
}

const cart = (state = init, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // console.log("AddToCartAction", action.payload);
            const mainState = {...state};
            const product = action.payload
            mainState.cartTotal = parseInt(mainState?.cartTotal) + (parseInt(product?.quantity) * parseInt(product?.item?.price))
            mainState.itemsTotal = parseInt(mainState?.itemsTotal) + parseInt(product?.quantity)
            const checkItem = mainState.items.find(item => item.id == product?.item?.id);
            if(typeof checkItem === 'undefined'){
                mainState.items.push({
                    id: product?.item?.id,
                    name: product?.item?.name,
                    urlKey: product?.item?.slug,
                    type: product?.item?.type,
                    price: product?.item?.price,
                    qty: parseInt(product?.quantity),
                    image: product?.item?.images[0]?.src || placeHolderImage,
                })
            }else{
                const existingIndex = mainState.items.findIndex(item => item.id == product?.item?.id);
                mainState.items[existingIndex].qty = parseInt(mainState.items[existingIndex]?.qty) + parseInt(product?.quantity)
            }
            return {...mainState}
        default:
            return state
    }
}

export default cart