import { LitElement, html } from '@polymer/lit-element';

export class RouterComponent extends LitElement{

    static get properties() {
        return {
            pathName: { type: String }
        }
    }

    constructor(){
        super();
    }

    render(){
        return html`<p>Path name: ${this.pathName}</p>`;
    }
}

customElements.define('router-component', RouterComponent);