export class Radar {

    /** stati:
        0 navigazione libera, 
        1 collisione costa,
        2 obbiettivo finale,
        3 obbiettivo intermedio,
        4 porto di arrivo
        */
    constructor() {
        this.frontStates = [0, 0, 0, 0, 0, 0, 0];
        this.state = 0;
    }
}