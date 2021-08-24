import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import History from '../../../History/History';
import { connect } from 'react-redux';
import './Banner.css'
import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
import { Button } from '@material-ui/core';
import EditBanner from './EditBanner';
// import { bindActionCreators } from 'redux';
// import { AllSellers } from '../../../store/action/adminAction'
import { Doughnut } from 'react-chartjs-2';
import ImageGallery from 'react-image-gallery';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            data: {}
        }
    }

    componentWillMount() {
        const { Slider, allOrders, allUser, allProducts } = this.props;

        var buyer = [];
        var seller = [];
        var approve = [];
        var block = [];
        if (Slider && Slider.length) {
            this.setState({ Slider })
            if (allUser) {
                setTimeout(() => {
                    allUser.map(item => {
                        if (item.data.role === 'buyer') {
                            buyer.push(item)
                        }
                        if (item.data.role === 'seller') {
                            seller.push(item)
                        }
                        if (item.data.isApproved === "true") {
                            approve.push(item)
                        }
                        if (item.data.isApproved === "block") {
                            block.push(item)
                        }
                    })
                    console.log('allOrders, allProducts', allOrders, allProducts)
                    this.setState({
                        data: {
                            labels: [
                                'All Users',
                                'Buyers',
                                'Seller',
                                'Approve Users',
                                'Block Users',
                                'Products',
                                "Orders"
                            ],
                            datasets: [{
                                data: [allUser ? allUser.length : 0, buyer.length, seller.length, approve.length, block.length, allProducts ? allProducts.length : 0, allOrders ? allOrders.length : 0],
                                backgroundColor: [
                                    '#FF9800',
                                    '#DB3E00',
                                    // '#004DCF',
                                    '#68BC00',
                                    '#00D084',
                                    '#5300EB',
                                    '#0693E3',
                                    // '#697689',
                                    '#00796B',
                                ],
                                hoverBackgroundColor: [
                                    '#FF9800',
                                    '#DB3E00',
                                    // '#004DCF',
                                    '#68BC00',
                                    '#00D084',
                                    '#5300EB',
                                    '#0693E3',
                                    // '#697689',
                                    '#00796B',
                                ]
                            }]

                        }
                    })
                })
            }
        }

    }

    componentWillReceiveProps(props) {
        // const { Slider, allOrders, allUser, allProducts } = props;
        // if (Slider && Slider.length) {
        //     this.setState({ Slider })
        //     console.log('Sliders', Slider)
        // }
        const { Slider, allOrders, allUser, allProducts } = props;

        var buyer = [];
        var seller = [];
        var approve = [];
        var block = [];
        if (Slider && Slider.length) {
            this.setState({ Slider })
            if (allUser) {
                setTimeout(() => {
                    allUser.map(item => {
                        if (item.data.role === 'buyer') {
                            buyer.push(item)
                        }
                        if (item.data.role === 'seller') {
                            seller.push(item)
                        }
                        if (item.data.isApproved === "true") {
                            approve.push(item)
                        }
                        if (item.data.isApproved === "block") {
                            block.push(item)
                        }
                    })
                    console.log('allOrders, allProducts', allUser)
                    this.setState({
                        data: {
                            labels: [
                                'All Users',
                                'Buyers',
                                'Seller',
                                'Approve Users',
                                'Block Users',
                                'Products',
                                "Orders"
                            ],
                            datasets: [{
                                data: [allUser ? allUser.length : 0, buyer.length, seller.length, approve.length, block.length, allProducts ? allProducts.length : 0, allOrders ? allOrders.length : 0],
                                backgroundColor: [
                                    '#FF9800',
                                    '#DB3E00',
                                    // '#004DCF',
                                    '#68BC00',
                                    '#00D084',
                                    '#5300EB',
                                    '#0693E3',
                                    // '#697689',
                                    '#00796B',
                                ],
                                hoverBackgroundColor: [
                                    '#FF9800',
                                    '#DB3E00',
                                    // '#004DCF',
                                    '#68BC00',
                                    '#00D084',
                                    '#5300EB',
                                    '#0693E3',
                                    // '#697689',
                                    '#00796B',
                                ]
                            }]

                        }
                    })
                })
            }

        }

    }

    render() {
        const { Slider, data } = this.state;
        console.log('Slider', Slider)
        return (
            <AdminDashboard>
                <div>
                    {Slider ?
                        <div className={"Banners"}>
                            <Carousel className={'Carousel_Banner'} showArrows={true} autoPlay={true} infiniteLoop={true} >
                                {
                                    Slider.map((item, index) => {
                                        return <div className={'Carousel_Banner_Image'}>
                                            <img src={item.original} />
                                        </div>
                                    })
                                }
                            </Carousel>
                            <div className={"EditBanner"}>
                                <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => History.push('editBanner')}>Edit Banner</Button>
                                {/* <EditBanner item={Slider} /> */}
                            </div>
                            <div>
                                {
                                    data ?
                                        <Doughnut
                                            data={data} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                        // </div>
                        // })
                        :
                        null
                    }
                    {/* <br /> */}
                    {/* <ChartScreen /> */}
                </div>
            </AdminDashboard>
        );
    }
}


function mapStateToProps(states) {
    return ({
        Slider: states.authReducer.SLIDER,
        allUser: states.authReducer.USERS,
        allProducts: states.productReducer.ALLPRODUCTS,
        allOrders: states.orderReducer.ALLORDERS,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // actions: bindActionCreators({
        //     // AllSellers
        // }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);