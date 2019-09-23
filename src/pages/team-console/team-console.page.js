import { NavElement, html } from '../../core/nav-element';
import { Info } from '../../core/classes/info.class';
import { Team } from '../../core/classes/team.class';
import { FirebaseQuery } from '../../core/firebase-query';
import { TeamState } from '../../core/states/team.state';

import './textual-interface.component';
import { TeamConsoleP5Controller } from '../../p5/team-console.p5';

export class TeamConsolePage extends NavElement{

    static get properties(){
        return {
            gameInfo : {type : Object},
            myTeam : {type : Object}
        }
    }

    constructor(){
        super();
        this.gameInfo = new Info();
        this.myTeam = new Team();

        this.firebaseQuery = new FirebaseQuery();
        this.onSnapshotReference = null;
        this.teamConsoleP5 = new TeamConsoleP5Controller(710, 740);
    }

    render(){
        return html`            
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">CONSOLE SQUADRA</h1>
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
        this.firebaseQuery.setUid(TeamState.connectedToGameId);
        this.onSnapshotReference = this.firebaseQuery.listenToChanges(newDoc => {
            if(!this.p5){
                let container = this.querySelector('#container-p5');
                this.p5 = new p5(this.teamConsoleP5.p5Function.bind(this.teamConsoleP5), container);
            }
            this.gameInfo = newDoc.info;
            this.myTeam = newDoc.teams[TeamState.teamName];
        })
    }

    updated(){
        console.log('hello');
        this.teamConsoleP5.gameInfo = this.gameInfo || new Info();
        this.teamConsoleP5.myTeam = this.myTeam || new Team();
    }

    disconnectedCallback(){
        if(this.p5){this.p5.remove()}
        if(this.onSnapshotReference){this.onSnapshotReference()};
    }
}

customElements.define('team-console-page', TeamConsolePage);