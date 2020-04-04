import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

import './admin-new-game.component';
import './admin-console-bar.component';
import { FirebaseQuery } from '../../core/firebase-query';
import { AdminConsoleP5 } from '../../p5/admin-console.p5';
import { Game } from '../../core/classes/game.class';
//import p5 from 'p5';
//import Peer from 'peerjs';

export class AdminConsolePage extends NavElement {

    static get properties() {
        return {
            showNewGameComponent: { type: Boolean },
            allTeamsName: { type: Array }
        }
    }

    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
        this.showNewGameComponent = false;
        //oggetto Peer dell'admin a cui si dovranno connettere le squadre
        this.adminPeer = null;

        //controllo se esiste già la partita con il mio UID
        this.checkIfGameExists();
        //contiene onSnapshot di firebase. La chiamo in disconnectedCallback per rimuovere il listener
        this.listenToChangesFunction = null;
        //reference all'istanza di p5, stesso motivo per cui ho listenToChangesFunction
        this.istanzaP5 = null;
        //console relativa a p5. Si passano i dati della partita
        this.adminConsoleP5 = new AdminConsoleP5();
        //serve a admin-coonsole-bar per mostrare il nome della squadra da cambiare
        this.allTeamsName = [];
        //millisecondi per ogni upload del gioco
        this.millisBetweenUpload = 5000;
        this.gameUploadReference = null;
        //millisecondi per comunicazione a peer
        this.millisForPeers = 1000;
        this.activeConnections = [];
        this.peerUpdatesReference = null;

    }

    render() {
        return html`
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">CONSOLE AMMINISTRATORE</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a><!--TODO: controllare perche grandezza icone non va-->
                    </div>
                    <hr> 
                </div>
            </div>
            <div class = " gradient-box ">
                <admin-new-bar-component .gameIsPlaying="${this.adminConsoleP5.gameIsPlaying}"
                @changeTeamData= ${e => this.changeTeamData(e.detail)}
                .allTeamsName= "${this.allTeamsName}"
                @gameStatusToggled = ${e => this.adminConsoleP5.gameIsPlaying = e.detail}></admin-new-bar-component>
            </div>
            <br>
            <div class = " gradient-box map-padding "> 
                <div class ="colums is-full " >
                    <div class= "column ">            
                        <div id="container-p5"></div> 
                    </div> 
                </div>    
            </div>
            
            
            <!--popup compare se non esiste la partita-->
            ${this.showNewGameComponent ? html`<admin-new-game-component ></admin-new-game-component>` : html``}          
        `;
    }


    checkIfGameExists() {
        this.firebaseQuery.setUid(AdminState.uid);
        //se la partita non esiste mostro il popup per crearla, altrimenti passo i suoi dati a p5
        this.listenToChangesFunction = this.firebaseQuery.listenToChanges(game => {
            game ? this.proceedWithP5Script(game) : this.showNewGameComponent = true;
        });
    }

    proceedWithP5Script(game) {
        //chiudo il popup per creare la partita nel caso sia aperto
        this.showNewGameComponent = false;
        //passo game all'engine
        this.adminConsoleP5.gameData = game;
        //mostro ad admin-console-bar i nomi delle squadre
        this.allTeamsName = Object.keys(game.teams);

        //se non ho un'istanza di p5 significa che la partita è stata appena creata. Imposto quindi p5
        if (!this.istanzaP5) {
            let container = this.querySelector('#container-p5');
            this.istanzaP5 = new p5(this.adminConsoleP5.p5Function.bind(this.adminConsoleP5), container);
            //salvo una reference all'upload del gioco du firebase
            this.gameUploadReference = setInterval(() => {
                if (this.adminConsoleP5.gameIsPlaying) { this.uploadGameToFirebase() }
            }, this.millisBetweenUpload);

            //salvo reference per upload a peer
            this.peerUpdatesReference = setInterval(() => {
                if (this.adminConsoleP5.gameIsPlaying) { this.sendUpdatesToPeers() }
            }, this.millisForPeers);
        }
        //se adminPeer non è impostato devo creare un nuovo oggetto Peer. Come id uso l'UID
        if (!this.adminPeer) {
            this.adminPeer = new Peer(AdminState.uid);
            console.log('creating admin peer with id ', AdminState.uid);
            this.adminPeer.on('connection', conn => {
                conn.on('data', data => {
                    //console.log('received data from: '+ conn.peer, data);
                    this.adminConsoleP5.gameData.teams[conn.peer].inputs = data;
                });
                conn.on('open', () => {
                    console.log('started connection', conn);
                    //quando il team si connette, lo aggiungo alle squadre connesse
                    this.activeConnections.push(conn);
                    //setto isUsed la squadra
                    if (this.adminConsoleP5.gameData.teams[conn.peer] != null) {
                        this.adminConsoleP5.gameData.teams[conn.peer].outputs.isUsed = true;
                    }
                    //aggiorno firebase immediatamente
                    this.uploadGameToFirebase();
                });
                conn.on('close', () => {
                    console.log('disconnected peer: ', conn.peer);
                    //quandoil team si disconnette lo rimuovo dalle connessioni
                    for (let i = 0; i < this.activeConnections.length; i++) {
                        if (this.activeConnections[i].peer = conn.peer) {
                            this.activeConnections = this.activeConnections.filter(el => el.peer != conn.peer);
                        }
                    }
                    //setto isUsed a false
                    if (this.adminConsoleP5.gameData.teams[conn.peer] != null) {
                        this.adminConsoleP5.gameData.teams[conn.peer].outputs.isUsed = false;
                    }
                    //aggiorno immediatamente firebase per settare a false isUsed
                    this.uploadGameToFirebase();
                })
            });

            //aggiungo la callback nel caso una nave si scontri
            this.adminConsoleP5.callbackShipCollided = (teamName) => {
                console.log('Ship collided: ' + teamName);
                this.sendUpdatesToPeers(teamName);
            }
        }
    }

    disconnectedCallback() {
        //elimino il listener quando esco dal component
        if (this.listenToChangesFunction) { this.listenToChangesFunction() }
        //elimino l'istanza di p5
        if (this.istanzaP5) { this.istanzaP5.remove() }
        //elimino setInterval
        if (this.gameUploadReference) { clearInterval(this.gameUploadReference) }
        //elimino setInterval (comunicazione ai team)
        if (this.peerUpdatesReference) { clearInterval(this.peerUpdatesReference) }
        //chiudo tutte le connessioni
        this.activeConnections.forEach(connection => {
            connection.close();
        });
        //distruggo il mio peer
        if (this.adminPeer) { this.adminPeer.destroy() };
    }

    uploadGameToFirebase() {
        //il controllo se gameIsPlaying viene fatto prima poichè questa funzione viene utilizzata anche 
        this.firebaseQuery.updateDocument(this.adminConsoleP5.gameData, () => { }/*console.log('update successfully')*/);
    }

    changeTeamData(dataToChange) {
        Object.keys(this.adminConsoleP5.gameData.teams).forEach(teamName => {
            if (teamName = dataToChange.teamName) {
                if (dataToChange.positionX !== "") {
                    this.adminConsoleP5.gameData.teams[teamName].outputs.positionX = parseInt(dataToChange.positionX)
                }
                if (dataToChange.positionY !== "") {
                    this.adminConsoleP5.gameData.teams[teamName].outputs.positionY = parseInt(dataToChange.positionY)
                }
                if (dataToChange.fuel !== "") {
                    this.adminConsoleP5.gameData.teams[teamName].outputs.fuel = parseInt(dataToChange.fuel)
                }
                if(dataToChange.direction !== ""){
                    this.adminConsoleP5.gameData.teams[teamName].outputs.direction = parseInt(dataToChange.direction)
                }
                if(dataToChange.isUsed !== ""){
                    this.adminConsoleP5.gameData.teams[teamName].outputs.isUsed = dataToChange.isUsed;
                    
                }
                this.firebaseQuery.updateSingleTeam(teamName, this.adminConsoleP5.gameData.teams[teamName]);
            }
        })
    }

    //se non passo l'argomento sto inviando l'update a tutti i team
    sendUpdatesToPeers(singlePeerName = "") {
        Object.keys(this.adminConsoleP5.gameData.teams).forEach(teamName => {
            this.activeConnections.forEach(connection => {
                if (connection.peer == teamName && (singlePeerName == "" || singlePeerName == teamName)) {
                    let dataToSend = {
                        info: {},
                        teams: {}
                    };
                    dataToSend.info = this.adminConsoleP5.gameData.info;
                    dataToSend.teams[teamName] = this.adminConsoleP5.gameData.teams[teamName];
                    //notifico ogni peer dei nuovi dati della partita
                    connection.send(dataToSend);
                }
            });
        })
    }
}


customElements.define('admin-console-page', AdminConsolePage);