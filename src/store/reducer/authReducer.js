import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    ROLE: null,
    USERS: null,
    CONTACT: [],
    CURRENTUSER: null,
    CURRENTUSERUID: null,
    SLIDER: null,
    LOGINCOND: null,
    SIGNUPCOND: null,
    AUTHCHANGE: null,
    ALLSELLERS: null,
    SELLERNAME: null,
    OURSELLERS: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ROLE:
            return ({
                ...states,
                ROLE: action.payload
            })
        case actionTypes.USERS:
            return ({
                ...states,
                USERS: action.payload
            })
        case actionTypes.CONTACT:
            return ({
                ...states,
                CONTACT: action.payload
            })
        case actionTypes.LOGINCOND:
            return ({
                ...states,
                LOGINCOND: action.payload
            })
        case actionTypes.SIGNUPCOND:
            return ({
                ...states,
                SIGNUPCOND: action.payload
            })
        case actionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        case actionTypes.CURRENTUSERUID:
            return ({
                ...states,
                CURRENTUSERUID: action.payload
            })
        case actionTypes.SLIDER:
            return ({
                ...states,
                SLIDER: action.payload
            })
        case actionTypes.AUTHCHANGE:
            return ({
                ...states,
                AUTHCHANGE: action.payload
            })
        case actionTypes.ALLSELLERS:
            return ({
                ...states,
                ALLSELLERS: action.payload
            })
        case actionTypes.SELLERNAME:
            return ({
                ...states,
                SELLERNAME: action.payload
            })
        case actionTypes.OURSELLERS:
            return ({
                ...states,
                OURSELLERS: action.payload
            })
        default:
            return states;
    }
}