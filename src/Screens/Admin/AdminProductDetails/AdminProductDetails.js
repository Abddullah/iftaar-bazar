import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Divider, IconButton, Button } from '@material-ui/core';
import { Favorite, CloudDownload } from '@material-ui/icons';
import { connect } from 'react-redux';
// import './Banner.css'
import './AdminProductDetails.css';
import History from '../../../History/History';
import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
import Image from '../../../Assets/images/pdfDownload.png'
import firebase from '../../../Config/Firebase/firebase';



const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.data,
            key: this.props.location.state.key
        }

        this._changeStatus = this._changeStatus.bind(this);
        this._changeFeatureStatus = this._changeFeatureStatus.bind(this);
    }

    componentWillMount() {
        const { data } = this.state;
        console.log('this.props.location', this.props.location)
        if (data == undefined) {
            History.push('/products')
        }
    }

    _changeStatus(val) {
        const { key, data } = this.state;
        db.collection('products').doc(key).update({
            status: val
        })
            .then(() => {
                data.status = val;
                this.setState({ data })
            })
    }

    _changeFeatureStatus(val) {
        const { key, data } = this.state;
        db.collection('products').doc(key).update({
            featured: val
        })
            .then(() => {
                data.featured = val;
                this.setState({ data })
            })
    }
    render() {
        const { data } = this.state;
        console.log('item', data)
        return (
            <AdminDashboard>
                <div className={'Admin_Product_Details'}>
                    <div className={"Users"}>
                        Product Detail
                        <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                    </div>
                    <div className={"Banners"}>
                        <Carousel className={"_Carousel"} showArrows={true} >
                            {
                                data.images.length ?
                                    data.images.map((item, index) => {
                                        return <div className={'Slider_Image'}>
                                            <img src={item.image} />
                                        </div>
                                    })
                                    :
                                    <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                            }
                        </Carousel>
                    </div>
                    <div className={'Product_Info'}>
                        <div>
                            <ul>
                                <li className={'_head'}>Product Name</li>
                                <li>{data.name}</li>
                                <li className={'_head'}>Brand Name</li>
                                <li>{data.brand}</li>
                                <li className={'_head'}>Model</li>
                                <li>{data.model}</li>
                                <li className={'_head'}>Code</li>
                                <li>{data.code}</li>
                                <li className={'_head'}>Series</li>
                                <li>{data.series}</li>
                                <li className={'_head'}>Specification</li>
                                <li>{data.summarySpecs ? data.summarySpecs : 'No Specification for This Product'}</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li className={'_head'}>Product File</li>
                                <li className={"PDF_File"}>
                                    {
                                        data.pdf ?
                                            <a href={data.pdf} tooltip={'PDF download'} target={'_blank'} download>
                                                <img src={Image} /> <span>{data.filename}</span>
                                            </a>
                                            :
                                            'No File Attached'
                                    }
                                </li>
                                <li className={'_head'}>Date</li>
                                <li>{data.date}</li>
                                <li className={'_head'}>Product Type</li>
                                <li>{data.productType}</li>
                                <li className={'_head'}>New/Used</li>
                                <li>{data.product}</li>
                                <li className={'_head'}>Price</li>
                                <li>{data.price}</li>
                                {
                                    data.discount &&
                                    <li>
                                        <li className={'_head'}>Discount</li>
                                        <li>{data.discount}</li>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={"block_btn"}>
                        {
                            data.status === 'approved' ?
                                <Button color={"primary"} variant={"outlined"} onClick={() => this._changeStatus('blocked')}>Block</Button>
                                :
                                <Button color={"primary"} variant={"outlined"} onClick={() => this._changeStatus('approved')}>Unblock</Button>
                        }
                    </div>
                    <div className={"block_btn"}>
                        {
                            data.featured ?
                                <Button color={"primary"} variant={"outlined"} onClick={() => this._changeFeatureStatus(false)}>UnFeature</Button>
                                :
                                <Button color={"primary"} variant={"outlined"} onClick={() => this._changeFeatureStatus(true)}>Feature</Button>
                        }
                    </div>
                </div>
            </AdminDashboard>
        )
    }
}

export default ProductDetail;