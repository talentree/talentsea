import { html } from '@polymer/lit-element';
import { NavElement } from '../core/nav-element';

export class HomePage extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html`            
            <div class = " column is-full ">
                <h1 class = " title is-size-1 has-text-centered is-italic has-text-weight-bold gradient-text ">TALENTSEA</h1>
            </div>            
            <div class = " columns is-mobile is-centered ">   
                <div class = " column is-11 ">
                    <hr>
                    <p class = " is-size-4 has-text-justified ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien turpis, ultrices eget congue eget, scelerisque sed felis. Quisque dui risus, lobortis vel dignissim sit amet, ullamcorper et sapien. Maecenas maximus eget est id ornare. Fusce pellentesque orci vitae metus viverra pellentesque. Aliquam pellentesque mi turpis, ut consequat felis semper at. Proin et rhoncus sem, eget pretium elit. Donec sagittis arcu in nisl imperdiet congue.</p> 
                    <hr>
                </div>
            </div>
            <div class = " columns is-mobile is-centered ">
                <div class = " column is-10 ">
                    <div class = " columns is-mobile " >
                        <div class = " column is-5 ">
                            <div class = " box has-background-light box-shadow-primary ">
                                <p class = " is-size-4 has-text-centered ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien turpis, ultrices eget congue eget, scelerisque sed felis. Quisque dui risus, lobortis vel dignissim sit amet, ullamcorper et sapien. </p>
                                <br>
                                <button route = "/team-login" class = " button is-medium is-fullwidth is-primary is-focused ">Partecipante</button>
                            </div>
                        </div>
                        <div class = " column is-5 is-offset-2 ">
                            <div  class = " box has-background-light box-shadow-link ">
                                <p class = " is-size-4 has-text-centered ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sapien turpis, ultrices eget congue eget, scelerisque sed felis. Quisque dui risus, lobortis vel dignissim sit amet, ullamcorper et sapien. </p>
                                <br>                     
                                <button route = "/admin-login" class = " button is-medium is-fullwidth is-link is-focused ">Amministratore</button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('home-page', HomePage);