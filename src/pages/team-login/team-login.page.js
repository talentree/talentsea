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
            <div class="columns is-mobile is-centered is-full">
                <div class = "column is-11">
                    <h1  class=" title is-size-1 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text ">LOGIN SQUADRE</h1>
                    <hr> 
                </div>
            </div>           
            <div class = " columns ">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large ">Nome del Gioco:</label>
                </div>
                <div class = " column is-6">
                    <input class="input is-medium is-primary" id="gameName" type="text"  @input=${e => this.game = e.target.value}/>
                </div>
                <div class = " column is-2 ">
                    <team-game-list-component></team-game-list-component>
                </div>
            </div>
            <div class="columns is-mobile is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>            
            <div class = " columns ">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large">Nome della Squadra:</label>
                </div>
                <div class = " column is-6">
                    <input class="input is-medium is-primary"  type="text"  @input=${e => this.squadra = e.target.value}/>
                </div>            
            </div>
            <div class="columns is-mobile is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>
            <div class = " columns ">
                <div class = " column is-2 is-offset-1">
                        <label class="label is-large">Codice Segreto:</label>
                </div>
                <div class = " column is-6">
                    <input  class="input is-medium is-primary"  type="text"  @input=${e => this.codice = e.target.value}/>
                </div>            
            </div>
            <div class="columns is-mobile is-centered is-full">
                <div class = "column is-11">
                    <hr> 
                </div>
            </div>
            <div class = "columns is mobile is-centered is-full">
                <div class = "column is-4">
                    <button class="button has-text-white  is-large is-fullwidth gradient-background" @click=${(e) => this.login()}>Login</button>
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