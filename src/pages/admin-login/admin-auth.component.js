import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

export class AdminAuth extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html `
        <button class="button is-alert" @click=${(e) => this.login()}>accedi</button>
        `;
    }

    login() {
        AdminState.uid = "ciao";
        console.log(AdminState.uid);
    }
}

customElements.define('admin-auth-component', AdminAuth);