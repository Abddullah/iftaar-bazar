import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import firebase from "../../Config/Firebase/firebase";
import { Link } from 'react-router-dom';
import { Radio, Button, Checkbox } from '@material-ui/core';
import History from '../../History/History';
import swal from 'sweetalert2';
import { SignupAction } from '../../store/action/action';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loader-spinner';
import {
    faLock, faUser, faEnvelope, faLockOpen, faPhone, faPhoneSquare, faUnlockAlt,
    faUsers, faUniversity, faBook, faAddressCard, faGlobe, faCogs, faSlash, faMobileAlt, faListOl, faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import './signup.css'
import Country from '../../Component/SignupComp/Country';
import MobileCode from '../../Component/SignupComp/MobileCode';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
// import { bindActionCreators } from 'C:/Users/M.Bytes/AppData/Local/Microsoft/TypeScript/3.0/node_modules/@types/redux-logger/node_modules/redux';
library.add(faUser, faLock, faEnvelope, faLockOpen, faPhone, faPhoneSquare,
    faUnlockAlt, faUsers, faUniversity, faBook, faAddressCard, faGlobe, faCogs, faMobileAlt, faListOl, faCreditCard)

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cond1: false,
            cond2: false,
            cond3: false,
            // cond3: true,
            regisCond: false,
            buyerCond: false,
            sellerCond: false,
            isApproved: '',
            firstName: '',
            lastName: '',
            email: '',
            contactEmail: '',
            phoneNo: '',
            phoneNoCode: '44',
            telCode: '44',
            telephoneNo: null,
            companyName: '',
            registNo: '',
            peoples: '',
            designation: '',
            country: '',
            serviceCategory: '',
            turnOver1: '',
            turnOver2: '',
            turnOver3: '',
            password: '',
            confirmPassword: '',
            selectedValue: '',

            beneficiaryName: '',
            bankName: '',
            swiftCode: '',
            accountNumber: ''
        }

        this.SignupSeller = this.SignupSeller.bind(this);
        this.SignupBuyer = this.SignupBuyer.bind(this);
        this.Login = this.Login.bind(this);
        this.Registration = this.Registration.bind(this);
        this.Next = this.Next.bind(this);
        this.nextForBanking = this.nextForBanking.bind(this);
        this.countryFunc = this.countryFunc.bind(this)
        this.TurnOver1 = this.TurnOver1.bind(this)
        this.TurnOver2 = this.TurnOver2.bind(this)
        this.TurnOver3 = this.TurnOver3.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    componentWillMount() {
        const { location, currentUserUID } = this.props;
        if (currentUserUID && !localStorage.getItem('UserData')) {
            History.push('/')
        }
        console.log('this.props.currentUserUID', this.props.currentUserUID)

        if (!localStorage.getItem('UserData')) {
            if (location && location.state) {
                console.log('Location******', location.state)
                this.setState({ cond1: location.state.cond1, contactEmail: location.state.email })
            }
        }
        else if (localStorage.getItem('UserData')) {
            // this.setState({ cond1: true, cond2: true })
            const userData = JSON.parse(localStorage.getItem('UserData'))
            if (userData.companyName) {
                console.log('Run*******************', userData)
                this.setState({ cond1: true, cond2: true, cond3: true })
            }
            else {
                this.setState({ cond1: true, cond2: true })
            }

        }
    }

    // SignupSeller() {
    nextForBanking() {
        const { currentUserUID, sellerCond } = this.props;
        console.log('Run**************')
        const { firstName, lastName, contactEmail, phoneNo, telephoneNo,
            companyName, registNo, peoples, designation, country,
            serviceCategory, password, confirmPassword, cond1, cond2, selectedValue,
            turnOver1, turnOver2, turnOver3 } = this.state;
        const userData = JSON.parse(localStorage.getItem('UserData'))
        const userObj = {
            ...userData,
            companyName, registNo,
            noOfPeople: peoples, designation, country,
            serviceCategory, turnOver1, turnOver2, turnOver3
        }
        if (companyName.length > 1 && registNo.length > 1 && peoples &&
            designation.length > 1 && country && serviceCategory && turnOver1 > 1 && turnOver2 > 1 && turnOver3 > 1
        ) {
            if (registNo.indexOf(' ') != -1) {
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
            else if (registNo.length < 1) {
                swal({
                    type: 'error',
                    title: 'Registration number must be greater than 6 letter',
                })
            }
            else {
                // this.setState({ sellerCond: true })
                localStorage.setItem('UserData', JSON.stringify(userObj))
                this.setState({ cond3: true })
                // this.props.actions.SignupAction(userObj)
                //     .then((success) => {
                //         this.setState({ sellerCond: false })
                //     })
                //     .catch((error) => {
                //         this.setState({ sellerCond: false })
                //     })

            }
        }
        else {
            if (!companyName) {
                swal({
                    type: 'error',
                    title: 'Enter your company name',
                })
            }
            else if (companyName.length < 1) {
                swal({
                    type: 'error',
                    title: 'Company name must be greater than 6 letter',
                })
            }
            else if (!registNo) {
                swal({
                    type: 'error',
                    title: 'Enter registration number',
                })
            }
            else if (registNo.length < 1) {
                swal({
                    type: 'error',
                    title: 'Registration number must be greater than 6 letter',
                })
            }
            else if (!peoples) {
                swal({
                    type: 'error',
                    title: 'Enter number of employ',
                })
                alert('Peoples******')
            }
            else if (peoples < 1) {
                swal({
                    type: 'error',
                    title: 'Least number of employ must be 1',
                })
            }
            else if (!designation) {
                swal({
                    type: 'error',
                    title: 'Enter Designation',
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
            else {
                console.log('USerObj*******', userObj)
                swal({
                    type: 'error',
                    title: 'Something went wrong',
                })
            }
        }
    }

    SignupSeller() {
        const { sellerCond, beneficiaryName, bankName, swiftCode, accountNumber, bankCode } = this.state;

        const userData = JSON.parse(localStorage.getItem('UserData'))
        if (beneficiaryName && bankName && swiftCode && accountNumber && bankCode) {
            if (userData) {
                const userObj = {
                    ...userData,
                    beneficiaryName,
                    bankName,
                    bankCode,
                    swiftCode,
                    accountNumber
                }
                console.log('Xyz', userObj)
                this.setState({ sellerCond: true })

                this.props.actions.SignupAction(userObj)
                    .then((success) => {
                        this.setState({ sellerCond: false })
                        localStorage.removeItem('UserData')
                    })
                    .catch((error) => {
                        this.setState({ sellerCond: false })
                    })
            }
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

    Login() {
        History.push('/login')
    }

    Registration() {
        const { email, password, confirmPassword, checked } = this.state;
        if (email && password && password === confirmPassword && checked) {
            this.setState({ regisCond: true })
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(success => {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    toast({
                        type: 'success',
                        title: 'Registration successfully'
                    })
                    this.setState({ cond1: true, regisCond: false })


                    // Registration Mail

                    const mail = {
                        recepientEmail: email,
                        subject: 'Registration Verified',
                        message: "Congratulations! You're Succuessfully Registered In Vendor App"
                    }
                    let response = fetch("https://us-central1-vendor-web-ffe78.cloudfunctions.net/sendEmail", {

                        method: "POST",
                        headers: { "Content-Type": "text/plain" },
                        body: JSON.stringify(mail)
                    });
                    // if (response.ok) {
                    //     console.log('mail', mail)
                    //     const toast = swal.mixin({
                    //         toast: true,
                    //         position: 'bottom-end',
                    //         showConfirmButton: false,
                    //         timer: 3000
                    //     });
                    //     toast({
                    //         type: 'success',
                    //         title: 'Registration successfully'
                    //     })
                    //     this.setState({ cond1: true, regisCond: false })
                    // }
                    // else {
                    //     swal({
                    //         type: 'error',
                    //         title: 'Registration Error Try Again',
                    //     })
                    //     this.setState({ regisCond: false })
                    // }

                    // Registration Mail


                })
                .catch(error => {
                    console.log('Error*****', error.message)
                    this.setState({ regisCond: false })
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    toast({
                        type: 'error',
                        title: 'Registration Error',
                        text: error.message
                    })
                })

        }
        else {
            if (!email) {
                swal({
                    type: 'error',
                    title: 'Enter email address',
                })
            }
            else if (email && !password) {
                swal({
                    type: 'error',
                    title: 'Enter password',
                })
            }
            else if (!checked) {
                swal({
                    type: 'error',
                    title: 'please check the agreement',
                })
            }
            else if (email && password && password !== confirmPassword) {
                if (!confirmPassword) {
                    swal({
                        type: 'error',
                        title: 'Enter confirm password',
                    })
                }
                else {
                    swal({
                        type: 'error',
                        title: 'Confirm password not match',
                    })
                    this.setState({ confirmPassword: '' })
                }
            }
        }
    }

    // telephone = (val) => {
    //     console.log('val Baki', `${val.slice(0, 2)} ${val.slice(2)}`)
    //     this.setState({ telephoneNo: `${val.slice(0, 2)} ${val.slice(2)}` })
    // }
    handleClose = () => {
        this.setState({ open: false });
    };

    handleClosePrivacy = () => {
        this.setState({ openPrivacy: false });
    };

    dialog() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div className={'dialog-cont'}>
                        <div className={'dialog-Title'}>
                            {'TeqXC User Agreement'}
                        </div>
                        <div className={'dialog-heading'}>
                            {'Account'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'You are to maintain secrecyof your account and password with Teq Exchange.'}</li>
                                <li>{'All online activities under your account are your responsibility.'}</li>
                                <li>{'You are not to copy, modify, or distribute content or user information from Teq Exchange.'}</li>
                                <li>{'Teq Exchangereserves the right to terminate your account, remove or edit content, or cancel orders at oursole discretion.'}</li>
                            </ul>
                        </div>
                        <div className={'dialog-heading'}>
                            {'Seller'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'You are to comply to any domestic and international law and policy related to your product, including but not restricted to export restrictions and prohibition of articles.'}</li>
                                <li>{'When listing a product, you are to provide the correct information in so far as you know. You are liable for any misrepresentation or wrong information about the product which may lead to damages claimed by buyer.'}</li>
                                <li>{'The selling and transaction prices are in US dollars.'}</li>
                                <li>{'You are to provide a delivery cost each for international and domestic shipment'}</li>
                                <li>{'You are responsible for delivery of goods to buyer based on a trackable courier system. You may charge the cost of delivery to the buyer up to specified delivery address.'}</li>
                                <li>{'You are required to ship the products within 3 working days from the date Teq Exchange confirms receipt of buyer payment and informs you to deliver.'}</li>
                                <li>
                                    {'You are to inform Teq Exchange'}
                                    <ul style={{ listStyleType: 'circle' }}>
                                        <li>{'the name of the delivery company and tracking number'}</li>
                                        <li>{'when delivery has been made to the buyer'}</li>
                                    </ul>
                                </li>
                                {/* <li> */}
                                {/* </li> */}
                                <li>{'You agree to be levied a service charge of 10% of selling price including deliveryby Teq Exchange, including Goods & Services Tax if applicable, which will be deducted from the buyer’s payment amount during settlement.'}</li>
                            </ul>
                        </div>
                    </div>
                </DialogContent>
                <div className={"Btns"}>
                    <Button color={"secondary"} variant={"outlined"} onClick={this.handleClose}>
                        Cancle
                    </Button>
                </div>
            </Dialog>
        )
    }



    privacyPolicy() {
        return (
            <Dialog
                open={this.state.openPrivacy}
                onClose={this.handleClosePrivacy}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <div className={'dialog-cont'}>
                        <div className={'dialog-Title'}>
                            {'TeqXC Privacy Policy'}
                        </div>
                        <div style={{ color: 'grey', margin: '10px' }}>
                            {'By accepting thispolicy you consent to our collection, storage, use and disclosure of your personal information as described.'}
                        </div>
                        <div className={'dialog-heading'}>
                            {'Website Visitor'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'You do not need to provide any personal information except when you make an enquiry, in which case you consent to Teq Exchange keeping the information for the purpose of identifying you and communicating with you to address the issuesraised.'}</li>
                                <li>{'The information required for enquiry is name, email address and or contact telephone, and whatever you disclose in the content of your enquiry.'}</li>
                            </ul>
                        </div>
                        <div className={'dialog-heading'}>
                            {'Buyer'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'You consent to Teq Exchange collecting and storing the registration information as specified in the registration form.The information required for enquiry is name, email address and or contact telephone for the purpose of communicating with you and for future transaction.'}</li>
                                <li>{'In the course of order, delivery and possible refund transactions, you consent to TeqExchange storing and using your delivery address and financial information, such as credit card or bank account numbers.'}</li>
                                <li>{'You also consent to TeqExchange storing and using for reference all transactional information performed on the website for the purpose of facilitating processes and recalling your activity history on the website.'}</li>
                            </ul>
                        </div>
                        <div className={'dialog-heading'}>
                            {'Seller'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'You consent to all the above clauses applicable to buyers in the preceding section.'}</li>
                                <li>{'In addition, you consent to information requested during registration and product listing related to your company, banking facilities and products that you listfor the purpose of enabling the necessary transactions and processes conducted by Teq Exchange.'}</li>
                            </ul>
                        </div>
                        <div className={'dialog-heading'}>
                            {'Disclosure and Sharing'}
                        </div>
                        <div className={'privacy-data'}>
                            <ul>
                                <li>{'We will not disclose your personal information to any third party for marketing purposes.'}</li>
                                <li>{'We may however disclose information when required by law, to provide evidence against any dispute or to enforce this policy, according to local and international law and regulation.'}</li>
                            </ul>
                        </div>
                    </div>
                </DialogContent>
                <div className={"Btns"}>
                    <Button color={"secondary"} variant={"outlined"} onClick={this.handleClosePrivacy}>
                        Cancle
                    </Button>
                </div>
            </Dialog>
        )
    }


    Next() {
        const { sellerCond, regisCond, buyerCond, firstName, lastName, phoneNo, phoneNoCode, telCode, telephoneNo, contactEmail, selectedValue } = this.state;
        // var phoneNum = `${phoneNoCode}${phoneNo}`;
        // var telNum = `${telCode}${telephoneNo}`
        const userObj = {
            firstName, lastName, phoneNo, phoneNoCode, telCode, telephoneNo, contactEmail, role: selectedValue, isApproved: 'false',
        }
        if (firstName.length > 1 && lastName.length > 1 && selectedValue === 'seller' &&
            contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            &&
            // phoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) &&
            // telephoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
            phoneNo.length > 4 &&
            telephoneNo.length > 4
        ) {
            console.log(firstName.indexOf(' '))
            if (firstName.indexOf(' ') == -1 && lastName.indexOf(' ') == -1) {
                localStorage.setItem('UserData', JSON.stringify(userObj))
                this.setState({ cond2: true })
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
                else if (!phoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) {
                    swal({
                        type: 'error',
                        title: 'Enter correct phone number',
                    })
                }
                else if (!telephoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) {
                    swal({
                        type: 'error',
                        title: 'Enter correct telephone number',
                    })
                }
                else if (!contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    swal({
                        type: 'error',
                        title: 'Enter email address',
                    })
                }
                else if (selectedValue !== 'seller') {
                    alert('Radio Button')
                }
            }
        }
        else {
            if (firstName < 1) {
                swal({
                    type: 'error',
                    title: 'First name should be greater than 3 letters',
                })
            }
            else if (lastName < 1) {
                swal({
                    type: 'error',
                    title: 'Last name should be greater than 3 letters',
                })
            }
            else if (!selectedValue) {
                swal({
                    type: 'error',
                    title: 'Select your role',
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
                    title: 'Enter email address',
                })
            }
            else if (selectedValue !== 'seller') {
                alert('Radio Button')
            }
            else {
                alert('Not Done')
            }
        }
    }

    handleChange = event => {
        this.setState({ checked: event.target.checked })
    }

    SignupBuyer() {
        const { firstName, lastName, phoneNo, telCode, telephoneNo, phoneNoCode, contactEmail, selectedValue } = this.state;
        var phoneNum = `${phoneNoCode}${phoneNo}`;
        var telNum = `${telCode}${telephoneNo}`
        console.log('phoneNo', phoneNum, phoneNoCode)
        const userObj = {
            firstName, lastName, phoneNo, phoneNoCode, telCode, telephoneNo, contactEmail, role: selectedValue, isApproved: 'true',
        }
        if (firstName.length > 1 && lastName.length > 1 && selectedValue === 'buyer' &&
            contactEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            &&
            // phoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/) &&
            // telephoneNo.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
            phoneNo.length > 4 &&
            telephoneNo.length > 4
        ) {
            console.log(firstName.indexOf(' '))
            if (firstName.indexOf(' ') == -1 && lastName.indexOf(' ') == -1) {
                this.setState({ buyerCond: true })
                this.props.actions.SignupAction(userObj)
                    .then((success) => {
                        this.setState({ buyerCond: false })

                    })
                    .catch((error) => {
                        this.setState({ buyerCond: false })
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
                else if (phoneNo.length < 5) {
                    swal({
                        type: 'error',
                        title: 'Enter correct phone number',
                    })
                }
                else if (!telCode) {
                    swal({
                        type: 'error',
                        title: 'Enter Telephone Code',
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
                // else if (selectedValue !== 'buyer') {
                //     swal({
                //         type: 'error',
                //         title: 'Check your role',
                //     })

                // }
            }
        }
        else {
            if (phoneNo.length < 5) {
                swal({
                    type: 'error',
                    title: 'Enter correct phone number',
                })
            }
            else if (!telCode) {
                swal({
                    type: 'error',
                    title: 'Enter Telephone Code',
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
            // else if (selectedValue !== 'seller') {
            //     swal({
            //         type: 'error',
            //         title: 'Check your role',
            //     })
            // }
            else {
                swal({
                    type: 'error',
                    title: 'Something went wrong',
                })
            }
        }
    }

    countryFunc(value) {
        this.setState({ country: value })
    }

    TurnOver1(val) {
        if (val && val >= 0) {
            this.setState({ turnOver1: val })
        }
        else {
            console.log('TurnOver1')
        }
    }

    TurnOver2(val) {
        if (val && val >= 0) {
            this.setState({ turnOver2: val })
        }
        else {
            console.log('TurnOver2')
        }
    }
    TurnOver3(val) {
        if (val && val >= 0) {
            this.setState({ turnOver3: val })
        }
        else {
            console.log('TurnOver3')
        }
    }


    render() {
        const { regisCond, buyerCond, sellerCond, firstName, bankCode, lastName, openPrivacy, selectedValue, open, email, contactEmail, phoneNo, designation, telCode, telephoneNo, companyName, registNo, peoples, password, confirmPassword, turnOver1, turnOver2, turnOver3, beneficiaryName, bankName, swiftCode, accountNumber, cond1, cond2, cond3 } = this.state;
        return (
            <div className={'Signup'}>
                <div className="Form" style={{ position: "relative" }}>
                    <div>
                        <div className="ChangeForm">
                            <div className="Heads">
                                {
                                    !cond1 ?
                                        <b>Registration</b>
                                        :
                                        <b>Signup</b>
                                    // <div>
                                    //     {
                                    //         cond1 && !cond2 ?
                                    //             <b>Registration</b>
                                    //             :
                                    //             <b onClick={() => this.setState({ cond1: false })}>Signup</b>
                                    //     }
                                    // </div>
                                }
                                {/* <div>
                                <b onClick={() => this.setState({ cond1: false })}>Signup</b>
                            </div> */}

                            </div>
                            <div>
                                <b>|</b>
                            </div>
                            <div>
                                <b onClick={this.Login}>Login</b>
                            </div>
                        </div>
                        {
                            !cond1 && !cond2 && !cond3 &&
                            <div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={'envelope'}
                                        />
                                    </div>
                                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => { this.setState({ email: e.target.value, contactEmail: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"unlock-alt"}
                                        />
                                    </div>
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"unlock-alt"}
                                        />
                                    </div>
                                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                                </div>
                                <div>
                                    <div>
                                        <Checkbox
                                            onChange={this.handleChange}
                                            color="primary"
                                            checked={this.state.checked}
                                        />
                                        {`I agree to the following `}<span onClick={() => this.setState({ open: true })} className={'privacy-policy Link'}>{'User Agreement.'}</span>
                                    </div>
                                    <div>
                                        {'For information on how we protect your privacy and use your information, please read our '}
                                        <span onClick={() => this.setState({ openPrivacy: true })} className={'privacy-policy Link'}>{'Privacy Policy.'}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    {
                                        regisCond ?
                                            <Button disabled>Registration</Button>
                                            :
                                            <button onClick={this.Registration}>Registration</button>
                                    }
                                </div>
                            </div>
                        }

                        {
                            cond1 && !cond2 && !cond3 &&
                            <div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'

                                            icon={'user'}
                                        />
                                    </div>
                                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={'user'}
                                        />
                                    </div>
                                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                                </div>
                                {/* <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"envelope"}
                                        />
                                    </div>
                                    <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => { this.setState({ contactEmail: e.target.value }) }} />
                                </div> */}
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={'mobile-alt'}
                                        />
                                    </div>
                                    <div className={"Mobile_Code"}>
                                        <MobileCode className={"Country_Code"} countryVal={(value) => this.setState({ phoneNoCode: value })} />
                                        <input className={"Country_Code_Field"} type="number" placeholder="Mobile Number" value={phoneNo} onChange={(e) => this.setState({ phoneNo: e.target.value })} />
                                    </div>
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"phone"}
                                        />
                                    </div>
                                    <div className={"Tel_Code"}>
                                        <MobileCode className={"Country_Code"} countryVal={(value) => this.setState({ telCode: value })} />
                                        <input type="number" placeholder="Telephone Number" value={telephoneNo} onChange={(e) => { this.setState({ telephoneNo: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="InputFields" style={{ border: 'none' }}>
                                    <Radio
                                        checked={selectedValue === 'buyer'}
                                        onChange={() => this.setState({ selectedValue: 'buyer' })}
                                        value="buyer"
                                        name="radio-button"
                                        aria-label="Buyer"
                                    />
                                    Buyer
                                    <Radio
                                        checked={selectedValue === 'seller'}
                                        onChange={() => this.setState({ selectedValue: 'seller' })}
                                        value="seller"
                                        name="radio-button"
                                        aria-label="Seller"
                                    />
                                    Seller
                            </div>
                                <div style={{ textAlign: "center" }}>
                                    {
                                        buyerCond ?
                                            <div>
                                                {
                                                    selectedValue === 'buyer' ?
                                                        <Button disabled>Signup</Button>
                                                        :
                                                        <Button disabled>Next</Button>
                                                }
                                            </div>

                                            :
                                            <div>
                                                {
                                                    selectedValue === 'buyer' ?
                                                        <button onClick={this.SignupBuyer}>Signup</button>
                                                        :
                                                        <button onClick={this.Next}>Next</button>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                        }
                        {
                            cond1 && cond2 && !cond3 &&
                            <div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"university"}
                                        />
                                    </div>
                                    <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => { this.setState({ companyName: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"book"}
                                        />
                                    </div>
                                    <input type="text" placeholder="Registration Number" value={registNo} onChange={(e) => { this.setState({ registNo: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"users"}
                                        />
                                    </div>
                                    <input type="number" placeholder="Number of People in Organisation" value={peoples} onChange={(e) => { this.setState({ peoples: e.target.value }) }} />
                                </div>

                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"address-card"}
                                        />
                                    </div>
                                    <input type="text" placeholder="Enter Designation" value={designation} onChange={(e) => { this.setState({ designation: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"globe"}
                                        />
                                    </div>
                                    <Country countryVal={(value) => this.setState({ country: value })} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"cogs"}
                                        />
                                    </div>
                                    <select onChange={(e) => { this.setState({ serviceCategory: e.target.value }) }} name="carlist" form="carform">
                                        <option selected value="">Select Service Category</option>
                                        <option value="industrial machinery">Industrial Machinery</option>
                                        <option value="construction machinery">Construction Machinery</option>
                                        <option value="manufacturing machinery">Manufacturing Machinery</option>
                                        <option value="industrial tooling">Industrial Tooling</option>
                                        <option value="industrial parts">Industrial Parts</option>
                                        <option value="all machinery & parts">All Machinery & Parts</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Annual Turnover last 3 years in thousands USD</p>
                                    <div className={"LabelFields"}>
                                        <label>{new Date().getFullYear() - 1}</label>
                                        <label>{new Date().getFullYear() - 2}</label>
                                        <label>{new Date().getFullYear() - 3}</label>
                                    </div>
                                    <div className={"TurnOverFields"}>
                                        <div className={"InputDiv"}>
                                            <input placeholder="eg 120" type="number"
                                                value={turnOver1}
                                                onChange={(e) => this.TurnOver1(e.target.value)} />
                                        </div>
                                        <div className={"InputDiv"}>
                                            <input placeholder="eg 120" type="number"
                                                value={turnOver2}
                                                onChange={(e) => this.TurnOver2(e.target.value)} />
                                        </div>
                                        <div className={"InputDiv"}>
                                            <input placeholder="eg 120" type="number"
                                                value={turnOver3}
                                                onChange={(e) => this.TurnOver3(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button onClick={this.nextForBanking}>Next</button>
                                    {/* {
                                        sellerCond ?
                                            <Button disabled>Signup</Button>
                                            :
                                            <button onClick={this.SignupSeller}>Signup</button>
                                    } */}
                                </div>
                            </div>
                        }

                        {
                            cond1 && cond2 && cond3 &&
                            <div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={'user'}
                                        />
                                    </div>
                                    <input type="text" placeholder="Enter Beneficiary Name" value={beneficiaryName} onChange={(e) => { this.setState({ beneficiaryName: e.target.value, contactEmail: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"university"}
                                        />
                                    </div>
                                    <input type="text" placeholder="Enter Bank Name" value={bankName} onChange={(e) => { this.setState({ bankName: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"credit-card"}
                                        />
                                    </div>
                                    <input type="number" maxlength={4} placeholder="Enter Bank Code" value={bankCode} onChange={(e) => { this.setState({ bankCode: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"credit-card"}
                                        />
                                    </div>
                                    <input type="text" placeholder="Enter Swift Code" value={swiftCode} onChange={(e) => { this.setState({ swiftCode: e.target.value }) }} />
                                </div>
                                <div className="InputFields">
                                    <div>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={"list-ol"}
                                        />
                                    </div>
                                    <input type="number" placeholder="Enter Account Number" value={accountNumber} onChange={(e) => { this.setState({ accountNumber: e.target.value }) }} />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    {
                                        sellerCond ?
                                            <Button disabled>Signup</Button>
                                            :
                                            <button onClick={this.SignupSeller}>Signup</button>
                                    }
                                </div>
                            </div>
                        }


                        <Link to={"/"}><span className="Link">Go To Home Page</span></Link>
                    </div>
                    <div style={{ position: 'absolute', top: '36%', left: '37%' }}>
                        {
                            regisCond || sellerCond || buyerCond ?
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
                </div>
                {
                    open &&
                    this.dialog()
                }
                {
                    openPrivacy &&
                    this.privacyPolicy()
                }
            </div>
        )
    }
}


function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            SignupAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
