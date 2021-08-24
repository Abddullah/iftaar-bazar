import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import History from '../../History/History';
import { LoginAction } from '../../store/action/action';
import { AllOrdersSeller, AllOrders } from '../../store/action/orderAction';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core'
import swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import { faUnlockAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import './login.css'

library.add(faUser, faUnlockAlt)


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cond: false,
            email: '',
            password: '',
        }

        this.Login = this.Login.bind(this);
        this.Signup = this.Signup.bind(this);
    }
    componentWillMount() {
        const { currentUserUID } = this.props
        if (currentUserUID) {
            History.push('/')
        }
        this.setState({ cond: false })
    }

    componentWillReceiveProps(props) {
        const { loginCond } = props;
        if (loginCond) {
            this.setState({ cond: false })
        }
    }

    Login() {
        const { email, password } = this.state;
        const user = {
            email, password
        }
        if (email && password) {
            this.setState({ cond: true })
            this.props.actions.LoginAction(user)
                .then((uid, role) => {
                    this.setState({ cond: false })
                    History.push('/')
                })
                .catch((error) => {
                    this.setState({ cond: false })
                })
        }
        else {
            if (!email) {
                swal({
                    type: 'error',
                    title: 'Please enter email!',
                })
            }
            else if (email && !password) {
                swal({
                    type: 'error',
                    title: 'Please enter password',
                })
            }
        }

    }

    Signup() {
        History.push('/signup')
        History.push({
            pathname: '/signup',
            state: { cond1: false }
        })

    }

    enterPress(e) {
        if (e.key === 'Enter') {
            this.Login()
        }
    }

    render() {
        const { cond } = this.state;
        return (
            <div className={'Login'}>
                <div className="Form" style={{ marginTop: '10%', position: "relative" }}>
                    <div>

                        <div className="ChangeForm">
                            {/* <div>
                                <b onClick={this.Signup}>Signup</b>
                            </div>
                            <div>
                                <b>|</b>
                            </div> */}
                            <div>
                                <b style={{ color: '#3f984f', backgroundColor: '' }}>Admin Login</b>
                            </div>
                        </div>
                        <div className="InputFields">
                            <div>
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={'envelope'}
                                />
                            </div>
                            <input onKeyPress={(e) => this.enterPress(e)} type="text" placeholder="Enter email address" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </div>
                        <div className="InputFields">
                            <div>
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={"unlock-alt"}
                                />
                            </div>
                            <input onKeyPress={(e) => this.enterPress(e)} type="password" placeholder="Enter password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            {
                                cond ?
                                    <button disabled>Login</button>
                                    :
                                    <button onClick={this.Login}>Login</button>
                            }
                        </div>
                        <Link to={"/forgotpassword"}><span className="Link">Forgot password?</span></Link>
                        <br />
                        <Link to={"/"}><span className="Link">Go To Home Page</span></Link>
                    </div>
                    <div style={{ position: 'absolute', top: '36%', left: '37%' }}>
                        {
                            cond ?
                                <Loader
                                    type="ThreeDots"
                                    color="#3f984f"
                                    height="100"
                                    width="100"
                                />
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        loginCond: states.authReducer.LOGINCOND,
        flag: states.cartReducer.FLAG,

    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            LoginAction, AllOrdersSeller, AllOrders
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
