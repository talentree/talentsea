import { Inputs } from './inputs.class';
import { Outputs } from './outputs.class';

export class Team {

    constructor() {
        this.inputs = new Inputs();
        this.outputs = new Outputs()
        this.password = "";
    }
}