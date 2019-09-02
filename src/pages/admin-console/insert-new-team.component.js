import { NavElement, html } from "../../core/nav-element";

export class InsertNewTeamComponent extends NavElement {

    static get properties() {
        return {
            teamName: { type: String },
            teamPassword: { type: String }
        }
    }

    constructor() {
        super();
        this.teamName = '';
        this.teamPassword = '';
    }

    render() {
        return html`
        <hr>
        <div class = " columns is-12 has-text-centered">
            <div class = "column is-5">
                <input   class= "input is-primary" type="text" @input="${e => this.changedTeamName(e.target.value)}" .value="${this.teamName}" placeholder="Nome Squadra"/>
            </div>             
            <div class = "column is-5">
                <input class= "input is-link" type="password" @input="${e => this.changedTeamPassword(e.target.value)}" .value= "${this.teamPassword}" placeholder="Password Segreta"/>
            </div>
           <div class = "column is-2">
                <a class="button is-link is-focused " @click=${e => this.removeTeam()}>Rimuovi</a>
            </div> 
        </div>
        `
    }

    changedTeamName(newName){
        this.teamName = newName;
        let e = new CustomEvent('nameChanged', {detail: newName});
        this.dispatchEvent(e);
    }

    changedTeamPassword(newPassword){
        this.teamPassword = newPassword;
        let e = new CustomEvent('passwordChanged', {detail: newPassword});
        this.dispatchEvent(e);
    }

    removeTeam(){
        let e = new CustomEvent('teamRemoved');
        this.dispatchEvent(e);
    }
}

customElements.define('insert-new-team-component', InsertNewTeamComponent);