// import React, { Component } from 'react';
// import AdminDashboard from '../../Screens/AdminDashboard/AdminDashboard';
// import './UserCard.css'
// import { Button } from '@material-ui/core';

// class UserCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }


//     render() {
//         return (
//             <div className={"UserCard"}>
//                 <div className={'Role'}>Buyer</div>
//                 <div className={'UserName'}>Muhammad Wasi</div>
//                 <div className={'CardPara'}>Thu 21, 2018</div>
//                 <div className={"CardBtn"}>
//                     <button className={"ViewBtn"}>View Details</button>
//                 </div>
//             </div>
//         )
//     }
// }


// export default UserCard



import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../../Config/Firebase/firebase';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './UserCard.css'

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


class AlertDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            item: props.item
        }

        this._approve = this._approve.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
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
        const { item } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Button size={"small"} color={"primary"} variant={"outlined"} onClick={this.handleClickOpen}>
                    Details
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <div className={"UserName"}>{`${item.data.firstName} ${item.data.lastName}`}</div>
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
                        </ul>
                    </DialogContent>
                    <div className={"Btns"}>
                        <select
                            className={"UserApproval"}
                            value={item && item.data.isApproved}
                            onChange={(e) => this._approve(item.key, e.target.value)}
                        >
                            <option selected={item && item.data.isApproved === 'true'} value="true">
                                Approved
                                    </option>
                            <option selected={item && item.data.isApproved === 'block'} value={'block'}>Block</option>
                        </select>
                        <Button color={"secondary"} variant={"outlined"} onClick={this.handleClose}>
                            Cancle
                        </Button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

// export default AlertDialog;

AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertDialog);