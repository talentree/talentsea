import { Radar } from "./radar.class";

export class Outputs{

    constructor() {
        this.fuel = 0;
        this.isUsed = false;
        this.positionX = 0;
        this.positionY = 0;
        this.radar = new Radar();
        this.speed = 0;
    }
}