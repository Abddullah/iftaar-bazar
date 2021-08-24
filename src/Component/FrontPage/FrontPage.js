import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from '../Slider/slider';
import Vendor from '../Vendor/vendor';
import Featured from '../Featured/featured';
import Containers from '../../Container/container/container';
import SearchProducts from '../SearchProducts/SearchProducts';
import banner1 from '../../Assets/banners/fruits-beautyjuicer-slider21-900x400.png'



class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                { original: banner1 },
                { original: banner1 },
                { original: banner1 }
            ],
            ourSeller: [],
            searchProductstext: '',
        }
    }


    // static getDerivedStateFromProps(props) {
    //     const { slider,ourSeller } = props;
    //     if (props.slider) {
    //         console.log('FrontPage Props****', props, props.slider)
    //         const imagesArr = [
    //             { original: slider.image1 },
    //             { original: slider.image2 },
    //             { original: slider.image3 }
    //         ]
    //         return ({ images: imagesArr })
    //     }
    //     if(ourSeller) {
    //         console.log(ourSeller,'ourSellerourSeller')
    //         return ({ ourSeller })            
    //     }
    // }

    // componentDidMount() {
    //     const { slider, ourSeller, flag, searchProductstext } = this.props;
    //     this.setState({ searchProductstext })
    //     if (this.props.slider) {
    //         const imagesArr = [
    //             { original: banner1 },
    //             { original: banner1 },
    //             { original: banner1 }
    //         ]
    //         this.setState({ images: imagesArr })
    //     }
    //     if (ourSeller || flag) {
    //         console.log(ourSeller, 'ourSellerourSeller')
    //         this.setState({ ourSeller })
    //     }
    // }

    // componentWillReceiveProps(props) {
    //     const { slider, ourSeller, flag, searchProductstext } = props;
    //     this.setState({ searchProductstext })
    //     if (props.slider) {
    //         const imagesArr = [
    //             { original: banner1 },
    //             { original: banner1 },
    //             { original: banner1 }
    //         ]
    //         this.setState({ images: imagesArr })
    //     }
    //     if (ourSeller || flag) {
    //         console.log(ourSeller, 'ourSellerourSeller')
    //         this.setState({ ourSeller })
    //     }
    // }


    render() {
        const { images, ourSeller, searchProductstext } = this.state;
        console.log('images******', images)
        return (
            <Containers>
                {
                    // searchProductstext ?
                    //     <div>
                    //         <SearchProducts />
                    //     </div>
                    //     :
                    <div>
                        <Slider images={images} />
                        <Featured />
                    </div>
                }
                {/* <div>
                     <Slider images={images} />
                     <Featured />
                     <Vendor ourSeller={ourSeller} />
                 </div> */}
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        currentUser: states.authReducer.currentUser,
        currentUserUID: states.authReducer.currentUserUID,
        ourSeller: states.authReducer.OURSELLERS,
        slider: states.authReducer.SLIDER,
        flag: states.cartReducer.FLAG,


        searchProducts: states.productReducer.SEARCHPRODUCTS,
        searchProductstext: states.productReducer.SEARCHPRODUCTSTEXT,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);