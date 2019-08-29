import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';

import './admin-new-game.component';

export class AdminConsolePage extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <h1 class="title">Admin console</h1>

            <admin-new-game-component></admin-new-game-component>

            <button route="/" class="button is-primary">Home</button>
        `;
    }
}

customElements.define('admin-console-page', AdminConsolePage);