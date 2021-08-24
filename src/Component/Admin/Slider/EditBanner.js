import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BannerAction } from '../../../store/action/adminAction';
import Button from '@material-ui/core/Button';
import firebase from '../../../Config/Firebase/firebase';
import History from '../../../History/History';
import AdminDashboard from '../../../Screens/Admin/AdminDashboard/AdminDashboard';
import swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners';
import Image from '../../../Assets/images/product1.png'

import 'filepond/dist/filepond.min.css';
import { registerPlugin, FilePond } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);


const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});


class EditBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            open: false,
            item: props.item,
            images: [],
            Click: false,
            banners: [],
            filename: [],
            bannerImages: []
        }

        this._update = this._update.bind(this);
        this._cancle = this._cancle.bind(this);
    }


    componentWillMount() {
        const { Slider } = this.props;
        if (Slider && Slider.length) {
            this.setState({ images: Slider })
        }

    }

    componentWillReceiveProps(props) {
        const { Slider } = props;
        if (Slider && Slider.length) {
            this.setState({ images: Slider })
            console.log('Sliders', Slider)
        }

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    _update() {
        const { images, banners, bannerImages } = this.state;
        var arr = [...images];
        // var arr = [];
        banners.map(item => {
            var file = item;
            var reader = new FileReader();

            reader.onloadend = () => {
                var obj = { original: reader.result };
                arr.push(obj)
                this.setState({ bannerImages: arr })
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        })

        setTimeout(() => {


            if (arr.length && arr.length <= 3) {
                // console.log('arr', arr.length, arr)
                // console.log('images', images.length)
                // console.log('banners', banners.length)
                // console.log('banners', banners.length + images.length, ' ===', arr.length)
                // if (banners.length + images.length === arr.length) {
                    console.log('===========================')
                    this.props.actions.BannerAction(arr)
                        .then(() => {
                            History.push('/')
                        })
                // }
            }
        }, 1000)

    }

    _cancle(index) {
        const { images } = this.state;
        images.splice(index, 1);
        this.setState({ images })
    }

    myFile(err, item) {
        const { banners, filename } = this.state
        const file = item.file

        // console.log(file.file, 'file')
        banners.push(file)
        filename.push(file.name)
        this.setState({ banners, filename })
    }


    removeFile(file) {
        console.log(file.file, 'file hare')
        const { banners, filename } = this.state

        banners.map((items, index) => {
            if (items.name === file.file.name) {
                banners.splice(index, 1)
                this.setState({ banners })
            }
        })

        if (filename.indexOf(file.file.name) !== -1) {
            filename.splice(filename.indexOf(file.file.name), 1)
            this.setState({ filename })
        }

    }

    beforeAddFile(file) {
        const { banners, filename } = this.state
        const files = file.file.name

        if (filename.indexOf(files) !== -1) {
            return false
        }

    }

    onwarning(err, file) {
        if (err.body === 'Max files') {
            const toast = swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000
            });

            toast({
                type: 'warning',
                text: 'Maximum three images'
            })
        }
    }

    render() {
        const { item, images, banners, filename } = this.state;
        // console.log('Item', banners)
        // console.log('imagesimages', images)

        // console.log('filename', filename)
        return (
            <AdminDashboard>
                <div className={'AdminUserDiv'}>
                    <div className={"Users"}>
                        Edit Banner
                    </div>
                    <div>
                        <div className={'Banner_Images'}>
                            {
                                images &&
                                    images.length ?
                                    images.map((item, index) => {
                                        return <div>
                                            <img src={item.original} />
                                            <div onClick={() => this._cancle(index)}>
                                                X
                                            </div>
                                        </div>
                                    })
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div className={'filePond'}>
                        {
                            images ?
                                images.length < 3 &&
                                <FilePond
                                    allowMultiple={true}
                                    onremovefile={(file) => this.removeFile(file)}
                                    onaddfile={(err, file) => this.myFile(err, file)}
                                    maxFiles={images && 3 - images.length}
                                    beforeAddFile={(file) => this.beforeAddFile(file)}
                                    onwarning={(err, file) => this.onwarning(err, file)}
                                />
                                :
                                <div style={{ marginTop: '2em' }} className={'loader product_loader'}>
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={120}
                                        color={'#f27b01'}
                                        loading={true}
                                    />
                                </div>
                        }
                    </div>
                    <div className={"Banner_Btns"}>
                        {
                            images &&
                            <div>
                                <Button color={"primary"} variant={"outlined"} onClick={() => this._update()}>Update</Button>
                                <Button color={"secondary"} variant={"outlined"} onClick={() => { History.push('/') }}>Cancle</Button>
                            </div>
                        }
                    </div>
                </div>
            </AdminDashboard>
        );
    }
}


function mapStateToProps(states) {
    return ({
        Slider: states.authReducer.SLIDER,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            BannerAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBanner);