import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { teamConsoleP5 } from '../../p5/team-console.p5';

export class TeamConsolePage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`
            <h1 class="title">Team console page</h1>
            <div id="container-p5"></div>
            <button route="/" class="button is-primary">Home</button>
        `;
    }

    firstUpdated(){
        const container = this.querySelector('#container-p5');
        this.p5 = new p5(teamConsoleP5, container);
    }

    disconnectedCallback(){
        this.p5.remove();
    }
}

customElements.define('team-console-page', TeamConsolePage);