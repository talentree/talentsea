import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

import { FirebaseQuery } from '../../core/firebase-query';


export class AdminConsoleBarComponent extends NavElement {

    static get properties() {
        return {
            gameIsPlaying: { type: Boolean },
            askingForGameDelete: { type: Boolean },
            allTeamsName: { type: Array }
        }
    }

    constructor() {
        super();
        //reference
        this.firebaseQuery = new FirebaseQuery();
        this.firebaseQuery.setUid(AdminState.uid);
        //questo valore è inizialmente impostato da admin-console.page
        this.gameIsPlaying = false;
        //se true mostra popup
        this.askingForGameDelete = false;

        //valore passato da admin-console.page
        this.allTeamsName = [];

        //stringa vuota significa che non verranno contati come dati da modificare
        this.dataToChange = {
            teamName : "",
            positionX: "",
            positionY: "",
            fuel: ""
        }
    }


    render() {
        return html`
            <div class = "columns is-mobile is-full is-vcentered ">
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Fa Partire Motore di Gioco" @click=${() => this.toggleGameStatus()}>
                        ${this.gameIsPlaying ? html`<i class="fas fa-pause"></i>` : html`<i class="fas fa-play"></i>`}
                    </button>
                </div>
                <div class = "column is-1">
                    <button @click= ${() => this.toggleFullScreen()} class = " button is-extra-large is-fullwidth is-primary is-focused " title="Mappa Fullscreen" ><i class="fas fa-expand"></i></button>
                </div>
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Cancella Partita" @click=${() => this.askingForGameDelete = true} ><i class="fas fa-trash-alt"></i></button>
                </div>
                <!-- PULSANTE PER USCIRE DA FULLSCREEN
                    <div class = "column is-1">
                        <button  class = " button is-large is-fullwidth is-primary is-focused "><i class="fas fa-compress"></i></button>
                    </div>
                -->                
                <div class = "column is-4">
                    <div class="select is-fullwidth gradient-select">
                    <select .value = ${0} id="selectTeamToChange">
                        <option .value = ${0}>Selezionare la Squadra</option>
                        ${this.allTeamsName.map((name, index) => html`<option .value=${index + 1}>${name}</option>`)}
                        </select>
                    </div>
                </div>
                <div class = "column is-1">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="X: " @input="${e => this.dataToChange.positionX = e.target.value}" />           
                </div>
                <div class = "column is-1">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="Y: " @input="${e => this.dataToChange.positionY = e.target.value}" />           
                </div>
                <div class = "column is-2">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="Carburante: " @input="${e => this.dataToChange.fuel = e.target.value}" />           
                </div>
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-link is-focused " @click=${() => this.changeTeamData()} title="Cambia Dati Nave"><i class="fas fa-check"></i></button>
                </div>

                <!-- MODAL PER CONFERMA ELIMINAZIONE PARTITA-->
                <div class="modal confirm-message" style = "display: ${this.askingForGameDelete ? 'block' : 'none'}">
                    <div class="gradient-box ">
                        <div class = " columns is-mobile is-centered is-full ">
                            <div class = " column is-11 ">
                                <h1  class = " title is-2 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">SEI SICURO DI VOLER ELIMINARE LA PARTITA ESISTENTE?</h1>
                                <hr> 
                            </div>
                        </div>
                        <div class = " columns is-mobile is-centered is-full ">
                            <div class = " column is-3">
                                <button class = " button is-extra-large is-fullwidth is-primary is-focused" @click=${() => this.askingForGameDelete = false}>ANNULLA</button>
                            </div>
                            <div class = " column is-3 is-offset-4 ">
                                <button class = "button is-extra-large is-fullwidth is-link is-focused" @click=${e => console.log('TODO:')} >CONFERMA</button>
                            </div>    
                        </div>
                    </div>
                </div>

        `;
    }

    //TODO: FULLSCREEN FUNCTION
    toggleFullScreen() {
        console.log('toggle Fullscreen not implemented');
    }

    changeTeamData() {
        let indexTeam = parseInt(this.querySelector('#selectTeamToChange').value) - 1;
        if (indexTeam > -1) {
            this.dataToChange.teamName = this.allTeamsName[indexTeam];
            let event = new CustomEvent('changeTeamData', {
                detail: this.dataToChange
            })
            this.dispatchEvent(event);
        }
    }

    toggleGameStatus() {
        this.gameIsPlaying = !this.gameIsPlaying;
        let e = new CustomEvent('gameStatusToggled', { detail: this.gameIsPlaying });
        this.dispatchEvent(e);
    }



}
customElements.define('admin-new-bar-component', AdminConsoleBarComponent);