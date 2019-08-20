import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

export class AdminSignUp extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html `
        <button class="button is-alert" @click=${(e) => this.signup()}>registrati</button>
        `;
    }

    signup() {
        AdminState.uid = "ciao";
        console.log(AdminState.uid);
    }
}

customElements.define('admin-signup-component', AdminSignUp);