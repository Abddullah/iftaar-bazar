import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Containers from '../../Container/container/container';
import History from '../../History/History'
// import { Badge } from 'reactstrap'
import Image from '../../Assets/images/product.png'
import './cart.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2'
import { TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox, Radio } from '@material-ui/core'
import { updateEmail } from '../../store/action/orderAction'
import { ClipLoader } from 'react-spinners';
import { AddToBasket, placeOrder } from '../../store/action/productAction'
// import { ProductCart, RemoveQuantity, DeleteCart } from '../../store/action/cartAction'
import Loader from 'react-loader-spinner'
import { prototype } from 'react-image-crop';


library.add(faTrashAlt, faHeart, faMapMarkerAlt)

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            quantity: [],
            carts: [],
            selectedCarts: [],
            allChecked: false,
            selectAll: false,
            oneCheck: false,
            cartQuantity: [],
            indexNum: null,
            count: 0,
            emptyCart: null,
            selectedCartsIndex: [],
            myCart: null,
            flag: false,

            number: '',
            nameBorder: false,
            numberBorder: false,
            areaBorder: false,
            addressBorder: false,

        }
    }

    componentWillMount() {
        const { getBasket, emptyBasket } = this.props
        const { state } = this.props.location
        if (getBasket && getBasket.length) {
            var count = 0
            var price = 0
            getBasket.map((items) => {
                count += items.price * items.quantity
            })
            this.setState({ carts: getBasket, totalPrice: count })
        }

        if (state) {
            const { carts } = this.state
            console.log(state, 'state here')
            var price = state.price * state.quantity
            carts.push(state)
            this.setState({ totalPrice: price, carts })
        }

        if (emptyBasket) {
            this.setState({ emptyCart: true })
        }
    }

    componentWillReceiveProps(props) {
        const { getBasket, cartFlag, emptyBasket } = props
        const { state } = props.location
        if (getBasket && getBasket.length || cartFlag || !cartFlag) {
            var count = 0
            var price = 0
            getBasket.map((items) => {
                count += items.price * items.quantity
            })
            this.setState({ carts: getBasket, totalPrice: count })
        }

        if (state) {
            const { carts } = this.state
            console.log(state, 'state here')
            var price = state.price * state.quantity
            this.setState({ totalPrice: price, carts: [state] })
        }

        if (emptyBasket) {
            this.setState({ emptyCart: true })
        }
    }

    deleteProduct(index) {
        const { carts } = this.state
        const { AddToBasket } = this.props.actions
        const { state } = this.props.location

        if (!state) {
            if (carts && carts.length) {
                carts.splice(index, 1)
                this.setState({ carts }, () => {
                    AddToBasket(this.state.carts, this.state.flag).then((flag) => {
                        this.setState({ flag })
                    })
                })
            }
        } else {
            History.push('/')
        }
    }

    productCart(items, index) {
        const { loader, indexNum, btnDisabled } = this.state
        const cartData = items
        return (
            <div className={'detail-body cart_load'}>
                <div>
                    {
                        cartData && cartData.image ?
                            <img src={cartData.image} width={'130px'} />
                            :
                            <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} width={'100px'} />
                    }
                </div>
                <div className={'pro-name'}>
                    <div className={'getDetails'} onClick={() => this.details(items)}>
                        {`${(cartData.name).slice(0, 28)}...`}
                    </div>
                    <div>
                        {/* <span><FontAwesomeIcon icon={'heart'} /></span> */}
                        <span onClick={() => this.deleteProduct(index)}><FontAwesomeIcon icon={'trash-alt'} /></span>
                    </div>
                </div>
                <div className={'product-pricing'}>
                    {/* <div>
                        {
                            cartData.discount &&
                            `$ ${cartData.price - cartData.discount}`
                        }
                        {
                            cartData.price && !cartData.discount &&
                            `$ ${cartData.price}`
                        }
                    </div> */}
                    <div>
                        {
                            cartData.price &&
                            `Rs ${cartData.price}`
                        }
                    </div>
                    {/* <div>
                        {
                            cartData.discount &&
                            `- ${Math.floor((cartData.discount / cartData.price) * 100)}%`
                        }
                    </div> */}
                </div>
                <div className={'cart-quantity'}>
                    {
                        items.quantity > 1 ?
                            <button disabled={btnDisabled} className={'btnStyle'} onClick={() => this.removeQuantity(index)}>-</button>
                            :
                            <button disabled className={'btnStyleDisabled'}>-</button>
                    }
                    <span style={{ color: 'grey' }}>
                        {
                            items.quantity
                        }
                    </span>
                    {
                        items.quantity < 5 ?
                            <button disabled={btnDisabled} className={'btnStyle'} onClick={() => this.addQuantity(index)}>+</button>
                            :
                            <button disabled className={'btnStyleDisabled'}>+</button>
                    }
                </div>
                {
                    loader && index === indexNum &&
                    <div className={'loader cart_loader'}>
                        <Loader
                            type="ThreeDots"
                            color="#f27b01"
                            height="50"
                            width="50"
                        />
                    </div>
                }
            </div>
        )
    }


    // async editAddress() {
    //     const { value: address } = await Swal({
    //         title: 'Input Address',
    //         input: 'text',
    //         confirmButtonColor: '#3f984f',
    //         inputPlaceholder: 'Enter your Address'
    //     })

    //     if (address) {
    //         this.setState({ address })
    //     }
    // }


    // async editDetails() {
    //     const { value: formValues } = await Swal.fire({
    //         title: 'Personal Information',
    //         html:
    //             '<input id="swal-input1" placeholder="Name" class="swal2-input">' +
    //             '<input id="swal-input2" placeholder="Phone Number" class="swal2-input">' +
    //             `<select id="swal-input3" class="swal2-input">
    //           <option value="">Select Area</option>
    //           <option value="Bahadurabad">Bahadurabad</option>
    //           <option value="Gulshan">Gulshan</option>
    //           <option value="Saddar">Saddar</option>
    //           </select>`,
    //         //   '<input id="swal-input3" placeholder="Phone Number" class="swal2-input">',
    //         focusConfirm: false,
    //         preConfirm: () => {
    //             return [
    //                 document.getElementById('swal-input1').value,
    //                 document.getElementById('swal-input2').value,
    //                 document.getElementById('swal-input3').value,
    //             ]
    //         }

    //     })

    //     if (formValues) {
    //         const name = formValues[0]
    //         const number = formValues[1]
    //         const area = formValues[2]

    //         this.setState({ name, number, area })
    //     }

    // }


    removeQuantity(index) {
        const { carts } = this.state
        const { AddToBasket } = this.props.actions
        const { state } = this.props.location

        if (!state) {
            if (carts[index].quantity > 1) {
                carts[index].quantity = carts[index].quantity - 1
                carts[index].totalprice = carts[index].price * carts[index].quantity

                this.setState({ carts }, () => {
                    AddToBasket(this.state.carts, this.state.flag).then((flag) => {
                        this.setState({ flag })
                    })
                })
            }
        } else {
            if (carts[index].quantity > 1) {
                carts[index].quantity = carts[index].quantity - 1
                carts[index].totalprice = carts[index].price * carts[index].quantity

                this.setState({ carts, totalPrice: carts[index].totalprice })
            }
        }
    }

    addQuantity(index) {
        const { carts } = this.state
        const { AddToBasket } = this.props.actions
        const { state } = this.props.location

        console.log(index, 'index here')

        if (!state) {
            if (carts && carts.length) {
                carts[index].quantity = carts[index].quantity + 1
                carts[index].totalprice = carts[index].price * carts[index].quantity
                this.setState({ carts }, () => {
                    AddToBasket(this.state.carts, this.state.flag).then((flag) => {
                        this.setState({ flag })
                    })
                })
            }
        } else {
            if (carts && carts.length) {
                carts[index].quantity = carts[index].quantity + 1
                carts[index].totalprice = carts[index].price * carts[index].quantity

                this.setState({ carts, totalPrice: carts[index].totalprice })
            }
        }
    }

    checkOut() {
        const { carts, address, name, number, area, flag } = this.state
        const { state } = this.props.location
        var buy = false
        if (state) {
            buy = true
        }
        if (carts && address && name && number && area) {
            const { placeOrder } = this.props.actions
            const obj = {
                products: carts,
                address,
                name,
                number,
                area
            }
            placeOrder(obj, flag, buy).then(() => {
                Swal({
                    type: 'success',
                    title: 'Success',
                    text: 'Successfully order placed',
                    timer: 2000
                })
                setTimeout(() => {
                    History.push('/')
                }, 2000);
            })
        }
        else {
            if (!name) {
                this.setState({ nameBorder: true })
            }
            if (!address) {
                this.setState({ addressBorder: true })
            }
            if (!number) {
                this.setState({ numberBorder: true })
            }
            if (!area) {
                this.setState({ areaBorder: true })
            }
        }
    }

    handleChange(value, name) {
        if(name === "number"){
            if(value.length === 1 && value.slice(0, 1) === "0"){
                console.log("value.slice(0, 1)", value.slice(0))
                this.setState({
                    [name]: value
                })
            }
            else if(value.length === 2 && value.slice(0, 2) === "03"){
                console.log("value.slice(0, 2)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.slice(0, 2) === "03" && value.length > 2 && value.length < 12){
                console.log("value.slice(0, 2)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.length === 1 && value.slice(0, 1) === "+"){
                console.log("value.slice(0, 1)**", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.length === 2 && value.slice(0, 2) === "+9"){
                console.log("value.slice(0, 2)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.length === 3 && value.slice(0, 3) === "+92"){
                console.log("value.slice(0, 3)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.length === 4 && value.slice(0, 4) === "+923"){
                console.log("value.slice(0, 3)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(value.slice(0, 4) === "+923" && value.length > 4  && value.length < 14){
                console.log("value.slice(0, 3)", value.slice(0))                
                this.setState({
                    [name]: value
                })
            }
            else if(!value){
                this.setState({
                    [name]: ""
                })
            }
        }
        else{
            console.log("Else***", value.slice(0))
            this.setState({
                [name]: value
            })
        }
        if (name === "name") {
            if (!value) {
                this.setState({ nameBorder: true })
            }
            else {
                this.setState({ nameBorder: false })
            }
        }
        if (name === "address") {
            if (!value) {
                this.setState({ addressBorder: true })
            }
            else {
                this.setState({ addressBorder: false })
            }
        }
        if (name === "number") {
            if (!value) {
                this.setState({ numberBorder: true })
            }
            else if(value && value.length > 10) {
                this.setState({ numberBorder: false })
            }
            // else {
            //     this.setState({ numberBorder: false })
            // }
        }
        if (name === "area") {
            if (!value) {
                this.setState({ areaBorder: true })
            }
            else {
                this.setState({ areaBorder: false })
            }
        }
    }


    render() {
        const { cart, selectedCarts, name, number, area, totalPrice, address, emptyCart,
            currentUser, carts, shipment, nameBorder, addressBorder, areaBorder, numberBorder } = this.state;
        return (
            <Containers>
                <div className={'vendor-products'}>
                    <div>
                        My Basket
                    </div>
                    <hr />
                    <div className={'products-cart'}>
                        <div className={'cart-details'}>
                            <div className={'details-header'}>

                                <div>
                                    PRODUCT
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
                                emptyCart ?
                                    <div className={'loader empty_cart'}>
                                        There are no items in this cart
                                    </div>
                                    :
                                    carts ?
                                        carts.map((items, index) => {
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
                        <div className={'delivery-details'}>
                            <div>
                                Delivery details
                            </div>
                            <div className={'location-detail'}>
                                <div className={'delivery-address'}>
                                    <div style={{ width: '100%' }}>
                                        <div class="form-group">
                                            <input
                                                // className={nameBorder ? "borderStyle" : "borderFlash"}
                                                style={{ border: nameBorder ? '2px solid red' : '1px solid black' }}
                                                type="text" onChange={(e) => this.handleChange(e.target.value, 'name')} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                                            {
                                                nameBorder ?
                                                    <small class="form-text text-muted errorStyle">Please fill your name first</small>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-group">
                                            {/* <label for="exampleInputEmail1">Home address</label> */}
                                            <input
                                                // className={addressBorder ? "borderStyle" : "borderFlash"}
                                                style={{ border: addressBorder ? '2px solid red' : '1px solid black' }}
                                                type="text" onChange={(e) => this.handleChange(e.target.value, 'address')} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address" />
                                            {
                                                addressBorder ?
                                                    <small class="form-text text-muted errorStyle">Please fill your address first</small>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-group">
                                            <input
                                                // className={numberBorder ? "borderStyle" : "borderFlash"}
                                                value={number}
                                                style={{ border: numberBorder ? '2px solid red' : '1px solid black' }}
                                                // type="number"
                                                class="form-control" onChange={(e) => this.handleChange(e.target.value, 'number')} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" />
                                            {
                                                numberBorder ?
                                                    <small class="form-text text-muted errorStyle">Please fill your number first</small>
                                                    :
                                                    <small class="form-text text-muted">We'll never share your number with anyone else.</small>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <select
                                            // className={areaBorder ? "borderStyle" : "borderFlash"}
                                            style={{ width: '100%', border: areaBorder ? '2px solid red' : '1px solid black' }}
                                            onChange={(e) => this.handleChange(e.target.value, 'area')} class="custom-select">
                                            <option value={''} selected>Select Your Area</option>
                                            <option value="Bahadurabad">Bahadurabad</option>
                                            <option value="Gulshan">Gulshan</option>
                                            <option value="Sadar">Sadar</option>
                                        </select>
                                        {
                                            areaBorder ?
                                                <small class="form-text text-muted errorStyle">Please select your area first</small>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <div>
                                    <hr />
                                </div>
                                <div>
                                    Order Summary
                                </div>
                                <div className={'pricing'}>
                                    <div>
                                        Subtotal ({carts.length} items)
                                    </div>
                                    <div>
                                        Rs {totalPrice ? totalPrice : 0}
                                    </div>
                                </div>
                                <div className={'pricing'}>
                                    {/* <div>
                                        Shipping Fee
                                    </div>
                                    <div>
                                        Rs {shipment ? shipment : 0}
                                    </div> */}
                                </div>
                                <div className={'pricing'}>
                                    <div style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                                        Total
                                    </div>
                                    <div style={{ color: 'rgb(241, 123, 1)' }}>
                                        Rs {totalPrice ? totalPrice : 0}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        variant={'contained'}
                                        className={'checkout-btn'}
                                        onClick={() => this.checkOut()}
                                    >
                                        {'Buy Order'}
                                    </Button>
                                    {/* {
                                        address ?
                                            name && number && area ?
                                            <Button
                                                variant={'contained'}
                                                className={'checkout-btn'}
                                                onClick={() => this.checkOut()}
                                            >
                                                {'Buy Order'}
                                            </Button>
                                            :
                                            <Button
                                                variant={'contained'}
                                                disabled={true}
                                            >
                                                {'Buy Order'}
                                            </Button>
                                            :
                                            <Button
                                                variant={'contained'}
                                                disabled={true}
                                            >
                                                {'Buy Order'}
                                            </Button>
                                    } */}
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
        myCart: states.cartReducer.CART,
        deleteCart: states.cartReducer.DELETECART,
        counter: states.cartReducer.COUNTER,
        modified: states.cartReducer.MODIFIED,
        flag: states.cartReducer.FLAG,
        currentUser: states.authReducer.CURRENTUSER,
        changes: states.cartReducer.CHANGES,
        emptyCart: states.cartReducer.EMPTYCART,
        userUID: states.authReducer.CURRENTUSERUID,
        getBasket: states.productReducer.GETCART,
        cartFlag: states.productReducer.CARTFLAG,
        emptyBasket: states.productReducer.EMPTYBASKET,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            AddToBasket,
            //  RemoveQuantity, DeleteCart,
            placeOrder
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);