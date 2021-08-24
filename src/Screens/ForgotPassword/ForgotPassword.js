import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import swal from 'sweetalert2';
import { forgotPasswordAction } from '../../store/action/action';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import '../Login/login.css'
library.add(faUser, faLock)



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cond: 'submit',
            email: '',
        }

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const { currentUserUID } = this.props;
        if (currentUserUID) {
            History.push('/')
        }
    }

    submit() {
        const { email, cond } = this.state;
        if (email) {
            this.setState({ cond: "" })
            this.props.actions.forgotPasswordAction(email)
                .then(() => {
                    this.setState({ cond: "submit" })
                })
                .catch(() => {
                    this.setState({ cond: "resend" })
                })
        }
        else {
            swal({
                type: 'error',
                title: 'Please enter email address',
            })
        }

    }


    render() {
        const { email, cond } = this.state;
        console.log('Email**', email);
        return (
            <div>
                <div className="Form">
                    <label>
                        Forgot Password?
                    </label>
                    <div className="InputFields">
                        <div>
                            <FontAwesomeIcon
                                size='1x'
                                style={{ marginRight: '10px' }}
                                icon={'envelope'}
                            />
                        </div>
                        <input type="text" placeholder="Enter email address" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {
                            cond === "" &&
                            <Loader
                                type="ThreeDots"
                                color="#f27b01"
                                height="70"
                                width="70"
                            />
                        }
                        {
                            cond === "submit" &&
                            <button onClick={this.submit}>Submit</button>
                        }
                        {
                            cond === "resend" &&
                            <button onClick={this.submit}>Submit</button>
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
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            forgotPasswordAction
        }, dispatch)
    }
    // return ({
    //     forgotPassword: (user) => {
    //         dispatch(forgotPasswordAction(user));
    //     }
    // })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
