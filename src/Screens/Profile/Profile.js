import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History/History';
import Containers from '../../Container/container/container';
import { Button } from '@material-ui/core';
import './Profile.css';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2'
import { updatePassword } from '../../store/action/action';
import Loader from 'react-loader-spinner'
import { ClipLoader } from 'react-spinners';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
library.add(faUserEdit, faEdit)


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }

    componentWillMount() {
        const { authChange, currentUser } = this.props;
        this.setState({ currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
    }

    componentWillReceiveProps(props) {
        const { authChange, currentUser } = props;
        this.setState({ currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
    }

    changeText(value, text) {

        this.setState({
            [text]: value
        })
    }

    // componentDidMount() {
    //     const { currentUserUID } = this.props;
    //     console.log('currentUserUID*********************', currentUserUID)
    //     if (!currentUserUID) {
    //         History.push('/')
    //     }
    // }

    // static getDerivedStateFromProps(props) {
    //     const { currentUser } = props;
    //     return ({ currentUser })

    // }

    update() {
        const { curr_password, new_password, re_password } = this.state

        if (curr_password && new_password && re_password) {
            console.log(curr_password, new_password, re_password, 'pass')
            if (new_password !== re_password) {
                swal({
                    title: 'Password not match',
                    type: 'warning',
                })
            } else {
                this.setState({ loader: true })
                var obj = {
                    currentPass: curr_password,
                    newPass: new_password
                }
                const { updatePassword } = this.props.actions

                updatePassword(obj).then(() => {
                    this.setState({ loader: false })
                    swal({
                        title: 'successfully Updated',
                        type: 'success',
                        timer: 1000,
                    })
                }).catch((err) => {
                    this.setState({ loader: false })
                    swal({
                        title: err,
                        type: 'error',
                        animation: false,
                        customClass: 'animated tada'
                    })
                })
            }
        } else {
            swal({
                title: 'Fill all fields',
                type: 'warning',
                animation: false,
                customClass: 'animated tada'
            })
        }
    }

    render() {
        const { currentUser, curr_password, new_password, re_password, loader } = this.state;
        const { currentUserUID } = this.props;

        return (
            <Containers>
                <div className={'Profile'}>
                    <div>
                        Profile
                    </div>
                    {currentUser && currentUser.role &&
                        <div>
                            <Button
                                color={"primary"}
                                size={"small"}
                                variant="outlined"
                                onClick={() => { History.push('/editprofile') }}
                            >
                                <FontAwesomeIcon icon={"edit"} size={'1x'} className={'FontAws'} />
                                Edit Profile
                            </Button>
                        </div>
                    }
                    <hr />
                </div>
                {currentUser && currentUser.role ?
                    <div>
                        {currentUser.role === 'buyer' ?
                            <div className={'ProfileBuyerData'}>
                                <span>
                                    <div>
                                        <div className={'formLabBuyer'} >First Name</div>
                                        <div className={'formText'}>{currentUser.firstName}</div>
                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Last Name</div>
                                        <div className={'formText'}>{currentUser.lastName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Contact Email</div>
                                        <div className={'formText'}>{currentUser.contactEmail}</div>

                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Phone No.</div>
                                        <div className={'formText'}>+{currentUser.phoneNoCode}{currentUser.phoneNo}</div>
                                    </div>
                                    <div>
                                        <div className={'formLabBuyer'} >Telephone No.</div>
                                        <div className={'formText'}>+{currentUser.telCode}{currentUser.telephoneNo}</div>
                                    </div>
                                </span>
                            </div>
                            :
                            null
                        }
                        {currentUser.role === 'seller' ?
                            <div className={'ProfileData'}>
                                <span>
                                    <div>
                                        <div className={'formLab'} >First Name</div>
                                        <div className={'formText'}>{currentUser.firstName}</div>
                                    </div>
                                    <div>
                                        <div className={'formLab'} >Last Name</div>
                                        <div className={'formText'}>{currentUser.lastName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Email</div>
                                        <div className={'formText'}> {currentUser.contactEmail}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Phone No.</div>
                                        <div className={'formText'}>+{currentUser.phoneNoCode}{currentUser.phoneNo}</div>
                                    </div>
                                    <div>
                                        <div className={'formLab'} >Telephone No.</div>
                                        <div className={'formText'}>+{currentUser.telCode}{currentUser.telephoneNo}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Company Name</div>
                                        <div className={'formText'}>{currentUser.companyName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Registration No.</div>
                                        <div className={'formText'}>{currentUser.registNo}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >No. Of Peoples In Organization</div>
                                        <div className={'formText'}>{currentUser.noOfPeople}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Country</div>
                                        <div className={'formText'}>{currentUser.country}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Service Category</div>
                                        <div className={'formText'}>{currentUser.serviceCategory}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Designation</div>
                                        <div className={'formText'}>{currentUser.designation}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 3}</div>
                                        <div className={'formText'}>${currentUser.turnOver3}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 2}</div>
                                        <div className={'formText'}>${currentUser.turnOver2}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Turnover {new Date().getFullYear() - 1}</div>
                                        <div className={'formText'}>${currentUser.turnOver1}</div>

                                    </div>


                                    <div>
                                        <div className={'formLab'} >Beneficiary Name</div>
                                        <div className={'formText'}>{currentUser.beneficiaryName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Bank Name</div>
                                        <div className={'formText'}>{currentUser.bankName}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Bank Code</div>
                                        <div className={'formText'}>{currentUser.bankCode}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Swift Code</div>
                                        <div className={'formText'}>{currentUser.swiftCode}</div>

                                    </div>
                                    <div>
                                        <div className={'formLab'} >Account Number</div>
                                        <div className={'formText'}>{currentUser.accountNumber}</div>

                                    </div>
                                </span>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <div style={{ textAlign: "center" }}>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={120}
                            color={'#f27b01'}
                            loading={true}
                        />
                    </div>
                    // <div style={{ textAlign: "center" }}>
                    //     <Loader
                    //         type="ThreeDots"
                    //         color="#f27b01"
                    //         height="100"
                    //         width="100"
                    //     />
                    // </div>
                }
                <div className={'Profile'}>
                    <div>
                        Change Password
                    </div>
                    <hr />
                </div>
                <div className={'changePassword'}>
                    <div>
                        <div className={'formLab'} >Current Password</div>
                        <div className={'formText'}>
                            <TextField
                                type={'password'}
                                value={curr_password}
                                placeholder="Current Password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => { this.changeText(e.target.value, 'curr_password') }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={'formLab'} >New Password</div>
                        <div className={'formText'}>
                            <TextField
                                type={'password'}
                                value={new_password}
                                placeholder="New Password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => { this.changeText(e.target.value, 'new_password') }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={'formLab'} >Repeat Password</div>
                        <div className={'formText'}>
                            <TextField
                                type={'password'}
                                value={re_password}
                                placeholder="Repeat Password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => { this.changeText(e.target.value, 're_password') }}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '30px' }}>
                        <Button
                            variant={'raised'}
                            className={'crop-btn'}
                            onClick={() => this.update()}
                        >
                            {'Update'}
                        </Button>
                    </div>
                </div>
                {
                    loader &&
                    <div style={{ textAlign: "center", position: 'absolute', bottom: "15%", left: '50%' }}>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={120}
                            color={'#f27b01'}
                            loading={true}
                        />
                    </div>
                }
            </Containers>
        )
    }
}

function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        authChange: states.authReducer.AUTHCHANGE
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updatePassword
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);