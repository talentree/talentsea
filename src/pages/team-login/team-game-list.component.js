import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';

export class TeamGameList extends NavElement {
    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();
    }

    updated() {
        this.firebaseQuery.readAll(data => {
            // crea titolo popup
            var item = "<div class='columns is-multiline is-mobile is-centered '>" +
                "<div class='column is-one-third '>" +
                "<h2 class='title is-4'>Nome Partita</h2>" +
                "</div>" +
                "<div class='column is-one-quarter has-text-centered'>" +
                "<h2 class='title is-4'>Squadre</h2>" +
                "</div>" +
                "<div class='column is-one-quarter has-text-centered'>" +
                "<h2 class='title is-4'>Libere<h2>" +
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
                item += `<div class='column is-one-third is-size-5'><a id="` +
                    i + `" onclick='document.getElementById("gameName").value=document.getElementById("` +
                    i + `").textContent , document.getElementById("gamesModal").style.display="none"'>` +
                    data[i].info.name + `</a> </div> 
                            <div class='column is-one-quarter has-text-centered is-size-5'> ` + Object.keys(data[i].teams).length + `</div> 
                            <div class='column is-one-quarter has-text-centered is-size-5'>` + libere + `</div>`;
            }

            //inserisco i tag nel posto richiesto
            item += "</div>";
            //FIXME: da errore se passo velocemente da team-login a home
            document.getElementById("games").innerHTML = item;
        })
    }



    render() {
        return html`
            <div class="field">
                <div class="control">
                    <a class="button is-link is-large is-fullwidth is-focused" onclick="document.getElementById('gamesModal').style.display='block'" >Lista Partite</a>
                </div>
            </div>
                
            <div class="modal " id="gamesModal" >        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">                       
                        <p class=" modal-card-title is-size-2 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text  ">LISTA PARTITE</p>
                        <button class="delete" onclick="document.getElementById('gamesModal').style.display='none'"></button>
                    </header>
                    <section class="modal-card-body" id="games"> </section>
                    <footer class="modal-card-foot"></footer>
                </div>
        `;
    }
}

customElements.define('team-game-list-component', TeamGameList);