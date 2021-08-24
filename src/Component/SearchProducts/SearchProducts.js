import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import History from '../../History/History';
import './SearchProducts.css';

class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchProducts: ''
        }
    }

    componentWillMount() {
        const { searchProducts, searchProductstext } = this.props;
        this.setState({ searchProducts })
    }

    componentWillReceiveProps(props) {
        const { searchProducts, searchProductstext } = props;
        console.log('Search Product1***', searchProducts);
        this.setState({ searchProducts })
    }

    details(productId) {
        const { searchText } = this.props
        History.push('/details/' + productId)

        searchText()
    }

    products(product) {
        return (
            <div onClick={() => { console.log('product.key', product.key) }} className={'product-image back'}>
                {
                    product.data.images && product.data.images.length ?
                        <img src={product.data.images[0].image} />
                        :
                        <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                }
                <div className={'title'}>
                    {product.data.name}
                </div>
                <div className={'product-Overlay'}>
                    <div className={'brand-overlay'}>
                        <div>
                            <div style={{ color: 'black', fontSize: '20px' }}>
                                Brand:
                           </div>
                            <div style={{ fontSize: 'medium' }}>
                                {product.data.brand}
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'black', fontSize: '20px' }}>
                                Code:
                           </div>
                            <div style={{ fontSize: 'medium' }}>
                                {product.data.code}
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button className={'view-details'} onClick={() => this.details(product.key)}>
                                    View Details
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        const { searchProducts } = this.state;
        return (
            <div className='products'>
                {
                    searchProducts && searchProducts.length ?
                        searchProducts.map(items => {
                            return (
                                items.data.status === "approved" ?
                                    this.products(items)
                                    :
                                    null
                                // <div style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>No Product Found</div>
                            )
                        })
                        :
                        <div style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>No Product Found</div>
                }
            </div>
        )
    }
}

// export default SearchProduct;


// export default Containers;

function mapStateToProps(states) {
    console.log('OURSELLERS', states.authReducer.OURSELLERS)
    return ({
        searchProducts: states.productReducer.SEARCHPRODUCTS,
        searchProductstext: states.productReducer.SEARCHPRODUCTSTEXT,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators({
        //     sendMessage
        // }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);