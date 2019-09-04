import { NavElement , html} from "../../core/nav-element";

export class TextualInterface extends NavElement{
    static get properties() {
        return {
            hide: { type: Boolean },
            temaName: { type: String },
            gameTime: { type: Number },
            speed: { type: Number },
            direction: { type: Number },
            windForce: { type: Number },
            windDirection: { type: Number },
            acceleration: { type: Number },
            wheel: { type: Number },
            //radar: { type: Array },   non serve a nulla basta che cambio imminent collision e collision occurred 
            imminentCollision: { type: Boolean },
            collisionOccurred: { type: Boolean },
            positionX: { type: Number },
            positionY: { type: Number },
            fuel : {type: Number}
        }
    }

    constructor() {
        super();
        this.temaName = "nome nave";
        this.gameTime = 0;
        this.speed = 0;
        this.direction = 0;
        this.windForce = 0;
        this.windDirection = 0;
        this.acceleration = 0;
        this.wheel = 0;
        //this.radar = [0, 0, 0, 0, 0, 0, 0, 0];    non serve a nulla basta che cambio imminent collision e collision occurred 
        this.imminentCollision = false;
        this.collisionOccurred = false;
        this.positionX = 0;
        this.positionY = 0;
        this.fuel = 0;
  

    }

    render() {
        let collisionElement = html`<p class="has-text-success is-size-4 has-text-weight-bold">Nessun Ostacolo Rilevato</p>`;

        if (this.imminentCollision) {
            collisionElement = html`<p class="has-text-warning has-text-weight-bold is-size-4">Collisione Imminente!</p>`;
        }

        if (this.collisionOccurred) {
            collisionElement = html`<p class="has-text-danger has-text-weight-bold is-size-4">Collisione Avvenuta!</p>`;
        }

        return html`
            <div class = "column is-offset-7 is-full has-text-centered">
                <h1 class="title is-1 has-text-link">${this.temaName}</h1>
                <hr>
                <p class="subtitle is-3"><b>Tempo di Gioco:</b> ${this.gameTime} sec.</p>
                <div class = " columns is-centered is-vcentered">
                    <div class = " column is-4 ">
                        <p class = "is-size-4"><b>Vento:</b></p>
                    </div>
                    <div class = " column is-6 ">
                        <p class = "is-size-4"><i>Intensità:</i> ${this.windForce} kn</p>
                        <p class = "is-size-4"><i>Direzione:</i> ${this.windDirection} °</p>
                    </div>
                </div>
                <hr>
                <p class = "is-size-4"><b>Carburante Rimasto:</b> ${this.fuel}</p>                              
                <div class = " columns is-centered is-vcentered">
                    <div class = " column is-4 ">
                        <p class = "is-size-4"><b>Posizione:</b></p>
                    </div>
                    <div class = " column is-6 ">
                        <p class = "is-size-4"><i>X:</i> ${this.positionX}</p>
                        <p class = "is-size-4"><i>Y:</i> ${this.positionY}</p>
                    </div>
                </div>
                <hr>
                <p class = "is-size-4"><b>Timone:</b> ${this.wheel}</p>                
                <p class = "is-size-4"><b>Accelerazione Motore:</b> ${this.acceleration}</p>
                <p class = "is-size-4"><b>Velocità:</b> ${this.speed} kn</p>
                <p class = "is-size-4"><b>Direzione:</b> ${this.direction} °</p>
                <hr>
                <p class = "is-size-4"><b>Radar:</b></p>
                ${collisionElement}
        `;
    }
}

customElements.define('textual-interface-component', TextualInterface);