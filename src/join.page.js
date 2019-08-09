import { html } from '@polymer/lit-element';
import { NavElement } from './core/nav-element';
import { Fake } from './core/fake';

export class JoinPage extends NavElement{

    static get properties(){
        return {
          testo: String
        };
      }

    constructor(){
        super();
        this.fake = new Fake();
        this.contatore = 1;
        this.testo = 'hi';
        setInterval(() => {
            this.fake.setContatore(++this.contatore);
        }, 1000);
    }

    render(){
        return html`
            <p>Join page</p>
            <label>Prova:</label>
            <input type="text" .value="${this.testo}" @input=${this.handleInput}/>
            <button  @click="${this.setProva}">Salva prova</button>
            <button  @click="${this.reset}">Reset</button>
            <button route="/">Home</button>
            <button route="/console">Console</button>
        `;
    }

    handleInput(e) {
        this.testo = e.target.value;
    }

    setProva() {
        this.fake.setProva(this.testo);
    }

    reset() {
        this.fake.setFake({ contatore: 0, prova: 'prova' });
    }
}

customElements.define('join-page', JoinPage);