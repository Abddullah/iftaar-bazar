import React, { Component } from 'react';
// import './featured.css'
import History from '../../History/History'
import './vendor.css'
import Image1 from '../../Assets/images/featureProduct_1.png';
import Image2 from '../../Assets/images/featureProduct_2.png';
import Image3 from '../../Assets/images/featureProduct_3.png';
import Image4 from '../../Assets/images/featureProduct_4.png';
import Loader from 'react-loader-spinner'


class Vendor extends Component {
    constructor() {
        super()

        this.state = {
            ourSeller: []
        }
    }

    vendors() {
        History.push('/signup')
    }

    componentDidMount() {
        const { ourSeller } = this.props
        if (ourSeller) {
            this.setState({ ourSeller })
        }
    }
    
    componentWillReceiveProps(props) {
        const { ourSeller } = props
        if (ourSeller) {
            this.setState({ ourSeller })
        }
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

    render() {
        const { ourSeller } = this.state
        return (
            <div className={'featured'}>
                <div style={{ cursor: 'pointer' }} onClick={() => this.vendors()} className={'feature-products'}>
                    <h2 class="background">
                        <span className={'product'}>JOIN OUR SELLERS</span>
                    </h2>
                </div>
                <div className='vendor-div'>
                    {
                        ourSeller &&
                            ourSeller.length ?
                            ourSeller.map((items) => {
                                return this.OurSellers(items)
                            })
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
            </div>
        );
    }
}

export default Vendor;
