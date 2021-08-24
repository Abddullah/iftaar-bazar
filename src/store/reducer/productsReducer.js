import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    PRODUCTS: null,
    COND: null,
    ALLPRODUCTS: null,
    EMPTYPRODUCT: null,
    SEARCHPRODUCTS: null,
    SEARCHPRODUCTSTEXT: null,
    ADDCART: null,
    GETCART: null,
    EMPTYBASKET: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PRODUCTS:
            return ({
                ...states,
                PRODUCTS: action.payload
            })
        case actionTypes.COND:
            return ({
                ...states,
                COND: action.payload
            })
        case actionTypes.ALLPRODUCTS:
            return ({
                ...states,
                ALLPRODUCTS: action.payload
            })
        case actionTypes.EMPTYPRODUCT:
            return ({
                ...states,
                EMPTYPRODUCT: action.payload
            })
        case actionTypes.SEARCHPRODUCTS:
            return ({
                ...states,
                SEARCHPRODUCTS: action.payload
            })
        case actionTypes.SEARCHPRODUCTSTEXT:
            return ({
                ...states,
                SEARCHPRODUCTSTEXT: action.payload
            })
        case actionTypes.ADDCART:
            return ({
                ...states,
                ADDCART: action.payload
            })
        case actionTypes.GETCART:
            return ({
                ...states,
                GETCART: action.payload
            })
        case actionTypes.CARTFLAG:
            return ({
                ...states,
                CARTFLAG: action.payload
            })
        case actionTypes.EMPTYBASKET:
            return ({
                ...states,
                EMPTYBASKET: action.payload
            })
        default:
            return states;
    }
}