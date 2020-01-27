import { NavElement, html } from '../../core/nav-element';
import { Info } from '../../core/classes/info.class';
import { Team } from '../../core/classes/team.class';
import { FirebaseQuery } from '../../core/firebase-query';
import { TeamState } from '../../core/states/team.state';

import './textual-interface.component';
import { TeamConsoleP5Controller } from '../../p5/team-console.p5';
import { ClickAction } from '../../p5/clickActionCode';
import { Inputs } from '../../core/classes/inputs.class';
//import p5 from 'p5';
//import Peer from 'peerjs';

export class TeamConsolePage extends NavElement {

    static get properties() {
        return {
            gameInfo: { type: Object },
            myTeam: { type: Object }
        }
    }

    constructor() {
        super();
        //contiene la proprietà info della partita a cui sono connesso
        this.gameInfo = new Info();
        //contiene i dati del mio team
        this.myTeam = new Team();
        //contiene i dati già inviati. Serve a non inviare niente a firebase se non faccio modifiche
        this.previouslySentInputs = new Inputs();

        //reference alla classe
        this.firebaseQuery = new FirebaseQuery();

        //serve ad eliminare onSnapshot quando cambio pagina
        this.onSnapshotReference = null;

        //passerò i nuovi dati che ottengo da firebase a teamConsoleP5
        this.teamConsoleP5 = new TeamConsoleP5Controller(710, 740);

        //istanza di p5 inizialmente null
        this.p5 = null;

        //alcuni dati per gestire la nave
        this.maxAcceleration = 5;
        this.minAcceleration = -5;
        this.maxWheelAngle = 30;

        //tempo tra un invio e l'altro degli input a firebase
        this.millisBetweenInputsUpload = 50;
        //la reference serve a rimuovere setInterval
        this.uploadInputsRef = null;
        //peer che andrà connesso all'admin
        this.peer = null;
        //connesssione all'admin
        this.connectionWithAdmin = null;
    }

    render() {
        return html`            
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">CONSOLE SQUADRA</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a>
                    </div>
                    <hr> 
                </div>
            </div>
            <div class = " columns is-mobile is-full is-centered">
                <div class = "column is-11">
                    <div class = "columns">
                        <div class = " column is-6">
                            <div class = " gradient-box primary-box box-shadow-primary">
                                <div class = "columns is-centered">
                                    <div class = " column is-11"> 
                                        <div id="container-p5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = " column is-6">
                            <div class = " gradient-box link-box box-shadow-link">
                                <div class = "columns is-centered">                                   
                                        <textual-interface-component .gameInfo = ${this.gameInfo} .myTeam= ${this.myTeam} .teamName=${TeamState.teamName}></textual-interface-component>                                    
                                </div>                             
                            </div>                      
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        //cambio lo uid
        this.firebaseQuery.setUid(TeamState.connectedToGameId);

        //creo un peer
        this.peer = new Peer(TeamState.teamName);
        console.log('creating peer with id: ', TeamState.teamName);
        this.connectionWithAdmin = this.peer.connect(TeamState.connectedToGameId);
        console.log('connecting with admin peer: ', TeamState.connectedToGameId);
        this.connectionWithAdmin.on('open', () => {
            console.log('connected to admin: ', TeamState.connectedToGameId);
        });
        this.connectionWithAdmin.on('data', data => {
            console.log('received data from admin: ', data);
            //se non ho già un'istanza di p5 significa che sono appena entrato nella pagina
            if (!this.p5) {
                let container = this.querySelector('#container-p5');

                //creo quindi l'istanza
                this.p5 = new p5(this.teamConsoleP5.p5Function.bind(this.teamConsoleP5), container);

                //imposto i valori iniziali come già caricati
                this.previouslySentInputs = Object.assign({}, data.teams[TeamState.teamName].inputs);

                //aggiungo la callback per quando clicco
                this.teamConsoleP5.setCallbackToMouseClick(action => this.applyClickAction(action));

                //ogni tot secondi carico i nuovi input se sono diversi
                //TODO: il timer per la presenza del giocatore può venire aggiornato qui, al momento del caricamento su firebase
                this.uploadInputsRef = setInterval(() => this.uploadInputsIfChanged(), this.millisBetweenInputsUpload);
            }
            //inserisco i nuovi dati e chiamo così il reload del component
            this.gameInfo = data.info;
            this.myTeam = data.teams[TeamState.teamName];
        });
    }

    updated() {
        //ad ogni reload passo alla console i nuovi dati
        this.teamConsoleP5.gameInfo = this.gameInfo || new Info();
        this.teamConsoleP5.myTeam = this.myTeam || new Team();
    }

    disconnectedCallback() {
        //se esco dalla pagina rimuovo p5, onSnapshot di firebase e setInterval per upload
        if (this.p5) { this.p5.remove() }
        if (this.onSnapshotReference) { this.onSnapshotReference() };
        if (this.uploadInputsRef) { clearInterval(this.uploadInputsRef) };
    }

    applyClickAction(action) {
        switch (action) {
            case ClickAction.accelerate: {
                if (this.myTeam.inputs.acceleration < this.maxAcceleration)
                    this.myTeam.inputs.acceleration++;
                else
                    this.myTeam.inputs.acceleration = this.maxAcceleration;

                break;
            }
            case ClickAction.decelerate: {
                if (this.myTeam.inputs.acceleration > this.minAcceleration)
                    this.myTeam.inputs.acceleration--;
                else
                    this.myTeam.inputs.acceleration = this.minAcceleration;

                break;
            }
            case ClickAction.turnRight: {
                // controllo che barra sia tra -30<barra<30
                if (this.myTeam.inputs.wheel < this.maxWheelAngle)
                    this.myTeam.inputs.wheel++;
                else
                    this.myTeam.inputs.wheel = this.maxWheelAngle;

                break;
            }
            case ClickAction.turnLeft: {
                // controllo che barra sia tra -30<barra<30
                if (this.myTeam.inputs.wheel > - this.maxWheelAngle)
                    this.myTeam.inputs.wheel--;
                else
                    this.myTeam.inputs.wheel = -this.maxWheelAngle;

                break;
            }
            case ClickAction.resetWheel: {
                this.myTeam.inputs.wheel = 0;
                break;
            }
            //il default non fa niente
        }
    }

    uploadInputsIfChanged() {
        //se uno dei parametri è cambiato aggiorno su firebase
        let teamInputsChanged = false;
        if (this.myTeam.inputs.acceleration != this.previouslySentInputs.acceleration)
            teamInputsChanged = true;
        if (this.myTeam.inputs.wheel != this.previouslySentInputs.wheel)
            teamInputsChanged = true;
        if (this.myTeam.inputs.timer != this.previouslySentInputs.timer)
            teamInputsChanged = true;

        if (teamInputsChanged && this.connectionWithAdmin) {
            console.log('sending inputs to admin');
            this.connectionWithAdmin.send(Object.assign({}, this.myTeam.inputs));
            this.previouslySentInputs.acceleration = teamInputsChanged.acceleration;
            this.previouslySentInputs.wheel = teamInputsChanged.wheel;
            this.previouslySentInputs.timer = teamInputsChanged.timer;
        }
    }
}

customElements.define('team-console-page', TeamConsolePage);