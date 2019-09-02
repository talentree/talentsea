import 'p5';
import { Game } from '../core/classes/game.class';

//l'upload della partita potrebbe essere eseguito da admin-console-page dato che fa anche il listener
export class AdminConsoleP5{
    constructor(){
        //gameData è accessibile da admin-console-page
        this.gameData = new Game();
    }

    p5Function(p) {
        p.setup = () => {
            p.createCanvas(600, 600);
            p.background(255, 200, 220);
        }
        p.draw = () => {
            p.ellipse(50, 50, 100,100);
        }
    }
}