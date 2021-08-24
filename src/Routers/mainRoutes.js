import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import History from '../History/History'
import { stateAuthChangeAction } from '../store/action/action';
import { products, allProduct } from '../store/action/productAction';
import { AllChats } from '../store/action/chatAction';
import { connect } from 'react-redux'
import AdminRouters from './adminRoutes';
import Routers from './routes';
import Loader from '../Screens/Loader/Loader';
import NotFound from '../Screens/404/NotFound';
class MainRouters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: ''
        }
    }

    componentDidMount() {
        const { stateAuthChange, role, allProducts, currentUserUID, allChats } = this.props;
        stateAuthChange();
        allProducts();
        console.log('role', role)
        this.setState({ role: role })
        if (currentUserUID) {
            console.log('currentUserUIDallChats', currentUserUID)
            allChats(currentUserUID)
        }

    }
    componentWillReceiveProps(props) {
        const { role, currentUserUID, allChats } = props;
        console.log('role', role)
        this.setState({ role: role })
        if (currentUserUID) {
            console.log('currentUserUIDallChats', currentUserUID)
            allChats(currentUserUID)
        }
    }

    render() {
        const { role } = this.state;

        return (
            <Router history={History} >
                <div>
                    <Route path={"/"} component={AdminRouters} /> 
                   
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return ({
        role: state.authReducer.ROLE,
        currentUserUID: state.authReducer.CURRENTUSERUID,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        stateAuthChange: () => {
            dispatch(stateAuthChangeAction());
        },
        allProducts: () => {
            dispatch(allProduct());
        },

        allChats: (userUID) => {
            dispatch(AllChats(userUID));
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRouters);











  {/* < Route path={"/"} component={AdminRouters} /> */}
                    {/* {role === 'admin' &&
                        < Route path={"/"} component={AdminRouters} />
                    }
                    {role === 'user' &&
                        <Route path={"/"} component={Routers} />
                    }
                    {!role &&
                        <Route path={'/'} component={Loader} />
                    } */}