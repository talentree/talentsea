import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';

export class JoinPage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <p>Join page</p>
            <button route="/">Home</button>
            <button route="/console">Console</button>
        `;
    }
}

customElements.define('join-page', JoinPage);