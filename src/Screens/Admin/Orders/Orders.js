import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import firebase from '../../../Config/Firebase/firebase'
import Pagination from '../../../Component/Pager/Pager';
import History from '../../../History/History';
import { Button } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import './Orders.css';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: null,
            pages: 3,
            pageProduct: [],
            number: 10,
            searchText: '',
            searchArr: [],
        }

        this.pageNum = this.pageNum.bind(this);
    }



    componentWillMount() {
        const { allOrders } = this.props;
        const { number } = this.state;
        if (allOrders && allOrders.length) {
            setTimeout(() => {
                allOrders.sort(
                    function (a, b) {
                        return new Date(b.data.orderDate).getTime() - new Date(a.data.orderDate).getTime()
                    }
                );
                console.log('allOrdersWill**', allOrders)
                const pages = Math.ceil(allOrders.length / number)
                const pageArr = allOrders.slice(0, number)
                this.setState({ allOrders, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allOrders', allOrders)
    }

    componentWillReceiveProps(props) {
        const { allOrders } = props;
        const { number } = this.state;
        if (allOrders && allOrders.length) {
            setTimeout(() => {
                allOrders.sort(
                    function (a, b) {
                        return new Date(b.data.orderDate).getTime() - new Date(a.data.orderDate).getTime()
                    }
                );
                console.log('allOrders**', allOrders)
                const pages = Math.ceil(allOrders.length / number)
                const pageArr = allOrders.slice(0, number)
                this.setState({ allOrders, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allOrders', allOrders)
    }

    pageNum(num) {
        const { allOrders, number } = this.state;
        const pageArr = allOrders.slice(num * number, num * number + number)
        this.setState({ pageProduct: pageArr })
    }

    search(val) {
        const { allOrders, searchArr } = this.state;
        this.setState({ searchText: val })
        var arr = []
        allOrders.map(item => {
            var name = item.data.name;
            var orderId = item.data.orderId;
            if ((name.toUpperCase()).startsWith(val.toUpperCase()) || (orderId.toUpperCase()).startsWith(val.toUpperCase())) {
                arr.push(item)
                this.setState({ searchArr: arr })
            }
            else {
                if (arr.indexOf(item) !== -1) {
                    arr.splice(item, 1)
                }
                this.setState({ searchArr: arr })
            }
        })
    }

    _details(item) {
        History.push({
            pathname: `/orderDetails/${item.key}`,
            state: item
        })
    }

    _table = (item) => {
        return (
            <tr className={'TBody'}>
                <td className={'Date'}>{item.data.orderDate}</td>
                <td className={'Name'}>{item.data.name}
                </td>
                <td className={'OrderID'}>{item.data.orderId}</td>
                <td className={'Number'}>{item.data.address}</td>
                <td className={'UserRole'}>{item.data.status}</td>
                <td className={'Btn'}>
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => this._details(item)}>Details</Button>
                </td>
            </tr>
        )
    }

    render() {
        const { allOrders, searchText, searchArr, pageProduct, pages } = this.state;
        return (
            <AdminDashboard>
                {
                    allOrders ?
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Orders
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>

                            </div>
                            <div className={"Search-Field"}>
                                <input placeholder="Search by name or Order ID" value={searchText} onChange={(e) => { this.search(e.target.value) }} />
                            </div>
                            <div className={"Sellers"}>
                                <table>
                                    <thead>
                                        <tr className={'THead'}>
                                            <th className={'Date'}>Date</th>
                                            <th className={'Name'}>Buyer Name</th>
                                            <th className={'OrderID'}>Order ID</th>
                                            <th className={'Number'}>Address</th>
                                            <th className={'UserRole'}>Status</th>
                                            <th className={'Btn'}>Details</th>
                                        </tr>
                                    </thead>
                                    {
                                        !searchText && pageProduct && pageProduct.length ?
                                            pageProduct.map(item => {
                                                return this._table(item)
                                            })
                                            :
                                            null
                                    }
                                    
                                    {
                                        searchText &&
                                            searchText && searchArr.length ?
                                            searchArr.map(item => {
                                                return (
                                                    <tbody>
                                                        {
                                                            this._table(item)
                                                        }
                                                    </tbody>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </table>
                                {
                                    searchText && !searchArr.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No user found</div>
                                        :
                                        null
                                }
                            </div>
                            <div className={"Pagination"}>
                                {
                                    !searchText && pageProduct.length && allOrders.length > 10 ?
                                        <Pagination pages={pages} pageNum={this.pageNum} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Orders
                            </div>
                            <div style={{ textAlign: "center" }}>
                                {
                                    pageProduct.length ?
                                        <ClipLoader
                                            sizeUnit={"px"}
                                            size={120}
                                            color={'#f27b01'}
                                            loading={true}
                                        />
                                        :
                                        'No orders'
                                }
                            </div>
                        </div>
                }
            </AdminDashboard >
        )
    }
}


function mapStateToProps(states) {
    return ({
        allOrders: states.orderReducer.ALLORDERS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);