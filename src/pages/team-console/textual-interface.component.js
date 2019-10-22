import { NavElement, html } from "../../core/nav-element";
import { Info } from "../../core/classes/info.class";
import { Team } from "../../core/classes/team.class";

export class TextualInterface extends NavElement {
    static get properties() {
        return {
            gameInfo: { type: Object },
            myTeam: { type: Object },
            teamName: { type: String }
        }
    }

    constructor() {
        super();
        this.gameInfo = new Info();
        this.myTeam = new Team()
        this.teamName = "";
    }

    render() {
        return html`
            <div class = "column has-text-centered">
                <h1 class="title is-1 has-text-link">${this.teamName}</h1>
                <hr>
                <p class="subtitle is-3"><b>Tempo di Gioco:</b> ${this.gameInfo.gameTime} sec.</p>
                <div class = " columns is-centered is-vcentered">
                    <div class = " column is-4 ">
                        <p class = "is-size-4"><b>Vento:</b></p>
                    </div>
                    <div class = " column is-6 ">
                        <p class = "is-size-4"><i>Intensità:</i> ${this.gameInfo.windForce} kn</p>
                        <p class = "is-size-4"><i>Direzione:</i> ${this.gameInfo.windDirection} °</p>
                    </div>
                </div>
                <hr>
                <p class = "is-size-4"><b>Carburante Rimasto:</b> ${this.myTeam.outputs.fuel}</p>                              
                <div class = " columns is-centered is-vcentered">
                    <div class = " column is-4 ">
                        <p class = "is-size-4"><b>Posizione:</b></p>
                    </div>
                    <div class = " column is-6 ">
                        <p class = "is-size-4"><i>X:</i> ${this.myTeam.outputs.positionX}</p>
                        <p class = "is-size-4"><i>Y:</i> ${this.myTeam.outputs.positionY}</p>
                    </div>
                </div>
                <hr>
                <p class = "is-size-4"><b>Timone:</b> ${this.myTeam.inputs.wheel}</p>                
                <p class = "is-size-4"><b>Accelerazione Motore:</b> ${this.myTeam.inputs.acceleration}</p>
                <p class = "is-size-4"><b>Velocità:</b> ${this.myTeam.outputs.speed} kn</p>
                <p class = "is-size-4"><b>Direzione:</b> ${this.myTeam.outputs.direction} °</p>
                <hr>
                ${this.myTeam.outputs.radar.state == 1 ? html`<p class="has-text-danger has-text-weight-bold is-size-4">Collisione Avvenuta!</p>` : html``}
        `;
    }
}

customElements.define('textual-interface-component', TextualInterface);