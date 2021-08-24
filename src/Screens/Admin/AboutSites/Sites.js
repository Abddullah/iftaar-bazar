import React, { Component } from 'react';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Sites.css';
import History from '../../../History/History';
import { aboutWebsiteAction, productCatogery, deleteproductCatogery, modifyproductCatogery } from '../../../store/action/adminAction';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
// import SendMail from './SendMail';
import { ClipLoader } from 'react-spinners';
import TextField from '@material-ui/core/TextField';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { faPlusCircle, faCross, faMinusCircle, faEdit, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusCircle, faCross, faMinusCircle, faEdit, faBoxOpen);




const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '44%',
        float: 'left'
    },
    textFieldDescription: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%'
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 400,
    },
});



class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            index: '',
            // category: [],
            addCategory: false,
            category: {},
            subCategoryCond: false,
            aboutWebsiteEdit: false,
            siteName: '',
            websiteWelcome: '',
            description: '',
            productCatogeries: '',
            // categoryObj: {
            //     name: ''
            // },
            subCategoryMap: []
        }
        this._addaboutWebsite = this._addaboutWebsite.bind(this);
        this._cancleAboutWebsite = this._cancleAboutWebsite.bind(this);
        this._addCategory = this._addCategory.bind(this);
    }

    componentWillMount() {
        const { aboutWebsite, productCatogeries } = this.props;
        if (aboutWebsite) {
            this.setState({
                siteName: aboutWebsite.siteName,
                websiteWelcome: aboutWebsite.websiteWelcome,
                description: aboutWebsite.description,
                productCatogeries
            })
        }
    }

    componentWillReceiveProps(props) {
        const { aboutWebsite, productCatogeries } = props;
        if (aboutWebsite) {
            this.setState({
                siteName: aboutWebsite.siteName,
                websiteWelcome: aboutWebsite.websiteWelcome,
                description: aboutWebsite.description,
                productCatogeries,
            })
        }
    }

    _addCategory() {
        const { category } = this.state;
        console.log('Category*******', category)
        if (category.name) {
            this.props.actions.productCatogery(category)
                .then(() => {
                    const { productCatogeries } = this.props;
                    this.setState({ subCategoryMap: [], category: {}, productCatogeries, addCategory: false })
                })
        }
    }

    _cancle = () => {
        this.setState({ item: '', index: '', subCategoryMap: [], category: {}, addCategory: false })
    }

    _addSubCategory = () => {
        const { subCategoryMap, category } = this.state;

        if (subCategoryMap.length == 0) {
            category.subcategory = []
            this.setState({ category, subCategoryMap: ['subCategory1'] })
        }
        else {
            var length = subCategoryMap.length;
            subCategoryMap.push(`subCategory${length}`)
            this.setState({ subCategoryMap })
        }
    }

    _subSubCategory = () => {
        const { subCategoryMap } = this.state;
        if (subCategoryMap.length > 0) {
            var length = subCategoryMap.length - 1;
            subCategoryMap.splice(length)
            this.setState({ subCategoryMap })
        }
    }

    _addaboutWebsite() {
        const { siteName, websiteWelcome, description } = this.state;
        const obj = {
            siteName,
            websiteWelcome,
            description,
        }
        this.props.actions.aboutWebsiteAction(obj)
            .then(() => {
                this.setState({
                    aboutWebsiteEdit: false,
                })
            })
        console.log('Run******', obj)
    }

    _cancleAboutWebsite() {
        this.setState({
            aboutWebsiteEdit: false,
        })
    }


    _editCategory = (item, index) => {
        const { subCategoryMap, category } = this.state;
        console.log('Item******', item, index)
        if (item.data.name) {
            this.setState({ category: item.data, addCategory: true, subCategoryMap: [], item, index })
            if (item.data.subcategory) {
                item.data.subcategory.map((sub, i) => {
                    subCategoryMap.push(`subCategory${i + 1}`)
                    this.setState({ subCategoryMap })
                })
            }
        }

    }

    _saveCategory = () => {
        const { category, productCatogeries, index, item } = this.state;
        console.log('Category*******', category)
        if (category.name) {
            item.data = category;
            productCatogeries.splice(index, 1, item)
            this.props.actions.modifyproductCatogery(item, productCatogeries)
                .then(() => {
                    const { productCatogeries } = this.props;
                    this.setState({ subCategoryMap: [], category: {}, productCatogeries, addCategory: false })
                })
        }

    }

    _deleteCategory = (item, index) => {
        console.log('Item******', item, index)
        const { productCatogeries } = this.props;
        if (productCatogeries && productCatogeries.length && productCatogeries.length > 1) {
            productCatogeries.splice(index, 1)
            this.props.actions.deleteproductCatogery(item, productCatogeries)
                .then(() => {
                    this.setState({ productCatogeries })
                })
        }
    }

    _changehandleCategory = (val) => {
        const { category } = this.state;
        category.name = val;
        this.setState({ category });
    }

    _changehandle = (val, index) => {
        const { category } = this.state;
        console.log('Index***', index)
        category.subcategory.splice(index, 1, val)
        console.log('category*', category)
        this.setState({ category });
    };


    render() {
        const { classes } = this.props;
        const { category, addCategory, productCatogeries, item } = this.state;
        const { contact, role, subCategoryCond, aboutWebsiteEdit, siteName, websiteWelcome, description, subCategoryMap } = this.state;
        console.log('subCategoryCondcategory', category)
        return (
            <AdminDashboard>
                {
                    // contact && role ?
                    websiteWelcome ?
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                About Website
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                            </div>


                            <div className={'About-Web'}>
                                <div style={{ width: '50%', float: 'left' }}>
                                    <div style={{ width: '100%', fontSize: 20, fontWeight: '400' }}>Product Categories</div>
                                    {
                                        addCategory ?
                                            <div className={'Product_Catogery'}>
                                                <input placeholder={'Enter Category'} value={category.name ? category.name : ''} onChange={(e) => this._changehandleCategory(e.target.value)} />
                                                <div style={{ width: '100%' }}>
                                                    <div className={'Product_SubCatogery'}>
                                                        {
                                                            subCategoryMap && subCategoryMap.length ?
                                                                subCategoryMap.map((item, index) => {
                                                                    return <input placeholder={'Enter Subcategory'} value={category.subcategory[index]} onChange={(e) => this._changehandle(e.target.value, `${index}`)} />
                                                                })
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <div className={'Product_SubCatogeryBtn'}>
                                                        <div>
                                                            <FontAwesomeIcon
                                                                onClick={this._addSubCategory}
                                                                size='2x'
                                                                icon={'plus-circle'}
                                                            />
                                                        </div>
                                                        <div>
                                                            <FontAwesomeIcon
                                                                onClick={this._subSubCategory}
                                                                size='2x'
                                                                icon={'minus-circle'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        addCategory ?
                                            <div className={'Category_Btn'}>
                                                {
                                                    item ?
                                                        <Button color={"primary"} variant={"outlined"} onClick={this._saveCategory}>Save</Button>
                                                        :
                                                        <Button color={"primary"} variant={"outlined"} onClick={this._addCategory}>Add</Button>
                                                }
                                                <Button color={"secondary"} variant={"outlined"} onClick={this._cancle}>Cancle</Button>
                                            </div>
                                            :
                                            <div className={'Category_Btn'}>
                                                <Button color={"primary"} variant={"outlined"} onClick={() => this.setState({ addCategory: true })}>Add Category</Button>
                                            </div>
                                    }
                                    {
                                        productCatogeries && productCatogeries.length ?
                                            productCatogeries.map((item, index) => {
                                                return <div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            style={{ cursor: 'pointer' }}
                                                            color={'#043D81'}
                                                            onClick={() => this._editCategory(item, index)}
                                                            size='1x'
                                                            icon={'edit'}
                                                        />
                                                        &nbsp; &nbsp;
                                                        <FontAwesomeIcon
                                                            style={{ cursor: 'pointer' }}
                                                            color={'#f53657'}
                                                            onClick={() => this._deleteCategory(item, index)}
                                                            size='1x'
                                                            icon={'box-open'}
                                                        />
                                                        &raquo; {item.data.name ? item.data.name : null}
                                                    </div>
                                                    {
                                                        item.data.subcategory && item.data.subcategory.length ?
                                                            item.data.subcategory.map((subItem, subIndex) => {
                                                                return <div>
                                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &raquo; {subItem}
                                                                </div>
                                                            })
                                                            :
                                                            null
                                                    }
                                                </div>
                                            })
                                            :
                                            null
                                    }
                                </div>


                                <div style={{ width: '50%', float: 'left' }}>
                                    <div style={{ width: '100%', float: 'left' }}>
                                        <div style={{ width: '100%', fontSize: 20, fontWeight: '400' }}>Website Information</div>
                                        {
                                            !aboutWebsiteEdit ?
                                                <div style={{ width: '100%' }}>
                                                    <div className={classes.textField}>
                                                        <b>Website Link</b>
                                                    </div>
                                                    <div className={classes.textField}>
                                                        <b>Website Welcome</b>
                                                    </div>
                                                    <div className={classes.textField}>
                                                        {/* www.teqxc.com */}
                                                        {siteName}
                                                    </div>
                                                    <div className={classes.textField}>
                                                        {/* Welcome to Teq Exchange. */}
                                                        {websiteWelcome}
                                                    </div>
                                                </div>
                                                :
                                                <div style={{ width: '100%' }}>
                                                    <TextField
                                                        id="outlined-email-input"
                                                        label="Site"
                                                        value={siteName}
                                                        className={classes.textField}
                                                        onChange={(e) => this.setState({ siteName: e.target.value })}
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        id="outlined-email-input"
                                                        label="Website Name"
                                                        value={websiteWelcome}
                                                        className={classes.textField}
                                                        onChange={(e) => this.setState({ websiteWelcome: e.target.value })}
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        margin="normal"
                                                        variant="outlined"
                                                    />
                                                </div>
                                        }
                                        <div style={{ width: '100%' }}>

                                        </div>
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        {
                                            !aboutWebsiteEdit ?
                                                <div className={classes.textFieldDescription}>
                                                    <b>Description</b>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            !aboutWebsiteEdit ?
                                                <div className={classes.textFieldDescription}>
                                                    {description}
                                                    {/* Teq Exchange is a secure marketplace for buyers and sellers of industrial products to exchange resources. With the constant requirements for competitive solutions,
                                                     Teq Exchange aims to provide a platform where you can source for industrial parts to complete your required solutions at an affordable price. Unlike conventional portals,
                                                      sellers registered on Teq Exchange are required to go through a thorough qualification process before their products can be listed on our classified directory.
        In order to ensure fulfillment of these solutions, transacted payments are held in trust until goods are delivered and verified by buyer.
         This is to ensure that the delivered industrial products are in compliance to our portal description. Hence, the interests of both sellers and buyers are protected.
        Teq Exchange was founded on 7 Nov 2018 with the mission of enabling industrial products to be traded safely between buyers and sellers all over the world. Our founders have more than 25 years of experience each in the technical industry. */}
                                                </div>
                                                :
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="About Website"
                                                    multiline
                                                    rows="5"
                                                    // defaultValue="Default Value"
                                                    value={description}
                                                    className={classes.textFieldDescription}
                                                    onChange={(e) => this.setState({ description: e.target.value })}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                        }
                                        {
                                            aboutWebsiteEdit ?
                                                <div className={'About_Site_Btn'}>
                                                    <Button color={"primary"} variant={"outlined"} onClick={this._addProductCategory}>Save</Button>
                                                    <Button color={"primary"} variant={"outlined"} onClick={this._cancleAboutWebsite}>Cancle</Button>
                                                </div>
                                                :
                                                <div className={'About_Site_Btn'}>
                                                    <Button color={"primary"} variant={"outlined"} onClick={() => this.setState({ aboutWebsiteEdit: true })}>Edit</Button>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                About
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                        </div>
                }
            </AdminDashboard>
        )
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        aboutWebsite: states.aboutWebsiteReducer.ABOUTWEBSITE,
        productCatogeries: states.aboutWebsiteReducer.PRODUCTCATOGERY
    })
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            aboutWebsiteAction, productCatogery, deleteproductCatogery, modifyproductCatogery
        }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(About));