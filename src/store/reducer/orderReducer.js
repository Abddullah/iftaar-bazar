import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    ALLORDERS: null,
    ORDERS: null,
    EMPTYORDER: null,
    SELLERORDER: null,
    EMPTYSELLERORDER: null,
    MODIFIEDORDER: null,
    CONFIRMDELIVERY: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ALLORDERS:
            return ({
                ...states,
                ALLORDERS: action.payload
            })
        case actionTypes.ORDERS:
            return ({
                ...states,
                ORDERS: action.payload
            })
        case actionTypes.EMPTYORDER:
            return ({
                ...states,
                EMPTYORDER: action.payload
            })
        case actionTypes.SELLERORDER:
            return ({
                ...states,
                SELLERORDER: action.payload
            })
        case actionTypes.EMPTYSELLERORDER:
            return ({
                ...states,
                EMPTYSELLERORDER: action.payload
            })
        case actionTypes.MODIFIEDORDER:
            return ({
                ...states,
                MODIFIEDORDER: action.payload
            })
        case actionTypes.CONFIRMDELIVERY:
            return ({
                ...states,
                CONFIRMDELIVERY: action.payload
            })
        default:
            return states;
    }
}