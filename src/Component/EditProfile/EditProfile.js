import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import Containers from '../../Container/container/container';
import './EditProfile.css';
import Country from '../../Component/SignupComp/Country';
import MobileCode from '../../Component/SignupComp/MobileCode';
import History from '../../History/History';
import { editProfile } from '../../store/action/action';
import Loader from 'react-loader-spinner';
import { ClipLoader } from 'react-spinners';
import firebase from '../../Config/Firebase/firebase';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cond: false,
            currentUserCond: null,
            firstName: '',
            lastName: '',
            companyName: '',
            phoneNo: '',
            phoneNoCode: '',
            contactEmail: '',
            turnOver1: '',
            turnOver2: '',
            turnOver3: '',
            telephoneNo: '',
            telCode: '',
            designation: '',
            registNo: '',
            noOfPeople: null,

            beneficiaryName: '',
            bankName: '',
            bankCode: '',
            swiftCode: '',
            accountNumber: '',

            userData: {}
        }
        this.edit = this.edit.bind(this);
    }

    componentWillMount() {
        const { currentUser, authChange, currentUserUID } = this.props;
        console.log('CurrentUser***', currentUser)
        this.setState({ currentUserCond: currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
        if (currentUser) {
            if (currentUser.role === 'seller') {
                this.setState({
                    userData: currentUser,
                    currentUserUID,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    country: currentUser.country,
                    companyName: currentUser.companyName,
                    contactEmail: currentUser.contactEmail,
                    noOfPeople: currentUser.noOfPeople,
                    registNo: currentUser.registNo,
                    designation: currentUser.designation,
                    serviceCategory: currentUser.serviceCategory,
                    turnOver1: currentUser.turnOver1,
                    turnOver2: currentUser.turnOver2,
                    turnOver3: currentUser.turnOver3,
                    phoneNoCode: currentUser.phoneNoCode,
                    telCode: currentUser.telCode,
                    phoneNo: currentUser.phoneNo,
                    telephoneNo: currentUser.telephoneNo,
                    role: currentUser.role,


                    beneficiaryName: currentUser.beneficiaryName,
                    bankName: currentUser.bankName,
                    bankCode: currentUser.bankCode,
                    swiftCode: currentUser.swiftCode,
                    accountNumber: currentUser.accountNumber,

                })
            }
            else if (currentUser.role === 'buyer') {
                this.setState({
                    userData: currentUser,
                    currentUserUID,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    phoneNo: currentUser.phoneNo,
                    phoneNoCode: currentUser.phoneNoCode,
                    telCode: currentUser.telCode,
                    telephoneNo: currentUser.telephoneNo,
                    contactEmail: currentUser.contactEmail,
                    role: currentUser.role
                })
            }
        }
    }

    componentWillReceiveProps(props) {
        const { currentUser, currentUserUID, authChange } = props;
        console.log('CurrentUser***', currentUser)
        this.setState({ currentUserCond: currentUser })
        if (authChange === 'logout') {
            History.push('/')
        }
        if (currentUser) {
            if (currentUser.role === 'buyer') {
                this.setState({
                    userData: currentUser,
                    currentUserUID,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    phoneNo: currentUser.phoneNo,
                    telephoneNo: currentUser.telephoneNo,

                    phoneNoCode: currentUser.phoneNoCode,
                    telCode: currentUser.telCode,

                    contactEmail: currentUser.contactEmail,
                    role: currentUser.role
                })
            }
            else if (currentUser.role === 'seller') {
                this.setState({
                    userData: currentUser,
                    currentUserUID,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    country: currentUser.country,
                    companyName: currentUser.companyName,
                    contactEmail: currentUser.contactEmail,
                    noOfPeople: currentUser.noOfPeople,
                    registNo: currentUser.registNo,
                    designation: currentUser.designation,
                    serviceCategory: currentUser.serviceCategory,
                    turnOver1: currentUser.turnOver1,
                    turnOver2: currentUser.turnOver2,
                    turnOver3: currentUser.turnOver3,
                    phoneNo: currentUser.phoneNo,
                    telephoneNo: currentUser.telephoneNo,


                    phoneNoCode: currentUser.phoneNoCode,
                    telCode: currentUser.telCode,
                    role: currentUser.role,


                    beneficiaryName: currentUser.beneficiaryName,
                    bankName: currentUser.bankName,
                    bankCode: currentUser.bankCode,
                    swiftCode: currentUser.swiftCode,
                    accountNumber: currentUser.accountNumber,

                })
            }
        }
    }

    edit() {
        const { role, firstName, lastName, contactEmail, companyName, designation, registNo, serviceCategory, country, phoneNo, telephoneNo,
            phoneNoCode, telCode, noOfPeople, turnOver1, bankCode, turnOver2, turnOver3, userData, currentUserUID, beneficiaryName, bankName, swiftCode, accountNumber } = this.state;
        userData.firstName = firstName;
        userData.lastName = lastName;
        userData.contactEmail = contactEmail;
        userData.telephoneNo = telephoneNo;
        userData.phoneNo = phoneNo;
        userData.phoneNoCode = phoneNoCode;
        userData.telCode = telCode;
        userData.userUid = currentUserUID
        if (role === 'buyer') {
            if (firstName.length > 1 && lastName.length > 1 &&
                contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) &&
                phoneNo.length > 4 &&
                telephoneNo.length > 4
            ) {
                console.log(firstName.indexOf(' '))
                if (firstName.indexOf(' ') == -1 && lastName.indexOf(' ') == -1) {
                    // alert('done')
                    this.setState({ cond: true })
                    this.props.actions.editProfile(userData, currentUserUID)
                        .then((success) => {
                            this.setState({ cond: false })
                            History.push('/')
                        })
                        .catch((error) => {
                            this.setState({ cond: false })
                        })
                }
                else {
                    if (firstName.indexOf(' ') != -1) {
                        swal({
                            type: 'error',
                            title: 'Spaces Not Allowed in first name',
                        })
                    }
                    else if (lastName.indexOf(' ') != -1) {
                        swal({
                            type: 'error',
                            title: 'Spaces Not Allowed in last name',
                        })
                    }
                }
            }
            else {
                if (firstName < 2) {
                    swal({
                        type: 'error',
                        title: 'First name should be greater than 1 letters',
                    })
                }
                else if (lastName < 2) {
                    swal({
                        type: 'error',
                        title: 'Last name should be greater than 1 letters',
                    })
                }
                else if (phoneNo.length < 5) {
                    swal({
                        type: 'error',
                        title: 'Enter correct phone number',
                    })
                }
                else if (telephoneNo.length < 5) {
                    swal({
                        type: 'error',
                        title: 'Enter correct telephone number',
                    })
                }
                else if (!contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    swal({
                        type: 'error',
                        title: 'Enter correct email address',
                    })
                }
            }
        }
        else if (role === 'seller') {
            userData.noOfPeople = noOfPeople;
            userData.designation = designation;
            userData.serviceCategory = serviceCategory;
            userData.companyName = companyName;
            userData.country = country;
            userData.registNo = registNo;
            userData.turnOver1 = turnOver1;
            userData.turnOver2 = turnOver2;
            userData.turnOver3 = turnOver3;

            userData.beneficiaryName = beneficiaryName;
            userData.bankName = bankName;
            userData.bankCode = bankCode;
            userData.swiftCode = swiftCode;
            userData.accountNumber = accountNumber;
            if (firstName.length > 1 && lastName.length > 1 &&
                contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) &&
                phoneNo.length > 4 &&
                telephoneNo.length > 4 &&
                // phoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) &&
                // telephoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) &&
                turnOver1 >= 0 && turnOver2 >= 0 && turnOver3 >= 0 &&
                companyName.length > 1 && registNo.length > 1 && noOfPeople &&
                designation && country && serviceCategory && beneficiaryName &&
                bankName && swiftCode && accountNumber

            ) {
                if (firstName.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'Spaces Not Allowed in first name',
                    })
                }
                else if (lastName.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'Spaces Not Allowed in last name',
                    })
                }
                else if (registNo.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'No spaces are allowed in Registration number',
                    })
                }
                else if (turnOver1.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'No spaces are allowed in Yearly turnover',
                    })
                }
                else if (turnOver2.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'No spaces are allowed in Yearly turnover',
                    })
                }
                else if (turnOver3.indexOf(' ') != -1) {
                    swal({
                        type: 'error',
                        title: 'No spaces are allowed in Yearly turnover',
                    })
                }
                else {
                    this.setState({ cond: true })
                    this.props.actions.editProfile(userData, currentUserUID)
                        .then((success) => {
                            this.setState({ cond: false })
                            History.push('/')
                        })
                        .catch((error) => {
                            this.setState({ cond: false })
                        })
                }
            }
            else {
                if (firstName < 2) {
                    swal({
                        type: 'error',
                        title: 'First name should be greater than 1 letters',
                    })
                }
                else if (lastName < 2) {
                    swal({
                        type: 'error',
                        title: 'Last name should be greater than 1 letters',
                    })
                }
                else if (!designation) {
                    swal({
                        type: 'error',
                        title: 'Select Designation',
                    })
                }
                else if (companyName.length < 2) {
                    swal({
                        type: 'error',
                        title: 'Company name must be greater than 1 letter',
                    })
                }
                else if (registNo.length < 2) {
                    swal({
                        type: 'error',
                        title: 'Registration number must be greater than 1 letter',
                    })
                }
                else if (phoneNo.length < 5) {
                    swal({
                        type: 'error',
                        title: 'Enter correct phone number',
                    })
                }
                else if (telephoneNo.length < 5) {
                    swal({
                        type: 'error',
                        title: 'Enter correct telephone number',
                    })
                }
                else if (!contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    swal({
                        type: 'error',
                        title: 'Enter correct email address',
                    })
                }
                else if (!country) {
                    swal({
                        type: 'error',
                        title: 'Select Country',
                    })
                }
                else if (!serviceCategory) {
                    swal({
                        type: 'error',
                        title: 'Select Service Category',
                    })
                }
                else if (turnOver1 < 0) {
                    swal({
                        type: 'error',
                        title: 'Please fill correct turnover',
                    })
                }
                else if (turnOver2 < 0) {
                    swal({
                        type: 'error',
                        title: 'Please fill correct turnover',
                    })
                }
                else if (turnOver3 < 0) {
                    swal({
                        type: 'error',
                        title: 'Please fill correct turnover',
                    })
                }

                else if (!beneficiaryName) {
                    swal({
                        type: 'error',
                        title: 'Enter your Beneficiary name',
                    })
                }
                else if (!bankName) {
                    swal({
                        type: 'error',
                        title: 'Enter Bank Name',
                    })
                }
                else if (!bankCode) {
                    swal({
                        type: 'error',
                        title: 'Enter Bank Code',
                    })
                }
                else if (!swiftCode) {
                    swal({
                        type: 'error',
                        title: 'Enter Swift Code',
                    })
                }

                else if (!accountNumber) {
                    swal({
                        type: 'error',
                        title: 'Enter Account number',
                    })
                }
            }
        }
    }

    render() {
        const { cond, currentUserCond, firstName, lastName, bankCode, contactEmail, companyName, serviceCategory, designation, registNo, turnOver1, turnOver2, turnOver3, role, phoneNo, telephoneNo, phoneNoCode, telCode, noOfPeople, country, beneficiaryName, bankName, swiftCode, accountNumber } = this.state;
        return (
            <Containers>
                <div style={{ position: "relative" }}>
                    <div className={'editProfile'}>
                        <div>
                            Edit Profile
                        </div>
                        <hr />
                    </div>
                    {
                        currentUserCond ?
                            <div className={"EditDiv"}>
                                <h3>Personal Information</h3>
                                <div className="labelDiv">
                                    <label>Firt Name</label>
                                </div>
                                <div className="inputDiv">
                                    <label>Firt Name</label>
                                    <input type="type" placeholder="Firt Name"
                                        value={firstName}
                                        onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                                </div>
                                <div className="labelDiv">
                                    <label>Last Name</label>
                                </div>
                                <div className="inputDiv">
                                    <label>Last Name</label>
                                    <input type="type" placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                                </div>
                                <div className="labelDiv">
                                    <label>Phone Number</label>
                                </div>
                                <div className="inputDiv">
                                    <label>Phone Number</label>
                                    <div className={"Mob_Code"}>
                                        <MobileCode countryCode={phoneNoCode} countryVal={(value) => this.setState({ phoneNoCode: value })} />
                                        <input type="number" placeholder="Phone Number"
                                            value={phoneNo}
                                            onChange={(e) => { this.setState({ phoneNo: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="labelDiv">
                                    <label>Telephone Number</label>
                                </div>
                                <div className="inputDiv">
                                    <label>Telephone Number</label>
                                    <div className={"Mob_Code"}>
                                        <MobileCode countryCode={telCode} countryVal={(value) => this.setState({ telCode: value })} />
                                        <input type="number" placeholder="Telephone Number"
                                            value={telephoneNo}
                                            onChange={(e) => { this.setState({ telephoneNo: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="labelDiv">
                                    <label>Contact Email</label>
                                </div>
                                <div className="inputDiv">
                                    <label>Contact Email</label>
                                    <input type="email" placeholder="Email Address"
                                        value={contactEmail}
                                        onChange={(e) => { this.setState({ contactEmail: e.target.value }) }} />
                                </div>

                                {
                                    role === 'seller' ?
                                        <div className={"EditDiv"}>
                                            <h3 style={{ marginTop: 15 }}>Company Information</h3>
                                            <div className="labelDiv">
                                                <label>Company Name</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Company Name</label>
                                                <input type="type" placeholder="Company Name"
                                                    value={companyName}
                                                    onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                                            </div>
                                            <div className="labelDiv">
                                                <label>Registration Number</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Registration No.</label>
                                                <input type="type" placeholder="Registration Number"
                                                    value={registNo}
                                                    onChange={(e) => { this.setState({ registNo: e.target.value }) }} />
                                            </div>
                                            <div className="labelDiv">
                                                <label>Number Of Peoples in Organization</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Number Of Peoples in Organization</label>
                                                <input type="number" placeholder="Number Of Peoples"
                                                    value={noOfPeople}
                                                    onChange={(e) => { this.setState({ noOfPeople: e.target.value }) }} />
                                            </div>
                                            <div className="labelDiv">
                                                <label>Country</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Country</label>
                                                <Country country={country} countryVal={(value) => this.setState({ country: value })} />
                                            </div>
                                            <div className="labelDiv">
                                                <label>Designation</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Designation</label>
                                                <input type="type" placeholder="Select Designation"
                                                    value={designation}
                                                    onChange={(e) => { this.setState({ designation: e.target.value }) }} />
                                                {/* <select onChange={(e) => { this.setState({ designation: e.target.value }) }} name="carlist" form="carform">
                                                    <option selected={designation === "sales"} value="sales">Sales</option>
                                                    <option selected={designation === "executive"} value="executive">Executive</option>
                                                    <option selected={designation === "manager"} value="manager">Manager</option>
                                                    <option selected={designation === "owner"} value="owner">Owner</option>
                                                    <option selected={designation === "md"} value="md">MD</option>
                                                </select> */}
                                            </div>

                                            <div className="labelDiv">
                                                <label>Service Category</label>
                                            </div>
                                            <div className="inputDiv">
                                                <label>Service Category</label>
                                                <select onChange={(e) => { this.setState({ serviceCategory: e.target.value }) }} name="carlist" form="carform">
                                                    <option selected={serviceCategory === "industrial machinery"} value="industrial machinery">Industrial Machinery</option>
                                                    <option selected={serviceCategory === "construction machinery"} value="construction machinery">Construction Machinery</option>
                                                    <option selected={serviceCategory === "manufacturing machinery"} value="manufacturing machinery">Manufacturing Machinery</option>
                                                    <option selected={serviceCategory === "industrial tooling"} value="industrial tooling">Industrial Tooling</option>
                                                    <option selected={serviceCategory === "industrial parts"} value="industrial parts">Industrial Parts</option>
                                                    <option selected={serviceCategory === "all machinery & parts"} value="all machinery & parts">all machinery & parts</option>
                                                </select>
                                            </div>
                                            <p>Annual Turnover last 3 years in thousands USD</p>
                                            <div className={"LabelFields"}>
                                                <label>{new Date().getFullYear() - 3}</label>
                                                <label>{new Date().getFullYear() - 2}</label>
                                                <label>{new Date().getFullYear() - 1}</label>
                                            </div>
                                            <div className="inputDiv">
                                                <div className={"TurnOverFields"}>
                                                    <div className={"InputDiv"}>
                                                        <input style={{ width: '100%', height: '100%' }} placeholder="eg 120" type="number"
                                                            value={turnOver3}
                                                            onChange={(e) => { this.setState({ turnOver3: e.target.value }) }} />
                                                    </div>
                                                    <div className={"InputDiv"}>
                                                        <input style={{ width: '100%', height: '100%' }} placeholder="eg 120" type="number"
                                                            value={turnOver2}
                                                            onChange={(e) => { this.setState({ turnOver2: e.target.value }) }} />
                                                    </div>
                                                    <div className={"InputDiv"}>
                                                        <input style={{ width: '100%', height: '100%' }} placeholder="eg 120" type="number"
                                                            value={turnOver1}
                                                            onChange={(e) => { this.setState({ turnOver1: e.target.value }) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={"EditDiv"}>
                                                <h3 style={{ marginTop: 15 }}>Bank Details</h3>

                                                <div className="labelDiv">
                                                    <label>Beneficiary Name</label>
                                                </div>
                                                <div className="inputDiv">
                                                    <label>Beneficiary Name</label>
                                                    <input type="type" placeholder="Beneficiary Name"
                                                        value={beneficiaryName}
                                                        onChange={(e) => { this.setState({ beneficiaryName: e.target.value }) }} />
                                                </div>
                                                <div className="labelDiv">
                                                    <label>Bank Name</label>
                                                </div>
                                                <div className="inputDiv">
                                                    <label>Bank Name</label>
                                                    <input type="type" placeholder="Bank Name"
                                                        value={bankName}
                                                        onChange={(e) => { this.setState({ bankName: e.target.value }) }} />
                                                </div>
                                                <div className="labelDiv">
                                                    <label>Bank Code</label>
                                                </div>
                                                <div className="inputDiv">
                                                    <label>Bank Code</label>
                                                    <input type="number" placeholder="Bank Code"
                                                        value={bankCode}
                                                        onChange={(e) => { this.setState({ bankCode: e.target.value }) }} />
                                                </div>
                                                <div className="labelDiv">
                                                    <label>Swift Code</label>
                                                </div>
                                                <div className="inputDiv">
                                                    <label>Swift Code</label>
                                                    <input type="text" placeholder="Swift Code"
                                                        value={swiftCode}
                                                        onChange={(e) => { this.setState({ swiftCode: e.target.value }) }} />
                                                </div>
                                                <div className="labelDiv">
                                                    <label>Account Number</label>
                                                </div>
                                                <div className="inputDiv">
                                                    <label>Account Number</label>
                                                    <input type="number" placeholder="Account Number"
                                                        value={accountNumber}
                                                        onChange={(e) => { this.setState({ accountNumber: e.target.value }) }} />
                                                </div>
                                            </div>


                                        </div>
                                        :
                                        null
                                }
                                <br />
                                <div className={"EditDiv"}>
                                    {
                                        cond ?
                                            <button disabled>Save</button>
                                            :
                                            <button className="button" onClick={this.edit}>Save</button>
                                    }
                                </div>
                            </div>
                            :
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                    }
                </div>
                <div style={{ position: 'absolute', top: '100%', left: '50%' }}>
                    {
                        cond ?
                            <Loader
                                type="ThreeDots"
                                color="#f27b01"
                                height="100"
                                width="100"
                            />
                            :
                            null
                    }
                </div>
            </Containers>
        );
    }
}


function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        currentUser: states.authReducer.CURRENTUSER,
        authChange: states.authReducer.AUTHCHANGE
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            editProfile
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);