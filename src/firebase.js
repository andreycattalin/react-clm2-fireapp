import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AAA",
    authDomain: "AAAA",
    databaseURL: "AAA",
    projectId: "AAA",
    storageBucket: "AAAA",
    messagingSenderId: "AAAA",
    appId: "AAA"
};

firebase.initializeApp(firebaseConfig);


export { firebase }