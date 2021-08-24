import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import History from '../History/History'
import { stateAuthChangeAction } from '../store/action/action';
import { connect } from 'react-redux'
import Loader from '../Screens/Loader/Loader';
import NotFound from '../Screens/404/NotFound';
import Banner from '../Component/Admin/Slider/Banner';
import EditBanner from '../Component/Admin/Slider/EditBanner';
import Sellers from '../Screens/Admin/Users/Sellers';
import Contact from '../Screens/Admin/Contact/Contact';
import { bindActionCreators } from 'redux';
import { AllSellers,GetOurSellers } from '../store/action/adminAction'
import AdminProducts from '../Screens/Admin/AdminProducts/AdminProducts';
import Orders from '../Screens/Admin/Orders/Orders';
import ProductDetail from '../Screens/Admin/AdminProductDetails/AdminProductDetails';
import OrderCard from '../Component/Admin/Orders/OrderCard';
import Transaction from '../Screens/Admin/Transaction/Transaction';
import TransactionDetail from '../Screens/Admin/Transaction/TransactionDetail'
import ChatBox from '../Component/ChatBox/ChatBox';
import About from '../Screens/Admin/AboutSites/Sites';
import { AllChatsForAdmin } from '../store/action/chatAction';
import OurSeller from '../Screens/Admin/OurSeller/ourSeller';
import AdminFrontPage from '../Screens/Admin/FrontPage/FrontPage';


class AdminRouters extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { AllChatsForAdmin } = this.props;
        const { AllSellers,GetOurSellers } = this.props.actions

        AllSellers()
        GetOurSellers()
        AllChatsForAdmin();
    }

    // componentDidMount() {
    //     const { stateAuthChange, allProducts, userUid, getProducts, UserCart } = this.props;
    //     stateAuthChange();
    //     allProducts();
    //     if (userUid) {
    //         getProducts(userUid)
    //         UserCart(userUid)
    //     }
    // }

    // static getDerivedStateFromProps(props) {
    //     if (props.userUid) {
    //         const { getProducts, UserCart } = props
    //         console.log('props.useruid', props.userUid)
    //         getProducts(props.userUid)
    //         UserCart(props.userUid)
    //     }
    // }

    render() {
        return (
            <Router history={History} >
                <div>
                    <Switch>
                        {/* <Route exact path={'/'} component={Banner} /> */}
                        <Route exact path={'/'} component={AdminFrontPage} />
                        <Route exact path={'/editBanner'} component={EditBanner} />
                        <Route exact path={'/sellerCards'} component={Sellers} />
                        <Route exact path={'/contact'} component={Contact} />
                        <Route exact path={'/products'} component={AdminProducts} />
                        <Route exact path={'/productDetails/:id'} component={ProductDetail} />
                        <Route exact path={'/orders'} component={Orders} />
                        <Route exact path={'/orderDetails/:id'} component={OrderCard} />
                        <Route exact path={'/transaction'} component={Transaction} />
                        <Route exact path={'/OurSellers'} component={OurSeller} />
                        <Route exact path={'/transactionDetails/:id'} component={TransactionDetail} />
                        <Route exact path={'/about'} component={About} />
                        <Route exact path={'/abc'} component={ChatBox} />
                        <Route component={Loader} />
                        {/* <Route component={NotFound} /> */}

                    </Switch>
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return ({
        userUid: state.authReducer.CURRENTUSERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        AllChatsForAdmin: () => {
            dispatch(AllChatsForAdmin());
        },
        actions: bindActionCreators({
            AllSellers,GetOurSellers
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouters);
