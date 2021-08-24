import { combineReducers } from 'redux'
import authReducer from './authReducer'
import productReducer from './productsReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'
import chatReducer from './chatReducer';
import aboutWebsiteReducer from './aboutWebsiteReducer';


export default combineReducers({
    authReducer: authReducer,
    productReducer: productReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
    chatReducer: chatReducer,
    aboutWebsiteReducer: aboutWebsiteReducer
})