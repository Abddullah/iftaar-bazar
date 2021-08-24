import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
// import Image2 from '../../Assets/images/image2.jpg'
// import Image3 from '../../Assets/images/image3.jpg'
import "react-image-gallery/styles/css/image-gallery.css";
import './slider.css'
import Image1 from '../../Assets/banners/Banner_1-01.png'
import Image2 from '../../Assets/banners/Banner_2-01.png'


class Slider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [
                {
                    original: Image1,
                },
                {
                    original: Image2,
                },
            ]
        }
    }

    componentWillMount() {
        const { Slider } = this.props;
        if (Slider) {
            this.setState({ images: Slider })
        }
    }

    componentWillReceiveProps(props) {
        const { Slider } = props;
        console.log('Slider********', props.Slider)
        if (Slider) {
            this.setState({ images: Slider })
        }
    }

    render() {
        const { images } = this.state
        return (
            // image slider
            <div className={'slider'}>
                <ImageGallery
                    items={images}
                    showThumbnails={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showBullets={true}
                    autoPlay={true}
                    sizes={{ width: '100px' }}
                />
            </div>
        );
    }
}

function mapStateToProps(states) {
    return ({
        Slider: states.authReducer.SLIDER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // editProfile: (userProfile, userUID) => {
        //     dispatch(editProfile(userProfile, userUID));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);