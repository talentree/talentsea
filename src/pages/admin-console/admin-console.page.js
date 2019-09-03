import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

import './admin-new-game.component';

export class AdminConsolePage extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-size-1 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">AMMINISTRATORE</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a>
                    </div>
                    <hr> 
                </div>
            </div>
            
            <admin-new-game-component ></admin-new-game-component>

        `;
    }
    

}




customElements.define('admin-console-page', AdminConsolePage);