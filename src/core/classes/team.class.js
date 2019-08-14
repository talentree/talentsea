import { Inputs } from './inputs.class';
import { Outputs } from './outputs.class';

export class Team {

    constructor() {
        this.name = "";
        this.inputs = new Inputs();
        this.outputs = new Outputs()
        this.password = "";
        this.firebaseQuery = new FirebaseQuery();
    }
}

//usato da ArrayMapConverter per stabilire quali campi sono da non considerarsi il nome della squadra
export let teamClassStandardProperties = [
    'inputs',
    'outputs',
    'password',
    'firebaseQuery'
]