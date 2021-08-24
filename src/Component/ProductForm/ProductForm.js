import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, Button, Radio } from '@material-ui/core';
import '../ProductForm/ProductForm.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCut } from '@fortawesome/free-solid-svg-icons';
import ReactDropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import "react-image-crop/dist/ReactCrop.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners';
import '../../Assets/sweetalert/animate.css'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Containers from "../../Container/container/container";
import { Label, Input, InputAdornment } from '@material-ui/core'
import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css'
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import { addProductAction } from '../../store/action/action';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History'

library.add(faPlus, faCut)


class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            productName: '',
            brandName: '',
            crop: false,
            progressBar: false,
            files: [],
            quantity: '',
            imageUrls: [],
            summarySpecs: '',
            photoIndex: 0,
            isOpen: false,
            croppedImages: '',
            disabled: false,
            src: true,
            crop: {
                x: 20,
                y: 5,
                aspect: 1,
                height: 50,
            },
            disabled: true,
        };
        this.djsConfig = {
            autoProcessQueue: false,
            addRemoveLinks: true,
            uploadMultiple: false,
            acceptedFiles: "application/pdf"
        };

        this.componentConfig = {
            iconFiletypes: ['.pdf'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [(files) => console.log('Hi!', files), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (file) => {
            console.log('Hello!', file)
            this.setState({ pdfFile: file })
        };

        // this.success = file => console.log('uploaded', file);

        this.removedfile = file => {
            this.setState({ pdfFile: null })
            console.log('removing...', file)
        };

        this.dropzone = null;


        this.addData = this.addData.bind(this);
        this.onPreviewDrop = this.onPreviewDrop.bind(this);
        this.cancle = this.cancle.bind(this);

    }

    componentWillMount() {
        const { currentUser, productCatogeries } = this.props;
        this.setState({ currentUser })
        if (currentUser && currentUser.role !== 'seller') {
            History.push('/')
        }

        if (productCatogeries) {
            console.log(productCatogeries, 'productCatogeries')
            this.setState({ productCatogeries })
        }

    }
    componentWillReceiveProps(props) {
        const { currentUser, productCatogeries } = props;
        this.setState({ currentUser })
        if (currentUser && currentUser.role !== 'seller') {
            History.push('/')
        }

        if (productCatogeries) {
            console.log(productCatogeries, 'productCatogeries')
            this.setState({ productCatogeries })
        }
    }


    // componentDidCatch(props) {
    //     console.log('props**********', props)
    // }

    // componentWillReceiveProps(props) {
    //     console.log('props**********', props)
    // }

    onPreviewDrop(imagefiles) {

        const { files } = this.state;
        if (files.length < 3) {
            if (imagefiles.length <= 3) {

                console.log(imagefiles, 'images,files')
                files.push(...imagefiles)
                // console.log(files, 'files here')
                let array = [];
                this.setState({
                    files
                }, () => {
                    this.uploadImages(files)
                })
            } else {
                if (imagefiles.length > 3) {
                    imagefiles.splice(3)
                    files.push(...imagefiles)
                    this.setState({
                        imagefiles: [],
                        files
                    }, () => {
                        this.uploadImages(files)
                    })
                }
            }
        } else {
            this.setState({
                imagefiles: []
            })
            swal({
                title: 'Maximum Upload three Product Images ',
                type: 'warning',
                animation: false,
                customClass: 'animated tada'
            })
        }

    }

    uploadImages = (files) => {
        const array = []
        // console.log(files, 'files here')
        if (files.length <= 3) {
            files.map((item, index) => {
                let reader = new FileReader();
                let file = item;
                reader.onloadend = () => {
                    array.push({ image: reader.result, indexNum: index })
                    console.log('image*********', reader.result)
                    this.setState({
                        imageUrls: array
                    }, () => {
                        // console.log(this.state.imageUrls, 'jmmmmmmmm')
                    });
                }
                reader.readAsDataURL(file)
            });
        } else {
            files.splice(3)
            console.log(files, 'files mmmmmmmmmmmmmmmmm')
            this.setState({ files }, () => {
                this.uploadImages(files)
            })
        }
    }

    getBase64ImageFromUrl = async (imageUrl) => {
        const res = await fetch(imageUrl);
        // console.log(res);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    };


    cancle(index) {
        const { files } = this.state;
        console.log('index', index)
        console.log('files**********', files)
        // console.log(imageUrls,'imageurls')
        files.splice(index, 1);
        // console.log('FileNumber', files)
        this.setState({
            files
        }, () => {
            this.uploadImages(this.state.files)
            console.log('Files', files)
        })

    }

    onImageLoaded = (image, pixelCrop) => {
        console.log('Image***', image);
        // this.imageRef = image;
        // this.state.imageRef = image;
        this.setState({ imageRef: image })
    };

    onCropComplete = async (crop, pixelCrop) => {
        console.log(' this.imageRef', this.state.imageRef)
        if (this.state.imageRef) {
            const croppedImageUrl = await this.getCroppedImg(
                // this.imageRef,
                this.state.imageRef,
                pixelCrop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl }, () => {
            });
        }
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        console.log('image', image);
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(file => {
                if (file) {
                    file.name = fileName;
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(file);
                    resolve(this.fileUrl);
                }
            }, "image/jpeg");
        });
    }

    onButtonClick = () => {
        this.setState({
            crop: {
                x: 20,
                y: 5,
                aspect: 1,
                height: 50,
            },
            disabled: true,
        });
    }


    addData() {
        console.log(this.props.currentUserUID, 'user here')
        // swal({
        //     onOpen: () => {
        //         swal.showLoading()
        //     }
        // })

        const { currentUserUID } = this.props;
        const { productName, brandName, imageUrls, quantity, model, code, summarySpecs, warranty, domestic, international,
            manufacture, productType, series, date, selectedValue, pdfFile, price, discount } = this.state

        imageUrls.map(item => {
            delete item.indexNum
        })
        console.log(pdfFile, 'product')
        var metadata = {
            contentType: 'application/pdf',
        };
        const that = this

        if (productName && brandName && quantity /* &&   imageUrls.length > 0  && summarySpecs  && pdfFile */ && model && code &&
            manufacture && productType && series && date && selectedValue && price && domestic && international) {

            if (pdfFile) {
                if (pdfFile.type === 'application/pdf') {
                    var filename = pdfFile.name
                    var storageRef = firebase.storage().ref('/pdfDocuments/' + filename);
                    var upload = storageRef.put(pdfFile, metadata)
                    upload.on('state_changed', function (snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        that.setState({ progressBar: progress })
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {
                        // Handle unsuccessful uploads
                    }, function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('File available at', downloadURL);

                            const productObj = {
                                name: productName,
                                brand: brandName,
                                images: imageUrls,
                                model: model,
                                code: code,
                                quantity: quantity,
                                domestic,
                                international,
                                warranty: warranty ? warranty : false,
                                summarySpecs: summarySpecs,
                                manufacture: manufacture,
                                productType: productType,
                                series: series,
                                date: date,
                                product: selectedValue,
                                pdf: downloadURL,
                                filename: filename ? filename : '',
                                featured: false,
                                userUid: currentUserUID,
                                price: price,
                                status: 'approved',
                                discount: discount ? discount : 'not available'
                            }

                            that.props.actions.addProductAction(productObj, currentUserUID)
                                .then((success) => {
                                    setTimeout(() => {
                                        History.push('/products')
                                    }, 1000);
                                })
                            console.log(productObj, 'productObj')
                            console.log(currentUserUID, 'currentUserUID')


                        });
                    });
                }
            }
            // else {
            //     swal({
            //         type: 'error',
            //         title: "Image type error",
            //         showConfirmButton: false,
            //         timer: 2000

            //     })
            // }

            // }
            // else {
            //     swal({
            //         type: 'error',
            //         title: "Enter pdf file",
            //         showConfirmButton: false,
            //         timer: 2000
            //     })
            // }

            // else {
            else if (!pdfFile) {
                const productObj = {
                    name: productName,
                    brand: brandName,
                    images: imageUrls,
                    model: model,
                    code: code,
                    domestic,
                    international,
                    warranty: warranty ? warranty : false,
                    quantity: quantity,
                    summarySpecs: summarySpecs,
                    manufacture: manufacture,
                    productType: productType,
                    series: series,
                    date: date,
                    product: selectedValue,
                    pdf: '',
                    filename: '',
                    featured: false,
                    userUid: currentUserUID,
                    price: price,
                    status: 'approved',
                    discount: discount ? discount : 'not available'
                }

                that.props.actions.addProductAction(productObj, currentUserUID)
                    .then((success) => {
                        setTimeout(() => {
                            History.push('/products')
                        }, 1000);
                    })
                console.log(productObj, 'productObj')
                console.log(currentUserUID, 'currentUserUID')
            }
            else {
                var text;
                if (!productName) {
                    text = "Please fill name"
                }
                else if (!brandName) {
                    text = "Please fill brand";
                }
                // else if (!imageUrls.length) {
                //     text = "Please drop images";
                // }
                else if (!model) {
                    text = "Please fill model";
                }
                else if (!code) {
                    text = "Please fill code";
                }
                else if (!quantity) {
                    text = "Please fill Product Quantity";
                }
                // else if (!summarySpecs) {
                //     text = "Please fill summary specs";
                // }
                else if (!manufacture) {
                    text = "Please fill manufacture";
                }
                else if (!productType) {
                    text = "Please fill product type";
                }
                else if (!series) {
                    text = "Please fill series";
                }
                else if (!date) {
                    text = "Please fill date";
                }
                else if (!selectedValue) {
                    text = "Please select new/used";
                }
                else if (!domestic) {
                    text = "Please fill delivery charges";
                }
                else if (!international) {
                    text = "Please fill delivery charges";
                }
                else if (!price) {
                    text = "Please fill price";
                }
                if (text) {
                    swal({
                        type: 'error',
                        title: text,
                        showConfirmButton: false,
                        timer: 2000,

                    })
                }
            }
        }
        console.log(this.state.pdfFile, 'file here')
    }

    cropImage(image) {
        console.log(image, 'image')
        this.setState({
            croppingImage: image.image,
            croppingImageIndex: image.indexNum,
            cropp: true
        })
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    crop() {
        const { croppingImageIndex, croppedImageUrl, imageUrls, files } = this.state
        console.log(files, 'image rukbkbk')
        console.log(imageUrls, 'iamshshbhdb')
        this.getBase64ImageFromUrl(croppedImageUrl)
            .then((result) => {
                const dataUri = this.dataURLtoFile(result)
                console.log(result)
                const obj = {
                    image: result,
                    indexNum: croppingImageIndex
                }
                imageUrls.splice(croppingImageIndex, 1, obj)
                if (files.length) {
                    files.splice(croppingImageIndex, 1, dataUri)
                    this.setState({ files })

                } else {
                    this.setState({ files: dataUri })

                }
                this.setState({ imageUrls, cropp: false, croppedImageUrl: '' })
            })
            .catch(err => console.error(err));
    }

    handleChange(value) {
        this.setState({
            selectedValue: value
        })

    }

    selectCategory(item) {
        if (item.data.subcategory && item.data.subcategory.length) {
            return item.data.subcategory.map((items) => {
                return (
                    <MenuItem value={items}>{items}</MenuItem>
                )
            })
        }
        if (item.data.name) {
            return (
                item.data.subcategory ?
                    this.subCategory(item.data.name)
                    :
                    <MenuItem value={item.data.name}>{item.data.name}</MenuItem>
            )
        }
    }

    subCategory(item) {
        return (
            <MenuItem>
                <MenuItem disabled value={''}>{item}</MenuItem>
            </MenuItem>
        )
    }

    render() {
        const { currentUser, cropp, productCatogeries, quantity, crop, files, imageUrls, croppedImageUrl, photoIndex,
            isOpen, croppedImages, cropping, croppingImage, productName, brandName, warranty, domestic, international,
            model, code, summarySpecs, manufacture, productType, series, date, price, discount, progressBar } = this.state

        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }

        const previewStyle = {
            display: 'inline',
            width: 120,
            height: 120,
            borderRadius: 3,
        };

        const reactDropStyle = {
            position: 'relative',
            width: 170,
            height: 170,
            borderWidth: 2,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 5,
            margin: '0px auto',
        }

        const ImagesDiv = {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'

        }

        const previewHeading = {
            color: 'grey'
        }

        return (
            <Containers>
                {
                    !currentUser ?
                        <div>
                            <div className={"ProductFormHead"} >Add Product</div>
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                        </div>
                        :

                        <div className="ProductDiv">
                            {
                                !cropp &&
                                <div className="FormDiv">
                                    <div>Add Product</div>
                                    <div>
                                    </div>
                                    <div className={'product-Details'}>
                                        <div>
                                            Product details
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                label={'Product Name'}
                                                value={productName}
                                                placeholder="Product Name"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={(e) => { this.setState({ productName: e.target.value }) }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                label={'Brand Name'}
                                                value={brandName}
                                                placeholder="Brand Name"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={(e) => { this.setState({ brandName: e.target.value }) }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                value={model}
                                                label={'Product Model'}
                                                placeholder="Product Model"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={(e) => { this.setState({ model: e.target.value }) }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                value={code}
                                                label={'Product Code'}
                                                placeholder="Product Code"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={(e) => { this.setState({ code: e.target.value }) }}
                                            />
                                        </div>
                                        <div className="quantity">
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                value={quantity}
                                                type={'number'}
                                                label={'Product Quantity'}
                                                placeholder="Product Quantity"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={(e) => { this.setState({ quantity: e.target.value }) }}
                                            />
                                        </div>
                                        <div>
                                            Product Specification
                                    </div>
                                        <div>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Summary Specification"
                                                placeholder={'Summary Specification e.g. AC power, 24V DC input 12 points, Ry output 12 points, I/O free'}
                                                className="Input"
                                                multiline
                                                rows="3"
                                                value={summarySpecs}
                                                onChange={(e) => this.setState({ summarySpecs: e.target.value })}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </div>
                                        <div>
                                            Product Images
                                </div>
                                        <div>
                                            <div>
                                                <ReactDropzone
                                                    accept="image/*"
                                                    onDrop={this.onPreviewDrop}
                                                    className="DropZone"
                                                    style={reactDropStyle}

                                                >
                                                    <div className={'preview'}>
                                                        Drop an image, get a preview!
                                            </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={'plus'} size={'2x'} className={'plus-icon'} />
                                                    </div>
                                                </ReactDropzone>
                                                {files.length > 0 &&
                                                    <Fragment>
                                                        <h4 style={previewHeading}>Previews</h4>
                                                        <div style={ImagesDiv}>
                                                            {imageUrls.length ?
                                                                imageUrls.map(image => {
                                                                    return <div className={'imageDivStyle bg'}>
                                                                        <div class="overlay" onClick={() => this.cropImage(image)}>
                                                                            <span>
                                                                                --------
                                                                <FontAwesomeIcon icon={'cut'} />
                                                                                --------
                                                            </span>
                                                                        </div>
                                                                        <div className="cancleImage" onClick={() => { this.cancle(image.indexNum) }}>
                                                                            X
                                                        </div>
                                                                        <div>
                                                                            <img
                                                                                alt="Preview"
                                                                                // key={file.preview}
                                                                                src={image.image}
                                                                                style={previewStyle}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                })
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </Fragment>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {'Warranty Period'}
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Warranty"
                                                placeholder={'Warranty Period'}
                                                className="Input"
                                                value={warranty}
                                                onChange={(e) => this.setState({ warranty: e.target.value })}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div className={'v-row'}>

                                    </div>
                                    <div className={'product-images'}>
                                        <div>
                                            Manufacturer
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                value={manufacture}
                                                label={'Manufacturer'}
                                                placeholder="Manufacturer"
                                                onChange={(e) => this.setState({ manufacture: e.target.value })}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </div>
                                        <div>
                                            <FormControl style={{ width: '100%' }} className={'Input'} variant="outlined">
                                                <InputLabel
                                                    ref={ref => {
                                                        this.InputLabelRef = ref;
                                                    }}
                                                    htmlFor="outlined-age-simple"
                                                >
                                                    Product Category
                                                </InputLabel>
                                                <Select
                                                    value={productType}
                                                    onChange={(e) => this.setState({ productType: e.target.value })}
                                                    input={
                                                        <OutlinedInput
                                                            // labelWidth={this.state.labelWidth}
                                                            name="product Category"
                                                            id="outlined-age-simple"
                                                        />
                                                    }
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {/* <MenuItem value={'IT Devices & Equipment'}>{'IT Devices & Equipment'}</MenuItem>
                                                    <MenuItem value={'Sensors & Measurements'}>{'Sensors & Measurements'}</MenuItem>
                                                    <MenuItem value={'Drives & Inverters'}>{'Drives & Inverters'}</MenuItem>
                                                    <MenuItem value={'Power Supply'}>{'Power Supply'}</MenuItem>
                                                    <MenuItem>
                                                        <MenuItem disabled value={''}>{'Automation Systems'}</MenuItem>
                                                    </MenuItem>
                                                    <MenuItem value={'PLC'}>{'PLC'}</MenuItem>
                                                    <MenuItem value={'Control system'}>{'Control system'}</MenuItem> */}
                                                    {
                                                        productCatogeries &&
                                                            productCatogeries.length ?
                                                            productCatogeries.map((items) => {
                                                                return (
                                                                    this.selectCategory(items)
                                                                    // items.data.category &&
                                                                    // items.data.category.length ?
                                                                    // items.category.map((item) => {
                                                                    //     return this.subCategory(item)
                                                                    // })
                                                                    // :
                                                                    // null
                                                                )
                                                            })
                                                            :
                                                            null
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                value={series}
                                                label={'Series'}
                                                placeholder="Series"
                                                margin="normal"
                                                onChange={(e) => this.setState({ series: e.target.value })}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div>
                                            Date Of Production
                                </div>
                                        <div>
                                            <TextField
                                                id="outlined-bare"
                                                className="Input"
                                                type={'date'}
                                                value={date}
                                                margin="normal"
                                                onChange={(e) => this.setState({ date: e.target.value })}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div>
                                            <Radio
                                                checked={this.state.selectedValue === 'New'}
                                                onChange={(e) => this.handleChange(e.target.value)}
                                                value="New"
                                                name="radio-button"
                                                aria-label="New"
                                            />
                                            New
                                    <Radio
                                                checked={this.state.selectedValue === 'Used'}
                                                onChange={(e) => this.handleChange(e.target.value)}
                                                value="Used"
                                                name="radio-button"
                                                aria-label="Used"
                                            />
                                            Used
                                </div>
                                        <div>
                                            <DropzoneComponent config={config}
                                                eventHandlers={eventHandlers}
                                                djsConfig={djsConfig}
                                            />
                                        </div>
                                        <div>
                                            Product Pricing
                                </div>
                                        <div>
                                            <TextField
                                                id="outlined-adornment-amount"
                                                variant="outlined"
                                                label="Price"
                                                className="Input"
                                                type={'number'}
                                                value={price}
                                                onChange={(e) => this.setState({ price: e.target.value })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-adornment-amount"
                                                variant="outlined"
                                                label="Discount Price"
                                                className="Input"
                                                type={'number'}
                                                value={discount}
                                                onChange={(e) => this.setState({ discount: e.target.value })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>

                                        <div>
                                            {'Delivery Charges'}
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-adornment-amount"
                                                variant="outlined"
                                                label="Domestic"
                                                className="Input"
                                                type={'number'}
                                                value={domestic}
                                                onChange={(e) => this.setState({ domestic: e.target.value })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="outlined-adornment-amount"
                                                variant="outlined"
                                                label="International"
                                                className="Input"
                                                type={'number'}
                                                value={international}
                                                onChange={(e) => this.setState({ international: e.target.value })}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                            />
                                        </div>
                                        {
                                            discount && price &&
                                            <div style={{
                                                textAlign: 'left'
                                            }}>
                                                <span>
                                                    Price After Discount:
                                               </span>
                                                <span>
                                                    {
                                                        (price - discount) > 0 ?
                                                            price - discount :
                                                            <span> ∞ </span>
                                                    }
                                                </span>
                                            </div>
                                        }
                                    </div>
                                    {
                                        progressBar &&
                                            progressBar >= 0 ?
                                            <Progress
                                                percent={progressBar}
                                            />
                                            :
                                            <div className={'images-preview'}>
                                                <button onClick={() => this.addData()}>Add</button>
                                            </div>
                                    }
                                </div>
                            }
                            {
                                cropp &&
                                <div className={'crop-image'}>
                                    <div>
                                        Image Crop
                        </div>
                                    <div className={'preview-image'}>
                                        <div>
                                            Preview Image:
                                </div>
                                        <div>
                                            {
                                                croppedImageUrl &&
                                                <img src={croppedImageUrl} />
                                            }
                                        </div>
                                    </div>
                                    <div className={'crop'}>
                                        <div>
                                            {
                                                (
                                                    <ReactCrop
                                                        className={'cropImage'}
                                                        src={croppingImage}
                                                        crop={crop}
                                                        onImageLoaded={this.onImageLoaded}
                                                        onComplete={this.onCropComplete}
                                                        onChange={this.onCropChange}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className={'crop-button'}>
                                        <div>
                                            <Button
                                                variant={'raised'}
                                                className={'crop-btn'}
                                                onClick={() => this.setState({ cropp: false, croppedImageUrl: '' })}
                                            >
                                                Back
                                </Button>
                                            <Button
                                                variant={'raised'}
                                                className={'crop-btn'}
                                                onClick={() => this.crop()}
                                            >
                                                Crop
                                </Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                }
            </Containers>

        );
    }
}


function mapStateToProps(states) {
    console.log(states.authReducer.CURRENTUSERUID, 'states.authReducer.CURRENTUSERUID')
    return ({
        currentUser: states.authReducer.CURRENTUSER,
        currentUserUID: states.authReducer.CURRENTUSERUID,
        productCatogeries: states.aboutWebsiteReducer.PRODUCTCATOGERY,
        uid: console.log('******************', states.authReducer.CURRENTUSERUID),
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addProductAction
        }, dispatch)
    }
    // return ({
    //     ProductAdd: (products, user) => {
    //         dispatch(addProductAction(products, user));
    //     }
    // })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);