import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';
import { FirebaseQuery } from '../core/firebase-query';
import { ArrayMapConverter } from '../utils/array-map-converter';

export class TeamLoginPage extends NavElement {
    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
        //togliere i commenti per provare fromArrayToMap

        setTimeout(() => {
            let obj = { "info": { "gameTime": 0, "name": "First game", "windDirection": 0, "windForce": 0 }, "teams": [{ "inputs": { "acceleration": 0, "timer": 0, "wheel": 0 }, "outputs": { "fuel": 2000, "isUsed": false, "positionX": 0, "positionY": 0, "radar": { "frontStates": [0, 0, 0, 0, 0, 0, 0], "state": 0 }, "speed": 0 }, "password": "s1", "name": "squadra1" }] };
            let partita = {};
            partita.info = obj.info;
            partita.teams = ArrayMapConverter.teamsFromArrayToMap(obj.teams);
            console.log('From array to map: ', partita);
        }, 3000);

    }

    updated() {
        this.firebaseQuery.readAll(data => {
            // crea titolo popup
            var item = "<div class='columns is-multiline is-mobile'>" +
                "<div class='column is-half'>" +
                "<h2 class='title is-5'>Nome Partita</h2>" +
                "</div>" +
                "<div class='column is-one-quarter'>" +
                "<h2 class='title is-5'>Squadre</h2>" +
                "</div>" +
                "<div class='column is-one-quarter'>" +
                "<h2 class='title is-5'>Libere<h2>" +
                "</div>";

            //aggiungo i vari tag alla variabile
            for (var i = 0; i < data.length; i++) {

                //controllo il numero di squadre libere
                var libere = 0;
                Object.values(data[i].teams).forEach(team => { //-> utilizzato per avere i valori della mappa che viene considerata come object in firebase
                    if (team.outputs.isUsed == false)
                        libere++;
                });

                //assegnando alla variabile il codice HTML necessario
                item += `<div class='column is-half'><a id="` +
                    i + `" onclick='document.getElementById("nomePartita").value=document.getElementById("` +
                    i + `").textContent , document.getElementById("modalPartite").style.display="none"'>` +
                    data[i].info.name + `</a> </div> 
                            <div class='column is-one-quarter'> ` + Object.keys(data[i].teams).length + `</div> 
                            <div class='column is-one-quarter'>` + libere + `</div>`;
            }

            //inserisco i tag nel posto richiesto
            item += "</div>";
            //FIXME: da errore se passo velocemente da team-login a home
            document.getElementById("partite").innerHTML = item;
        })
    }



    render() {
        return html`
            <h1 class="title">Team login page</h1>
            <button route="/" class="button is-primary">Home</button>
            <button route="/team-console" class="button is-link">Team console</button>

            <div class="field">
                <div class="control">
                    <a class="button is-primary" onclick="document.getElementById('modalPartite').style.display='block'" >Lista</a>
                </div>
            </div>
                
            <div class="modal " id="modalPartite" >        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title title is-2 has-text-centered">Lista Partite</p>
                        <button class="delete" onclick="document.getElementById('modalPartite').style.display='none'"></button>
                    </header>
                    <section class="modal-card-body" id="partite"> </section>
                    <footer class="modal-card-foot"></footer>
                </div>
        `;
    }
}

customElements.define('team-login-page', TeamLoginPage);