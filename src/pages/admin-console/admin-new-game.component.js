import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import './insert-new-team.component';

export class AdminNewGameComponent extends NavElement {

    static get properties() {
        return {
            allTeams: { type: Array },
            isNameAlreadyTaken: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.allTeams = [{
            teamName: '',
            teamPassword: ''
        }];
        //se true fa comparire messaggio
        this.isNameAlreadyTaken = true;
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
                            <label class="label">Inserisci nome della partita ${this.isNameAlreadyTaken? html`<b style="color: red">Nome già presente!</b>` : html``}</label>
                            <div class="control">
                                <input type="text" class="input" placeholder="Inserisci nome della partita" @input=${(e) => { }}>
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
                        <a class="button is-link" @click=${e => this.buildGame()}>Crea partita!</a>
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
    }

    removeTeam(teamToRemove) {
        if (this.allTeams.lenght > 1) {
            this.allTeams = this.allTeams.filter(team => team != teamToRemove);
        }
    }
}

customElements.define('admin-new-game-component', AdminNewGameComponent);