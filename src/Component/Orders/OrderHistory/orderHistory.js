import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../../History/History'
import Containers from '../../../Container/container/container';
import './orderHistory.css'

class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: null
        }
    }

    componentWillMount() {
        const { location, currentUser } = this.props
        if (location.state) {
            const data = location.state
            this.setState({ orders: data }, () => {
                var total = 0
                var price = 0
                var shipment = 0
                this.state.orders.product.map(items => {
                    total += items.quantity
                    shipment += items.shipment ? items.shipment : 0
                    if (items.product.discount) {
                        price += (items.product.price - items.product.discount) * items.quantity
                    } else {
                        price += items.product.price * items.quantity
                    }
                    this.setState({ quantity: total, totalPrice: price + shipment })
                })
            })

        } else {
            History.push('/orders')
        }
    }

    componentWillReceiveProps(props) {
        const { location, currentUser } = props
        if (location.state) {
            const data = location.state
            this.setState({ orders: data }, () => {
                var total = 0
                this.state.orders.product.map(items => {
                    total += items.quantity
                    this.setState({ quantity: total })
                })
            })

        } else {
            History.push('/orders')
        }

        if (props.modifiedOrder) {
            const { orders } = this.state
            const { location } = props
            if (location.state.role === 'seller') {
                // console.log(location.state,'state here hhhhh')
            } else {
                console.log(props.modifiedOrder, 'modified orfhjhjhbjhb')

                orders.product.map((items, index) => {
                    props.modifiedOrder.product.map((buyeritems, index2) => {
                        console.log(buyeritems, 'buyeritems here')
                        if (buyeritems.status === 'delivered') {
                            orders.product[index2].status = 'delivered'
                            location.state.product[index2].status = 'delivered'
                            this.setState({ orders })
                        }
                        else if (buyeritems.status === 'pending') {
                            orders.product[index2].status = 'pending'
                            location.state.product[index2].status = 'pending'
                            this.setState({ orders })
                        }
                    })
                })

            }
        }
    }

    myOrders(items) {
        const { orders } = this.state
        const product = items.product
        return (
            product &&
            <div className={'orders'}>
                <div className={'column-1'}>
                    <div className={'order-name'}>
                        {
                            orders.paymentStatus === 'pending' ?
                                <div>
                                    {/* {orders.orderId} */}
                                    ---
                                </div>
                                :
                                <div>
                                    {'Order ID: '}
                                    <span style={{ color: 'black' }}>{orders.orderId}</span>
                                </div>
                        }
                        {/* <div>
                            {orders.orderId}
                        </div> */}

                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            {product.name}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            QUANTITY
                        </div>
                        <div>
                            {items.quantity}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            ORDERED AT
                        </div>
                        <div>
                            {orders.orderTime}
                        </div>
                    </div>
                </div>
                <div className={'column-2'}>
                    <div className={'order-name'}>
                        <div>
                            ORDERED ON
                            </div>
                        <div>
                            {orders.orderDate}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            {
                                orders.paymentStatus === 'pending' ?
                                    "ADMIN "
                                    :
                                    "SELLER "
                            }
                            STATUS
                        </div>
                        <div style={{ color: 'rgb(241, 123, 1)' }}>
                            {
                                orders.paymentStatus === 'pending' ?
                                    orders.paymentStatus
                                    :
                                    items.status
                            }
                            {/* {items.status} */}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            PRICE
                        </div>
                        <div>
                            $ {product.price}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            DISCOUNT
                        </div>
                        <div>
                            $ {product.discount ? product.discount : 'N/A'}
                        </div>
                    </div>
                    <div className={'order-name'}>
                        <div>
                            PRICE(+DISCOUNT)
                        </div>
                        <div style={{ fontWeight: 'bold' }}>
                            $ {
                                product.discount ?
                                    (product.price - product.discount) * items.quantity
                                    :
                                    product.price * items.quantity
                            }
                        </div>
                    </div>
                </div>
                {
                    orders.role !== 'seller' ?
                        <div>
                            Shipment Charges:
                        <span className={'handle_span'} style={{ color: 'black', marginLeft: '6px', fontSize: '15px' }}>{product.shipment ? product.shipment : 'N/A'}</span>
                        </div>
                        :
                        null
                }
                <div>
                    <hr />
                </div>
            </div>
        )
    }

    render() {
        const { orders, quantity, totalPrice } = this.state
        return (
            <Containers>
                <div className={'vendor-products'}>
                    <div>
                        Order History
                    </div>
                    <hr />
                    <div className={'main_orders'}>
                        <div className={'total-orders'}>
                            {
                                orders &&
                                orders.product.length > 0 &&
                                orders.product.map(items => {
                                    return (
                                        this.myOrders(items)
                                    )
                                })
                            }
                        </div>
                        <div className={'order_subtotal'}>
                            <div>
                                ORDER SUMMARY
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className={'pricing'}>
                                <div>
                                    ITEMS
                                </div>
                                <div>
                                    {
                                        orders &&
                                        orders.product.length}
                                </div>
                            </div>
                            <div className={'pricing'}>
                                <div>
                                    QUANTITY
                                </div>
                                <div>
                                    {quantity}
                                </div>
                            </div>
                            <div className={'pricing'}>
                                <div>
                                    SUBTOTAL
                                </div>
                                <div style={{ color: '#f27b01', fontWeight: 'bold' }}>
                                    ${
                                        totalPrice &&
                                        totalPrice
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        // currentUser: states.authReducer.currentUser,
        // currentUserUID: states.authReducer.currentUserUID,
        modifiedOrder: states.orderReducer.MODIFIEDORDER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);