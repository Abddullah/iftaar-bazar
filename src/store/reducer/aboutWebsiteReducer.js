import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    ABOUTWEBSITE: null,
    PRODUCTCATOGERY: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ABOUTWEBSITE:
            return ({
                ...states,
                ABOUTWEBSITE: action.payload
            })
        case actionTypes.PRODUCTCATOGERY:
            return ({
                ...states,
                PRODUCTCATOGERY: action.payload
            })
        default:
            return states;
    }
}