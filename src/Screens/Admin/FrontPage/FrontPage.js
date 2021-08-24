import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import History from '../../../History/History';
import Button from '@material-ui/core/Button';
import Pagination from '../../../Component/Pager/Pager';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FrontPage.css';


import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);



class AdminFrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editBtn: false,
            images: [],
            products: [],
            featureProducts: [],
            pages: 3,
            pageProduct: [],
            number: 10,
            ourSeller: [],
            aboutWebsite: '',
            productCatogeries: '',
            more: false,
            name: '',
            email: '',
            subject: '',
            message: '',

        }
        this.pageNum = this.pageNum.bind(this);
        this._submit = this._submit.bind(this);
    }


    componentWillMount() {
        const { Slider, allProducts, ourSeller, aboutWebsite, productCatogeries } = this.props;
        const { number } = this.state;
        if (Slider) {
            this.setState({ images: Slider })
        }

        if (ourSeller) {
            this.setState({ ourSeller })
        }

        if (aboutWebsite) {
            this.setState({ aboutWebsite })
        }

        if (productCatogeries) {
            this.setState({ productCatogeries })
        }

        if (allProducts) {
            // setTimeout(() => {
            //     const pages = Math.ceil(allProducts.length / number)
            //     const pageArr = allProducts.slice(0, number)
            //     this.setState({ products: allProducts, pages, pageProduct: pageArr })
            // }, 1000)
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                allProducts.map(item => {
                    if (item.data.featured) {
                        featureproductsarr.push(item)
                    }
                    if (!item.data.featured) {
                        productsearr.push(item)
                    }
                })

                console.log('Run*********', productsearr, allProducts)
                const pages = Math.ceil(productsearr.length / number)
                const pageArr = productsearr.slice(0, number)
                this.setState({ featureProducts: featureproductsarr, products: productsearr, pages, pageProduct: pageArr })
            }, 1000)
        }
    }

    componentWillReceiveProps(props) {
        const { Slider, allProducts, ourSeller, aboutWebsite, productCatogeries } = props;
        const { number } = this.state;
        console.log('Slider********', props.Slider)
        if (Slider) {
            this.setState({ images: Slider })
        }

        if (ourSeller) {
            this.setState({ ourSeller })
        }

        if (aboutWebsite) {
            this.setState({ aboutWebsite })
        }

        if (productCatogeries) {
            this.setState({ productCatogeries })
        }


        if (allProducts) {
            setTimeout(() => {
                var featureproductsarr = [];
                var productsearr = [];
                // allProducts.map(item => {
                //     if (item.data.featured) {
                //         featureproductsarr.push(item)
                //     }
                //     if (!item.data.featured) {
                //         productsearr.push(item)
                //     }
                // })
                allProducts.map(item => {
                    featureproductsarr.push(item)
                })

                console.log('Run*********', productsearr, allProducts)
                const pages = Math.ceil(productsearr.length / number)
                const pageArr = productsearr.slice(0, number)
                this.setState({ featureProducts: featureproductsarr, products: productsearr, pages, pageProduct: pageArr })
            }, 1000)
        }
    }


    details(productId) {

        History.push('/products')
    }

    products(product) {
        return (
            <div onClick={() => { console.log('product.key', product.key) }} className={'product-image back'}>
                {
                    product.data.images.length ?
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

    vendors() {
        History.push('/signup')
    }

    OurSellers(item) {
        return (
            <div className={'vendor'}>
                <div>
                    {/* 120 x 120px */}
                    <img alt={'Vendor Machinary Image'} src={item.image} />
                </div>
                <div>
                    {item.name}
                </div>
                <div>
                    {item.description}
                </div>
            </div>
        )
    }




    _submit() {
        const { name, email, subject, message } = this.state
        console.log('Data', { name, email, subject, message })
        const date = new Date().getTime()
        if (name && message && subject &&
            email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            const messageObj = { name, email, subject, message, date }
            this.setState({ submitBtn: false })
            this.props.actions.sendMessage(messageObj)
                .then(() => {
                    this.setState({
                        name: '',
                        email: '',
                        subject: '',
                        // date: new Date().getTime(),
                        message: '',
                        submitBtn: true
                    })
                    swal({
                        type: "success",
                        title: "Sent",
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
        }
        else {
            if (!name) {
                swal({
                    type: 'error',
                    title: 'Please enter name',
                })
            }
            else if (name && !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                swal({
                    type: 'error',
                    title: 'Please enter correct email',
                })
            }
            else if (name && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && !subject) {
                swal({
                    type: 'error',
                    title: 'Please enter subject',
                })
            }
            else if (name && email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && subject && !message) {
                swal({
                    type: 'error',
                    title: 'Please type some message',
                })
            }
        }

    }

    showLess(val) {
        return (
            <div>
                <div>
                    {val}
                </div>

                <div onClick={() => this.setState({ more: true })} className={'showMore'}>
                    Show more
                 </div>
            </div>
        )
    }

    showMore(val) {
        return (
            <div>
                <div>
                    {val}
                </div>

                <div onClick={() => this.setState({ more: false })} className={'showMore'}>
                    Show Less
                 </div>
            </div>
        )
    }

    render() {
        const { pages, featureProducts, pageProduct, editBtn, number, images, ourSeller, more, name, email, subject, message, submitBtn, aboutWebsite, productCatogeries, } = this.state
        return (
            <AdminDashboard>
                <div className={'AdminFrontPage'}>

                </div>
            </AdminDashboard>
        )
    }

}

// export default AdminFrontPage;

function mapStateToProps(states) {
    return ({
        Slider: states.authReducer.SLIDER,
        allProducts: states.productReducer.ALLPRODUCTS,
        ourSeller: states.authReducer.OURSELLERS,
        aboutWebsite: states.aboutWebsiteReducer.ABOUTWEBSITE,
        productCatogeries: states.aboutWebsiteReducer.PRODUCTCATOGERY,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // editProfile: (userProfile, userUID) => {
        //     dispatch(editProfile(userProfile, userUID));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminFrontPage);