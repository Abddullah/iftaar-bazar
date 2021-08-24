import swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';
import { func } from 'prop-types';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export function stateAuthChangeAction() {
    return dispatch => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: actionTypes.ROLE, payload: 'admin' })
                dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })
                dispatch({ type: actionTypes.CURRENTUSERUID, payload: user.uid })

            } else {
                dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                dispatch({ type: actionTypes.ROLE, payload: 'user' })
            }
        })
    }
}


export function SignupAction(userData) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // swal.showLoading();
            // console.log('userData****', userData);
            const useruid = firebase.auth().currentUser.uid;

            db.collection("users").add({
                ...userData,
                signupDate: new Date().toDateString(),
                userUid: useruid
            })
                .then((success) => {
                    localStorage.removeItem('UserData')
                    resolve(success)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    if (userData.role === 'buyer') {
                        const userObj = {
                            ...userData,
                            signupDate: new Date().toDateString(),
                        }
                        dispatch({ type: actionTypes.CURRENTUSERUID, payload: useruid })
                        dispatch({ type: actionTypes.CURRENTUSER, payload: userObj })
                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })

                        toast({
                            type: 'success',
                            title: 'Signup successfully'
                        })
                        setTimeout(() => {
                            History.push('/')
                        }, 1000)
                    }
                    else {
                        toast({
                            type: 'success',
                            title: 'Signup successfully'
                        })
                        setTimeout(() => {
                            History.push('/')
                        }, 1000)
                    }
                })
                .catch((error) => {
                    reject(error)
                    swal({
                        type: 'error',
                        title: error.message
                    })
                    // console.error("Error writing document: ", error);
                });
        })
    }
}

export function LoginAction(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((success) => {

                    db.collection('admin').doc(success.user.uid).set({
                        role: 'admin',
                        userUid: success.user.uid
                    }).then(() => {
                        dispatch({ type: actionTypes.ROLE, payload: 'admin' })
                        dispatch({ type: actionTypes.AUTHCHANGE, payload: 'login' })
                        dispatch({ type: actionTypes.CURRENTUSERUID, payload: success.user.uid })
                        resolve()
                    })


                })
                .catch((error) => {
                    console.log('error***', error.message)
                    dispatch({ type: actionTypes.LOGINCOND, payload: 'Error' })
                    reject(error)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-center',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    toast({
                        type: 'error',
                        text: error.message
                    })
                })
        })
    }
}


export function forgotPasswordAction(email) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // console.log('Email Address', email)
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(email)
                .then((success) => {
                    resolve(success)
                    // Email sent.
                    // console.log('success***', success)
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    toast({
                        type: 'success',
                        title: 'Reset Password',
                        text: 'Check email to reset your password!'
                    })
                    setTimeout(() => {
                        History.push('/login')
                    }, 1500)
                })
                .catch((error) => {
                    // An error happened.
                    reject(error)
                    setTimeout(() => {
                        // console.log('error***', error);
                        const toast = swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        toast({
                            type: 'error',
                            text: error.message
                        })
                    }, 1200)
                })
        })
    }
}

// ProductForm Work

export function addProductAction(productObj, userUID) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // swal.showLoading();
            const addProduct = db.collection("products")
            addProduct.add(productObj)
                .then((success) => {
                    swal({
                        type: 'success',
                        title: 'Successfully Added',
                        timer: 900,
                        showConfirmButton: false
                    })
                    resolve(success)
                })
                .catch((error) => {
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                    reject(error)
                })
        })
    }
}


export function editProductAction(productObj, productKey) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            swal.showLoading();
            const addProduct = db.collection("products").doc(productKey)
            addProduct.set(productObj)
                .then((success) => {
                    resolve(success)
                    swal({
                        type: 'success',
                        title: 'Updated',
                        timer: 1000,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        History.push('/products')
                    }, 1000)
                })
                .catch((error) => {
                    reject(error)
                    swal({
                        type: 'error',
                        title: error.message,
                    })
                })
        })
    }
}

export function editProfile(userProfile, userUID) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            var user = firebase.auth().currentUser;

            user.updateEmail(userProfile.contactEmail)
                .then(() => {
                    // Update successful.
                    db.collection("users").where("userUid", "==", userUID)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                console.log(doc.id, " => ", doc.data());

                                db.collection("users").doc(doc.id).set({ ...userProfile })
                                    .then(success => {
                                        resolve(success)
                                    })
                                    .catch(error => {
                                        reject(error)
                                    })
                            });
                        })
                }).catch((error) => {
                    // An error happened.
                });
        })
    }
}


export function LogoutAction() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut()
                .then(success => {
                    // console.log('Signed Out');
                    const toast = swal.mixin({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 1200
                    });

                    toast({
                        type: 'success',
                        title: 'Logout successfully'
                    })
                    History.push('/')
                    // History.replace('/');
                    // setTimeout(() => {
                    dispatch({ type: actionTypes.AUTHCHANGE, payload: 'logout' })
                    dispatch({ type: actionTypes.ROLE, payload: 'user' })
                    dispatch({ type: actionTypes.CURRENTUSERUID, payload: null })
                    dispatch({ type: actionTypes.CURRENTUSER, payload: null })
                    dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    dispatch({ type: actionTypes.ALLORDERS, payload: null })
                    dispatch({ type: actionTypes.ORDERS, payload: null })
                    dispatch({ type: actionTypes.MODIFIEDSEEN, payload: null })
                    dispatch({ type: actionTypes.CART, payload: null })
                    dispatch({ type: actionTypes.SELLERORDER, payload: null })
                    // dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    // dispatch({ type: actionTypes.NOTSEEN, payload: null })
                    resolve(success)
                    // }, 1000);

                })
                .catch(error => {
                    // console.log('error', error.message)
                    reject(error)
                })
        })

    }
}



export function sendMessage(message) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection("contact").add({ ...message })
                .then(success => {
                    resolve(success)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}


const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
}


const changePassword = async (currentPassword, newPassword) => {
    return await reauthenticate(currentPassword).then((res) => {
        var user = firebase.auth().currentUser;
        return user.updatePassword(newPassword).then(() => {
            return 'updated'

        }).catch((error) => { return error });
    }).catch((error) => { return error });
}

export function updatePassword(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            changePassword(obj.currentPass, obj.newPass).then((res) => {

                if (res === 'updated') {

                    resolve()
                    setTimeout(() => {
                        History.push('/')
                    }, 1500);
                } else {
                    reject(res.message)
                }

            }).catch((err) => {
                reject(err.message)
            })

        })
    }
}

