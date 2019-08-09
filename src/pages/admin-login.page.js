import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class AdminLoginPage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <h1 class="title">Admin login page</h1>
            <button route="/" class="button is-primary">Home</button>
            <button route="/admin-newgame" class="button is-link">Admin new game</button>
            `;
    }
}

customElements.define('admin-login-page', AdminLoginPage);