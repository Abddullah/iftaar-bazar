import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import firebase from '../../../Config/Firebase/firebase'
import Pagination from '../../../Component/Pager/Pager';
import History from '../../../History/History';
import { Button } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import './Transaction.css';
import { OrderAction } from '../../../store/action/adminAction';
const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: null,
            pages: 3,
            pageProduct: [],
            number: 10,
            searchText: '',
            searchArr: [],
            transaction: null,
        }

        this.pageNum = this.pageNum.bind(this);
        this._details = this._details.bind(this);
        this._confirm = this._confirm.bind(this);
    }



    componentWillMount() {
        const { allOrders } = this.props;
        const { number } = this.state;
        if (allOrders && allOrders.length) {
            setTimeout(() => {
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
            var accountName = item.data.accountName;
            var transactionId = item.data.transactionId;
            if ((accountName.toUpperCase()).startsWith(val.toUpperCase()) || (transactionId.toUpperCase()).startsWith(val.toUpperCase())) {
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
            pathname: `/transactionDetails/${item.key}`,
            state: item
        })
    }

    _confirm(item) {
        const { allOrders } = this.state;
        console.log('item***', item)
        allOrders.map(order => {
            if (order.key === item.key) {
                order.data.paymentStatus = 'confirmed'
                this.props.actions.OrderAction(item.key, allOrders)
                    .then(() => {
                        this.setState({ allOrders })
                    })
            }
        })
    }

    _select(val) {
        this.setState({ transaction: val })
        const { allOrders } = this.props;
        const { number, transaction } = this.state;
        if (!val) {
            if (allOrders && allOrders.length) {
                console.log('allOrdersWill**', allOrders)
                const pages = Math.ceil(allOrders.length / number)
                const pageArr = allOrders.slice(0, number)
                this.setState({ pages, pageProduct: pageArr })
            }
        }
        else if (val === 'confirm') {
            if (allOrders && allOrders.length) {
                var arr = []
                allOrders.map(item => {
                    if (item.data.paymentStatus === 'pending') {
                        arr.push(item)
                    }
                })
                const pages = Math.ceil(arr.length / number)
                const pageArr = arr.slice(0, number)
                this.setState({ pages, pageProduct: pageArr })
                this.setState({ pages, pageProduct: pageArr })
            }
        }
    }

    _table = (item) => {
        return (
            <tr className={'TBody'}>
                <td className={'Date'}>{item.data.date}</td>
                <td className={'Name'}>{item.data.accountName}</td>
                <td className={'Name'}>{item.data.transactionId}</td>
                <td className={'Number'}>{item.data.paid}</td>
                {/* <td className={'UserRole'}>{item.data.paymentStatus}</td> */}
                <td className={'UserRole'}>
                    {
                        item.data.paymentStatus === 'pending' ?
                            <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => this._confirm(item)}>Confirm</Button>
                            :
                            <Button disabled size={"small"} color={"primary"} variant={"outlined"}>Confirmed</Button>
                    }
                </td>
                <td className={'Btn'}>
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => this._details(item)}>Details</Button>
                </td>
            </tr>
        )
    }

    render() {
        const { allOrders, searchText, searchArr, pageProduct, pages, transaction } = this.state;
        return (
            <AdminDashboard>
                {
                    allOrders ?
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Transactions
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>

                            </div>
                            <div className={"Search-Field"}>
                                <input placeholder="Search By Name Or Transaction ID" value={searchText} onChange={(e) => { this.search(e.target.value) }} />
                                <select onChange={(e) => { this._select(e.target.value) }}>
                                    <option value="" selected={!transaction}>All Transactions</option>
                                    <option value="confirm" selected={transaction === 'confirm'}>Not Confirm Transactions</option>
                                    {/* <option value="buyer" selected={user === 'buyer'}>Buyer</option> */}
                                </select>
                            </div>
                            <div className={"Sellers"}>
                                <table>
                                    <thead>
                                        <tr className={'THead'}>
                                            <th className={'Date'}>Date</th>
                                            <th className={'Name'}>Name</th>
                                            <th className={'Name'}>Transaction ID</th>
                                            <th className={'Number'}>Vendor Paid</th>
                                            <th className={'UserRole'}>Status</th>
                                            <th className={'Btn'}>Details</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody> */}
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
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No transaction found</div>
                                        :
                                        null
                                }
                                {
                                    !searchText && !pageProduct.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No transaction found</div>
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
                                Transactions
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
                                        'No transactions'
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
    return {
        actions: bindActionCreators({
            OrderAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);