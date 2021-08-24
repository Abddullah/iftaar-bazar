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



export function AllChatsForAdmin() {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            var flag = null;
            var arr = [];
            db.collection("messages")
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.docChanges().forEach(function (doc) {
                        if (doc.type === 'added') {
                            flag = flag ? null : 'flag'
                            var obj = {
                                key: doc.doc.id,
                                data: doc.doc.data()
                            }
                            arr.push(obj)
                            dispatch({ type: actionTypes.ALLCHAT, payload: arr })
                            dispatch({ type: actionTypes.CHATFLAG, payload: flag })
                            // console.log('Addedreciever', arr)
                        }
                        if (doc.type === 'modified') {
                            flag = flag ? null : 'flag'
                            var obj = {
                                key: doc.doc.id,
                                data: doc.doc.data()
                            }
                            arr.map((item, index) => {
                                if (item.key === doc.doc.id) {
                                    arr.splice(index, 1, obj)
                                }
                            })
                            dispatch({ type: actionTypes.ALLCHAT, payload: arr })
                            dispatch({ type: actionTypes.CHATFLAG, payload: flag })
                            // console.log('Addedreciever', arr)
                        }
                    });
                });
        })
    }
}

export function AllChats(userUID) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            var flag = null;
            var arr = [];

            db.collection("messages")
                .where("reciever", "==", userUID)
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.docChanges().forEach(function (doc) {
                        if (doc.type === 'added') {
                            console.log('child of message added', doc.doc.data())

                            flag = flag ? null : 'flag'
                            // arr.push({
                            //     data: doc.doc.data(),
                            //     key: doc.doc.id
                            // })
                            arr.push(doc.doc.data())
                            dispatch({ type: actionTypes.CHAT, payload: arr })
                            dispatch({ type: actionTypes.CHATFLAG, payload: flag })
                            // console.log('Addedreciever', arr)
                        }
                    });
                });

            db.collection("messages")
                .where("sender", "==", userUID)
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.docChanges().forEach(function (doc) {
                        if (doc.type === 'added') {
                            console.log('child of message added', doc.doc.data())

                            flag = flag ? null : 'flag'
                            arr.push(doc.doc.data())
                            dispatch({ type: actionTypes.CHAT, payload: arr })
                            dispatch({ type: actionTypes.CHATFLAG, payload: flag })
                            // console.log('Addedsender', arr)
                        }
                    });
                });

        })
    }
}


export function ChatAction(message) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            const chatNode = db.collection("messages")
            chatNode.add(message).then((success) => {
                console.log('messagemessage', message)
                resolve(success)
            })
        })
    }
}



export function UpdateSeen(items, user, otherUser) {
    return dispatch => {
        console.log(items, 'Request*****************itmes')
        return new Promise(function (resolve, reject) {
            db.collection('messages').where('reciever', '==', user)
                .where('sender', '==', otherUser)
                // .where('seen', '==', !items.seen)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((docs) => {
                        // console.log(docs.data(),'docs.data()')

                        // if (docs.data().time === items.time) {

                        // console.log(docs.data(), 'mesage docs.data')
                        db.collection('messages').doc(docs.id).update({
                            seen: true
                        })
                        // }
                    })
                })
        })
    }
}


export function updateWarningSeen(key, chats, boolean) {
    return dispatch => {
        console.log('*****************itmes')
        return new Promise(function (resolve, reject) {
            db.collection('messages').doc(key).update({
                adminSeen: true
            })
            // .then(() => {
            //     dispatch({ type: actionTypes.CHAT, payload: chats })
            //     dispatch({ type: actionTypes.CHATFLAG, payload: boolean })
            // })
        })
    }
}


export function seenBadge(user) {
    let arr = []
    // console.log('seenBadge(arr)', user)
    return dispatch => {
        return new Promise(function (resolve, reject) {
            // console.log('seenBadge(resolve)', user)
            db.collection('messages').where('reciever', '==', user).onSnapshot((querySnapshot) => {
                querySnapshot.docChanges().forEach((docs) => {
                    // console.log('seenBadge(docs)', user)
                    if (docs.type === 'added') {
                        // console.log('seenBadge(reciever)', user)
                        if (docs.doc.data().seen === false) {
                            // console.log(docs.doc.data(), 'docs ka data added')
                            // console.log(user, 'reciever added')
                            if (arr.indexOf(docs.doc.data()) === -1) {
                                arr.push(docs.doc.data())
                            }
                            // console.log(arr, 'arr array heere')
                            dispatch({ type: actionTypes.NOTSEEN, payload: arr })
                        }
                    }
                    if (docs.type === 'modified') {
                        // console.log('seenBadge(modified)', user)
                        dispatch({ type: actionTypes.MODIFIEDSEEN, payload: docs.doc.data() })
                    }
                })
            })
        })
    }
} 
