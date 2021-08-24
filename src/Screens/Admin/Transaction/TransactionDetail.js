import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
import './TransactionDetail.css'
import { OrderAction } from '../../../store/action/adminAction';
// import OrderDetails from './OrderDetails';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import History from '../../../History/History';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '90%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: 'auto'
    },
    table: {
        minWidth: 700,
    },
});

class TransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.data,
            key: this.props.location.state.key,
        }

        this._confirm = this._confirm.bind(this);
        this._details = this._details.bind(this);
    }

    _confirm() {
        const { key, data } = this.state;
        const { allOrders } = this.props;
        console.log('History', key)
        allOrders.map(order => {
            if (order.key === key) {
                order.data.paymentStatus = 'confirmed'
                this.props.actions.OrderAction(key, allOrders)
                    .then(() => {
                        data.paymentStatus = 'confirmed'
                        this.setState({ data })
                    })
            }
        })
    }

    _details() {
        const { data, key } = this.state;
        console.log('History', key)
        History.push({
            pathname: `/orderDetails/${key}`,
            state: { data, key }
        })
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;
        console.log('data', data)
        return (
            <AdminDashboard>
                <div className={'AdminUserDiv'}>
                    <div className={"Orders"}>
                        <div>
                            Transaction Detail
                        </div>
                        {/* <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button> */}
                        <div>
                            {data.paymentStatus.toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Transaction ID</TableCell>
                                        <TableCell align="right">Paid Price</TableCell>
                                        <TableCell align="right">Payment Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.accountName}</TableCell>
                                        <TableCell align="right">{data.transactionId}</TableCell>
                                        <TableCell align="right">{data.paid}</TableCell>
                                        <TableCell align="right">{data.date}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell align="right">Total Quantity</TableCell>
                                        <TableCell align="right">Total Price</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.orderId}</TableCell>
                                        <TableCell align="right">{data.totalQuantity}</TableCell>
                                        <TableCell align="right">${data.subtotal}</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <hr />
                    <div className={"Transaction-Details"}>
                        <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => History.goBack()}>Back</Button>
                        {
                            data.paymentStatus === "pending" ?
                                <Button size={"small"} color={"primary"} variant={"outlined"} onClick={this._confirm}>Confirm</Button>
                                :
                                <Button disabled size={"small"} color={"primary"} variant={"outlined"}>Confirmed</Button>
                        }
                        <Button size={"small"} color={"primary"} variant={"outlined"} onClick={this._details}>View Order Details</Button>
                    </div>
                </div>
            </AdminDashboard >
        );
    }
}

TransactionDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        allProducts: states.productReducer.ALLPRODUCTS,
        allOrders: states.orderReducer.ALLORDERS,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            OrderAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionDetail));