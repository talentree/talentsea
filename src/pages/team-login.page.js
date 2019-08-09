import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class TeamLoginPage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <h1 class="title">Team login page</h1>
            <button route="/" class="button is-primary">Home</button>
            <button route="/team-console" class="button is-link">Team console</button>
        `;
    }
}

customElements.define('team-login-page', TeamLoginPage);