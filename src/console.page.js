import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';
import { Fake } from './core/fake';

export class ConsolePage extends NavElement{
    
    static get properties(){
        return {
          once: Object,
          many: Object
        };
      }

    constructor(){
        super();
        this.once = { contatore: 0, prova: ''};
        this.many = { contatore: 0, prova: ''};
        this.fake = new Fake();
        this.fake.read().then(content => this.once = content);
        this.fake.reads(result => this.many = result);
    }

    render(){
        return html`
            <h3>Console page</h3>
            <p>Singola lettura</p>
            <ul>
                <li>contatore: ${this.once.contatore}</li>
                <li>prova: ${this.once.prova}</li>
            </ul>
            <p>Aggiornamento in tempo reale</p>
            <ul>
                <li>contatore: ${this.many.contatore}</li>
                <li>prova: ${this.many.prova}</li>
            </ul>
        `;
    }
}

customElements.define('console-page', ConsolePage);