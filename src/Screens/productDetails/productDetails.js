import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Containers from '../../Container/container/container';
import History from '../../History/History'
import './productDetails.css'
import Loader from 'react-loader-spinner'
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import StarIcon from '../../Assets/images/star.png'
import { Divider, IconButton, Button } from '@material-ui/core'
import { Favorite, CloudDownload } from '@material-ui/icons'
import ReactImageMagnify from 'react-image-magnify';
import { Badge } from 'reactstrap'
import { ProductCart } from '../../store/action/cartAction';

import MessageTemplate from '../../Component/ChatBox/Message';
import ChatBox from '../../Component/ChatBox/ChatBox';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DownloadLink from "react-download-link";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit)



class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 1,
            specs: []
        }
    }

    componentWillMount() {
        console.log(this.props.products, 'action wala products')
        const { products, currentUser, currentUserUID, allUsers } = this.props;
        if (products) {
            products.map(items => {
                if (items.key === this.props.match.params.id) {
                    const arr = items.data.summarySpecs.split(',')
                    this.setState({ product: items, specs: arr, currentUser, currentUserUID })
                    console.log('FurrentUser here*******', currentUser)

                    if (allUsers) {
                        allUsers.map((users) => {
                            if (users.data.userUid === items.data.userUid) {
                                this.setState({ sellerData: users.data })
                            }
                        })
                    }

                }
            })
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.match.params.id, 'id here')
        const { products, currentUser, currentUserUID, allUsers } = props;
        if (products) {
            setTimeout(() => {
                products.map(items => {
                    // console.log(items, 'prospjkb products here')
                    if (items.key === props.match.params.id) {
                        const arr = items.data.summarySpecs.split(',')
                        // console.log(arr, 'array')
                        this.setState({ product: items, specs: arr, currentUser, currentUserUID })
                        console.log('FurrentUser here*******', currentUser)

                        if (allUsers) {
                            allUsers.map((users) => {
                                if (users.data.userUid === items.data.userUid) {
                                    this.setState({ sellerData: users.data })
                                }
                            })
                        }

                    }
                })
            }, 1000);
        }
    }


    image1(imageUrl) {
        this.setState({ image: imageUrl })
    }

    downloadPdf(productId) {
        // console.log(productId, 'product ID here')
    }

    addToCart(product) {
        // console.log(product, 'prdoaisdhoiuah')
        // var quantityCount = 0
        const { addCart, user, myCart } = this.props
        const { counter } = this.state
        this.setState({ loader: true })
        // console.log(counter,'counter here')
        const obj = {
            quantity: counter,
            productKey: product.key,
            buyerId: user,
            sellerId: product.data.userUid
        }

        if (myCart && myCart.length) {
            var found = myCart.some((el) => {
                return el.productKey === product.key;
            });
            if (!found) {
                var arr = [...myCart, obj]
                this.props.actions.ProductCart(arr, user)
                    .then(() => {
                        this.setState({ loader: false })
                    })
            } else {
                Swal({
                    type: 'warning',
                    text: 'Already in your cart',
                })
                this.setState({ loader: false })
            }
        }
        else {
            var arr = [obj]
            // this.props.actions.ProductCart(obj)

            this.props.actions.ProductCart(arr, user)
                .then(() => {
                    this.setState({ loader: false })
                })
        }

    }

    ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return ('_' + Math.random().toString(36).substr(2, 5)).toUpperCase();
    };

    buyProduct() {
        const cart = []
        const { product, counter } = this.state
        const { user, currentUser } = this.props
        const subtotal = product.data.discount ?
            (product.data.price - product.data.discount) * counter
            :
            product.data.price * counter
        console.log(product, 'produ')
        cart.push(product.data)
        console.log(cart, 'cart here')
        const obj = {
            checkout: [{
                product: product.data,
                quantity: counter,
                productKey: product.key,
                buyerId: user,
                sellerId: product.data.userUid
            }],
            subtotal: subtotal
        }

        console.log(obj, 'object')

        History.push({
            pathname: '/checkout',
            state: obj
        })
    }

    loginPage() {
        History.push('/login')
    }

    render() {
        const { product, image, counter, specs, currentUser, currentUserUID, loader, sellerData } = this.state
        console.log(product, 'data here')
        return (
            <Containers>
                <div className={'vendor-products cart_load'}>
                    <div>
                        PRODUCT DETAILS
                    </div>
                    <hr />
                    {
                        product ?
                            <div className={'details-product'}>
                                <div className={'product_images'}>
                                    <div>
                                        {
                                            product && product.data && product.data.images.length ?
                                                <ReactImageMagnify className={'zoom-image'} {...{
                                                    smallImage: {
                                                        alt: 'Product',
                                                        isFluidWidth: true,
                                                        src: image ? image : product.data.images[0].image,
                                                    },
                                                    largeImage: {
                                                        src: image ? image : product.data.images[0].image,
                                                        width: 1200,
                                                        height: 1800
                                                    }
                                                }} />
                                                :
                                                <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                                        }
                                    </div>
                                    {
                                        product && product.data && product.data.images.length ?
                                            <div>
                                                <img onClick={() => this.image1(product.data.images[0].image)} src={product && product.data.images[0].image} />
                                                {
                                                    product.data.images[1] &&
                                                    <img onClick={() => this.image1(product.data.images[1].image)} src={product.data.images[1] && product.data.images[1].image} />
                                                }
                                                {
                                                    product.data.images[2] &&
                                                    <img onClick={() => this.image1(product.data.images[2].image)} src={product.data.images[2] && product.data.images[2].image} />
                                                }
                                            </div>
                                            :
                                            <div>
                                                <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                                            </div>
                                    }
                                </div>
                                <div className={'product_name'}>
                                    <div>
                                        {product && product.data.name}
                                        <span className={'badge'}>
                                            {
                                                product &&
                                                    product.data.product === 'New' ?
                                                    <Badge color="primary">New</Badge>
                                                    :
                                                    <Badge color="default">Used</Badge>
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'grey' }}>Date: </span>
                                        <span className={'product-date'}>{product && product.data.date}</span>
                                        <span className={'favourite-Icon'}>
                                            {
                                                currentUser && currentUser.role === "seller" && product.data.userUid === currentUserUID &&
                                                <IconButton tooltip={'Edit Product'} className={"Edit-Btn"} onClick={() => History.push('/editproduct/' + product.key)}>
                                                    <FontAwesomeIcon icon='edit' />
                                                </IconButton>
                                            }
                                            {
                                                product && product.data && product.data.pdf ?
                                                    <a href={product.data.pdf} target={'_blank'} download>
                                                        <IconButton tooltip={'Download PDF For Detailed Specs'} >
                                                            <CloudDownload />
                                                        </IconButton>
                                                    </a>
                                                    :
                                                    null
                                            }
                                            {/* {
                                                currentUser && currentUser.role !== "seller" &&
                                                <IconButton>
                                                    <Favorite />
                                                </IconButton>
                                            } */}
                                        </span>
                                    </div>
                                    <div>
                                        Name:
                                        <span style={{ paddingRight: '7px' }}>{sellerData ? `${sellerData.firstName} ${sellerData.lastName}` : '...'}</span>
                                    </div>
                                    <div>
                                        Brand:
                                        <span style={{ borderRight: '1px solid #9e9e9e', paddingRight: '7px' }}>{product && product.data.brand}</span>
                                        {/* <span>More Automotive from {product && product.data.brand}</span> */}
                                    </div>
                                    <div>
                                        Code:
                                        <span style={{ paddingRight: '7px' }}>{product && product.data.code}</span>
                                    </div>
                                    <div>
                                        Manufacturer:
                                        <span style={{ paddingRight: '7px' }}>{product && product.data.manufacture}</span>
                                    </div>
                                    <div>
                                        Warranty:
                                        <span style={{ paddingRight: '7px' }}>{product && product.data.warranty ? product.data.warranty : 'N/A'}</span>
                                    </div>
                                    <div>
                                        Country:
                                        <span style={{ paddingRight: '7px' }}>{sellerData ? sellerData.country : '...'}</span>
                                    </div>
                                    <div>
                                        {/* Quantity: */}
                                        <span style={{ paddingRight: '7px', float: 'right', fontWeight: 'bold', color: 'rgb(26, 156, 183)' }}>{(product && product.data.quantity) ? product.data.quantity + " Piece(s) availablle" : null}</span>
                                    </div>
                                    <div>
                                        <Divider />
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                product.data.discount &&
                                                `$ ${product.data.price - product.data.discount}`
                                            }
                                            {
                                                !product.data.discount && product.data.price &&
                                                `$ ${product.data.price}`
                                            }
                                        </div>
                                        {
                                            product.data.discount &&
                                            <div className={'product_price'}>
                                                <span>
                                                    {
                                                        product.data.discount &&
                                                        `$ ${Number(product.data.price)}`
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        `- ${Math.floor((product.data.discount / product.data.price) * 100)}%`
                                                    }
                                                </span>
                                            </div>
                                        }
                                    </div>
                                    {
                                        currentUser && currentUser.role !== "seller" &&
                                        <div className={'quantity quan'}>
                                            Quantity
                                        {
                                                counter > 1 ?
                                                    <span style={{ cursor: 'pointer' }} onClick={() => this.setState({ counter: counter - 1 })}>-</span>
                                                    :
                                                    <span style={{ backgroundColor: '#c1bfbf99' }}>-</span>
                                            }
                                            <span>{counter}</span>
                                            {
                                                counter < 5 ?
                                                    <span style={{ cursor: 'pointer', backgroundColor: 'white' }} onClick={() => this.setState({ counter: counter + 1 })}>+</span>
                                                    :
                                                    <span style={{ backgroundColor: '#c1bfbf99' }}>+</span>
                                            }
                                        </div>
                                    }
                                    {
                                        currentUser && currentUser.role !== "seller" &&
                                        <div className={'product_buttons'}>
                                            <span>
                                                <Button
                                                    variant={'contained'}
                                                    className={'product-btns1'}
                                                    onClick={() => this.buyProduct()}
                                                >BUY</Button>
                                            </span>
                                            <span>
                                                <Button
                                                    disabled={loader}
                                                    variant={'contained'}
                                                    className={'product-btns2'}
                                                    onClick={() => this.addToCart(product)}
                                                >ADD TO CART</Button>
                                            </span>
                                        </div>
                                    }
                                    {
                                        !currentUser &&
                                        <div className={'product_buttons'}>
                                            <div style={{ fontSize: "14px", marginTop: '1em' }}>
                                                You should Login to add to cart. <span onClick={() => this.loginPage()} className={'loginStyle'}>Login Here</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    <hr />
                                </div>
                                <div className={'productSpecification'}>
                                    <div className={'summarySpecs'}>
                                        Specification of {product && product.data.name}
                                    </div>
                                    {
                                        product && product.data && product.data.summarySpecs ?
                                            <div className={'specification'}>
                                                <div>
                                                    <ul>
                                                        {
                                                            specs.length &&
                                                            specs.map((items, index) => {
                                                                const length = Math.ceil(specs.length / 2)
                                                                return (
                                                                    index < length &&
                                                                    <li>{items}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul>
                                                        {
                                                            specs.length &&
                                                            specs.map((items, index) => {
                                                                const length = Math.ceil(specs.length / 2)
                                                                return (
                                                                    index >= length &&
                                                                    <li>{items}</li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    <div>
                                        <hr />
                                    </div>
                                    <div className={'productType'}>
                                        <div className={'pType'}>
                                            <div>
                                                Product Type:
                                            <span>
                                                    {
                                                        product &&
                                                        product.data.productType
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className={'pSeries'}>
                                            <div>
                                                Product Series:
                                            <span>
                                                    {
                                                        product &&
                                                        product.data.series
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                    }
                    {
                        loader &&
                        <div className={'loader product_loader'}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={120}
                                color={'#f27b01'}
                                loading={true}
                            />
                        </div>
                    }
                </div>
                {/* <div>
                    <MessageTemplate />
                </div> */}
                {
                    currentUserUID &&
                        currentUser &&
                        currentUser.role === 'buyer' ?
                        <div>
                            <MessageTemplate otherUID={product.data.userUid} />
                        </div>
                        :
                        null
                }
                {/* {
                    currentUserUID ?
                        <ChatBox sellerUID={product.data.userUid} />
                        :
                        null
                } */}
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        user: states.authReducer.CURRENTUSERUID,
        products: states.productReducer.ALLPRODUCTS,
        currentUser: states.authReducer.CURRENTUSER,
        currentUserUID: states.authReducer.CURRENTUSERUID,
        allUsers: states.authReducer.USERS,
        myCart: states.cartReducer.CART,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            ProductCart
        }, dispatch)
    })
    // return ({
    //     addCart: (obj) => {
    //         dispatch(ProductCart(obj));
    //     }
    // })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);