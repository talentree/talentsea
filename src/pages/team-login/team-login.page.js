import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';
import './team-game-list.component';
import { TeamState } from '../../core/states/team.state';

export class TeamLoginPage extends NavElement {

    static get properties() {
        return {
            connectToGameName: { type: String },
            isDoingLogin: { type: Boolean },
            loginFailedErrorDescription: { type: String }
        }
    }

    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
        //dat per connettersi alla partita
        this.connectToGameName = "";
        this.teamName = "";
        this.teamPassword = "";
        this.isDoingLogin = false;
        this.loginFailedErrorDescription = "";
    }

    render() {
        return html`
            <div class="columns is-mobile is-centered is-full">
                <div class = "column is-11">
                    <h1  class=" title is-0 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text ">LOGIN SQUADRE</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a>
                    </div>
                    <hr> 
                </div>
            </div>           
            <div class = " columns is-full">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large ">Nome Partita:</label>
                </div>
                <div class = " column is-6">
                    <input class="input is-large is-primary " type="text"  @input=${e => this.connectToGameName = e.target.value} .value=${this.connectToGameName} />
                </div>
                <div class = " column is-2 ">
                    <team-game-list-component @gameChoosen=${e => this.connectToGameName = e.detail}></team-game-list-component>
                </div>
            </div>
            <div class="columns is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>            
            <div class = " columns is-vcentered">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large">Nome Squadra:</label>
                </div>
                <div class = " column is-6">
                    <input class="input is-large is-primary"  type="text"  @input=${e => this.teamName = e.target.value} />
                </div>            
            </div>
            <div class="columns is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>
            <div class = " columns is-vcentered ">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large">Codice Segreto:</label>
                </div>
                <div class = " column is-6">
                    <input  class="input is-large is-primary"  type="text"  @input=${e => this.teamPassword = e.target.value} />
                </div>            
            </div>
            <div class="columns is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>
            <div class = "columns is-centered is-full">
                <div class = "column is-4">
                <!--FIXME:messaggio più carino--> 
                ${this.loginFailedErrorDescription ? html` <b class= "alert">${this.loginFailedErrorDescription}</b>` : html``}
                    <button class="button has-text-white  is-large is-fullwidth gradient-background ${this.isDoingLogin ? 'is-loading is-disabled' : ''}"
                    @click=${(e) => this.login()}>Login</button>
                </div>
            </div>
        `;
    }

    login() {
        //effettua login
        if (this.connectToGameName && this.teamName && this.teamPassword) {
            this.isDoingLogin = true;
            this.loginFailedErrorDescription = "";
            TeamState.loginToGame(this.connectToGameName, this.teamName, this.teamPassword, () => this.loginSuccessful(), (err) => this.loginFailed(err))
        }
        else {
            this.loginFailedErrorDescription = "Inserisci tutti i dati!"
        }
    }

    loginSuccessful() {
        //non serve settare isDoingLogin a false tanto cambio pagina
        let e = new CustomEvent('navigate', { detail: '/team-console' })
        window.dispatchEvent(e);
    }

    loginFailed(error) {
        this.isDoingLogin = false
        console.log('login failed: ', error);
        this.loginFailedErrorDescription = error;
    }
}

customElements.define('team-login-page', TeamLoginPage);