// import React, { Component } from 'react';
// import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
// import './OrderCard.css'
// import OrderDetails from './OrderDetails';


// class OrderCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: this.props.location.state.data
//         }
//     }

//     render() {
//         const { data } = this.state;
//         console.log('data', data)
//         return (
//             <AdminDashboard>
//                 <div className={'AdminUserDiv'}>
//                     <div className={"Orders"}>
//                         <div>
//                             Order Detail
//                         </div>
//                         <div>
//                             {data.status.toUpperCase()}
//                         </div>
//                     </div>
//                     <div className={'Product_Info'}>
//                         <div>
//                             <ul>
//                                 <li className={'_head'}>Buyer Name</li>
//                                 <li>{data.name}</li>
//                                 <li className={'_head'}>Contact Number</li>
//                                 <li>{data.contactNo}</li>
//                                 <li className={'_head'}>Address</li>
//                                 <li>{data.address}</li>
//                             </ul>
//                         </div>
//                         <div>
//                             <ul>
//                                 <li className={'_head'}>Order Date</li>
//                                 <li>{data.orderDate}</li>
//                                 <li className={'_head'}>Order ID</li>
//                                 <li>{data.orderId}</li>
//                                 <li className={'_head'}>Total Price</li>
//                                 <li>${data.subtotal}</li>
//                                 <li className={'_head'}>Total Quantity</li>
//                                 <li>{data.totalQuantity}</li>
//                             </ul>
//                         </div>
//                     </div>
//                     <OrderDetails />
//                 </div>

//             </AdminDashboard >
//         )
//     }
// }

// export default OrderCard;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
import './OrderCard.css'
import OrderDetails from './OrderDetails';
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

class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.data,
            allProducts: null
        }
    }


    componentWillMount() {
        const { allProducts } = this.props;
        const { data } = this.state;
        console.log('AllProducts', allProducts)
        // setTimeout(() => {
        //     data.product.map(item => {
        //         allProducts.map(proKey => {
        //             if (item.productKey === proKey.key) {
        //                 console.log('item', item)
        //                 console.log('proKey', proKey)
        //             }
        //         })
        //     })
        // }, 5000)
        setTimeout(() => {
            this.setState({ allProducts })
        }, 1000)
    }

    componentWillReceiveProps(props) {
        const { allProducts } = props;
        console.log('AllProductsPRops', allProducts);
        setTimeout(() => {
            this.setState({ allProducts })
        }, 1000)
    }

    _products = () => {
        const { data, allProducts } = this.state;
        data.product.map(proKey => {
            allProducts.map(item => {
                if (proKey.productKey === item.key) {
                    return <OrderDetails item={item.data} />

                }
            })
        })
    }


    render() {
        const { classes } = this.props;
        const { data, allProducts } = this.state;
        console.log('data', data)
        return (
            <AdminDashboard>
                <div className={'AdminUserDiv'}>
                    <div className={"Orders"}>
                        <div>
                            Order Detail
                        </div>
                        {/* <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button> */}
                        <div>
                            {data.status.toUpperCase()}
                        </div>
                    </div>
                    <div>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Buyer Name</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="right">Contact Number</TableCell>
                                        <TableCell align="right">Order Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell align="right">{data.address}</TableCell>
                                        <TableCell align="right">{data.contactNo}</TableCell>
                                        <TableCell align="right">{data.orderDate}</TableCell>
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
                    <div className={"Product-Details"}>
                        {
                            allProducts && allProducts.length ?
                                data.product.map(proKey => {
                                    return allProducts.map(item => {
                                        if (proKey.productKey === item.key) {
                                            return <OrderDetails status={proKey.status} item={item.data} />
                                        }
                                    })
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </AdminDashboard >
        );
    }
}

OrderCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        allProducts: states.productReducer.ALLPRODUCTS,
    })
}


export default connect(mapStateToProps, null)(withStyles(styles)(OrderCard));