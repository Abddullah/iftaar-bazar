import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sellers.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import Pagination from '../../../Component/Pager/Pager';
import { ClipLoader } from 'react-spinners';
import AlertDialog from '../../../Component/Admin/UserCard/UserCard';
import SellerDetail from '../../../Component/Admin/UserCard/SellerCard';
import History from '../../../History/History';
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux';
import { editSeller } from '../../../store/action/adminAction'


class Sellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: null,
            pages: 3,
            pageUser: [],
            usersArr: [],
            number: 10,
            searchArr: null,
            roleArr: [],
            searchText: '',
            user: '',
            unApproved: []
        }

        this.pageNum = this.pageNum.bind(this);
        this.search = this.search.bind(this);
        this._select = this._select.bind(this);
    }

    componentWillMount() {
        const { allUser, allSeller, modifyName } = this.props;
        const { number, unApproved, } = this.state;
        var arr = [];
        var arr2 = [];
        if (allUser && allUser.length) {
            setTimeout(() => {
                allUser.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.signupDate).getTime() - new Date(a.data.signupDate).getTime()
                    }
                );
                const pages = Math.ceil(allUser.length / number)
                const pageArr = allUser.slice(0, number)
                setTimeout(() => {
                    console.log('PageArrrrr', pageArr);
                    allUser.map(item => {
                        console.log('Time*****', new Date(item.data.signupDate).getTime())
                        if (item.data.isApproved !== 'true') {
                            // unApproved.push(arr);
                            arr.push(item); //nabeel code 

                            this.setState({ unApproved: arr })
                        }
                    })
                    this.setState({ allUser, pages, pageUser: pageArr })
                }, 100)
            }, 100)
        }
        if (allSeller && allSeller.length) {
            setTimeout(() => {
                allSeller.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.signupDate).getTime() - new Date(a.data.signupDate).getTime()
                    }
                );
                const SellerPages = Math.ceil(allSeller.length / number)
                const pageArr = allSeller.slice(0, number)
                console.log('PageArrrrr', pageArr);
                setTimeout(() => {
                    allSeller.map(item => {
                        console.log('Time*****', new Date(item.data.signupDate).getTime())
                        console.log(item, 'itemsjdbkfbkjbkjbdbhs hsdbfh')
                        // unApproved.push(arr);  //wasi code 
                        arr2.push(item);  //nabeel code
                        this.setState({ allSeller: arr2 })
                    })
                    this.setState({ allSeller, SellerPages, pageSeller: pageArr })
                }, 100)
            }, 100)
        }

        if (modifyName && allSeller && allSeller.length && allUser && allUser.length) {
            allSeller.map((items, index) => {
                if (items.data.userUid === modifyName.userUid) {
                    allSeller[index].data.firstName = modifyName.firstName
                    allSeller[index].data.lastName = modifyName.lastName

                    this.setState({ allSeller })
                }
            })
            allUser.map((items, index) => {
                if (items.data.userUid === modifyName.userUid) {
                    allUser[index].data.firstName = modifyName.firstName
                    allUser[index].data.lastName = modifyName.lastName

                    this.setState({ allUser })
                }
            })
        }
    }

    componentWillReceiveProps(props) {
        const { allUser, allSeller, modifyName } = props;
        const { number, unApproved } = this.state;
        var arr = [];
        var arr2 = [];
        if (allUser && allUser.length) {
            setTimeout(() => {
                allUser.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.signupDate).getTime() - new Date(a.data.signupDate).getTime()
                    }
                );
                const pages = Math.ceil(allUser.length / number)
                const pageArr = allUser.slice(0, number)
                console.log('PageArrrrr', pageArr);
                setTimeout(() => {
                    allUser.map(item => {
                        console.log('Time*****', new Date(item.data.signupDate).getTime())
                        if (item.data.isApproved !== 'true') {
                            console.log(item, 'itemsjdbkfbkjbkjbdbhs hsdbfh')
                            // unApproved.push(arr);  //wasi code 
                            arr.push(item);  //nabeel code
                            this.setState({ unApproved: arr })
                        }
                    })
                    this.setState({ allUser, pages, pageUser: pageArr })
                }, 100)
            }, 100)
        }
        if (allSeller && allSeller.length) {
            setTimeout(() => {
                allSeller.sort(
                    function (a, b) {
                        // return a.time - b.time
                        return new Date(b.data.signupDate).getTime() - new Date(a.data.signupDate).getTime()
                    }
                );
                const SellerPages = Math.ceil(allSeller.length / number)
                const pageArr = allSeller.slice(0, number)
                console.log('PageArrrrr', pageArr);
                setTimeout(() => {
                    allSeller.map(item => {
                        console.log('Time*****', new Date(item.data.signupDate).getTime())
                        console.log(item, 'itemsjdbkfbkjbkjbdbhs hsdbfh')
                        // unApproved.push(arr);  //wasi code 
                        arr2.push(item);  //nabeel code
                        this.setState({ allSeller: arr2 })
                    })
                    this.setState({ allSeller, SellerPages, pageSeller: pageArr })
                }, 100)
            }, 100)
        }

        if (modifyName && allSeller && allSeller.length && allUser && allUser.length) {
            allSeller.map((items, index) => {
                if (items.data.userUid === modifyName.userUid) {
                    allSeller[index].data.firstName = modifyName.firstName
                    allSeller[index].data.lastName = modifyName.lastName

                    this.setState({ allSeller })
                }
            })
            allUser.map((items, index) => {
                if (items.data.userUid === modifyName.userUid) {
                    allUser[index].data.firstName = modifyName.firstName
                    allUser[index].data.lastName = modifyName.lastName

                    this.setState({ allUser })
                }
            })
        }
    }


    pageNum(num) {
        const { allUser, number } = this.state;
        const pageArr = allUser.slice(num * number, num * number + number)
        console.log('PageArrrrr', pageArr);
        this.setState({ pageUser: pageArr })
    }

    SellerPageNum(num) {
        const { allSeller, number } = this.state;
        const pageArr = allSeller.slice(num * number, num * number + number)
        console.log('PageArrrrr', pageArr);
        this.setState({ pageUser: pageArr })
    }

    _select(val) {
        const { user, allUser, roleArr } = this.state;
        this.setState({ user: val })
    }

    search(val) {
        const { allUser, searchArr } = this.state;
        this.setState({ searchText: val })
        var arr = []
        allUser.map((item, index) => {
            if (item.data.role !== 'admin') {
                const searchByfn = item.data.firstName.toUpperCase()
                const searchByln = item.data.lastName.toUpperCase()
                const name = searchByfn + ' ' + searchByln
                if (("+" + item.data.phoneNoCode + item.data.phoneNo).startsWith(val) ||
                    name.startsWith(val.toUpperCase())) {
                    arr.push(item)
                    this.setState({ searchArr: arr })
                }
                else {
                    if (arr.indexOf(item) !== -1) {
                        arr.splice(item, 1)
                    }
                    this.setState({ searchArr: arr })
                }
            }
        })
    }

    async editName(item) {
        const { value: formValues } = await Swal.fire({
            title: 'Input Name',
            html:
                '<input id="swal-input1" placeholder="Enter first name" class="swal2-input">' +
                '<input id="swal-input2" placeholder="Enter last name" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        // if (email) {
        // }
        if (formValues && formValues[0] && formValues[1]) {
            console.log(formValues[0], 'name here')
            console.log(formValues[1], 'name here')
            const { editSeller } = this.props.actions
            // const { userUID } = this.props
            editSeller(item.data.userUid, formValues[0], formValues[1])

        }
    }

    _table = (item) => {
        const { user } = this.state
        console.log(item, 'item here ttthsjdhah')
        return (
            <tr className={'TBody'}>
                <td className={'Date'}>{item.data.signupDate}</td>
                <td className={'Name'}>{`${item.data.firstName} ${item.data.lastName}`}</td>
                <td className={'Number'}>+{item.data.phoneNoCode}{item.data.phoneNo}</td>
                <td className={'UserRole'}>{item.data.role}</td>
                {
                    user === 'seller' &&
                    <td className={'Btn'}>
                        <Button onClick={() => this.editName(item)} variant="outlined" color={'primary'}>
                            {'Edit'}
                        </Button>
                    </td>
                }
                <td className={'Btn'}>
                    {
                        item.data.role === "buyer" &&
                        <AlertDialog item={item} />
                    }
                    {
                        item.data.role === "seller" &&
                        <SellerDetail item={item} />
                    }
                </td>
            </tr>
        )
    }

    render() {
        const { allUser, searchArr, searchText, pages, pageUser, user, roleArr, unApproved, allSeller, pageSeller, SellerPages } = this.state;
        // console.log(searchArr, 'searchArr', searchArr.length)
        return (
            <AdminDashboard>
                {
                    pageUser.length ?
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Users
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                            </div>
                            <div className={"Search-Field"}>
                                <input placeholder="Search by name or number" value={searchText} onChange={(e) => { this.search(e.target.value) }} />
                                {/* <select onChange={(e) => { this.setState({ user: e.target.value }) }}> */}
                                <select onChange={(e) => { this._select(e.target.value) }}>
                                    <option value="" selected={!user}>All Buyer & Seller</option>
                                    <option value="unapprove" selected={user === 'unapprove'}>Unapproved Buyer & Seller</option>
                                    <option value="seller" selected={user === 'seller'}>All Sellers</option>
                                    {/* <option value="buyer" selected={user === 'buyer'}>Buyer</option> */}
                                </select>
                            </div>
                            <div className={"Sellers"}>
                                <table>
                                    <thead>
                                        <tr className={'THead'}>
                                            <th className={'Date'}>Registration Date</th>
                                            <th className={'Name'}>Name</th>
                                            <th className={'Number'}>Number</th>
                                            <th className={'UserRole'}>Role</th>
                                            {
                                                user === 'seller' &&
                                                <th className={'Btn'}>Edit</th>
                                            }

                                            <th className={'Btn'}>Details</th>
                                        </tr>
                                    </thead>
                                    {
                                        !searchText && !user &&
                                        <tbody>
                                            {
                                                allUser &&
                                                pageUser.map(item => {
                                                    return item.data.role !== "admin" &&
                                                        this._table(item)
                                                })
                                            }
                                        </tbody>
                                    }

                                    {
                                        !searchText && user === 'unapprove' &&
                                        <tbody>
                                            {
                                                unApproved &&
                                                    unApproved.length ?
                                                    unApproved.map(item => {
                                                        return this._table(item)
                                                    })
                                                    :
                                                    null
                                                // <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No unapprove vendor</div>
                                            }
                                        </tbody>
                                    }
                                    {
                                        !searchText && user === 'seller' &&
                                        <tbody>
                                            {
                                                allSeller &&
                                                    allSeller.length ?
                                                    pageSeller.map(item => {
                                                        return this._table(item)
                                                    })
                                                    :
                                                    null
                                                // <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No unapprove vendor</div>
                                            }
                                        </tbody>
                                    }
                                    {
                                        searchText &&
                                        <tbody>
                                            {
                                                searchArr && searchArr.length ?
                                                    searchArr.map(item => {
                                                        return this._table(item)
                                                    })
                                                    :
                                                    null
                                            }
                                        </tbody>
                                    }
                                </table>
                                {
                                    !searchText && user === 'unapprove' && !unApproved.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No user found</div>
                                        :
                                        null
                                }

                                {
                                    searchArr && !searchArr.length ?
                                        <div style={{ textAlign: 'center', fontSize: 24, color: 'grey', marginTop: 20 }}>No user found</div>
                                        :
                                        null
                                }

                                <div className={"Pagination"}>
                                    {
                                        !searchText && user === 'seller' && allSeller && allSeller.length && allSeller.length > 10 ?
                                            <Pagination pages={SellerPages} pageNum={this.SellerPageNum} />
                                            :
                                            !searchText && !user && allUser && allUser.length && allUser.length > 10 ?
                                                <Pagination pages={pages} pageNum={this.pageNum} />
                                                :
                                                null

                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Users
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

function mapStateToProps(states) {
    return ({
        allUser: states.authReducer.USERS,
        allSeller: states.authReducer.ALLSELLERS,
        modifyName: states.authReducer.SELLERNAME,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // editProfile: (userProfile, userUID) => {
        //     dispatch(editProfile(userProfile, userUID));
        // }
        actions: bindActionCreators({
            editSeller
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Sellers);