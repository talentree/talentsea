import * as firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

// Inizializzo Firebase
var config = {
    apiKey: "AIzaSyAGEi4dQkbR2feQyJwqZUkztgpgV0nT3Hk",
    authDomain: "navigator-talentree.firebaseapp.com",
    databaseURL: "https://navigator-talentree.firebaseio.com",
    projectId: "navigator-talentree",
    storageBucket: "navigator-talentree.appspot.com",
    messagingSenderId: "95277623251"
};
firebase.initializeApp(config);

//cambio settings a firestore dopo errore
/*
@firebase/firestore: Firestore (5.5.9): 
The behavior for Date objects stored in Firestore is going to change
AND YOUR APP MAY BREAK.
*/
firebase.firestore().settings({ timestampsInSnapshots: true });
console.log('inizializzato firebase');
