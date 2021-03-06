import { html } from '@polymer/lit-element';
import { NavElement } from '../../core/nav-element';
import './admin-signin.component';
import './admin-signup.component';

export class AdminLoginPage extends NavElement {

    static get properties() {
        return {
            displaySignIn: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.displaySignIn = true;
    }

    render() {
        return html`
            <div class = " columns is-mobile is-centered is-full ">
                <div class = " column is-11 ">
                    <h1  class = " title is-0 has-text-centered has-text-primary is-italic has-text-weight-bold gradient-text ">AMMINISTRATORE</h1>
                    <div class = "home-position" >
                        <a route="/"><i class="fas fa-home icon is-medium"></i></a>
                    </div>
                    <hr> 
                </div>
            </div>
            <div class = " gradient-box ">  
                <div class = " column is-10 is-offset-1">
                    <admin-signin-component @goToSignUp=${() => this.toggleSignIn()} style="display: ${this.displaySignIn? 'block': 'none'}"></admin-signin-component>                    
                    <admin-signup-component @goToSignIn=${() => this.toggleSignIn()} style="display: ${this.displaySignIn? 'none': 'block'}"></admin-signup-component>                        
                </div>
            </div>
        `;
    }

    toggleSignIn(){
        this.displaySignIn = !this.displaySignIn;
    }
}

customElements.define('admin-login-page', AdminLoginPage);