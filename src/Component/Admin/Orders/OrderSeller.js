import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from '../../../Assets/images/pdfDownload.png';

const styles = theme => ({
    mainroot: {
        width: '100%',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class OrderSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            userData: this.props.item,

        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded, userData } = this.state;

        // console.log('userData', userData)
        return (
            <div className={classes.mainroot}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Seller Detail</Typography>
                        <Typography style={{color: '#0275d8'}} className={classes.secondaryHeading}>{expanded ? 'Close Seller Detail' : 'Click To View Seller Detail'}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{width: '100%'}} className={"Order_Product_Detail"}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Company Name</TableCell>
                                            <TableCell align="right">Country Code</TableCell>
                                            <TableCell align="right">Service Category</TableCell>
                                            <TableCell align="right">Designation</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{userData.companyName}</TableCell>
                                            <TableCell align="right">{userData.country}</TableCell>
                                            <TableCell align="right">{userData.serviceCategory}</TableCell>
                                            <TableCell align="right">{userData.designation}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Vendor Name</TableCell>
                                            <TableCell align="right">Mobile Number</TableCell>
                                            <TableCell align="right">Telephone Number</TableCell>
                                            <TableCell align="right">Contact Email</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{`${userData.firstName} ${userData.lastName}`}</TableCell>
                                            <TableCell align="right">+{userData.phoneNoCode}{userData.phoneNo}</TableCell>
                                            <TableCell align="right">+{userData.telCode}{userData.telephoneNo}</TableCell>
                                            <TableCell align="right">{userData.contactEmail}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Registration No.</TableCell>
                                            <TableCell align="right">Last 3 Years Turnover</TableCell>
                                            <TableCell align="right">Registration Date</TableCell>
                                            <TableCell align="right">Number Of Peoples In Company</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{userData.registNo}</TableCell>
                                            <TableCell align="right">{`$${userData.turnOver1}, $${userData.turnOver2}, $${userData.turnOver3} in Thousand`}</TableCell>
                                            <TableCell align="right">{userData.signupDate}</TableCell>
                                            <TableCell align="right">{userData.noOfPeople}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Beneficiary Name</TableCell>
                                            <TableCell align="right">Bank Name</TableCell>
                                            <TableCell align="right">Swift Code</TableCell>
                                            <TableCell align="right">Account Number</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{userData.beneficiaryName}</TableCell>
                                            <TableCell align="right">{userData.bankName}</TableCell>
                                            <TableCell align="right">{userData.swiftCode}</TableCell>
                                            <TableCell align="right">{userData.accountNumber}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>
                            </Paper>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}


OrderSeller.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        allUser: states.authReducer.USERS,
    })
}


export default connect(mapStateToProps, null)(withStyles(styles)(OrderSeller));