import React, { Component } from 'react';
import { connect } from 'react-redux';
import Containers from '../../../Container/container/container';
import './order.css'
import History from '../../../History/History'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Button } from '@material-ui/core'
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners';
import Pagination from '../../Pager/Pager';
import Loader from 'react-loader-spinner'
import { DeliveryStatus, confirmStatus, deleteOrder } from '../../../store/action/orderAction'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons'


library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt, faUser, faCheckCircle)


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyOrder: false,
            dropdownOpen: false,
            // pages: 3,
            number: 10,
            products: [],
            perPageArr: [],
            cancelled: false
        }
        this.pageNum = this.pageNum.bind(this)
        this.toggle = this.toggle.bind(this);

    }


    componentWillMount() {
        if (this.props.sellerOrder) {
            // setTimeout(() => {
            this.props.sellerOrder.sort(
                function (a, b) {
                    // return a.time - b.time
                    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
                }
            );
            const { number } = this.state
            const pages = Math.ceil(this.props.sellerOrder.length / number)
            const pageArr = this.props.sellerOrder.slice(0, number)
            this.setState({ products: this.props.sellerOrder, pages, perPageArr: pageArr })
            // }, 1000)
        }
        if (this.props.deleteCart) {
            setTimeout(() => {
                // console.log('Changes', this.props.changes)
                if (this.props.changes === 'deleted') {
                    for (var i = 0; i < this.props.myCart.length; i++) {
                        for (var j = 0; j < this.props.deleteCart.length; j++) {
                            if (JSON.stringify(this.props.myCart[i]) == JSON.stringify(this.props.deleteCart[j])) {
                                this.props.myCart.splice(i, 1);
                            }
                        }
                    }
                }
            }, 1000);
        }
        if (this.props.order) {
            const { allProducts, order } = this.props
            allProducts.map(items => {
                order &&
                    order.map(orderItems => {
                        orderItems.product.map(productKeyItems => {
                            if (productKeyItems.productKey === items.key) {
                                console.log(items, 'items g here product')
                                productKeyItems.product = items.data
                            }
                        })
                    })
            })
            this.setState({ myOrders: this.props.order })
        }
        if (this.props.sellerOrder) {
            const { sellerOrder, allProducts, currentUserUID } = this.props
            allProducts.map(items => {
                sellerOrder &&
                    sellerOrder.map(sellerOrderItems => {
                        sellerOrderItems.product.map((productKeyItems, index) => {
                            if (productKeyItems.sellerId === currentUserUID) {
                                if (productKeyItems.productKey === items.key) {
                                    productKeyItems.product = items.data
                                }
                            } else {
                                sellerOrderItems.product.splice(index, 1)
                            }
                        })
                    })
            })
            this.setState({ sellerOrder: this.props.sellerOrder })
        }
        if (this.props.emptySellerOrder) {
            this.setState({ emptySellerOrder: true })
        } else {
            this.setState({ emptySellerOrder: false })
        }

        if (this.props.emptyOrder) {
            this.setState({ emptyOrder: true })
        } else {
            this.setState({ emptyOrder: false })
        }

        if (this.props.currentUser) {
            console.log(this.props.currentUser, 'curr')
            this.setState({ role: this.props.currentUser.role })
        }

        if (this.props.deliveryConfirm) {
            console.log(this.props.deliveryConfirm, 'this.props.deliveryConfirm')
            this.setState({ deliveryConfirm: this.props.deliveryConfirm })
        }

    }

    componentWillReceiveProps(props) {
        console.log('Abc props.sellerOrder', props.sellerOrder)
        if (props.sellerOrder) {
            const { number } = this.state
            setTimeout(() => {
                props.sellerOrder.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
                    }
                );
                console.log('Abc', props.sellerOrder)

                const pages = Math.ceil(props.sellerOrder.length / number)
                const pageArr = props.sellerOrder.slice(0, number)
                console.log(pageArr, 'pageArr here')
                this.setState({ products: props.sellerOrder, pages, perPageArr: pageArr })
            }, 1000)
        }
        if (props.deleteCart) {
            setTimeout(() => {
                console.log('Changes reflected', props.changes)
                if (props.changes === 'deleted') {
                    for (var i = 0; i < props.myCart.length; i++) {
                        for (var j = 0; j < props.deleteCart.length; j++) {
                            if (JSON.stringify(props.myCart[i]) == JSON.stringify(props.deleteCart[j])) {
                                props.myCart.splice(i, 1);
                            }
                        }
                    }
                }
            }, 1000);
        }
        if (props.order || props.flag) {
            // console.log(props.order, 'ordser')
            const { order, allProducts } = props
            allProducts.map(items => {
                order &&
                    order.map(orderItems => {
                        orderItems.product.map(productKeyItems => {
                            if (productKeyItems.productKey === items.key) {
                                productKeyItems.product = items.data
                            }
                        })
                    })
            })
            this.setState({ myOrders: props.order })
        }
        if (props.sellerOrder || props.flag) {
            const { sellerOrder, allProducts, currentUserUID } = props
            allProducts.map(items => {
                sellerOrder &&
                    sellerOrder.map(sellerOrderItems => {
                        sellerOrderItems.product.map((productKeyItems, index) => {
                            if (productKeyItems.sellerId === currentUserUID) {
                                if (productKeyItems.productKey === items.key) {
                                    productKeyItems.product = items.data
                                }
                            } else {
                                console.log(productKeyItems.sellerId, 'sellerId')
                                console.log(currentUserUID, 'currrnt useruid')
                                sellerOrderItems.product.splice(index, 1)
                            }
                        })
                    })
            })
            console.log(sellerOrder, 'seller order here')
            // this.setState({ sellerOrder: props.sellerOrder })
            this.setState({ sellerOrder: sellerOrder })
        }

        if (props.emptySellerOrder) {
            this.setState({ emptySellerOrder: true })
        } else {
            this.setState({ emptySellerOrder: false })
        }

        if (props.emptyOrder) {
            this.setState({ emptyOrder: true })
        } else {
            this.setState({ emptyOrder: false })
        }

        if (props.currentUser) {
            console.log(props.currentUser, 'curr')
            this.setState({ role: props.currentUser.role })
        }

        if (props.modifiedOrder) {
            const { sellerOrder, myOrders, role } = this.state
            if (role === 'seller' && sellerOrder && sellerOrder.length) {
                sellerOrder.map((items, index) => {
                    if (props.modifiedOrder.orderId === items.orderId) {
                        props.modifiedOrder.product.map((Selleritems, index2) => {
                            items.product.map((productItem, index3) => {
                                if (Selleritems.sellerId === productItem.sellerId) {
                                    console.log(Selleritems, 'selleritems here')
                                    sellerOrder[index].product[index3].status = 'delivered'
                                    this.setState({ sellerOrder })
                                }
                            })
                        })
                    }
                })
                if (props.modifiedOrder.status === 'recieved' && sellerOrder && sellerOrder.length) {
                    sellerOrder.map((items, index) => {
                        if (items.orderId === props.modifiedOrder.orderId) {
                            sellerOrder[index].status = 'recieved'
                            this.setState({ sellerOrder })
                        }
                    })
                }
            } else {

                console.log(props.modifiedOrder, 'my myOrders ')
                myOrders && myOrders.length &&
                    myOrders.map((items, index) => {
                        if (props.modifiedOrder.orderId === items.orderId) {
                            props.modifiedOrder.product.map((buyeritems, index2) => {
                                console.log(buyeritems, 'buyeritems here')
                                items.product.map((productItem, index3) => {
                                    if (buyeritems.status === 'delivered') {
                                        console.log(buyeritems, 'absjdbaksjdbkajsbdkj')
                                        myOrders[index].product[index2].status = 'delivered'
                                        this.setState({ myOrders })
                                    }
                                    else if (buyeritems.status === 'pending') {
                                        console.log(buyeritems, 'absjdbaksjdbkajsbdkj')
                                        myOrders[index].product[index2].status = 'pending'
                                        this.setState({ myOrders })
                                    }
                                })
                            })
                        }
                    })
                if (props.modifiedOrder.status === 'recieved' && myOrders && myOrders.length) {
                    myOrders.map((items, index) => {
                        if (items.orderId === props.modifiedOrder.orderId) {
                            myOrders[index].status = 'recieved'
                            this.setState({ myOrders })
                        }
                    })
                }
            }
        }

        if (props.deliveryConfirm) {
            console.log(props.deliveryConfirm, 'props.deliveryConfirm')
            this.setState({ deliveryConfirm: props.deliveryConfirm })
        }
    }

    getDetails(items) {
        console.log(items, 'itmes here')
        History.push({
            pathname: '/orderHistory',
            state: items
        })
    }

    orderDetails(items) {
        console.log(items, 'itmes here asjdkj')
        items.role = 'seller'
        History.push({
            pathname: '/orderHistory',
            state: items
        })
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    confirmDelivery(items) {
        console.log(items, 'irrmrr')
        Swal({
            title: 'Are you sure?',
            text: "You recieved the product!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.value) {
                const { confirmStatus } = this.props.actions
                confirmStatus(items)
                    .then((success) => {
                        Swal({
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    cancelOrder(items) {
        console.log(items, 'irrmrr')
        Swal({
            title: 'Are you sure?',
            text: "You want to cancel the order",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                const { deleteOrder } = this.props.actions
                deleteOrder(items)
                    .then((success) => {
                        console.log(success, 'success here')
                        const { order } = this.props
                        const { myOrders } = this.state

                        myOrders.map((Orders, index) => {
                            if (Orders.orderId === success.orderId) {
                                myOrders.splice(index, 1)
                                this.setState({ myOrders })
                            }
                        })
                        order.map((Orders, index) => {
                            if (Orders.orderId === success.orderId) {
                                order.splice(index, 1)
                            }
                        })
                        Swal({
                            type: 'success',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    })
            }
        })
    }

    orderCard(items, index) {
        const { deliveryConfirm, cancelled, cancelIndex } = this.state
        const Image = items.product[0].product.images.length ? items.product[0].product.images[0].image : 'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png';
        const orderDate = new Date(items.orderDate).getTime()
        const OneDay = 86400000
        const dayLimit = orderDate + OneDay
        const todayDate = new Date().getTime()
        
        return (
            <div
                onMouseEnter={() => { this.setState({ cancelIndex: index }) }}
                className={'order_card'}
                onMouseLeave={() => { this.setState({ cancelIndex: null }) }}
            >
                {/* {
                    index === cancelIndex && todayDate <= dayLimit ?
                        <div onClick={() => this.cancelOrder(items)} className={'order-card-row-1 cancel-Order'}>
                            <div style={{ color: 'red' }}>
                                Cancel Order
                            </div>
                            <div className={'cancelled'}>
                                X
                            </div>
                        </div>
                        :
                        <div className={'order-card-row-1'}>
                            <div>
                                <span style={{ color: 'grey' }}>Order ID:</span>
                                <span style={{ marginLeft: '3px', fontSize: '14px' }}>{items.orderId}</span>
                            </div>
                            <div>
                                {(items.status).toUpperCase()}
                            </div>
                        </div>
                } */}

                {/* cancel order */}

                <div className={'order-card-row-1'}>
                    {
                        items.paymentStatus === 'pending' ?
                            <div>
                                <span style={{ color: 'grey' }}>Admin Status</span>
                            </div>
                            :
                            deliveryConfirm &&
                                deliveryConfirm.indexOf(items.orderId) !== -1 ?
                                // items.status === 'pending' ?
                                <div>
                                    {/* <span style={{ color: 'grey' }}>Order ID:</span>
                                <span style={{ marginLeft: '3px', fontSize: '14px' }}>{items.orderId}</span> */}
                                    <span style={{ color: 'grey' }}>Order Recieved Status</span>
                                </div>
                                :
                                <div>
                                    {/* <span style={{ color: 'grey' }}>Order ID:</span>
                                <span style={{ marginLeft: '3px', fontSize: '14px' }}>{items.orderId}</span> */}
                                    <span style={{ color: 'grey' }}>Seller Status</span>
                                </div>

                    }
                    {
                        items.paymentStatus === 'pending' ?
                            <div>
                                {(items.paymentStatus).toUpperCase()}
                            </div>
                            :
                            <div>
                                {
                                    deliveryConfirm &&
                                        deliveryConfirm.indexOf(items.orderId) !== -1 &&
                                        items.status === 'pending' ?
                                        <Button variant={'outlined'} onClick={() => this.confirmDelivery(items)} style={{ color: 'green' }}>
                                            Confirm
                                    </Button>
                                        :
                                        (items.status).toUpperCase()
                                }
                            </div>
                    }
                </div>
                <div>
                    <hr />
                </div>
                <div>
                    <img src={Image} />
                    {/* <img src={Image} /> */}
                </div>
                <div className={'ordered-details'}>
                    <div>
                        {items.name}
                    </div>
                    <div>
                        <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '5px' }} />{items.address}
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div>
                        <span onClick={() => this.getDetails(items)}>
                            View Details
                        </span>
                        {/* {
                            deliveryConfirm &&
                            deliveryConfirm.indexOf(items.orderId) !== -1 &&
                            items.status === 'pending' &&
                            <span onClick={() => this.confirmDelivery(items)} style={{ color: 'grey' }}>
                                Confirm
                            </span>
                        } */}
                    </div>
                </div>
            </div>
        )
    }

    addStatus(value, items) {
        console.log(value, 'valueeerrr')
        if (value === 'delivered') {
            const { Order, currentUserUID } = this.props
            Order(items, currentUserUID)
        }
    }

    pageNum(num) {
        const { products, number } = this.state;
        const pageArr = products.slice(num * number, num * number + number)
        this.setState({ perPageArr: pageArr })
    }

    tableRow(items) {
        return (
            <Table.Row>
                <Table.Cell className={'table-name'}>{items && items.name.toUpperCase()}</Table.Cell>
                <Table.Cell>{items && items.address.toUpperCase()}</Table.Cell>
                <Table.Cell>{items && items.contactNo}</Table.Cell>
                {
                    items &&
                        items.product &&
                        items.product.length &&
                        items.product[0].status &&
                        items.product[0].status === 'pending' ?
                        <Table.Cell>
                            <select onChange={(e) => this.addStatus(e.target.value, items)} className={'select-options'}>
                                <option value={'pending'}>Pending</option>
                                <option value={'delivered'}>Delivered</option>
                            </select>
                        </Table.Cell>
                        :
                        <Table.Cell style={{ color: 'green' }}>
                            {
                                items.product &&
                                items.product.length &&

                                items.product[0].status &&
                                items.product[0].status === 'delivered' &&
                                'Delivered'
                            }
                        </Table.Cell>
                }
                {
                    items && items.status &&
                        items.status === 'pending' ?
                        <Table.Cell>
                            {'Pending'}
                        </Table.Cell>
                        :
                        <Table.Cell style={{ color: 'green' }}>
                            <FontAwesomeIcon style={{ marginRight: '3px' }} icon={'check-circle'} color={'green'} />
                            {'Recieved'}
                        </Table.Cell>
                }
                <Table.Cell>
                    <Button
                        size={"small"}
                        color={"primary"}
                        variant={"outlined"}
                        onClick={() => this.orderDetails(items)}
                    >
                        Details
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const { myOrders, emptyOrder, sellerOrder, emptySellerOrder, role, pages, perPageArr, number } = this.state
        console.log(perPageArr, 'perPageArr')
        return (
            <Containers>
                <div className={'vendor-products'}>
                    <div>
                        Orders
                    </div>
                    <hr />
                    {
                        role === 'buyer' &&
                        <div className={'mainDiv'}>
                            {
                                emptyOrder ?
                                    <div style={{ color: 'grey', fontSize: '20px', padding: '2em' }}>
                                        You have no orders yet.
                                </div>
                                    :
                                    myOrders ?
                                        myOrders.map((items, index) => {
                                            return (
                                                this.orderCard(items, index)
                                            )
                                        })
                                        :
                                        <div className={'loader'}>
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={120}
                                                color={'#f27b01'}
                                                loading={true}
                                            />
                                        </div>
                            }
                        </div>
                    }
                    {
                        role === 'seller' &&
                        <div className={'mainDiv'}>
                            {
                                emptySellerOrder ?
                                    <div style={{ color: 'grey', fontSize: '20px', padding: '2em' }}>
                                        You have no orders yet.
                                </div>
                                    :
                                    sellerOrder ?
                                        <Table celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                                    <Table.HeaderCell>Address</Table.HeaderCell>
                                                    <Table.HeaderCell>Contact No</Table.HeaderCell>
                                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                                    <Table.HeaderCell>Order Recieved</Table.HeaderCell>
                                                    <Table.HeaderCell>Details</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {
                                                    perPageArr &&
                                                        perPageArr.length ?
                                                        perPageArr.map(items => {
                                                            // items.paymentStatus === "confirmed" &&
                                                            return (
                                                                this.tableRow(items)
                                                            )
                                                        })
                                                        :
                                                        null
                                                }
                                            </Table.Body>

                                            <Table.Footer className={'centerAlign'}>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan={'5'}>
                                                        {
                                                            sellerOrder &&
                                                                perPageArr.length ?
                                                                sellerOrder.length > 10 &&
                                                                <Pagination pages={pages} pageNum={this.pageNum} />
                                                                :
                                                                null
                                                        }
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table>
                                        :
                                        <div className={'loader'}>
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={120}
                                                color={'#f27b01'}
                                                loading={true}
                                            />
                                        </div>
                            }
                        </div>
                    }
                </div>
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        myCart: states.cartReducer.CART,
        allProducts: states.productReducer.ALLPRODUCTS,
        deleteCart: states.cartReducer.DELETECART,
        counter: states.cartReducer.COUNTER,
        modified: states.cartReducer.MODIFIED,
        changes: states.cartReducer.CHANGES,
        flag: states.cartReducer.FLAG,
        order: states.orderReducer.ORDERS,
        sellerOrder: states.orderReducer.SELLERORDER,
        emptyOrder: states.orderReducer.EMPTYORDER,
        emptySellerOrder: states.orderReducer.EMPTYSELLERORDER,
        currentUser: states.authReducer.CURRENTUSER,
        modifiedOrder: states.orderReducer.MODIFIEDORDER,
        deliveryConfirm: states.orderReducer.CONFIRMDELIVERY,
        currentUserUID: states.authReducer.CURRENTUSERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        Order: (user, currentUserUID) => {
            dispatch(DeliveryStatus(user, currentUserUID));
        },
        actions: bindActionCreators({
            confirmStatus, deleteOrder
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);