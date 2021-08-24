import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Containers from '../../Container/container/container';
import History from '../../History/History'
// import { Badge } from 'reactstrap'
import Swal from 'sweetalert2'
import Image from '../../Assets/images/product.png'
import './checkout.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox } from '@material-ui/core'
import { ClipLoader } from 'react-spinners';
import { ProductCart } from '../../store/action/cartAction'
import { productCheckout, updateEmail } from '../../store/action/orderAction'
import Loader from 'react-loader-spinner'
import { prototype } from 'react-image-crop';

library.add(faTrashAlt, faHeart, faMapMarkerAlt)

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return ('_' + Math.random().toString(36).substr(2, 5)).toUpperCase();
    };


    componentWillMount() {
        const { location, currentUser } = this.props
        if (location.state) {
            var total = 0
            console.log(location.state, 'props here')
            console.log(currentUser, 'currentUser here')
            this.setState({ cart: location.state.checkout }, () => {
                this.state.cart.map(items => {
                    total += items.quantity
                    this.setState({ totalQuantity: total })
                })
            })

        } else {
            console.log('state not available')
            History.push('/cart')
        }
        if (currentUser) {
            console.log(currentUser, 'current user')
            this.setState({
                userData: currentUser,
            })
        }
    }

    componentWillReceiveProps(props) {
        const { currentUser } = props
        if (currentUser) {
            console.log(currentUser, 'current user')
            this.setState({
                userData: currentUser,
            })
        }

    }

    placeOrder() {
        const { cart, totalQuantity } = this.state
        const { subtotal, shipment } = this.props.location.state
        const { productCheckout } = this.props.actions
        const { flag, userUID, currentUser } = this.props
        const data = []
        cart.map(items => {
            data.push({
                productKey: items.productKey,
                quantity: items.quantity,
                buyerId: items.buyerId,
                sellerId: items.sellerId,
                status: 'pending'
            })
        })

        console.log(data, 'prdouct keyey')

        if (currentUser.address) {
            const obj = {
                orderId: this.ID(),
                orderTime: new Date(Date.now()).toLocaleTimeString(),
                orderDate: new Date(Date.now()).toLocaleDateString(),
                product: data,
                buyerId: userUID,
                sellerId: cart[0].sellerId,
                totalQuantity,
                contactNo: currentUser.phoneNoCode + '-' + currentUser.phoneNo,
                name: currentUser.firstName + ' ' + currentUser.lastName,
                address: currentUser.address,
                subtotal: shipment ? subtotal + shipment : subtotal,
                status: 'pending'
            }

            console.log(obj, 'object here')
            History.push({
                pathname: '/payments',
                state: obj
            })

        } else {
            const toast = Swal.mixin({
                toast: true,
                position: 'bottom-center',
                showConfirmButton: false,
                timer: 2000
            });

            toast({
                type: 'error',
                title: 'Enter your delivery address'
            })
        }
    }

    async editEmail() {
        const { value: email } = await Swal({
            title: 'Input email address',
            input: 'email',
            confirmButtonColor: 'rgb(241, 123, 1)',
            inputPlaceholder: 'Enter your email address'
        })

        if (email) {
            const { updateEmail } = this.props.actions
            const { userUID } = this.props
            updateEmail('contactEmail', email, userUID)
        }
    }

    async editAddress() {
        const { value: address } = await Swal({
            title: 'Input Address',
            input: 'text',
            confirmButtonColor: 'rgb(241, 123, 1)',
            inputPlaceholder: 'Enter your Address'
        })

        if (address) {
            const { updateEmail } = this.props.actions
            const { userUID } = this.props
            updateEmail('address', address, userUID)
        }
    }


    productCart(items, index) {
        const { loader, indexNum } = this.state
        const product = items.product
        return (
            <div className={'checkout-body cart_load'}>
                <div>
                    {
                        product.images &&
                            product.images[0] &&
                            product.images[0].image ?
                            <img src={product.images[0].image} width={'130px'} />
                            :
                            <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} width={'130px'} />
                    }
                </div>
                <div className={'pro-name'}>
                    <div>
                        {product.name}
                    </div>
                    <div>
                        {product.brand}
                    </div>
                    <div>
                        <span><FontAwesomeIcon icon={'trash-alt'} /></span>
                    </div>
                </div>
                <div className={'product-pricing'}>
                    <div>
                        {
                            product.discount &&
                            `$ ${product.price - product.discount}`
                        }
                        {
                            product.price && !product.discount &&
                            `$ ${product.price}`
                        }
                    </div>
                    <div>
                        {
                            product.discount &&
                            `$ ${product.price}`
                        }
                    </div>
                    <div>
                        {
                            product.discount &&
                            `- ${Math.floor((product.discount / product.price) * 100)}%`
                        }
                    </div>
                </div>
                <div className={'checkout-quantity'}>
                    <div>
                        <span>Qty:</span>
                        <span>{items.quantity}</span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { cart, totalQuantity, userData } = this.state;
        const { location } = this.props
        // console.log(arr2, 'array 2 here')
        console.log(cart, 'this is state')
        return (
            <Containers>
                <div className={'vendor-products'}>
                    <div>
                        CHECKOUT
                    </div>
                    <hr />
                    <div className={'products-checkout'}>
                        <div className={'checkout-details'}>
                            <div className={'checkout-header'}>
                                <div>
                                    {totalQuantity} ITEMS
                                </div>
                                <div>
                                    PRICE
                                </div>
                                <div>
                                    QUANTITY
                                </div>
                            </div>
                            <div>
                                <hr />
                            </div>

                            {
                                cart &&
                                    cart.length > 0 ?
                                    cart.map((items, index) => {
                                        return (
                                            this.productCart(items, index)
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
                        <div className={'delivery-checkout'}>
                            <div className={'location-checkout'}>
                                <div>
                                </div>
                                <div>
                                    Shipping & Billing
                                </div>
                                <div className={'shipping'}>
                                    {/* <div>
                                        Ship to
                                    </div> */}
                                    {/* <div onClick={() => this.updateAll()} className={'edit-style'} style={{ color: 'rgb(37, 165, 216)', fontSize: '16px' }}>
                                        Edit
                                    </div> */}
                                    <div>
                                        <span>Ship to: </span>
                                        <span style={{ color: 'black', fontSize: '15px' }}>
                                            {
                                                userData &&
                                                `${userData.firstName} ${userData.lastName}`
                                            }
                                        </span>
                                    </div>
                                </div>
                                {/* <div className={'shipping'}>
                                    <div>
                                        {
                                            userData &&
                                            `${userData.firstName} ${userData.lastName}`
                                        }
                                    </div>
                                </div> */}

                                <div className={'shipping'}>
                                    <div>
                                        {
                                            userData &&
                                                userData.address ?
                                                userData.address
                                                :
                                                'Address Not Available'
                                        }
                                    </div>
                                    <div onClick={() => this.editAddress()} className={'edit-style'} style={{ color: 'rgb(37, 165, 216)', fontSize: '16px' }}>
                                        Edit
                                    </div>
                                </div>
                                <div className={'shipping'}>
                                    <div>
                                        <span>Email: </span>
                                        <span style={{ color: 'black', fontSize: '15px' }}>
                                            {
                                                userData &&
                                                userData.contactEmail
                                            }
                                        </span>
                                    </div>
                                    {/* <div onClick={() => this.editEmail()} className={'edit-style'} style={{ color: 'rgb(37, 165, 216)', fontSize: '16px' }}>
                                        Edit
                                    </div> */}
                                </div>
                            </div>
                            <div className={'location-checkout'}>
                                <div>
                                    <hr />
                                </div>
                                <div>
                                    Order Summary
                                </div>
                                <div className={'pricing'}>
                                    <div>
                                        Subtotal ({totalQuantity} items)
                                    </div>
                                    <div>
                                        $ {
                                            location.state &&
                                            location.state.subtotal
                                        }
                                    </div>
                                </div>
                                <div className={'pricing'}>
                                    <div>
                                        {'Shipping Fee'}
                                    </div>
                                    <div>
                                        $ {
                                            location.state &&
                                            location.state.shipment
                                        }
                                    </div>
                                </div>
                                <div className={'pricing'}>
                                    <div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                                        Total
                                    </div>
                                    <div style={{ color: 'rgb(241, 123, 1)' }}>
                                        $ {
                                            location.state &&
                                                location.state.shipment ?
                                                location.state.subtotal + location.state.shipment
                                                :
                                                location.state.subtotal
                                        }
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        variant={'contained'}
                                        className={'checkout-btn'}
                                        onClick={() => this.placeOrder()}
                                    >
                                        PLACE ORDER
                                    </Button>
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
        products: states.productReducer.ALLPRODUCTS,
        currentUser: states.authReducer.CURRENTUSER,
        flag: states.cartReducer.FLAG,
        userUID: states.authReducer.CURRENTUSERUID,
        // myCart: states.cartReducer.CART,
        // deleteCart: states.cartReducer.DELETECART,
        // counter: states.cartReducer.COUNTER,
        // modified: states.cartReducer.MODIFIED,
        // changes: states.cartReducer.CHANGES,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            ProductCart, updateEmail
        }, dispatch)
    }
    // return ({
    //     addCart: (obj) => {
    //         dispatch(ProductCart(obj));
    //     },
    //     removeCart: (obj) => {
    //         dispatch(RemoveQuantity(obj));
    //     },
    //     deleteProduct: (obj) => {
    //         dispatch(DeleteCart(obj));
    //     }
    // })
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);