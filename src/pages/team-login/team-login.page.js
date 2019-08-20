import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';
import './team-game-list.component';
//import { ArrayMapConverter } from '../utils/array-map-converter';

export class TeamLoginPage extends NavElement {
    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
    }

    render() {
        return html`
            <h1 class="title">Team login page</h1>
            <button route="/" class="button is-primary">Home</button>

            <div class="field">
                <label class="label">Nome del gioco:</label>
                <div class="control">
                <input class="input" id="nomePartita" type="text"  @input=${e => this.game = e.target.value}/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <team-game-list-component></team-game-list-component>
                </div>
            </div>
            
            <div class="field">
                <label class="label">Nome della squadra:</label>
                <div class="control">
                    <input class="input" type="text"  @input=${e => this.squadra = e.target.value}/>
                </div>
            </div>
                    
            <div class="field">
                <label class="label">Codice segreto:</label>
                <div class="control">
                    <input class="input" type="text"  @input=${e => this.codice = e.target.value}/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button  class="button is-link" @click=${(e) => this.login()}>Login</button>
                </div>
            </div>
        `;
    }

    login(){
        //effettua login

        //then cambia pagina se va bene
        let e = new CustomEvent('navigate', {detail: '/team-console'})
        window.dispatchEvent(e);
    }
}

customElements.define('team-login-page', TeamLoginPage);