import React from 'react';
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

class SellerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            item: props.item,
            Click: false
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
        const { item, Click } = this.state;
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
                        <div className={"UserName"}>{`${item && item.data.firstName} ${item && item.data.lastName}`}</div>
                        <ul>
                            <li className={'Email'}>Company Name</li>
                            <li>{item && item.data.companyName}</li>
                            <li className={'ContactAddress'}>Service Category</li>
                            <li>{item && item.data.serviceCategory}</li>
                            <li className={'TeleNum'}>Country Code</li>
                            <li>{item && item.data.country}</li>


                            <li className={'ContactAddress'}>Designation</li>
                            <li>{item && item.data.designation}</li>
                            <li className={'ContactAddress'}>Number Of Peoples In Company</li>
                            <li>{item && item.data.noOfPeople}</li>
                            <li className={'TeleNum'}>Registration No.</li>
                            <li>{item && item.data.registNo}</li>
                            <li className={'TeleNum'}>Last 3 years Turnover</li>
                            <li>{`$${item && item.data.turnOver1}, $${item && item.data.turnOver2}, $${item && item.data.turnOver3} in Thousand`}</li>
                            {
                                item && item.data.address ?
                                    <div>
                                        <li className={'ContactAddress'}>Address</li>
                                        <li>{item && item.data.address}</li>
                                    </div>
                                    :
                                    null
                            }
                            <li className={'ContactAddress'}>Contact Email</li>
                            <li>{item && item.data.contactEmail}</li>
                            <li className={'TeleNum'}>Telephone No.</li>
                            <li>+{item && item.data.telCode}{item && item.data.telephoneNo}</li>
                        
                        
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
                            item && item.data.isApproved !== 'false' ?
                                // <Button disabled variant={"outlined"} color="primary">
                                //     Approved
                                // </Button>
                                // <FormControl variant="outlined" className={classes.formControl}>
                                //     <InputLabel
                                //         ref={ref => {
                                //             this.InputLabelRef = ref;
                                //         }}
                                //         htmlFor="outlined-age-simple"
                                //     >
                                //         Account
                                //     </InputLabel>
                                //     <Select
                                //     className={"UserApproval"}
                                //         value={item && item.data.isApproved}
                                //         onChange={(e) => this._approve(item.key, e.target.value)}
                                //         input={
                                //             <OutlinedInput
                                //                 labelWidth={this.state.labelWidth}
                                //                 name="Account"
                                //                 id="outlined-age-simple"
                                //             />
                                //         }
                                //     >
                                //         <MenuItem selected={item && item.data.isApproved === 'true'} value="true">
                                //             <em>Approved</em>
                                //         </MenuItem>
                                //         <MenuItem selected={item && item.data.isApproved === 'block'} value={'block'}>Block</MenuItem>
                                //         {/* <MenuItem selected={item && item.data.isApproved === 'reviewAccount'} value={'reviewAccount'}>Review Account</MenuItem>
                                //         <MenuItem selected={item && item.data.isApproved === 'suspend'} value={'suspend'}>Suspend</MenuItem> */}
                                //     </Select>
                                // </FormControl>

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
                                        <Button color={"primary"} variant={"outlined"} onClick={() => this._approve(item.key, 'true')}>
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
            </div>
        );
    }
}

// export default SellerDetail;

SellerDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellerDetail);