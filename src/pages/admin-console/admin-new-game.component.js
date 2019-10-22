import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';

import './insert-new-team.component';

export class AdminNewGameComponent extends NavElement {

    static get properties() {
        return {
            allTeams: { type: Array },
            isNameAlreadyTaken: { type: Boolean },
            isLoadingOnFirebase: { type: Boolean },
            missingData: { type: Boolean }
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
            <div class="modal visible " >        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class=" modal-card-title is-size-2 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text  ">NUOVA PARTITA</p>                
                        <a route="/"><i class="fas fa-home icon"></i></a>
                    </header>
                    <section class="modal-card-body">
                        <br>
                        <div class = " columns is-11 ">
                            <div class = "column is-3 ">
                                <label class="label is-medium">Nome Partita:  ${this.isNameAlreadyTaken ? html`<b class = "alert">Nome già presente!</b>` : html``}</label>
                            </div>
                            <div class = "column is-9 ">                                
                                <input type="text" class="input is-primary" placeholder="Nome Partita" @input=${e => this.gameName = e.target.value}>                                
                            </div>
                        </div> 
                        <div class = " columns ">
                            <div class = " column ">                        
                                ${this.allTeams.map(team => {
                                    return html`<insert-new-team-component .teamName="${team.teamName}" .teamPassword="${team.teamPassword}"
                                    @nameChanged="${e => team.teamName = e.detail}" @passwordChanged="${e => team.teamPassword = e.detail}"
                                    @teamRemoved="${e => this.removeTeam(team)}"
                                    ></insert-new-team-component>`;
                                })}
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <div class = "columns is-12">
                            <div class = "column is-6">                            
                                <a class="button is-primary is-fullwidth is-focused" @click=${e => this.addTeam()}>Aggiungi squadra</a>
                            </div>
                            <div class = "column is-offset-12 is-6">
                                <a class="button is-link is-fullwidth is-focused  ${this.isLoadingOnFirebase ? 'is-loading is-disabled' : ''}" @click=${e => this.buildGame()}>Crea partita!</a>
                                ${this.missingData ? html`<b class = "alert">Dati mancanti!</b>` : html``}
                            </div>
                        </div>
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
        this.missingData = false;
        if (!this.gameName || this.allTeams.find(team => !team.teamName || !team.teamPassword)) {
            this.missingData = true;
        }
        else {
            this.isNameAlreadyTaken = false;
            this.isLoadingOnFirebase = true;
            this.checkForGameNameAvailable();
        }
    }

    removeTeam(teamToRemove) {
        if (this.allTeams.length > 1) {
            this.allTeams = this.allTeams.filter(team => team != teamToRemove);
        }
    }

    gameCreatedSuccessfully() {
        this.isLoadingOnFirebase = false;
    }

    checkForGameNameAvailable() {
        this.firebaseQuery.readAll(res => {
            let gameWithSameName = res.find(game => game.info.name == this.gameName);
            if (gameWithSameName) {
                this.isNameAlreadyTaken = true;
                this.isLoadingOnFirebase = false;
            }
            else {
                this.firebaseQuery.createNewGame(this.gameName, this.allTeams, () => this.gameCreatedSuccessfully());
            }
        });
    }

}

customElements.define('admin-new-game-component', AdminNewGameComponent);