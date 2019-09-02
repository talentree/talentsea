import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';

import './admin-new-game.component';
import { FirebaseQuery } from '../../core/firebase-query';
import { AdminState } from '../../core/states/admin.state';
import { AdminConsoleP5 } from '../../p5/admin-console.p5';

export class AdminConsolePage extends NavElement {

    static get properties() {
        return {
            showNewGameComponent: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
        this.showNewGameComponent = false;
        //controllo se esiste già la partita con il mio UID
        this.checkIfGameExists();
        //contiene onSnapshot di firebase. La chiamo in disconnectedCallback per rimuovere il listener
        this.listenToChangesFunction = null;
        //reference all'istanza di p5, stesso motivo per cui ho listenToChangesFunction
        this.istanzaP5 = null;
        //console relativa a p5. Si passano i dati della partita
        this.adminConsoleP5 = new AdminConsoleP5();
    }

    render() {
        return html`
            <h1 class="title">Admin console</h1>
            <!--popup compare se non esiste la partita-->
            ${this.showNewGameComponent ? html`<admin-new-game-component ></admin-new-game-component>` : html``}
            <div id="container-p5"></div>
            <button route="/" class="button is-primary">Home</button>
        `;
    }

    checkIfGameExists() {
        this.firebaseQuery.setUid(AdminState.uid);
        //se la partita non esiste mostro il popup per crearla, altrimenti passo i suoi dati a p5
        this.listenToChangesFunction = this.firebaseQuery.listenToChanges(game => {
            game ? this.proceedWithP5Script(game) : this.showNewGameComponent = true
        });
    }

    proceedWithP5Script(game) {
        //chiudo il popup per creare la partita nel caso sia aperto
        this.showNewGameComponent = false;
        //passo game all'engine
        this.adminConsoleP5.gameData = game;
        //se non ho un'istanza di p5 significa che la partita è stata appena creata. Imposto quindi p5
        if (!this.istanzaP5) {
            let container = this.querySelector('#container-p5');
            this.istanzaP5 = new p5(this.adminConsoleP5.p5Function.bind(this.adminConsoleP5), container);
        }
    }

    disconnectedCallback() {
        //elimino il listener quando esco dal component
        if (this.listenToChangesFunction) { this.listenToChangesFunction() }
        //elimino l'istanza di p5
        if (this.istanzaP5) { this.istanzaP5.remove() }
    }
}

customElements.define('admin-console-page', AdminConsolePage);