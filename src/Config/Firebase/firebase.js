import firebase from 'firebase'

// Put firebase configuration here...

{/* <script src="https://www.gstatic.com/firebasejs/5.5.7/firebase.js"></script> */ }

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDftIFu-IUOY6yeboty3yIVE-2iNC1oMC4",
    authDomain: "iftarbazar-fba43.firebaseapp.com",
    databaseURL: "https://iftarbazar-fba43.firebaseio.com",
    projectId: "iftarbazar-fba43",
    storageBucket: "iftarbazar-fba43.appspot.com",
    messagingSenderId: "852942181639"
};
firebase.initializeApp(config);



export default firebase