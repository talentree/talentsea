import * as firebase from "@firebase/app";

export class Fake {

    constructor() {
        this.db = firebase.firestore();
    }

    read() {
        return this.db.collection("Fake").doc("1").get();
    }
}