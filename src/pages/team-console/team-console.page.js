import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { teamConsoleP5 } from '../../p5/team-console.p5';
import './textual-interface.component';

export class TeamConsolePage extends NavElement{
    constructor(){
        super();
    }

    render(){
        return html`            
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-size-1 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">CONSOLE SQUADRA</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a>
                    </div>
                    <hr> 
                </div>
            </div>
            <div class = " columns is-mobile is-full is-centered">
                <div class = "column is-11">
                    <div class = "columns">
                        <div class = " column is-6">
                            <div class = " gradient-box primary-box box-shadow-primary">
                                <div class = "columns is-centered">
                                    <div class = " column is-11"> 
                                        <div id="container-p5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = " column is-6">
                            <div class = " gradient-box link-box box-shadow-link">
                                <div class = "columns is-centered">                                   
                                        <textual-interface-component></textual-interface-component>                                    
                                </div>                             
                            </div>                      
                        </div>
                    </div>
                </div>
            </div>      
            
        `;
    }

    firstUpdated(){
        const container = this.querySelector('#container-p5');
        this.p5 = new p5(teamConsoleP5, container);
    }

    disconnectedCallback(){
        this.p5.remove();
    }
}

customElements.define('team-console-page', TeamConsolePage);