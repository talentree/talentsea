import { LitElement, html } from '@polymer/lit-element';

export class HomePage extends LitElement{
    constructor(){
        super();
    }

    render(){
        return html`<p>Home page</p>`;
    }
}

customElements.define('home-page', HomePage);