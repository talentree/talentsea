import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class AdminConsolePage extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <h1 class="title">Admin console</h1>
            <button route="/" class="button is-primary">Home</button>
        `;
    }
}

customElements.define('admin-console-page', AdminConsolePage);