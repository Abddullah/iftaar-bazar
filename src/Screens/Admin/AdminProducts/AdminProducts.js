import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import './AdminProducts.css'
import Pagination from '../../../Component/Pager/Pager';
import { ClipLoader } from 'react-spinners';
import { Button, Input } from '@material-ui/core';
import History from '../../../History/History';
import FabIcon from '../../../Component/FabIcon/fabIcon'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import 'filepond/dist/filepond.min.css';
import { registerPlugin, FilePond } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: null,
            pages: 3,
            pageProduct: [],
            number: 10,
            searchText: '',
            unit: '',
            searchArr: [],
            images: [1]
        }

        this.pageNum = this.pageNum.bind(this);
        this._details = this._details.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillMount() {
        const { allProducts } = this.props;
        const { number } = this.state;
        if (allProducts && allProducts.length) {
            setTimeout(() => {
                allProducts.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.date).getTime() - new Date(a.date).getTime()
                    }
                );
                const pages = Math.ceil(allProducts.length / number)
                const pageArr = allProducts.slice(0, number)
                this.setState({ allProducts, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allProducts', allProducts)
    }

    componentWillReceiveProps(props) {
        const { allProducts } = props;
        const { number } = this.state;
        if (allProducts && allProducts.length) {
            setTimeout(() => {
                allProducts.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.date).getTime() - new Date(a.date).getTime()
                    }
                );
                const pages = Math.ceil(allProducts.length / number)
                const pageArr = allProducts.slice(0, number)
                this.setState({ allProducts, pages, pageProduct: pageArr })
            }, 100)
        }
        console.log('allProducts', allProducts)
    }

    pageNum(num) {
        const { allProducts, number } = this.state;
        const pageArr = allProducts.slice(num * number, num * number + number)
        this.setState({ pageProduct: pageArr })
    }

    _details(item) {
        History.push({
            pathname: `/productDetails/${item.key}`,
            state: item
        })
    }


    search(val) {
        const { allProducts, searchArr } = this.state;
        this.setState({ searchText: val })
        var arr = []
        allProducts.map(item => {
            if ((item.data.name.toUpperCase()).startsWith(val.toUpperCase()) || (item.data.brand.toUpperCase()).startsWith(val.toUpperCase())) {
                arr.push(item)
                console.log('arr', arr)
                this.setState({ searchArr: arr })
            } else {
                if (arr.indexOf(item) !== -1) {
                    arr.splice(item, 1)
                }
                this.setState({ searchArr: arr })
            }
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    _update() {
        const { images } = this.state;
        // var arr = [];
        var file = images;
        var reader = new FileReader();

        reader.onloadend = () => {
            this.setState({ ProductImages: reader.result })
            console.log(reader.result, 'result here')
        }
        if (file) {
            reader.readAsDataURL(file);
        }


    }

    _cancle() {
        this.setState({ images: '' })
    }

    myFile(err, item) {
        console.log(item.file, 'file')
        this.setState({ images: item.file }, () => {
            console.log(this._update(), 'updated image')
        })

    }


    myDialog() {
        const { images } = this.state
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <div>
                        {'Add Products'}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div style={{ width: '100%' }}>
                        <FilePond
                            allowMultiple={false}
                            // onremovefile={(file) => this.removeFile(file)}
                            onaddfile={(err, file) => this.myFile(err, file)}
                            maxFiles={1}

                        // beforeAddFile={(file) => this.beforeAddFile(file)}
                        // onwarning={(err, file) => this.onwarning(err, file)}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            style={{ width: '100%' }}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        <TextField
                            id="outlined-name"
                            label="Price"
                            type={'number'}
                            style={{ width: '100%' }}
                            value={this.state.price}
                            onChange={this.handleChange('price')}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                    {/* <div style={{ width: '100%', margin: '0 auto' }}> */}
                        <Select
                            native
                            value={this.state.unit}
                            onChange={(e) => this.setState({unit: e.target.value})}
                            // onChange={(e) => console.log("Unit****", e.target.value)}
                            style={{width: '100%', paddingRight: 0}}
                            className={"UnitDropdown"}
                            placeholder={"Select Unit"}
                            input={
                                <OutlinedInput
                                    name="Unit"
                                    labelWidth={0}
                                    id="outlined-age-native-simple"
                                />
                            }
                        >
                            <option value={""}>Select Unit</option>
                            <option value={"kg"}>Kg</option>
                            <option value={"dozen"}>Dozen</option>
                        </Select>

                    </div>
                </DialogContent>
                <div className={"Btns"}>
                    <Button color={"secondary"} variant={"outlined"} onClick={this.handleClose}>
                        Cancle
                    </Button>
                    <Button color={"secondary"} variant={"outlined"} onClick={() => this.add()}>
                        Add
                    </Button>
                </div>
            </Dialog>
        )
    }

    _table = (item) => {
        return (
            <tr className={'TBody'}>
                <td className={'Name'}>
                    {
                        item.images ?
                            <img src={item.image} />
                            :
                            <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                    }
                </td>
                <td className={'OrderID'}>{item.name}</td>
                <td className={'Number'}>{item.price}</td>
                <td className={'Btn'}>
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => this._details(item)}>Details</Button>
                </td>
            </tr>
        )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addProducts() {
        this.setState({ open: true })
    }

    render() {
        const { orderArr, searchText, pageProduct, pages, searchArr, allProducts, open } = this.state;
        console.log('orderArr', orderArr)
        return (
            <AdminDashboard>
                {
                    pageProduct.length ?

                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Products
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                            </div>
                            <div className={"Search-Field"}>
                                <input placeholder="Search by name or brand" value={searchText} onChange={(e) => { this.search(e.target.value) }} />
                            </div>
                            <div className={"Sellers"}>
                                <table>
                                    <thead>
                                        <tr className={'THead'}>
                                            <th className={'Name'}>Photo</th>
                                            <th className={'OrderID'}>Name</th>
                                            <th className={'Number'}>Price</th>
                                            <th className={'Btn'}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !searchText && pageProduct && pageProduct.length ?
                                                pageProduct.map(item => {
                                                    return this._table(item)
                                                })
                                                :
                                                null
                                        }
                                        {
                                            searchText && searchArr && searchArr.length ?
                                                searchArr.map(item => {
                                                    return this._table(item)
                                                })
                                                :
                                                null
                                        }
                                    </tbody>
                                </table>
                                {
                                    searchText && searchArr && !searchArr.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No product found</div>
                                        :
                                        null
                                }
                            </div>
                            <div className={"Pagination"}>
                                {
                                    !searchText && pageProduct.length && allProducts.length > 10 ?
                                        <Pagination pages={pages} pageNum={this.pageNum} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Products
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#3f984f'}
                                    loading={true}
                                />
                            </div>
                        </div>
                }
                {
                    <FabIcon addProducts={() => this.addProducts()} />
                }
                {
                    open &&
                    this.myDialog()
                }
            </AdminDashboard >
        )
    }
}


function mapStateToProps(states) {
    return ({
        allProducts: states.productReducer.ALLPRODUCTS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);