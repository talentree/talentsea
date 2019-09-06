import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

import { FirebaseQuery } from '../../core/firebase-query';


export class AdminConsoleBarComponent extends NavElement {

    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
        this.firebaseQuery.setUid(AdminState.uid)
    }


    render() {
        return html`
            <div class = " columns is-mobile is-full is-vcentered ">
                <div id = "play" class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Fa Partire Motore di Gioco" @click=${e => this.play()}><i class="fas fa-play"></i></button>
                </div>
                <div id = "pause" class = "column is-1 hidden">
                        <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Ferma Motore di Gioco" @click=${e => this.pause()}><i class="fas fa-pause"></i></button>
                    </div>
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Mappa Fullscreen" ><i class="fas fa-expand"></i></button>
                </div>
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-primary is-focused " title="Cancella Partita" onclick="document.getElementById('confirmDelete').style.display='block'" ><i class="fas fa-trash-alt"></i></button>
                </div>
                <!-- PULSANTE PER USCIRE DA FULLSCREEN
                    <div class = "column is-1">
                        <button  class = " button is-large is-fullwidth is-primary is-focused "><i class="fas fa-compress"></i></button>
                    </div>
                -->                
                <div class = "column is-4">
                    <div   class="select is-fullwidth gradient-select">
                        <select id = "dropdown"></select>
                    </div>
                </div>
                <div class = "column is-1">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="X: "/>           
                </div>
                <div class = "column is-1">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="Y: "/>           
                </div>
                <div class = "column is-2">                    
                    <input class= "input is-link is-extra-large" type="text" placeholder="Carburante: "/>           
                </div>
                <div class = "column is-1">
                    <button  class = " button is-extra-large is-fullwidth is-link is-focused " @click=${e => this.changeTeamData()} title="Cambia Dati Nave"><i class="fas fa-check"></i></button>
                </div>

                <!-- MODAL PER CONFERMA ELIMINAZIONE PARTITA-->
                <div id ="confirmDelete" class="modal confirm-message ">
                    <div class="gradient-box ">
                        <div class = " columns is-mobile is-centered is-full ">
                            <div class = " column is-11 ">
                                <h1  class = " title is-2 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">SEI SICURO DI VOLER ELIMINARE LA PARTITA ESISTENTE?</h1>
                                <hr> 
                            </div>
                        </div>
                        <div class = " columns is-mobile is-centered is-full ">
                            <div class = " column is-3">
                                <button class = " button is-extra-large is-fullwidth is-primary is-focused" onclick="document.getElementById('confirmDelete').style.display='none'">ANNULLA</button>
                            </div>
                            <div class = " column is-3 is-offset-4 ">
                                <button class = " button is-extra-large is-fullwidth is-link is-focused" >CONFERMA</button>
                            </div>    
                        </div>
                    </div>
                </div>

        `;
    }

    firstUpdated(){
        this.firebaseQuery.read(e =>{
            var item = "<option selected disabled hidden>Selezionare la Squadra</option>"
            Object.keys(e.teams).forEach(team =>{item+="<option>"+team+"</option>"})
            document.getElementById("dropdown").innerHTML = item;
        })
    }

    play(){//TODO: FUNZIONE CHE FA PARTITE L'ENGINE
        document.getElementById('pause').style.display='block';
        document.getElementById('play').style.display='none';
    }

    pause(){//TODO: FUNZIONE CHE FERMA L'ENGINE
        document.getElementById('play').style.display='block';
        document.getElementById('pause').style.display='none';
    }
    //TODO: FULLSCREEN FUNCTION

    changeTeamData(){
        this.firebaseQuery.read(e => console.log(e))
    }



}
customElements.define('admin-new-bar-component', AdminConsoleBarComponent);