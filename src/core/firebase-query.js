import firebase from "firebase/app";

export class FirebaseQuery {

    constructor() {
        const db = firebase.firestore();
        this.doc = db.collection("games").doc("1");
    }

/*     read() {
        return new Promise((resolve, reject) => {
            this.doc
                .get()
                .catch(e => reject(e))
                .then(res => resolve(res.data()));
            });
        } */
        
        /*
    read(func) {
        this.doc.get()
            .catch(e => console.log(e))
            .then(res => func(res.data()));
    }

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