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

// export function ProductCart(obj) {
export function ProductCart(arr, buyerId) {
    var total = 0
    return dispatch => {
        return new Promise(function (resolve, reject) {
            
            const addProduct = db.collection("cart").doc(buyerId)
            // console.log(arr,'array hai idhaar')
            if (arr.length > 0) {
                addProduct.set({ carts: arr }).then((success) => {
                    resolve(success)
                    token = !token
                    dispatch({ type: actionTypes.COUNTER, payload: token })
                    dispatch({ type: actionTypes.CART, payload: arr })
                })
            }
            else {
                addProduct.delete().then((success) => {
                    resolve(success)
                    token = !token
                    dispatch({ type: actionTypes.COUNTER, payload: token })
                    dispatch({ type: actionTypes.CART, payload: arr })
                })
            }
            //     }
            // })
        })
    }
}


export function AllCart(userUid) {
    var token = false
    const cartArr = []
    return dispatch => {
        return new Promise(function (resolve, reject) {
            const addProduct = db.collection("cart").doc(userUid).onSnapshot((docs) => {

                console.log('docs', docs.data())
                if (docs.exists) {
                    // if (doc.data() != undefined) {
                    dispatch({ type: actionTypes.CART, payload: docs.data().carts })
                    // }
                    dispatch({ type: actionTypes.EMPTYCART, payload: false })

                } else {
                    dispatch({ type: actionTypes.EMPTYCART, payload: true })
                    dispatch({ type: actionTypes.CART, payload: [] })
                }

            })


        })
    }
}
