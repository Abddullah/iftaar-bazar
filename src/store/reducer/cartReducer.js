import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CART: null,
    DELETECART: null,
    COUNTER: false,
    MODIFIED: null,
    FLAG: null,
    CHANGES: null,
    EMPTYCART: null,
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CART:
            return ({
                ...states,
                CART: action.payload
            })
        case actionTypes.DELETECART:
            return ({
                ...states,
                DELETECART: action.payload
            })
        case actionTypes.COUNTER:
            return ({
                ...states,
                COUNTER: action.payload
            })
        case actionTypes.MODIFIED:
            return ({
                ...states,
                MODIFIED: action.payload
            })
        case actionTypes.FLAG:
            return ({
                ...states,
                FLAG: action.payload
            })
        case actionTypes.CHANGES:
            return ({
                ...states,
                CHANGES: action.payload
            })
        case actionTypes.EMPTYCART:
            return ({
                ...states,
                EMPTYCART: action.payload
            })
        default:
            return states;
    }
}