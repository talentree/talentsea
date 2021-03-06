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
        let imgBN;
        p.preload = () => {
            img = p.loadImage('./applicativi/mapset08.jpg');
            imgBN = p.loadImage('./applicativi/mapset08_alpha.jpg');
        }

        p.setup = () => {
            p.createCanvas(1600, 1000);
            p.background(img);
            p.frameRate(1);
        }

        p.draw = () => {
            if (this.gameIsPlaying) {
                p.background(imgBN);
                //clock
                this.gameData.info.gameTime++;

                //gestione vento
                if ((this.gameData.info.gameTime % 10) == 0) { Engine.changeWind(this.gameData.info); }
                //aggiorno le info dei singoli team                
                Object.keys(this.gameData.teams).forEach(i => {
                    Engine.updateTeams(this.gameData.teams[i], this.gameData.info, p);
                });

                //disegno le navi sulla mappa dopo aver azzerato lo sfondo
                p.background(img);
                Object.keys(this.gameData.teams).forEach(i => {
                    Engine.plotTeams(this.gameData.teams[i].outputs, p);
                });
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
        console.log('wind force = ' + info.windForce);

        let windMaxAngle = 10;

        info.windDirection = info.windDirection + Math.floor(Math.random() * 2 * windMaxAngle - windMaxAngle);
        if (info.windDirection < 0) { info.windDirection += 360 }
        if (info.windDirection > 360) { info.windDirection += -360 }
        console.log('wind angle = ' + info.windDirection);
    }

    static updateTeams(team, info, p) {
        //se una nave non viene usata la salto
        if (!team.outputs.isUsed) { return; }

        //aggiorno posizioni
        this.updatePosition(team.outputs, info);

        this.updateDirection(team.inputs, team.outputs);

        //aggiorno velocita'
        this.updateSpeed(team.inputs, team.outputs);

        //aggiorno carburante
        this.updateFuel(team.outputs);

        //radar e collisioni
        this.updateRadar(team.outputs, p);
        try {
            this.checkCollisions(team.outputs, p);
        } catch (e) {
            //collisione avvenuta
            team.outputs.speed = 0;
            team.inputs.acceleration = 0;
        }

        //TODO: controllo isUsed
    }

    static checkCollisions(data, p) {
        //coordinate da controllare
        let posX = data.positionX + 10 * Math.cos((data.direction - 90) * Math.PI / 180);
        let posY = data.positionY + 10 * Math.sin((data.direction - 90 )* Math.PI / 180);

        //controllo punto
        let x = this.checkPoint(posX, posY, p);
        //blocco la nave in caso di collisione
        if (x != 1) {
            data.radar.state = x;
        } else {
            data.positionX -= (10) * Math.cos((data.direction - 90) * Math.PI / 180);
            data.positionY -= (10) * Math.sin((data.direction - 90) * Math.PI / 180);
            throw "Collided!";
        }
    }

    static updateRadar(data, p) {
        let radarDistance = 40; //raggio del radar
        let radarGap = 10;      //distanza tra i singoli punti del radar

        data.radar.frontStates.forEach((state, i) => {
            //calcolo la direzione in cui controllare il punto
            //poi mi servira' in rad
            let radarDirection = ((data.direction -90 + (radarGap * (i - 3))) * Math.PI / 180);
            //aggiorno lo stato del radar
            let posX = data.positionX + radarDistance * Math.cos(radarDirection);
            let posY = data.positionY + radarDistance * Math.sin(radarDirection);
            data.radar.frontStates[i] = this.checkPoint(posX, posY, p);
        });
        //console.log('radar ', data.radar);
    }

    static checkPoint(posX, posY, p) {
        //gestione colori per stato
        let colorTollerance = 2; //tolleranza lettura pixel colore
        let col1 = 0; // [0,0,0,255]; // nero terra
        let col2 = 64; //[255,0,0,255]; // usi futuri
        let col3 = 128; // obiettivo finale
        let col4 = 192; //[0, 255, 0, 255]; // obbiettivi intermedi
        let col5 = 255; //bianco mare

        //ritorna aray rgba
        let pointColor = p.get(posX, posY);
        // traduce in scala di grigio;
        let greyScaleColor = (Math.floor(pointColor[0] + pointColor[1] + pointColor[2]) / 3);
        // controllo colore campionato (con tolleranza colorTollerance) colori vicini
        let state = 0;
        if ((greyScaleColor > (col1 - colorTollerance) && greyScaleColor < (col1 + colorTollerance))) { state = 1 };
        if ((greyScaleColor > (col2 - colorTollerance) && greyScaleColor < (col2 + colorTollerance))) { state = 2 };
        if ((greyScaleColor > (col3 - colorTollerance) && greyScaleColor < (col3 + colorTollerance))) { state = 3 };
        if ((greyScaleColor > (col4 - colorTollerance) && greyScaleColor < (col4 + colorTollerance))) { state = 4 };
        p.ellipse(posX, posY, 5, 5);
        //ritorno lo stato del punto
        return state;
    }

    static updatePosition(data, info) {
        //aggiorno posizion
        let moltiplicatoreVelocita = 0.16;
        // immaginando che direction = 0 corrisponde all'asse orrizontale orientato
        // verso destra gli angoli sono positivi in senso antiorario
        data.positionX += (data.speed * moltiplicatoreVelocita) * Math.cos((data.direction - 90) * Math.PI / 180);
        data.positionY += (data.speed * moltiplicatoreVelocita) * Math.sin((data.direction - 90) * Math.PI / 180);

        //tengo conto del vento (FIXME: futura scelta) FIXME:
        if (true) {
            data.positionX += (info.windForce * moltiplicatoreVelocita) * Math.cos((info.windDirection - 90) * Math.PI / 180);
            data.positionY += (info.windForce * moltiplicatoreVelocita) * Math.sin((info.windDirection - 90) * Math.PI / 180);
        }
    }

    static updateDirection(inputs, outputs){
        //FIXME: per adesso la nave può ruotare sul posto
        outputs.direction += inputs.wheel;
    }

    static updateSpeed(inputs, outputs) {
        // aggiorno le velocita'
        // la velocita raggiunge graduatamente l-acc con step di tre alla volta
        let x = outputs.speed;
        if (x < inputs.acceleration) {
            switch (inputs.acceleration - x) {
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
        if (x > inputs.acceleration) {
            switch (x - inputs.acceleration) {
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
        outputs.speed = x;
    }

    static updateFuel(data) {
        //dovrebbe servire per i turni da fermo
        if (data.fuel < 0) {
            data.fuel++;
            if (data.fuel == 0) {
                data.fuel = 1800;
            }
            return;
        }

        //effettivo consumo di carburante
        data.fuel -= 0.005 * Math.pow(Math.abs(data.speed), 2.204) + 0.2;
        if (data.fuel <= 0) {
            //dovrebbe servire per i turni da fermo
            data.fuel = -5;
            data.speed = 0;
        }
    }

    static plotTeams(data, p) {
        //plotta navi
        //salto se la nave non e' utilizzata
        if (!data.isUsed) { return; }
        //TODO: mod lunghezze in base alla direzione
        let length = 10;
        let width = 10;
        p.ellipse(data.positionX, data.positionY, length, width);
    }
}


