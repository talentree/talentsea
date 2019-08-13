import firebase from "firebase/app";

export class FirebaseQuery {

    constructor() {
        this.db = firebase.firestore().collection("games");
        
    }

    set(uid){
        this.doc = db.doc(uid);
    }

    //restituisce tutti i documenti del database dentro un array
    readAll(func) {
        this.db.get()
            .catch(e => console.log(e))
            .then(res => {
                let datas = [];
                res.docs.forEach(doc => {
                    datas.push(doc.data());
                })
                func(datas);
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