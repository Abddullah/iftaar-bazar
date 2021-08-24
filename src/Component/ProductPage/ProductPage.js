import React, { Component } from 'react';
import { connect } from 'react-redux';
import Containers from '../../Container/container/container';
import History from '../../History/History';
import Card from '../Card/card';
import { ClipLoader } from 'react-spinners';
import Image from '../../Assets/images/product.png'
import './product.css'
import FabIcon from '../FabIcon/fabIcon'
import { Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { DeleteProduct } from '../../store/action/productAction';


class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            emptyProduct: null,
            currentUser: null,
        }
    }

    // componentWillMount() {
    //     const { currentUserUID } = this.props;
    //     if (!currentUserUID) {
    //         History.push('/')
    //     }
    // }


    componentWillMount() {
        const { currentUser } = this.props;
        this.setState({ currentUser: currentUser })
        if (currentUser && currentUser.role !== 'seller') {
            History.push('/')
        }
    }

    componentDidMount() {
        console.log(this.props.products, 'wasiiiiiii')
        this.setState({ product: this.props.products })
        if (this.props.emptyProduct) {
            console.log(this.props.emptyProduct, 'props of emptyproduct')
            this.setState({ emptyProduct: true })
        } else {
            this.setState({ emptyProduct: false })
        }
    }

    componentWillReceiveProps(props) {
        const { currentUser, products } = props;
        this.setState({ currentUser: currentUser })
        if (currentUser && currentUser.role !== 'seller') {
            History.push('/')
        }

        if (products || props.flag) {
            setTimeout(() => {
                console.log(products, 'products')
                this.setState({ product: products })
            }, 1000)
        }
        if (props.emptyProduct) {
            console.log(props.emptyProduct, 'props of emptyproduct')
            this.setState({ emptyProduct: true })
        } else {
            this.setState({ emptyProduct: false })
        }
    }

    addProducts() {
        History.push('/productForm')
    }

    productDelete(key) {
        const { currentUser } = this.state

        if (currentUser) {
            const { DeleteProduct } = this.props.actions

            DeleteProduct(currentUser.userUid, key).then(() => {
                const { product } = this.state
                const { products } = this.props

                product.map((items, index) => {
                    if (items.key === key) {
                        product.splice(index, 1)
                        this.setState({ product })
                    }
                })
                products.map((items, index) => {
                    if (items.key === key) {
                        products.splice(index, 1)
                    }
                })


            })
        }
    }

    render() {
        const { product, emptyProduct, currentUser } = this.state
        console.log(emptyProduct, 'emprty prodfyustytgv')
        return (
            <Containers>
                {/* <div className={'vendor-products'}>
                    <h5>Product Page</h5>
                    <div>
                    <Card image={Image} productName={'Product Name'} brandName={'Brand Name'} />
                    </div>
                </div> */}
                <div className={'vendor-products'}>
                    <div style={{ width: '100%', height: '38px' }}>
                        <div style={{ width: '50%', float: "left" }}>
                            PRODUCTS
                        </div>
                        <div style={{ width: '50%', float: "left", textAlign: "right" }}>
                            <Button style={{ backgroundColor: 'orange', color: 'white', outline: 'none' }} size={"large"} variant={'outlined'} onClick={this.addProducts} >
                                Add Product
                            </Button>
                        </div>
                    </div>
                    <hr />
                </div>
                {
                    currentUser ?
                        <div className={'mainDiv'}>
                            {
                                emptyProduct ?
                                    <div className={'empty_product'}>
                                        <div>
                                            Add Your Product
                                </div>
                                        <div onClick={this.addProducts}>Add Product</div>
                                    </div>
                                    :
                                    product &&
                                    product.map((item) => {
                                        const items = item.data
                                        return (
                                            <Card
                                                image={items.images.length ? items.images[0].image : 'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'}
                                                productKey={item.key}
                                                status={items.status}
                                                productName={items.name}
                                                brandName={items.brand}
                                                productDelete={(key) => this.productDelete(key)}
                                            />
                                        )
                                    })
                            }
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
                    currentUser &&
                    <FabIcon addProducts={this.addProducts} />
                }
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        products: states.productReducer.PRODUCTS,
        emptyProduct: states.productReducer.EMPTYPRODUCT,
        flag: states.cartReducer.FLAG,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            DeleteProduct
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);