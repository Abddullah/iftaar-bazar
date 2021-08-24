import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import History from '../History/History'
import { stateAuthChangeAction } from '../store/action/action';
import { connect } from 'react-redux'
import Home from '../Screens/Home/home';
import Signup from '../Screens/Signup/signup';
import Login from '../Screens/Login/login';
import { bindActionCreators } from 'redux';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import FrontPage from '../Component/FrontPage/FrontPage';
import ProductForm from '../Component/ProductForm/ProductForm';
import ProductPage from '../Component/ProductPage/ProductPage';
import OrderHistory from '../Component/Orders/OrderHistory/orderHistory';
import { products, allProduct } from '../store/action/productAction';
import { AllOrders, AllOrdersSeller, deliveryConfirmation } from '../store/action/orderAction'
import { GetOurSellers } from '../store/action/adminAction'
import { seenBadge } from '../store/action/chatAction'
import EditProfile from '../Component/EditProfile/EditProfile';
import ProductDetails from '../Screens/productDetails/productDetails';
import Cart from '../Screens/Cart/cart';
import { AllCart } from '../store/action/cartAction';
import Checkout from '../Screens/CheckOut/checkout'
import Payment from '../Screens/Payment/Payment'
import Profile from '../Screens/Profile/Profile';
import NotFound from '../Screens/404/NotFound';
import firebase from '../Config/Firebase/firebase';
import EditProduct from '../Screens/EditProduct/EditProduct';
import Orders from '../Component/Orders/Order/Orders';
import CheckoutForm from '../Screens/Payment/CheckoutForm';
import ChatBox from '../Component/ChatBox/ChatBox';
import BlockAccount from '../Screens/BlockAccount/BlockAcount';

class Routers extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        
    }

    componentDidMount() {
        const { stateAuthChange, allProducts, userUid, getProducts, UserCart } = this.props;
        const { deliveryConfirmation, seenBadge, GetOurSellers } = this.props.actions


        GetOurSellers()
        stateAuthChange();
        allProducts();
        deliveryConfirmation()
        if (userUid) {
            getProducts(userUid)
            UserCart(userUid)
            seenBadge(userUid)
        }
    }

    static getDerivedStateFromProps(props) {

        if (props.userUid) {
            // stateAuthChange();

            const { seenBadge } = props.actions
            const { getProducts, UserCart } = props
            getProducts(props.userUid)
            UserCart(props.userUid)
            seenBadge(props.userUid)
        }
        if (props.currentUser) {
            if (props.currentUser.role === 'buyer') {
                props.actions.AllOrders(props.userUid)
            } else {
                props.actions.AllOrdersSeller(props.userUid)
            }
            console.log(props.currentUser, 'current userrrrrrrrrr')
        }
    }

    render() {
        return (
            <Router history={History} >
                <div>
                    <Switch>
                        <Route exact path={"/"} component={FrontPage} />
                        <Route exact path={'/adminLogin'} component={Login} />
                        <Route exact path={'/cart'} component={Cart} />
                        {/* <Route exact path={'/productForm'} component={ProductForm} />
                        <Route exact path={'/payments'} component={Payment} />
                        <Route exact path={'/signup'} component={Signup} /> */}
                        {/* <Route exact path={'/forgotpassword'} component={ForgotPassword} />
                        <Route exact path={'/products'} component={ProductPage} />
                        <Route exact path={'/editprofile'} component={EditProfile} />
                        <Route exact path={'/profile'} component={Profile} />
                        <Route exact path={'/details/:id'} component={ProductDetails} /> */}
                        {/* <Route exact path={'/editproduct/:id'} component={EditProduct} />
                        <Route exact path={'/checkout'} component={Checkout} />
                        <Route exact path={'/orders'} component={Orders} />
                        <Route exact path={'/orderHistory'} component={OrderHistory} />
                        <Route exact path={'/payments'} component={CheckoutForm} />
                        <Route exact path={'/abc'} component={ChatBox} />
                        <Route exact path={'/blockAccount'} component={BlockAccount} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

function mapStateToProps(states) {
    return ({
        userUid: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        flag: states.authReducer.AUTHCHANGE,
        // deliveryConfirm: states.orderReducer.CONFIRMDELIVERY,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        stateAuthChange: () => {
            dispatch(stateAuthChangeAction());
        },
        getProducts: (userUid) => {
            dispatch(products(userUid));
        },
        allProducts: () => {
            dispatch(allProduct());
        },
        UserCart: (user) => {
            dispatch(AllCart(user));
        },
        actions: bindActionCreators({
            AllOrders, AllOrdersSeller, deliveryConfirmation, seenBadge, GetOurSellers
        }, dispatch)
    })
    // return {
    //     actions: bindActionCreators({
    //         ProductCart, RemoveQuantity, DeleteCart
    //     }, dispatch)
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
