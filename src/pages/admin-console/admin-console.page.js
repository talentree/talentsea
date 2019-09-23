import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

import './admin-new-game.component';
import './admin-console-bar.component';
import { FirebaseQuery } from '../../core/firebase-query';
import { AdminConsoleP5 } from '../../p5/admin-console.p5';

export class AdminConsolePage extends NavElement {

    static get properties() {
        return {
            showNewGameComponent: { type: Boolean },
            allTeamsName : {type : Array}
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
        //serve a admin-coonsole-bar per mostrare il nome della squadra da cambiare
        this.allTeamsName = [];
    }

    render() {
        return html`
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">CONSOLE AMMINISTRATORE</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a><!--TODO: controllare perche grandezza icone non va-->
                    </div>
                    <hr> 
                </div>
            </div>
            <div class = " gradient-box ">
                <admin-new-bar-component .gameIsPlaying="${this.adminConsoleP5.gameIsPlaying}" @changeTeamData= ${e => console.log(e.detail)} .allTeamsName= "${this.allTeamsName}"></admin-new-bar-component>
            </div>
            <br>
            <div class = " gradient-box map-padding "> 
                <div class ="colums is-full " >
                    <div class= "column ">            
                        <div id="container-p5"></div> 
                    </div> 
                </div>    
            </div>
            
            
            <!--popup compare se non esiste la partita-->
            ${this.showNewGameComponent ? html`<admin-new-game-component ></admin-new-game-component>` : html``}          
        `;
    }
    


    checkIfGameExists() {
        this.firebaseQuery.setUid(AdminState.uid);
        //se la partita non esiste mostro il popup per crearla, altrimenti passo i suoi dati a p5
        this.listenToChangesFunction = this.firebaseQuery.listenToChanges(game => {
            game ? this.proceedWithP5Script(game) : this.showNewGameComponent = true;
        });
    }

    proceedWithP5Script(game) {
        //chiudo il popup per creare la partita nel caso sia aperto
        this.showNewGameComponent = false;
        //passo game all'engine
        this.adminConsoleP5.gameData = game;
        //mostro ad admin-console-bar i nomi delle squadre
        this.allTeamsName = Object.keys(game.teams);

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