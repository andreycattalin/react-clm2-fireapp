import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDaHLMlToAWIg5DcLD5ZN5PIYWzlU6wSRc",
    authDomain: "demoproject-1f866.firebaseapp.com",
    databaseURL: "https://demoproject-1f866.firebaseio.com",
    projectId: "demoproject-1f866",
    storageBucket: "demoproject-1f866.appspot.com",
    messagingSenderId: "331647175493",
    appId: "1:331647175493:web:8a25c88b614243a1434c2c"
};

firebase.initializeApp(firebaseConfig);


export { firebase }