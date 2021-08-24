import React, { Component } from 'react';
import { connect } from 'react-redux';
import './featured.css'
import { bindActionCreators } from 'redux';
import Image from '../../Assets/images/productimg.png'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import History from '../../History/History'
import Pagination from '../Pager/Pager';
import Loader from 'react-loader-spinner'
import { AddToBasket } from '../../store/action/productAction'
import Image1 from '../../Assets/products/banana.jpg'
import Image3 from '../../Assets/products/oranges.png'
import Image2 from '../../Assets/products/fde88e6674d41ded7ae1b8a8c3063b76.jpg'
import Image4 from '../../Assets/products/apple.jpg'


class Featured extends Component {
    constructor() {
        super()

        this.state = {
            featureProducts: [
                {
                    name: 'Banana',
                    key: 0,
                    quantity: 1,
                    price: 100,
                    totalprice: 100,
                    image: Image1
                },
                {
                    name: 'Mangoes',
                    key: 1,
                    quantity: 1,
                    price: 200,
                    totalprice: 200,
                    image: Image2
                }
                ,
                {
                    name: 'Oranges',
                    key: 2,
                    quantity: 1,
                    price: 170,
                    totalprice: 170,
                    image: Image3
                },
                {
                    name: 'Apple',
                    key: 3,
                    quantity: 1,
                    price: 200,
                    totalprice: 200,
                    image: Image4
                }
            ],
            products: [],
            pages: 3,
            pageProduct: [],
            number: 10,
            cart: [],
            fleg: false
        }

        this.pageNum = this.pageNum.bind(this);
    }

    handleChange(value, name) {
        this.setState({
            [name]: value
        })
    }

    componentWillMount() {
        const { getBasket, products, cond } = this.props

        if (getBasket && getBasket.length) {
            this.setState({ cart: getBasket })
        }
        if(products && products.length){
            setTimeout(() => {
                this.setState({products})
            }, 100)
        }
    }

    componentWillReceiveProps(props) {
        const { getBasket, products, cond } = props

        if (getBasket && getBasket.length) {
            this.setState({ cart: getBasket })
        }
        if(products && products.length){
            setTimeout(() => {
                this.setState({products})
            }, 100)
        }
    }

    removeQuantity(index) {
        const { featureProducts } = this.state

        if (featureProducts[index].quantity > 1) {

            featureProducts[index].quantity = featureProducts[index].quantity - 1
            featureProducts[index].totalprice = featureProducts[index].price * featureProducts[index].quantity

            this.setState({ featureProducts })
        }
    }

    addQuantity(index) {
        const { featureProducts } = this.state
        console.log(index, 'index here')

        if (featureProducts) {

            featureProducts[index].quantity = featureProducts[index].quantity + 1
            featureProducts[index].totalprice = featureProducts[index].price * featureProducts[index].quantity

            this.setState({ featureProducts })
        }
    }

    addToCart(product) {
        const { cart, flag } = this.state
        const { AddToBasket } = this.props.actions

        if (cart && cart.length) {
            var count = 0
            cart.map((items, index) => {
                if (items.key === product.key) {
                    count = 1
                    cart[index] = product
                }
                if (cart.length - 1 === index && count === 0) {
                    cart.push(product)
                }
            })
        } else {
            cart.push(product)
        }

        this.setState({ cart }, () => {

            AddToBasket(this.state.cart, this.state.flag).then((flag) => {
                this.setState({ flag })
            })
        })

    }

    buy(obj) {

        History.push({
            pathname: '/cart',
            state: obj
        })
    }

    products(product, index) {
        const { quantity } = this.state
        return (
            <div onClick={() => { console.log('product.key', product.key) }} className={'product-image back'}>
                {
                    product && product.image ?
                        <img src={product.image} />
                        :
                        <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                }
                <div className={'title'}>
                    {product.name}
                </div>
                <div className={'product-Overlay'}>
                    <div className={'brand-overlay'}>
                        <div>
                            <div style={{ color: 'black', fontSize: '18px' }}>
                                {product.name}
                            </div>
                            {/* <div style={{ fontSize: 'medium' }}>
                                {product.data.brand}
                            </div> */}
                        </div>
                        <div className={'product-quantity'}>
                            <div>
                                {/* <div style={{ color: 'black', fontSize: '20px' }}>
                                Code:
                           </div> */}
                                <div style={{ fontSize: 'medium' }}>
                                    {`Rs ${product.totalprice}`}
                                </div>
                            </div>
                            <div className={'quantity-row1'}>
                                <div>
                                    <button style={{ marginRight: '0px' }} onClick={() => this.removeQuantity(index)}>-</button>
                                </div>
                                <div style={{ alignSelf: 'center', alignItems: 'center' }}>
                                    <input style={{ width: '35px', height: '25px' }} onChange={(e) => this.handleChange(e.target.value, 'quantity')} value={product.quantity} max={2} type={'number'} />
                                </div>
                                <div>
                                    <button onClick={() => this.addQuantity(index)}>+</button>
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 'medium' }}>
                                    {product.unit ? product.unit : "kg"}
                                </div>
                            </div>
                        </div>
                        <div className={'products-button'}>
                            <div>
                                <Button className={'view-details'} style={{ marginRight: '2px !important' }} onClick={() => this.addToCart(product)}>
                                    Add to basket
                                </Button>
                                <Button className={'view-details'} onClick={() => this.buy(product)}>
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    pageNum(num) {
        const { products, number } = this.state;
        // console.log('products', products)
        const pageArr = products.slice(num * number, num * number + number)
        this.setState({ pageProduct: pageArr })
        // console.log('pageArr*****', pageArr)
        // console.log('Page Number ***********', num)
        // console.log(num * number, num * number + number)
        // console.log("==========================")
    }

    render() {
        const { pages, featureProducts, pageProduct, number, noProducts, products } = this.state
        return (
            // featured Products

            <div className={'featured'}>
                <div className={'feature-products'}>
                    <h2 class="background">
                        <span className={'product'}>FEATURE PRODUCTS</span>
                    </h2>
                </div>
                <div className='products'>
                    {
                        products.map((items, index) => {
                            return (
                                this.products(items, index)
                            )
                        })
                    }
                </div>

                {
                    products.length ?
                        null
                        // <Pagination pages={pages} pageNum={this.pageNum} />
                        :
                        <div style={{ textAlign: "center" }}>
                            <Loader
                                type="ThreeDots"
                                color="#f27b01"
                                height="100"
                                width="100"
                            />
                        </div>
                }

            </div>
        );
    }
}

function mapStateToProps(states) {
    return ({
        products: states.productReducer.ALLPRODUCTS,
        cond: states.productReducer.COND,
        basket: states.productReducer.ADDCART,
        getBasket: states.productReducer.GETCART,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            AddToBasket
        }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Featured);