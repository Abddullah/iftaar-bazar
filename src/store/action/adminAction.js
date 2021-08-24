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



export function BannerAction(banner) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('banner', banner)
            db.collection("banners").get().then((querySnapshot) => {
                console.log('BannersLength', querySnapshot)
                var bannerLength = querySnapshot.docs.length;
                for (var i = 0; i < bannerLength; i++) {
                    db.collection('banners').doc(`banner${i}`).delete();
                    if (bannerLength === i + 1) {
                        banner.map((item, index) => {
                            console.log()
                            db.collection('banners').doc(`banner${index}`).set(item)
                                .then((success) => {
                                    dispatch({ type: actionTypes.SLIDER, payload: banner })
                                    resolve(success)
                                })
                                .catch((error) => {
                                    swal({
                                        timer: 10,
                                        showConfirmButton: false
                                    })
                                    swal({
                                        type: 'error',
                                        title: 'File is too large in size',
                                    })
                                })

                        })
                    }
                }
                // banner.map((item, index) => {
                //     console.log()
                //     db.collection('banners').doc(`banner${index}`).set(item)
                //         .then((success) => {
                //             dispatch({ type: actionTypes.SLIDER, payload: banner })
                //             resolve(success)
                //         })
                //         .catch((error) => {
                //             swal({
                //                 type: 'error',
                //                 title: 'File is too large in size',
                //             })
                //         })

                // })
            })
            // })

            // db.collection('banners').doc('images').set({ banner: banner })
            //     .then((success) => {
            //         dispatch({ type: actionTypes.SLIDER, payload: banner })
            //         resolve(success)
            //     })
            //     .catch((error) => {
            //         swal({
            //             type: 'error',
            //             title: 'File is too large in size',
            //         })
            //     })
        })
    }
}


export function OrderAction(key, orders) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('key, orders', key, orders)
            db.collection('order').doc(key).update({ paymentStatus: 'confirmed' })
                .then((success) => {
                    dispatch({ type: actionTypes.ALLORDERS, payload: orders })
                    resolve(success)
                })
        })
    }
}


export function AllSellers() {
    var sellers = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('users').where('role', '==', 'seller').where('isApproved', '==', 'true').onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        sellers.push({
                            data: docs.doc.data()
                        })
                        console.log(docs.doc.data(), 'datastd sjdbhsaj ahsbd')
                    }
                    dispatch({ type: actionTypes.ALLSELLERS, payload: sellers })
                    if (docs.type === 'modified') {
                        dispatch({ type: actionTypes.SELLERNAME, payload: docs.doc.data() })
                    }
                })
            })
        })
    }
}


export function editSeller(user, fname, lname) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('users').where('role', '==', 'seller').where('userUid', '==', user).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((docs) => {
                        console.log(docs.data(), 'userdata')
                        db.collection('users').doc(docs.id).update({
                            firstName: fname,
                            lastName: lname
                        })
                    })
                })
        })
    }
}


export function AddOurSellers(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('OurSellers').add(obj)
                .then(() => {
                    resolve()
                })
        })
    }
}

export function aboutWebsiteAction(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('key, orders', obj)
            db.collection('siteInfo').doc('productCatogery').set(obj)
                .then((success) => {
                    dispatch({ type: actionTypes.ABOUTWEBSITE, payload: obj })
                    resolve(success)
                })
        })
    }
}


export function GetOurSellers() {
    var flag = false
    var arr = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('OurSellers').onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        flag = !flag
                        arr.push(docs.doc.data())
                        dispatch({ type: actionTypes.OURSELLERS, payload: arr })
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                    }
                })
            })
        })
    }
}

export function productCatogery(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('key, orders', obj)
            db.collection('productCatogery').add(obj)
                .then((success) => {
                    resolve(success)
                })
        })
    }
}

export function deleteproductCatogery(item, productCatArr) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('productCatogery').doc(item.key).delete()
                .then((success) => {
                    dispatch({ type: actionTypes.PRODUCTCATOGERY, payload: productCatArr })
                    resolve(success)
                })
        })
    }
}


export function modifyproductCatogery(item, productCatogeries) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('productCatogery').doc(item.key).set(item.data)
                .then((success) => {
                    resolve(success)

                })
        })
    }
}


export function deleteSeller(obj) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('OurSellers').where('time', '==', obj.time).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((docs) => {
                        db.collection('OurSellers').doc(docs.id).delete()
                            .then(() => {
                                resolve()
                            })
                    })
                })
        })
    }
}
