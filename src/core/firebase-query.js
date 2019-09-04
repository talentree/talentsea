import firebase from "firebase/app";
import { Game } from "./classes/game.class";
import { Team } from "./classes/team.class";
import { AdminState } from './states/admin.state';

export class FirebaseQuery {

    constructor() {
        this.db = firebase.firestore().collection("games");

    }

    setUid(uid) {
        this.doc = this.db.doc(uid);
    }

    uploadDocument(doc, callback) {
        this.doc.set(doc)
            .catch(err => console.log('error in uploadDocument', err))
            .then(() => callback());
    }

    //restituisce tutti i documenti del database dentro un array
    readAll(func) {
        this.db.get()
            .catch(e => console.log('error in readAll', e))
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
   
    createNewGame(gameName, teamArray, callback) {
        let game = new Game();
        game.info.name = gameName;
        teamArray.forEach(team => {
            let teamConverted = new Team();
            teamConverted.password = team.teamPassword;
            game.teams[team.teamName] = teamConverted;
        });
        //console.log(game);
        //TODO: aggiro mancanza di uid
        this.setUid(AdminState.uid);
        //TODO: deleteCustomObject èuna soluzione a errore di firebase
        let gameConverted = this.deleteCustomObject(Object.assign({}, game));
        this.uploadDocument(gameConverted, callback)
    }

    //TODO: ALLORA, la lascio qui così se fa schifo basta cancellarla, nel frattempo la provo
    deleteCustomObject(custom) {
        //controllo che sia un oggetto prima di provare a modificarlo
        if(custom === Object(custom) && !Array.isArray(custom)){
            Object.keys(custom).forEach(property => {
                if (custom[property] === Object(custom[property]) && !Array.isArray(custom[property])) {
                    custom[property] = Object.assign({}, this.deleteCustomObject(custom[property]));
                }
            })
        }
        return custom;
    }

    listenToChanges(func){
        /*esegue una callback ad ogni cambiamento del documento
        ma ritorna se stessa per poter rimuovere il listener*/
        return this.doc.onSnapshot(doc => func(doc.data()));
    }
}