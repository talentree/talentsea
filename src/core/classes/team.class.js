import { Inputs } from './inputs.class';
import { Outputs } from './outputs.class';

export class Team {

    constructor() {
        //name indica il nome della squadra e viene utilizzato da ArrayMapConverter
        this[teamClassKeyProperty] = 'name';

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
//usato da ArrayMapConverter per stabilire quale campo è da considerarsi la chiave (nome della squadra)
export let teamClassKeyProperty = 'name';