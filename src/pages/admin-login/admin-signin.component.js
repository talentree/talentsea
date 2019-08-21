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
                        <label class="label is-large">Indirizzo Email:</label>
                </div>
                <div class = " column is-7 ">
                    <input class = " input is-medium is-primary "  type="email"/>
                </div>            
            </div>
            <hr>           
            <div class = " columns ">
                <div class = " column is-3 is-offset-1 ">
                        <label class = " label is-large ">Password:</label>
                </div>
                <div class = " column is-7 ">
                    <input class = " input is-medium is-primary "  type="password"/>
                </div>            
            </div>
            <hr>
            <div class = "columns is-9 "> 
                <div class = "column is-3 ">                    
                    <button class = "button is-medium is is-primary is-focused is-fullwidth" onclick = " document.getElementById('signup').style.display='block';
                                                                                             document.getElementById('signin').style.display='none' ">Registrati</button>
                </div>
                <div class = " column is-3  has-text-right is-offset-6 ">                    
                    <button class = " button is-medium is-link is-focused is-fullwidth " @click = ${(e) => this.login()}>Accedi</button>
                </div>
             </div>
        `;
    }

    login() {
        AdminState.uid = "ciao";
        console.log(AdminState.uid);
    }
}

customElements.define('admin-signin-component', AdminSignIn);