import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import { AdminState } from '../../core/states/admin.state';

export class AdminSignIn extends NavElement {
    constructor() {
        super();
    }

    render() {
        return html `            
            <div class = " columns ">
                <div class = " column is-3 is-offset-1 ">
                        <label class="label is-extra-large">Indirizzo Email:</label>
                </div>
                <div class = " column is-7 ">
                    <input class = " input is-large is-primary "  type="email"/>
                </div>            
            </div>
            <hr>           
            <div class = " columns ">
                <div class = " column is-3 is-offset-1 ">
                        <label class = " label is-extra-large ">Password:</label>
                </div>
                <div class = " column is-7 ">
                    <input class = " input is-large is-primary "  type="password"/>
                </div>            
            </div>
            <hr>
            <div class = "columns is-9 "> 
                <div class = "column is-3 ">                    
                    <button class = "button is-extra-large is is-primary is-focused is-fullwidth" @click="${() => this.goToSignUp()}">Registrati</button>
                </div>
                <div class = " column is-3  has-text-right is-offset-6 ">                    
                    <button route = "/admin-console" class = " button is-extra-large is-link is-focused is-fullwidth " @click = ${() => this.doSignIn()}>Accedi</button>
                </div>
             </div>
        `;
    }

    doSignIn() {
        AdminState.uid = "ciao";
    }

    goToSignUp(){
        let event = new CustomEvent('goToSignUp');
        this.dispatchEvent(event);
    }
}

customElements.define('admin-signin-component', AdminSignIn);