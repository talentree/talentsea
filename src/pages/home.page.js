import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class HomePage extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html`            
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">AMMINISTRATORE</h1>
                    <hr> 
                </div> 
            </div>          
            <div class = " columns is-mobile is-centered ">   
                <div class = " column is-11 ">
                    <p class = " subtitle is-size-2 has-text-justified ">La vostra squadra ha il comando di una nave con la strumentazione ridotta al minimo: motore, timone, mappa,  il goniometro, e … la testa.</p>
                    <p class = " subtitle is-size-2 has-text-justified ">L’obiettivo è arrivare in un porto sicuro: per farlo dovrete calcolare la rotta  e mantenerla risparmiando carburante, perché il vento, le correnti marine e le imprecisioni degli strumenti vi potranno portare fuori rotta.</p>
                    <p class = " subtitle is-size-2 has-text-justified ">Riuscirete ad arrivare per primi a destinazione? O, almeno, riuscirete ad arrivare?</p> 
                    <hr>
                </div>
            </div>
            <div class = " columns is-mobile is-centered ">
                <div class = " column is-10 ">
                    <div class = " columns is-mobile " >
                        <div class = " column is-5 ">
                            <div class = " box has-background-light box-shadow-primary ">
                                <p class = " is-size-3 has-text-centered ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien turpis, ultrices eget congue eget, scelerisque sed felis. Quisque dui risus, lobortis vel dignissim sit amet, ullamcorper et sapien. </p>
                                <br>
                                <button route = "/team-login" class = " button is-extra-large is-fullwidth is-primary is-focused ">Partecipante</button>
                            </div>
                        </div>
                        <div class = " column is-5 is-offset-2 ">
                            <div  class = " box has-background-light box-shadow-link ">
                                <p class = " is-size-3 has-text-centered ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien turpis, ultrices eget congue eget, scelerisque sed felis. Quisque dui risus, lobortis vel dignissim sit amet, ullamcorper et sapien. </p>
                                <br>                     
                                <button route = "/admin-login" class = " button is-extra-large is-fullwidth is-link is-focused ">Amministratore</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('home-page', HomePage);