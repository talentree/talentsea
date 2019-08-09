import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class AdminNewGamePage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <h1 class="title">Admin new game page</h1>
            <button route="/" class="button is-primary">Home</button>
            <button route="/admin-console" class="button is-link">Admin console</button>
        `;
    }
}

customElements.define('admin-new-game-page', AdminNewGamePage);