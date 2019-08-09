import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyAGEi4dQkbR2feQyJwqZUkztgpgV0nT3Hk",
    authDomain: "navigator-talentree.firebaseapp.com",
    databaseURL: "https://navigator-talentree.firebaseio.com",
    projectId: "navigator-talentree",
    storageBucket: "navigator-talentree.appspot.com",
    messagingSenderId: "95277623251"
};


firebase.initializeApp(config);
console.log('inizializzato firebase');

