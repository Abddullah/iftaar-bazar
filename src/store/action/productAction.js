import swal from 'sweetalert2';
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

export function allProduct() {
    const allproductArr = []
    var flag = false;
    return dispatch => {
        db.collection('products')
            .onSnapshot(function (querySnapshot) {

                // db.collection('products').get()
                //     .then((querySnapshot) => {

                querySnapshot.docChanges().forEach(docs => {
                    // if (docs.data().userUid === userUid) {
                    if (docs.type === 'added') {
                        flag = !flag;
                        var obj = {
                            key: docs.doc.id,
                            ...docs.doc.data()
                        }
                        allproductArr.push(obj)
                        console.log('products Arrr*********', allproductArr)
                        dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                        dispatch({ type: actionTypes.COND, payload: flag })
                    }
                    if (docs.type === 'modified') {
                        flag = !flag;
                        var obj = {
                            key: docs.doc.id,
                            ...docs.doc.data()
                        }
                        allproductArr.map((item, index) => {
                            if (item.key === docs.doc.id) {
                                allproductArr.splice(index, 1, obj)
                            }
                        })
                        dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                        dispatch({ type: actionTypes.COND, payload: flag })
                    }

                    if (docs.type === 'removed') {
                        flag = !flag;
                        allproductArr.map((item, index) => {
                            if (item.key === docs.doc.id) {
                                allproductArr.splice(index, 1)
                            }
                        })
                        dispatch({ type: actionTypes.ALLPRODUCTS, payload: allproductArr })
                        dispatch({ type: actionTypes.COND, payload: flag })

                    }
                })
            })
    }
}


export function products(userUid) {
    const productArr = []
    var counter = false
    return dispatch => {
        // console.log(userUid, 'ussserrrrrr')
        db.collection('products').where('userUid', '==', userUid).onSnapshot((querySnapshot) => {
            // console.log(querySnapshot,'querysnaps')
            if (querySnapshot.empty) {
                console.log(querySnapshot.empty, 'empty products true')
                dispatch({ type: actionTypes.EMPTYPRODUCT, payload: true })
            } else {
                console.log(querySnapshot.empty, 'empty products false')
                dispatch({ type: actionTypes.EMPTYPRODUCT, payload: false })
            }
            querySnapshot.docChanges().forEach(docs => {
                if (docs.type === 'added') {
                    const obj = {
                        data: docs.doc.data(),
                        key: docs.doc.id
                    }
                    productArr.push(obj)
                    console.log(productArr, 'products Arrr')
                    counter = !counter
                    dispatch({ type: actionTypes.PRODUCTS, payload: productArr })
                    dispatch({ type: actionTypes.FLAG, payload: counter })
                }
            })
        })
    }
}




export function searchProductAction(products) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            console.log('Search Product Action***', products);
            dispatch({ type: actionTypes.SEARCHPRODUCTS, payload: products })
        })
    }
}

export function searchProductTextAction(val) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            dispatch({ type: actionTypes.SEARCHPRODUCTSTEXT, payload: val })
        })
    }
}


export function DeleteProduct(user, key) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            db.collection('products').doc(key).delete().then(() => {
                resolve()
            })
        })
    }
}


export function AddToBasket(data, flag) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            console.log(data, 'action data here ')
            flag = !flag
            localStorage.setItem('myBasket', JSON.stringify(data))
            dispatch({ type: actionTypes.ADDCART, payload: data })
            dispatch({ type: actionTypes.GETCART, payload: data })
            dispatch({ type: actionTypes.CARTFLAG, payload: flag })
            resolve(flag)
        })
    }
}

export function getBasketItems() {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            const myData = localStorage.getItem('myBasket')
            if (myData && myData.length) {
                dispatch({ type: actionTypes.EMPTYBASKET, payload: false })
            } else {
                dispatch({ type: actionTypes.EMPTYBASKET, payload: true })
            }
            dispatch({ type: actionTypes.GETCART, payload: JSON.parse(myData) })

        })
    }
}


export function placeOrder(obj, flag, buy) {
    return dispatch => {
        return new Promise(function (resolve, reject) {

            db.collection('orders').add(obj).then(() => {
                flag = !flag
                dispatch({ type: actionTypes.ADDCART, payload: [] })
                dispatch({ type: actionTypes.GETCART, payload: [] })
                dispatch({ type: actionTypes.CARTFLAG, payload: flag })
                if (!buy) {
                    localStorage.setItem('myBasket', JSON.stringify([]))
                }
                resolve()
            })
        })
    }
}
