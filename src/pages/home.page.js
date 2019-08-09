import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class HomePage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <h1 class="title">Home page</h1>
            <button route="/team-login" class="button is-primary">Partecipante</button>
            <button route="/admin-login" class="button is-link">Amministratore</button>
        `;
    }
}

customElements.define('home-page', HomePage);