import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';

export class AdminNewGameComponent extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`            
            <div class="modal" style ="display:block;" id="newGameModal" >        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">                       
                        <p class=" modal-card-title is-size-2 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text  ">NUOVA PARTITA</p>
                    </header>
                    <section class="modal-card-body" id="newGame">
                        <h1 class="title is-4">Dati generali</h1>
                        <div class="field">
                            <label class="label">Inserisci nome della partita <b id="partitaGiaPresente" style="color: red"></b></label>
                            <div class="control">
                                <input type="text" class="input" placeholder="Inserisci nome della partita" @input=${(e)=>{
                                if(!this.stoCaricandoSuFirebase){
                                    this.checkGameName(e.target)
                                }}}>
                            </div>
                        </div>
                        <div id="elencoPartite" class="field"></div>
                        <div class="field">
                            <div class="control">
                                <a id="pulsanteCreaPartita" class="button is-primary" @click=${(e)=> this.buildGame()}>Crea partita!</a>
                                <a class="button is-primary" @click=${(e)=> this.addTeam()}>Aggiungi squadra</a>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button route="/" class="button is-primary">Home</button>
                        <button class="button is-link">Crea partita</button>
                    </footer>
                </div>
            </div>
        `;
    }

    addTeam()  {

    }

    buildGame() {
        
    }

}

customElements.define('admin-new-game-component', AdminNewGameComponent);