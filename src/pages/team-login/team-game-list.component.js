import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { FirebaseQuery } from '../../core/firebase-query';

export class TeamGameList extends NavElement {

    static get properties() {
        return {
            displayGamesModal: { type: Boolean },
            allGames: { type: Array }
        }
    }

    constructor() {
        super();
        this.firebaseQuery = new FirebaseQuery();

        //se true mostra il modal con tutte le partite
        this.displayGamesModal = false;
        //tutte le squadre da mostrare nel modal partite
        this.allGames = [];
        //ottengo la lista di tutte le partite
        this.getAllGames();
    }

    getAllGames() {
        this.firebaseQuery.readAll(games => {
            this.allGames = games;
        });
    }

    render() {
        return html`
            <div class="field">
                <div class="control">
                    <a class="button is-link is-extra-large is-fullwidth is-focused" @click=${() => this.displayGamesModal = true} >Lista Partite</a>
                </div>
            </div>
                
            <div class="modal" style="display: ${this.displayGamesModal ? 'block' : 'none'}">        
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">                       
                        <p class=" modal-card-title is-size-1 has-text-centered  has-text-primary is-italic has-text-weight-bold gradient-text  ">LISTA PARTITE</p>
                        <button class="delete" @click= ${() => this.displayGamesModal = false}></button>
                    </header>
                    <section class="modal-card-body" id="games">
                        <div class="columns is-multiline is-mobile is-centered">
                            <div class="column is-6">
                                <h2 class="title is-3">Nome Partita</h2>
                            </div>
                            <div class="column is-3 has-text-centered">
                                <h2 class="title is-3">Squadre</h2>
                            </div>
                            <div class="column is-3 has-text-centered">
                                <h2 class="title is-3">Libere<h2>
                            </div>
                            ${this.allGames.map((game, index) => {
                                let teamLiberi = 0;
                                let totalTeams = 0;
                                Object.values(game.teams).forEach(team => {
                                    totalTeams++;
                                    if (!team.outputs.isUsed)
                                        teamLiberi++;
                                })
                                return html`
                                <div class='column is-6 is-size-3'>
                                    <a class = "has-text-weight-bold has-text-primary" @click= ${() => this.selectTeam(index)}>${game.info.name}</a>
                                </div> 
                                <div class="column is-3 has-text-centered is-size-3 has-text-weight-bold">${totalTeams}</div> 
                                <div class="column is-3 has-text-centered is-size-3 has-text-weight-bold">${teamLiberi}</div>`
                            })}
                        </div>
                    </section>
                    <footer class="modal-card-foot"></footer>
                </div>
        `;
    }

    selectTeam(index) {
        let connectToGameName = this.allGames[index].info.name;

        let event = new CustomEvent('gameChoosen', {
            detail: connectToGameName
        });

        this.dispatchEvent(event);
        this.displayGamesModal = false;
    }
}

customElements.define('team-game-list-component', TeamGameList);