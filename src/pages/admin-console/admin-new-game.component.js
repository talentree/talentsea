import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';

import './insert-new-team.component';

export class AdminNewGameComponent extends NavElement {

    static get properties() {
        return {
            allTeams: { type: Array },
            isNameAlreadyTaken: { type: Boolean },
            isLoadingOnFirebase : { type: Boolean},
            missingData : {type: Boolean}
        }
    }

    constructor() {
        super();
        this.allTeams = [{
            teamName: '',
            teamPassword: ''
        }];
        //se true fa comparire messaggio
        this.isNameAlreadyTaken = false;
        this.firebaseQuery = new FirebaseQuery();
        this.gameName = '';
        this.isLoadingOnFirebase = false;
        this.missingData = false;
    }

    render() {
        return html`            
            <div class="modal" style ="display:block;">        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">                       
                        <p class=" modal-card-title is-size-2 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text  ">NUOVA PARTITA</p>
                    </header>
                    <section class="modal-card-body">
                        <h1 class="title is-4">Dati generali</h1>
                        <div class="field">
                        <!--TODO: quando isNameAlreadyTaken == true compare avviso-->
                            <label class="label">Inserisci nome della partita ${this.isNameAlreadyTaken? html`<b style="color: red">Nome già presente!</b>` : html``}</label>
                            <div class="control">
                                <input type="text" class="input" placeholder="Inserisci nome della partita" @input=${e => this.gameName = e.target.value}>
                            </div>
                        </div>
                        <div class="field">
                                ${this.allTeams.map(team => {
                                    return html`<insert-new-team-component .teamName="${team.teamName}" .teamPassword="${team.teamPassword}"
                                    @nameChanged="${e => team.teamName = e.detail}" @passwordChanged="${e => team.teamPassword = e.detail}"
                                    @teamRemoved="${e => this.removeTeam(team)}"
                                    ></insert-new-team-component>`;
                                })}
                        </div>
                        <div class="field">
                            <div class="control">
                                <a class="button is-primary" @click=${e => this.addTeam()}>Aggiungi squadra</a>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button route="/" class="button is-primary">Home</button>
                        <a class="button is-link ${this.isLoadingOnFirebase? 'is-loading is-disabled' : ''}" @click=${e => this.buildGame()}>Crea partita!</a>
                        ${this.missingData? html`<b style="color: red">Dati mancanti!</b>` : html``}
                    </footer>
                </div>
            </div>
        `;
    }

    addTeam() {
        this.allTeams = [...this.allTeams, {
            teamName: '',
            teamPassword: ''
        }];
    }

    buildGame() {
        console.log(this.allTeams);
        this.missingData = false;
        if(!this.gameName || this.allTeams.find(team => !team.teamName || !team.teamPassword)){
            console.log('dati incompleti');
            //TODO: che si fa con i dati incompleti?
            this.missingData = true;
        }
        else{
            this.isNameAlreadyTaken = false;
            this.isLoadingOnFirebase = true;
            this.firebaseQuery.checkForGameNameAvailable(this.gameName,
                //uso il bind nella callback così il this usato al suo interno punta a questa classe
                () => this.firebaseQuery.createNewGame(this.gameName, this.allTeams, this.gameCreatedSuccessfully.bind(this)),
                () => {
                    this.isNameAlreadyTaken = true;
                    this.isLoadingOnFirebase = false;
                });
        }
    }

    removeTeam(teamToRemove) {
        if (this.allTeams.lenght > 1) {
            this.allTeams = this.allTeams.filter(team => team != teamToRemove);
        }
    }

    gameCreatedSuccessfully(){
        //TODO: e ora?
        console.log('game created successfully!');
        this.isLoadingOnFirebase = false;
    }

}

customElements.define('admin-new-game-component', AdminNewGameComponent);