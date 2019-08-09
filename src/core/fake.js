import firebase from "firebase/app";

export class Fake {

    constructor() {
        const db = firebase.firestore();
        this.doc = db.collection("Fake").doc("1");
    }

    read() {
        return new Promise((resolve, reject) => {
            this.doc
                .get()
                .catch(e => reject(e))
                .then(res => resolve(res.data()));
            });
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
}