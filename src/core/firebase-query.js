import firebase from "firebase/app";
import { Game } from "./classes/game.class";
import { Team } from "./classes/team.class";
import { AdminState } from './states/admin.state';

export class FirebaseQuery {

    constructor() {
        this.db = firebase.firestore().collection('games');

    }

    setUid(uid) {
        this.doc = this.db.doc(uid);
    }

    /**
     * Writes a document to Firebase (overwrite)
     * @param {Object} document - Document to write
     * @param {function} callback - Callback executed if no errors
     */
    uploadDocument(document, callback) {
        this.doc.set(document)
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
        this.setUid(AdminState.uid);
        //TODO: deleteCustomObject è una soluzione a errore di firebase
        //in updateInputs non sembra necessario object.assign
        let gameConverted = this.deleteCustomObject(Object.assign({}, game));
        this.uploadDocument(gameConverted, callback)
    }

    //TODO: ALLORA, la lascio qui così se fa schifo basta cancellarla, nel frattempo la provo
    deleteCustomObject(custom) {
        //controllo che sia un oggetto prima di provare a modificarlo
        if (custom === Object(custom) && !Array.isArray(custom)) {
            Object.keys(custom).forEach(property => {
                if (custom[property] === Object(custom[property]) && !Array.isArray(custom[property])) {
                    custom[property] = Object.assign({}, this.deleteCustomObject(custom[property]));
                }
            })
        }
        return custom;
    }

    listenToChanges(func) {
        /*esegue una callback ad ogni cambiamento del documento
        ma ritorna se stessa per poter rimuovere il listener*/
        return this.doc.onSnapshot(doc => func(doc.data()));
    }

    updateInputs(teamName, inputs, onSuccess) {
        let inputsToUpload = this.deleteCustomObject(inputs);
        this.doc.update('teams.' + teamName + '.inputs', inputsToUpload)
            .catch(err => console.log('error in uploadInputs ', err))
            .then(() => onSuccess());
    }

    /**
     * Updates a document on firebase. Does not overwrite
     * @param {Object} document - Document to update
     * @param {function} callback - Executed at update compleate successfully
     */
    updateDocument(document, callback) {
        let documentObject = this.deleteCustomObject(document);
        this.doc.update(documentObject)
            .catch(err => console.log('Error in updateDocument!', err))
            .then(() => callback())
    }

    updateSingleTeam(teamName, newValues, onSuccess) {
        let newValuesObject = this.deleteCustomObject(newValues);
        this.doc.update('teams.' + teamName, newValuesObject)
            .catch(err => console.log('error in updateSingleTeam ', err))
            .then(() => { if (onSuccess) { onSuccess() } })
    }

    teamTryLoginToGame(gameName, teamName, teamPassword, onSuccess, onFail) {
        this.db.where('info.name', '==', gameName).where('teams.' + teamName + '.password', '==', teamPassword).get()
            .catch(err => {
                console.log('error in teamTryLoginToGame', err);
                onFail(err);
            })
            .then(res => {
                if (res.empty || !res.docs[0].exists) { onFail('Dati sbagliati') }
                else if (res.docs[0].data().teams[teamName].outputs.isUsed) { onFail('La squadra ha già un comandante!') }
                else {
                    onSuccess(res.docs[0].id, teamName)
                }
                //onSuccess(res.docs[0].id, teamName)
            })
    }
}