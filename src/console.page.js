import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';
import { Fake } from './core/fake';

export class ConsolePage extends NavElement{
    constructor(){
        super();
        this.fake = new Fake();
        this.fake.read().then(content => console.log(content));
    }

    render(){
        return html`
            <p>Console page</p>
        `;
    }
}

customElements.define('console-page', ConsolePage);