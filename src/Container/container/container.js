import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { sendMessage } from '../../store/action/action';
import History from '../../History/History';
import { searchProductAction, searchProductTextAction, allProduct } from '../../store/action/productAction';
import './container.css'
import {
    Container, Row, Col, Collapse, Navbar, NavbarToggler,
    NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';
import PersistentDrawerLeft from '../../Screens/Dashboard/Dashboard';
import SearchProducts from '../../Component/SearchProducts/SearchProducts';


class Containers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitBtn: true,
            name: '',
            email: '',
            subject: '',
            message: '',
            more: false,
            isOpen: false,
            aboutWebsite: '',
            productCatogeries: '',
            ourSellers: '',
            tetherConfig: {
                target: '#tether',
                attachment: 'middle left',
                targetAttachment: 'middle right',
                classPrefix: 'bs-tether',
                classes: { element: 'popover', enabled: 'open' },
                constraints: [
                    { to: 'scrollParent', attachment: 'together none' },
                    { to: 'window', attachment: 'together none' }
                ]
            },
        };
        this.toggle = this.toggle.bind(this);
        this._submit = this._submit.bind(this);
    }

    componentWillMount() {
        const { currentUserUID, aboutWebsite, productCatogeries, searchProductstext, ourSellers } = this.props
        console.log('currentUserUID', currentUserUID)
        this.setState({ aboutWebsite, productCatogeries, ourSellers, searchProductstext })
    }
    componentWillReceiveProps(props) {
        const { currentUserUID, aboutWebsite, searchProductstext, productCatogeries, ourSellers } = props
        console.log('currentUserUIDProps', currentUserUID)
        this.setState({ aboutWebsite, productCatogeries, ourSellers, searchProductstext })
    }


    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
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

    _search = (val) => {
        console.log("Footer Products", val)
        History.push('/');
        const { allProducts } = this.props;
        var arr = [];
        console.log('allProducts123', allProducts)
        if (allProducts && allProducts.length) {
            allProducts.map(item => {
                if (
                    item.data.status === 'approved' &&
                    (item.data.name.toUpperCase().match(val.toUpperCase()) ||
                        item.data.brand.toUpperCase().match(val.toUpperCase()) ||
                        item.data.productType.toUpperCase().match(val.toUpperCase()) ||
                        item.data.manufacture.toUpperCase().match(val.toUpperCase()))
                ) {
                    arr.push(item)
                }
            })
        }
        this.props.actions.searchProductAction(arr)
        this.props.actions.searchProductTextAction(val)
    }

    searchText() {

        this.props.actions.searchProductTextAction('')
    }

    render() {
        const { name, email, subject, message, submitBtn, more, aboutWebsite, productCatogeries, searchProductstext, ourSellers } = this.state
        return (
            // header 
            <div>
                <PersistentDrawerLeft />
                {/* children */}
                <div className={'children'}>
                    {
                        searchProductstext ?
                            <div>
                                <SearchProducts searchText={() => this.searchText()} />
                            </div>
                            :
                            this.props.children
                    }
                </div>

                {/* footer */}
                <div className={'footer'}>
                    <div className={'companies'}>
                        <div>
                            Why IftarBazar.pk ? 
                        </div>
                        <div className={'web-link'}>
                            <a href={'/'}>{aboutWebsite ? aboutWebsite.siteName : null}</a>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                            {/* <div>
                                {aboutWebsite ? aboutWebsite.websiteWelcome : null}
                            </div>
                            {
                                aboutWebsite ?


                                    <div>
                                        {
                                            more ?
                                                this.showMore(aboutWebsite.description)
                                                :
                                                this.showLess(aboutWebsite.description.slice(0, 300))
                                        }
                                    </div>
                                    :
                                    null
                            } */}
                            {/* <div>
                                .Why IftarBazar.pk ?
                            </div> */}
                            <div>
                                Online Fresh Fruits with reliable Cash on delivery Service.
                            </div>
                            <div>
                                No bargaining Tension.
                            </div>
                            <div>
                                One platform for all types of fruits.
                            </div>
                            <div>
                                have lowest fruits price which, people usually get after bargaining from real fruit market.
                            </div>
                            <div>
                                Save your precious Time and energy.
                            </div>
                            <div>
                                Provides Financial support to middle class Fruits Retailers by Increasing their Fruits Sales.
                            </div>
                            <div>
                                Saves your life from heat stroke attack.
                            </div>
                            <div>
                                Cares about your health.
                            </div>


                        </div>
                        <div>
                        </div>
                    </div>
                    <div className={'category'}>
                        <div>
                            About Us
                        </div>
                        <div className={"Address"}>
                            <div>
                                <a href="">Iftarbazar.pk</a>
                                    is pakistan no 1 online fruits seller
                            </div>
                            <div>
                                we have fresh fruits with reasonable price,
                                Best Online Fruits Service Provider:
                                we provide online fresh fruits with lowest price,  if you want to save your precious time, energy  and Money, then as a best online fresh fruits seller iftarbazar.pk is right choice for you.
                                Online Fruits Home Delivery
                                Reliable Home Delivery Service with lowest delivery charges from current market competent. we offer special online fresh fruits delivery servcie for our valued customer.
                                Ifarbazar.pk is an Online fruits delivery service Company,
                                Make your blessing iftari perfect with healthy Fruits.
                            </div>
                        </div>
                        {/* {
                            productCatogeries && productCatogeries.length ?
                                productCatogeries.map(item => {
                                    return <div>
                                        <div onClick={() => this._search(item.data.name)} style={{ marginBottom: '0em', cursor: 'pointer' }}>
                                            &raquo; {item.data.name ? item.data.name : null}
                                        </div>
                                        {
                                            item.data.subcategory && item.data.subcategory.length ?
                                                item.data.subcategory.map((subItem, subIndex) => {
                                                    return <div onClick={() => this._search(subItem)} style={{ marginBottom: '0em', color: '#ca570b', cursor: 'pointer' }}>
                                                        &nbsp; &nbsp; &nbsp; &raquo; {subItem}
                                                    </div>
                                                })
                                                :
                                                null
                                        }
                                    </div>
                                })
                                :
                                null
                        } */}
                    </div>
                    <div className={'vendors'}>
                        <div>Address</div>
                        <div className={"Address"}>
                            <div>
                                403 Dubai Building,
                                Damascus st,Al Qusaus 4 P.O.Box 35538, Dubai United Arab Emirates
                            </div>                            
                            <div>
                                A-4 Humaira Centre,
                                PECHS Block 2, Nursery shahra-e-Faisal karachi, Karachi 75400, Pakistan
                            </div>
                        </div>
                        {/* {
                            ourSellers && ourSellers.length ?
                                ourSellers.map(item => {
                                    return <div>
                                        &raquo; {item.name}
                                    </div>
                                })
                                :
                                null
                        } */}
                        {/* <div>
                            &raquo; Hickory Pte Ltd
                        </div> */}
                    </div>
                    <div className={'contact'}>
                        <div>
                            Contact Us
                        </div>
                        <div>
                            <input type={'text'} placeholder={'Full Name'} value={name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                        </div>
                        <div>
                            <input type={'text'} placeholder={'Email Address'} value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </div>
                        <div>
                            <input type={'text'} placeholder={'Subject'} value={subject} onChange={(e) => { this.setState({ subject: e.target.value }) }} />
                        </div>
                        <div>
                            <textarea rows={'4'} placeholder={'Message'} value={message} onChange={(e) => { this.setState({ message: e.target.value }) }} />
                        </div>
                        <div>
                            {
                                submitBtn ?
                                    <button style={{ cursor: 'pointer' }} onClick={this._submit}>Submit</button>
                                    :
                                    <button disabled>Submit</button>
                            }
                        </div>
                    </div>
                </div>
                <div className={'copyright'}>
                    Copyright 2019 Iftaar Bazaar - All Right Reserved
                </div>
            </div >

        );
    }
}


// export default Containers;

function mapStateToProps(states) {
    console.log('OURSELLERS', states.authReducer.OURSELLERS)
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        aboutWebsite: states.aboutWebsiteReducer.ABOUTWEBSITE,
        productCatogeries: states.aboutWebsiteReducer.PRODUCTCATOGERY,
        ourSellers: states.authReducer.OURSELLERS,
        allProducts: states.productReducer.ALLPRODUCTS,
        searchProductstext: states.productReducer.SEARCHPRODUCTSTEXT,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            sendMessage, searchProductAction, searchProductTextAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Containers);