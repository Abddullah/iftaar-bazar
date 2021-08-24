import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../../../Config/Firebase/firebase';
import Loader from 'react-loader-spinner';
import '../UserCard/UserCard.css'


const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});


class ChatUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            uid: props.item,
            allUser: props.allUser,
            role: null,
            Click: false

        }

        this._approve = this._approve.bind(this);

    }

    handleClickOpen = () => {
        const { uid, allUser } = this.state;
        console.log('Run******', uid, allUser)
        allUser.map(userItem => {
            if (userItem.data.userUid === uid) {
                this.setState({ item: userItem, role: userItem.data.role, open: true })
                console.log('Warning Persone', userItem.data)
            }
        })
        // this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    _approve(key, val) {
        const { item } = this.state;
        this.setState({ Click: true })
        db.collection('users').doc(key).update({
            isApproved: val
        })
            .then(() => {
                item.data.isApproved = val
                this.setState({ item, Click: false })
                setTimeout(() => {
                    this.setState({ open: false })
                }, 1000)
            })
    }

    render() {
        const { item, Click, role } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <i onClick={this.handleClickOpen} style={{ fontSize: 12, cursor: "pointer", color: 'white', borderBottom: '1px solid blue' }}>
                    Click to see an account
                </i>
                {
                    role === 'buyer' &&
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <div className={"UserName"}>{`${item.data.firstName.slice(0, 1).toUpperCase()}${item.data.firstName.slice(1)} ${item.data.lastName}`}</div>
                            <ul>
                                <li className={'Email'}>Contact Email</li>
                                <li>{item.data.contactEmail}</li>
                                {
                                    item.data.address ?
                                        <div>
                                            <li className={'ContactAddress'}>Address</li>
                                            <li>{item.data.address}</li>
                                        </div>
                                        :
                                        null
                                }
                                <li className={'TeleNum'}>Telephone No.</li>
                                <li>+{item.data.telCode}{item.data.telephoneNo}</li>
                                <li className={'TeleNum'}>Mobile No.</li>
                                <li>+{item.data.phoneNoCode}{item.data.phoneNo}</li>
                            </ul>
                        </DialogContent>
                        <div className={"Btns"}>
                            {/* <Button color={"primary"} variant={"outlined"} onClick={this.handleClose} color="primary" autoFocus>
                                Okay
                        </Button> */}
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel
                                    ref={ref => {
                                        this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Account
                                    </InputLabel>
                                <Select
                                    value={item.data.isApproved}
                                    onChange={(e) => this._approve(item.key, e.target.value)}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="Account"
                                            id="outlined-age-simple"
                                        />
                                    }
                                >
                                    <MenuItem selected={item.data.isApproved === 'true'} value="true">
                                        <em>Approved</em>
                                    </MenuItem>
                                    <MenuItem selected={item.data.isApproved === 'block'} value={'block'}>Block</MenuItem>
                                </Select>
                            </FormControl>
                            <Button color={"secondary"} variant={"outlined"} onClick={this.handleClose}>
                                Cancle
                        </Button>
                        </div>
                    </Dialog>
                }
                {
                    role === 'seller' &&
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <div className={"UserName"}>{`${item.data.firstName.slice(0, 1).toUpperCase()}${item.data.firstName.slice(1)} ${item.data.lastName}`}</div>
                            <ul>
                                <li className={'Email'}>Company Name</li>
                                <li>{item.data.companyName}</li>
                                <li className={'ContactAddress'}>Service Category</li>
                                <li>{item.data.serviceCategory}</li>
                                <li className={'TeleNum'}>Country Code</li>
                                <li>{item.data.country}</li>


                                <li className={'ContactAddress'}>Designation</li>
                                <li>{item.data.designation}</li>
                                <li className={'ContactAddress'}>Number Of Peoples In Company</li>
                                <li>{item.data.noOfPeople}</li>
                                <li className={'TeleNum'}>Registration No.</li>
                                <li>{item.data.registNo}</li>
                                <li className={'TeleNum'}>Last 3 years Turnover</li>
                                <li>{`$${item.data.turnOver1}, $${item.data.turnOver2}, $${item.data.turnOver3} in Thousand`}</li>
                                {
                                    item.data.address ?
                                        <div>
                                            <li className={'ContactAddress'}>Address</li>
                                            <li>{item.data.address}</li>
                                        </div>
                                        :
                                        null
                                }
                                <li className={'ContactAddress'}>Contact Email</li>
                                <li>{item.data.contactEmail}</li>
                                <li className={'TeleNum'}>Telephone No.</li>
                                <li>+{item.data.telCode}{item.data.telephoneNo}</li>
                                <li className={'TeleNum'}>Mobile No.</li>
                                <li>+{item.data.phoneNoCode}{item.data.phoneNo}</li>
                            
                            
                                <li className={'ContactAddress'}>Beneficiary Name</li>
                            <li>{item && item.data.beneficiaryName}</li>
                            <li className={'ContactAddress'}>Bank Name</li>
                            <li>{item && item.data.bankName}</li>
                            <li className={'TeleNum'}>Swift Code</li>
                            <li>{item && item.data.swiftCode}</li>
                            <li className={'TeleNum'}>Account Number</li>
                            <li>{item && item.data.accountNumber}</li>
                            
                            </ul>
                        </DialogContent>
                        <div className={"Btns"}>
                            {
                                item.data.isApproved !== 'false' ?
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel
                                            ref={ref => {
                                                this.InputLabelRef = ref;
                                            }}
                                            htmlFor="outlined-age-simple"
                                        >
                                            Account
                                    </InputLabel>
                                        <Select
                                            value={item.data.isApproved}
                                            onChange={() => this._approve(item.key)}
                                            input={
                                                <OutlinedInput
                                                    labelWidth={this.state.labelWidth}
                                                    name="Account"
                                                    id="outlined-age-simple"
                                                />
                                            }
                                        >
                                            <MenuItem selected={item.data.isApproved === 'true'} value="true">
                                                <em>Approved</em>
                                            </MenuItem>
                                            <MenuItem selected={item.data.isApproved === 'block'} value={'block'}>Block</MenuItem>
                                            {/* <MenuItem selected={item.data.isApproved === 'reviewAccount'} value={'reviewAccount'}>Review Account</MenuItem>
                                            <MenuItem selected={item.data.isApproved === 'suspend'} value={'suspend'}>Suspend</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                    :
                                    <span>
                                        {Click ?
                                            <Loader
                                                type="ThreeDots"
                                                color="#f27b01"
                                                height="70"
                                                width="70"
                                            />
                                            :
                                            <Button color={"primary"} variant={"outlined"} onClick={() => this._approve(item.key)}>
                                                Approve
                                        </Button>
                                        }
                                    </span>
                            }
                            <Button color={"secondary"} variant={"outlined"} onClick={this.handleClose}>
                                Cancle
                        </Button>
                        </div>
                    </Dialog>
                }
            </div>
        );
    }
}

// export default ChatBuyer;


ChatUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        allUser: states.authReducer.USERS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // editProfile: (userProfile, userUID) => {
        //     dispatch(editProfile(userProfile, userUID));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChatUser));