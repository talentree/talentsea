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
            <input type="text" @input="${e => this.changedTeamName(e.target.value)}" .value="${this.teamName}" placeholder="team name"/>
            <input type="text" @input="${e => this.changedTeamPassword(e.target.value)}" .value= "${this.teamPassword}" placeholder="team password"/>
            <a class="button is-primary" @click=${e => this.removeTeam()}>Rimuovi</a>
            <br>
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