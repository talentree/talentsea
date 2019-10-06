import 'p5';
import { Game } from '../core/classes/game.class';

//l'upload della partita potrebbe essere eseguito da admin-console-page dato che fa anche il listener
export class AdminConsoleP5 {
    constructor() {
        //gameData è accessibile da admin-console-page
        this.gameData = new Game();
        this.gameIsPlaying = true;
    }

    p5Function(p) {
        let img;
        p.preload = () => {
            img = p.loadImage('./applicativi/mapset08.jpg');
        }
        //TODO: qui va la logica del motore di gioco
        p.setup = () => {
            p.createCanvas(1600, 1000);
            p.background(img);
            //p.background(255, 200, 220);
        }
        p.draw = () => {
            if (this.gameIsPlaying) {
                p.ellipse(50, 50, 100, 100);
                this.gameData.info.gameTime++;
            }
        }
    }
}