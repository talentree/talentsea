import firebase from "firebase/app";
import { Game } from "./classes/game.class";

export class FirebaseQuery {

    constructor() {
        this.db = firebase.firestore().collection("games");
        
    }

    setUid(uid){
        this.doc = db.doc(uid);
    }

    uploadDocument() {

    }



    //restituisce tutti i documenti del database dentro un array
    readAll(func) {
        this.db.get()
            .catch(e => console.log(e))
            .then(res => {
                let data = [];
                res.docs.forEach(doc => {
                    data.push(doc.data());
                })
                func(data);
            });
    }
        
    read(func) {
        this.doc.get()
            .catch(e => console.log(e))
            .then(res => func(res.data()));
    }
/*
    reads(func) {
        this.doc.onSnapshot(doc => func(doc.data()));
        }

    setContatore(contatore) {
        this.doc.update({contatore});
    }

    setProva(prova) {
        this.doc.update({prova});
    }

    setFake(fake) {
        this.doc.update(fake);
    }
    */
}