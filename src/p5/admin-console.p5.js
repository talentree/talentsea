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
            
            p.frameRate(1);
        }
        p.draw = () => {
            if (this.gameIsPlaying) {
                /*
                p.ellipse(50, 50, 100, 100);
                */
                
                //clock
                this.gameData.info.gameTime++;

                //gestione vento
                if ((this.gameData.info.gameTime % 10) == 0) { Engine.changeWind(this.gameData.info); }

                //aggiorno le info dei singoli team                
                Object.keys(this.gameData.teams).forEach(i => {
                    console.log('entra');
                    Engine.updateTeams(this.gameData.teams[i]);
                });
                
                //disegno le navi sulla mappa
                Engine.plotTeams(this.gameData.teams);
            }
        }
    }   
}

export class Engine {
    static changeWind(info) {

        let windMaxChange = 0.3;
        let windMaxSpeed = 5;

        info.windForce = (info.windForce * 10 + (Math.floor((Math.random() * 2 * windMaxChange - windMaxChange) * 10) + 1)) / 10;
        if (info.windForce < 0) { info.windForce = 0 };
        if (info.windForce > windMaxSpeed) { info.windForce = windMaxSpeed }
        console.log(info.windForce);

        let windMaxAngle = 10; 

        info.windDirection = info.windDirection + Math.floor(Math.random() * 2 * windMaxAngle - windMaxAngle);
        if (info.windDirection < 0) { info.windDirection += 360 }
        if (info.windDirection > 360) { info.windDirection += -360 }
        console.log(info.windDirection);
    }

    static updateTeams(team) {
        //se una nave non viene usata la salto
        if (!team.outputs.isUsed) {return;}

        //aggiorno posizioni
        this.updatePosition(team.outputs);

        //aggiorno velocita'
        this.updateSpeed(team.outputs, team.inputs);

        //aggiorno carburante
        this.updateFuel(team.outputs);

        //TODO: radar e collisioni
        //TODO: controllo isUsed
    }

    static updatePosition(data) {
        //aggiorno posizion
        let moltiplicatoreVelocita = 0.16;
        // immaginando che direction = 0 corrisponde all'asse orrizontale orientato
        // verso destra gli angoli sono positivi in senso antiorario
        data.positionX += (data.speed * moltiplicatoreVelocita) * Math.cos((data.direction - 90) * Math.PI / 180);
        data.positionY += (data.speed * moltiplicatoreVelocita) * Math.sin((data.direction - 90) * Math.PI / 180);

        //tengo conto del vento (FIXME: futura scelta)
        if (false) {
            data.positionX += (windForce * moltiplicatoreVelocita) * Math.cos((windDirection - 90) * Math.PI / 180);
            data.positionY += (windForce * moltiplicatoreVelocita) * Math.sin((windDirection - 90) * Math.PI / 180);
        }
    }

    static updateSpeed(out, in) {
        // aggiorno le velocita'
                    // la velocita raggiunge graduatamente l-acc con step di tre alla volta
                    let x = out.speed;
                    if (x < in.acceleration) {
                        switch (in.acceleration - x) {
                            case 1:
                                x++;
                                break;
                            case 2:
                                x += 2;
                                break;
                            default:
                                x += 3;
                        }
                    }
                    if (x > in.acceleration) {
                        switch (x - in.acceleration) {
                            case 1:
                                x--;
                                break;
                            case 2:
                                x -= 2;
                                break;
                            default:
                                x -= 3;
                        }
                    }
                    if (x < -5) { x = -5 }
                    if (x > 20) { x = 20 }
                    out.speed = x;
    }

    static updateFuel(data) {
        //dovrebbe servire per i turni da fermo
        if (data.fuel<0) {
            data.fuel++;
            if (data.fuel == 0) {
                data.fuel = 1800;
            }
            return;
        }

        //effettivo consumo di carburante
        data.fuel -= 0.005 * Math.pow(Math.abs(data.speed),2.204) + 0.2;
        if (data.fuel <= 0) {
            //dovrebbe servire per i turni da fermo
            data.fuel = -5;
            data.speed = 0;
        }
    }

    static plotTeams() {
        //TODO: plotta navi
    }
} 
