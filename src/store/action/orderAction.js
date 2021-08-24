import Swal from 'sweetalert2';
import actionTypes from '../constant/constant'
import firebase from '../../Config/Firebase/firebase';
import History from '../../History/History';

const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

var token = false


export function productCheckout(obj, flag, user) {
    return dispatch => {
        console.log(obj, 'object here')
        return new Promise(function (resolve, reject) {
            var checkout = db.collection('order')
            checkout.add(obj)
                .then(() => {
                    console.log('added to database')
                    db.collection('cart').doc(user).get()
                        .then((querysnaps) => {
                            // console.log(querysnaps.data().carts, 'lajskjhkjhkj')

                            if (querysnaps.data()) {
                                if (querysnaps.data() && querysnaps.data().carts && querysnaps.data().carts.length === obj.product.length) {
                                    db.collection('cart').doc(user).delete()
                                        .then(() => {
                                            token = !token
                                            resolve('success')
                                            console.log('successfully deleted')
                                            dispatch({ type: actionTypes.FLAG, payload: !flag })
                                            dispatch({ type: actionTypes.COUNTER, payload: token })
                                        })
                                } else {
                                    let myData = querysnaps.data().carts.slice(0)
                                    dispatch({ type: actionTypes.CHANGES, payload: 'deleted' })
                                    myData.forEach((docs, itemIndex) => {
                                        obj.product.map((items, index) => {
                                            if (items.productKey === docs.productKey) {
                                                myData.splice(itemIndex, 1)
                                                db.collection('cart').doc(user).update({
                                                    carts: myData
                                                })
                                                    .then(() => {
                                                        token = !token
                                                        resolve('success')
                                                        console.log('successfully deleted')
                                                        dispatch({ type: actionTypes.FLAG, payload: !flag })
                                                        dispatch({ type: actionTypes.COUNTER, payload: token })
                                                    })
                                            }
                                        })
                                        console.log(docs)
                                    })
                                }
                            }
                        })
                    resolve(true)
                })

        })
    }
}


export function AllOrders(user, flag) {
    var allOrders = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            var order = db.collection('order')
            order.where('buyerId', '==', user).onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    dispatch({ type: actionTypes.EMPTYORDER, payload: true })
                } else {
                    dispatch({ type: actionTypes.EMPTYORDER, payload: false })
                }
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {

                        flag = !flag
                        allOrders.push(docs.doc.data())
                        dispatch({ type: actionTypes.FLAG, payload: flag })
                        dispatch({ type: actionTypes.ORDERS, payload: allOrders })
                    }
                    if (docs.type === 'modified') {
                        dispatch({ type: actionTypes.MODIFIEDORDER, payload: docs.doc.data() })
                    }
                })
            })


        })
    }
}



export function AllOrdersSeller(user, flag) {
    var allOrders = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('run order action', user)
            var order = db.collection('order')

            // for seller 

            order.onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    dispatch({ type: actionTypes.EMPTYSELLERORDER, payload: true })
                } else {
                    dispatch({ type: actionTypes.EMPTYSELLERORDER, payload: false })
                }
                querySnapshot.docChanges().forEach((docs) => {

                    // Wasi Code
                    if (docs.type === 'added') {
                        if (docs.doc.data().paymentStatus === "confirmed") {
                            // wasi COde
                            var count = 0;
                            var docData = docs.doc.data().product;
                            docData.map(item => {
                                if (count === 0 && item.sellerId === user) {
                                    console.log(user, 'docs.doc.data().product', docData)
                                    count = 1;
                                    flag = !flag
                                    allOrders.push(docs.doc.data())
                                    dispatch({ type: actionTypes.FLAG, payload: flag })
                                    dispatch({ type: actionTypes.EMPTYSELLERORDER, payload: false })
                                    dispatch({ type: actionTypes.SELLERORDER, payload: allOrders })
                                }
                            })
                        }
                    }

                    if (docs.type === 'modified') {
                        console.log(docs.doc.data(), 'data delivery')
                        dispatch({ type: actionTypes.MODIFIEDORDER, payload: docs.doc.data() })
                    }
                })
            })
        })
    }
}


export function updateEmail(name, value, userUid) {
    return dispatch => {

        db.collection('users').where('userUid', '==', userUid).get()
            .then((querysnaps) => {
                console.log('wasi 1')
                querysnaps.forEach((docs) => {

                    db.collection('users').doc(docs.id).update({
                        [name]: value
                    })
                        .then(() => {
                            console.log('wasi 2')

                        })
                })
            })


        db.collection('users').where('userUid', '==', userUid).onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((changes) => {
                if (changes.type === 'modified') {
                    dispatch({ type: actionTypes.CURRENTUSER, payload: changes.doc.data() })
                }
            })
        })

    }
}


export function DeliveryStatus(items, user) {
    return dispatch => {
        console.log(items, 'items')
        db.collection('order').where('orderId', '==', items.orderId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((docs) => {
                    console.log(docs.data(), 'docs of data')
                    let myData = docs.data().product.slice(0)
                    myData.map((data, index) => {
                        if (data.sellerId === user) {
                            data.status = 'delivered'
                            console.log(data, 'ddd')
                            db.collection('order').doc(`${docs.id}`).update({
                                product: myData
                            })
                        }
                    })
                })
            })
    }
}

export function confirmStatus(items) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log(items, 'items')
            db.collection('order').where('orderId', '==', items.orderId).get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((docs) => {
                        console.log(docs.data(), 'your data')
                        db.collection('order').doc(docs.id).update({
                            status: 'recieved'
                        })
                            .then((success) => {
                                resolve(success)
                            })
                    })

                })
        })
    }
}

export function deliveryConfirmation() {
    const myOrderId = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('order').onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    if (docs.type === 'added') {
                        var counter = 0
                        var myProduct = docs.doc.data().product.slice(0)
                        myProduct.map((items) => {
                            if (items.status === 'delivered') {
                                counter++
                            }
                        })
                        if (myProduct.length === counter) {
                            myOrderId.push(docs.doc.data().orderId)
                            console.log(myOrderId, 'order if djksbdkasjdb')
                            dispatch({ type: actionTypes.CONFIRMDELIVERY, payload: myOrderId })
                        }
                    }
                })
            })
        })
    }
}



export function deleteOrder(items) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log(items, 'items')
            db.collection('order').where('orderId', '==', items.orderId).get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((docs) => {
                        console.log(docs.data(), 'your data')
                        db.collection('order').doc(docs.id).delete()
                            .then(() => {
                                resolve(items)
                            })
                    })

                })
        })
    }
}