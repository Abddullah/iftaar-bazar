import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import firebase from '../../../Config/Firebase/firebase'
import Pagination from '../../../Component/Pager/Pager';
import History from '../../../History/History';
import { Button, Input } from '@material-ui/core';
import { ClipLoader } from 'react-spinners';
import Dialog from '@material-ui/core/Dialog';
import { AddOurSellers, deleteSeller } from '../../../store/action/adminAction'
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import '../../../Component/Admin/UserCard/UserCard.css'
import { bindActionCreators } from 'redux';


const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});


class OurSellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }

    }

    componentWillReceiveProps(props) {
        const { ourSeller } = props
        if (ourSeller) {
            this.setState({ ourSeller })
        }
    }

    componentDidMount() {
        const { ourSeller } = this.props
        if (ourSeller) {
            this.setState({ ourSeller })
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    previewFile() {
        // var preview = document.querySelector('img');
        var result = null
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", () => {
            result = reader.result;
            this.setState({ image: reader.result })
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
        console.log(result, 'reader as data url')


    }

    Image(image) {
        console.log(image.value, 'Image here')
    }

    async dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = await arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = await bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    add() {
        const { name, description, image } = this.state
        console.log(name, description, image, 'sab ha idhar')
        if (name && description && image) {
            const { AddOurSellers } = this.props.actions
            var obj = {
                name,
                description,
                image,
                time: Date.now()
            }
            AddOurSellers(obj)
                .then(() => {
                    this.setState({ open: false })
                })
        }
        this.setState({ name: '', description: '', image: null })
    }

    myDialog() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
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
                            id="outlined-multiline-static"
                            label="Description"
                            style={{ width: '100%' }}
                            multiline
                            onChange={this.handleChange('description')}
                            rows="4"
                            value={this.state.description}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <Input
                            onChange={() => this.previewFile()}
                            type={'file'}
                        />
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

    delete(item) {
        const { deleteSeller } = this.props.actions

        deleteSeller(item)
            .then(() => {
                const { ourSeller } = this.state
                if (ourSeller) {
                    ourSeller.map((items, index) => {
                        if (items.time === item.time) {
                            ourSeller.splice(index, 1)
                            this.setState({ ourSeller })
                        }
                    })
                }
            })
    }

    _table = (item) => {
        const { user } = this.state
        console.log(item, 'item here ttthsjdhah')
        return (
            <tr className={'TBody'}>
                <td className={'Name'}>
                    {
                        item.image ?
                            <img src={item.image} />
                            :
                            <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                    }
                </td>
                <td className={'Date'}>{item.name}</td>
                <td className={'Name'}>{item.description}</td>
                {
                    <td className={'Btn'}>
                        <Button onClick={() => this.delete(item)} variant="outlined" color={'primary'}>
                            {'Delete'}
                        </Button>
                    </td>
                }
            </tr>
        )
    }

    render() {
        const { open, ourSeller } = this.state
        return (
            <AdminDashboard>
                <div className={'AdminUserDiv'}>
                    <div className={"Users"} style={{ flexBasis: '100%' }}>
                        Our Sellers
                        <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => this.setState({ open: true })}> ADD</Button>
                    </div>
                    <div className={"Sellers"}>
                        <table>
                            <thead>
                                <tr className={'THead'}>
                                    <th className={'Date'}>Image</th>
                                    <th className={'Date'}>Name</th>
                                    <th className={'Name'}>Description</th>
                                    <th className={'Btn'}>Delete</th>
                                </tr>
                            </thead>
                            {
                                ourSeller &&
                                    ourSeller.length ?
                                    <tbody>
                                        {
                                            ourSeller &&
                                            ourSeller.map(item => {
                                                return this._table(item)
                                            })
                                        }
                                    </tbody>
                                    :
                                    null
                            }
                        </table>
                    </div>
                </div>
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
        allOrders: states.orderReducer.ALLORDERS,
        ourSeller: states.authReducer.OURSELLERS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            AddOurSellers, deleteSeller
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OurSellers);