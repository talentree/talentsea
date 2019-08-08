import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';

export class HomePage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`<p>Home page</p>`;
    }
}

customElements.define('home-page', HomePage);