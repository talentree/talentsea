import { Info } from "./info.class";
import { Team } from './team.class';

export class Game {

    constructor() {
        this.info = new Info();
        this.teams = [];
    }
}