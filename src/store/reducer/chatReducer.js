import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CHAT: [],
    ALLCHAT: [],
    CHATFLAG: null,
    NOTSEEN: null,
    MODIFIEDSEEN: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CHAT:
            return ({
                ...states,
                CHAT: action.payload
            })
        case actionTypes.ALLCHAT:
            return ({
                ...states,
                ALLCHAT: action.payload
            })
        case actionTypes.CHATFLAG:
            return ({
                ...states,
                CHATFLAG: action.payload
            })
        case actionTypes.NOTSEEN:
            return ({
                ...states,
                NOTSEEN: action.payload
            })
        case actionTypes.MODIFIEDSEEN:
            return ({
                ...states,
                MODIFIEDSEEN: action.payload
            })
        default:
            return states;
    }
}