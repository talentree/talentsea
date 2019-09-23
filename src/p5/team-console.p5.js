import 'p5';
import { InterfacciaParametrizzata } from '../core/classes/interfacciaParametrizzata.class';
import { Info } from '../core/classes/info.class';
import { Team } from '../core/classes/team.class';
import { ClickAction } from './clickActionCode';

//da fare come adminConsolep5?
/*
export function teamConsoleP5(p) {
    let bg = p.color(45, 45, 45);
    let ip = new InterfacciaParametrizzata(p, 405, 720, bg);
    p.setup = function () {
        p.createCanvas(710, 740);
        //p.background(255, 200, 220);
        //p, width, height, coloreBackground
    }
    p.draw = function () {
        //p.ellipse(50, 50, 100,100);
        p.background(bg);
        ip.display();
    }
}
*/

export class TeamConsoleP5Controller {

    //inizializza alcune proprietà
    constructor(canvasWidth, canvasHeight) {
        this.gameInfo = new Info();
        this.myTeam = new Team();

        //proprietà per disegnare console
        this.coloreBackground = 'black';
        //this.radar = [false, true, true, false, false, false, true];
        this.collisioneAvvenuta = false;

        //TODO: la direzione deve venire da firebase
        this.direzione = 20;

        this.coloreResettaTimone = [255, 1, 0];
        this.coloreViraDestra = [255, 200, 0];
        this.coloreViraSinistra = [255, 201, 0];
        this.coloreAumentaVelocita = [255, 202, 0];
        this.coloreDiminuisciVelocita = [255, 203, 0];

        //barra verrà moltiplicata per 10
        this.myTeam.inputs.wheel = 5;
        this.gameInfo.windForce = 30;
        this.maxIntVento = 1;
        this.gameInfo.windDirection = 200;

        this.calculateUIPositions(canvasWidth, canvasHeight);

        this.onMouseClicked = null;
    }

    //serve a calcolare dove posizionare i vari elementi della grafica della console
    calculateUIPositions(width, height) {

        this.canvasWidth = width;
        this.canvasHeight = height;

        this.centroBussola = {
            x: width * 0.5,
            y: height * 0.35
        }

        this.centroManopolaMotore = {
            x: width * 0.5,
            y: height * 0.64
        }
        this.altezzaManopolaMotore = height * 0.28 / 2;
        this.larghezzaManopolaMotore = width * 0.15 / 2;
        this.distanzaBaseComandiTimone = width * 0.13;
        this.dimBaseComandiTimone = height * 0.09;
        this.dimAltezzaComandiTimone = width * 0.26;

        this.raggioAnelloBussola = width * 0.38;
        this.spessoreAnelloBussola = width * 0.05;

        this.angoloAltoASxRadar = {
            x: width * 0.11,
            y: height * 0.74
        }
        this.lunghezzaRadar = width * 0.78;
        this.altezzaRadar = height * 0.04;

        this.altezzaCollisioneImminente = height * 0.03;

        this.windstarText = {
            x: width * 0.11,
            y: height * 0.05,
            yNomeNave: height * 0.09
        }


        this.dimensioniTesti = {
            piccoli: height * 0.02 * 2,
            grandi: height * 0.05 * 2
        }

        this.posizioneCarburante = {
            x: width * 0.5,
            y: height * 0.4
        }
    }

    //metodo che disegna tutta l'interfaccia
    display() {
        this.coloreAnelloBussola = this.p.color(255, 204, 0);
        this.coloreTesti = this.p.color(255, 255, 255);
        //disegno anello bussola
        this.p.fill(this.coloreAnelloBussola);
        this.p.noStroke();
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, this.raggioAnelloBussola * 2);
        this.p.fill(this.coloreBackground);
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, (this.raggioAnelloBussola - this.spessoreAnelloBussola) * 2);

        //disegno triangolo timone
        this.p.angleMode(this.p.DEGREES);
        let coloreTriangoloTimone = this.p.color(0, 255, 0);
        let baseTimone = this.raggioAnelloBussola * 0.21;
        let altezzaTimone = this.raggioAnelloBussola * 0.80;
        let puntiTriangoloTimone = [
            this.centroBussola.x + baseTimone / 2 * Math.sin((this.myTeam.inputs.wheel - 90) * Math.PI / 180),
            this.centroBussola.y - baseTimone / 2 * Math.cos((this.myTeam.inputs.wheel - 90) * Math.PI / 180),
            this.centroBussola.x + baseTimone / 2 * Math.sin((this.myTeam.inputs.wheel + 90) * Math.PI / 180),
            this.centroBussola.y - baseTimone / 2 * Math.cos((this.myTeam.inputs.wheel + 90) * Math.PI / 180),
            this.centroBussola.x + altezzaTimone * Math.sin(this.myTeam.inputs.wheel * Math.PI / 180),
            this.centroBussola.y - altezzaTimone * Math.cos(this.myTeam.inputs.wheel * Math.PI / 180)
        ]
        this.p.fill(coloreTriangoloTimone);
        this.p.triangle(puntiTriangoloTimone[0], puntiTriangoloTimone[1], puntiTriangoloTimone[2], puntiTriangoloTimone[3], puntiTriangoloTimone[4], puntiTriangoloTimone[5]);

        //disegno triangolo vento
        let coloreTriangoloVento = this.p.color(0, 0, 255);
        let baseVento = this.raggioAnelloBussola * 0.23;
        let altezzaVento = this.gameInfo.windForce / this.maxIntVento * 0.75 * this.raggioAnelloBussola;
        let angoloVentoTotale = - this.direzione + this.gameInfo.windDirection;
        this.p.fill(this.p.color(255, 255, 255));
        let centroBaseTriangoloVento = {
            x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola) * Math.sin(angoloVentoTotale * Math.PI / 180),
            y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola) * Math.cos(angoloVentoTotale * Math.PI / 180)
        }
        //this.p.ellipse(centroBaseTriangoloVento.x, centroBaseTriangoloVento.y, 10, 10);

        let centroVerticeTriangoloVento = {
            x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola - altezzaVento) * Math.sin(angoloVentoTotale * Math.PI / 180),
            y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola - altezzaVento) * Math.cos(angoloVentoTotale * Math.PI / 180)
        }
        //this.p.ellipse(centroVerticeTriangoloVento.x, centroVerticeTriangoloVento.y, 10, 10);

        let puntiTriangoloVento = [
            centroBaseTriangoloVento.x + (baseVento / 2) * Math.sin((angoloVentoTotale - 90) * Math.PI / 180),
            centroBaseTriangoloVento.y - (baseVento / 2) * Math.cos((angoloVentoTotale - 90) * Math.PI / 180),
            centroBaseTriangoloVento.x + (baseVento / 2) * Math.sin((angoloVentoTotale + 90) * Math.PI / 180),
            centroBaseTriangoloVento.y - (baseVento / 2) * Math.cos((angoloVentoTotale + 90) * Math.PI / 180),
            centroVerticeTriangoloVento.x,
            centroVerticeTriangoloVento.y
        ]
        this.p.fill(coloreTriangoloVento);
        this.p.triangle(puntiTriangoloVento[0], puntiTriangoloVento[1], puntiTriangoloVento[2], puntiTriangoloVento[3], puntiTriangoloVento[4], puntiTriangoloVento[5]);

        //disegno centro bussola
        this.p.fill(this.coloreResettaTimone);
        this.p.stroke(this.coloreAnelloBussola);
        let raggioCentroBussola = this.raggioAnelloBussola * 0.09;
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, raggioCentroBussola, raggioCentroBussola);

        //disegno manopola motore

        this.p.fill(this.coloreAumentaVelocita);
        this.p.noStroke();
        this.p.rect(this.centroManopolaMotore.x - this.larghezzaManopolaMotore / 2, this.centroManopolaMotore.y - this.altezzaManopolaMotore / 2, this.larghezzaManopolaMotore, this.altezzaManopolaMotore / 2);

        this.p.fill(this.coloreDiminuisciVelocita);
        this.p.rect(this.centroManopolaMotore.x - this.larghezzaManopolaMotore / 2, this.centroManopolaMotore.y, this.larghezzaManopolaMotore, this.altezzaManopolaMotore / 2);

        //disegno triangolo per muovere timone
        //triangolo sx
        let timoneSxBase = {
            x: this.centroManopolaMotore.x - this.distanzaBaseComandiTimone,
            y: this.centroManopolaMotore.y
        }
        this.p.fill(this.coloreViraSinistra);
        let timoneSxVertice = {
            x: timoneSxBase.x - this.dimAltezzaComandiTimone,
            y: timoneSxBase.y
        }
        this.p.triangle(timoneSxBase.x, timoneSxBase.y - this.dimBaseComandiTimone / 2, timoneSxBase.x, timoneSxBase.y + this.dimBaseComandiTimone / 2, timoneSxVertice.x, timoneSxVertice.y);

        //triangolo dx
        let timoneDxBase = {
            x: this.centroManopolaMotore.x + this.distanzaBaseComandiTimone,
            y: this.centroManopolaMotore.y
        }
        let timoneDxVertice = {
            x: timoneDxBase.x + this.dimAltezzaComandiTimone,
            y: timoneDxBase.y
        }
        this.p.fill(this.coloreViraDestra);

        this.p.triangle(timoneDxBase.x, timoneDxBase.y - this.dimBaseComandiTimone / 2, timoneDxBase.x, timoneDxBase.y + this.dimBaseComandiTimone / 2, timoneDxVertice.x, timoneDxVertice.y);

        //disegno i radar
        let coloreRadar = {
            normal: this.p.color(0, 255, 0),
            alert: this.p.color(255, 0, 0),
            contorno: this.p.color(150, 150, 0)
        }

        this.p.stroke(coloreRadar.contorno);
        for (let i = 0; i < 7; i++) {
            if (this.myTeam.outputs.radar.frontStates[i] != 1) {
                this.p.fill(coloreRadar.normal);
            }
            else {
                this.p.fill(coloreRadar.alert);
            }
            this.p.rect(this.angoloAltoASxRadar.x + (this.lunghezzaRadar / 7) * i, this.angoloAltoASxRadar.y, this.lunghezzaRadar / 7, this.altezzaRadar);
        }


        //collisione avvenuta
        if (this.collisioneAvvenuta) {
            this.p.fill(coloreRadar.alert);
            this.p.rect(this.angoloAltoASxRadar.x, this.angoloAltoASxRadar.y + this.altezzaRadar, this.lunghezzaRadar, this.altezzaCollisioneImminente);
        }

        //disegno indicatore nord
        let direzioneIndicatore = this.direzione;
        this.p.fill(this.p.color(0, 0, 0));
        for (let i = 0; i < 4; i++) {
            direzioneIndicatore = -this.direzione + 90 * i;
            this.p.textAlign(this.p.CENTER, this.p.CENTER);
            this.p.textSize(this.dimensioniTesti.piccoli);
            let posNord = {
                x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola / 2) * Math.sin(direzioneIndicatore * Math.PI / 180),
                y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola / 2) * Math.cos(direzioneIndicatore * Math.PI / 180)
            }
            //this.p.ellipse(posNord.x, posNord.y, 10, 10);
            this.p.translate(posNord.x, posNord.y);
            this.p.rotate(direzioneIndicatore);
            let lettera = "N";
            switch (i) {
                case 0: {
                    lettera = "N";
                    break;
                }
                case 1: {
                    lettera = "E";
                    break;
                }
                case 2: {
                    lettera = "S";
                    break;
                }
                case 3: {
                    lettera = "W";
                    break;
                }
            }
            this.p.text(lettera, 0, 0);
            this.p.rotate(- direzioneIndicatore);
            this.p.translate(-posNord.x, -posNord.y);
        }
    }

    //questa funzione viene passata a p5
    p5Function(p) {
        this.p = p;
        let bg;
        p.setup = () => {
            p.createCanvas(this.canvasWidth, this.canvasHeight);
            bg = p.color(45, 45, 45);
        }
        p.draw = () => {
            //p.ellipse(50, 50, 100,100);
            p.background(bg);
            this.display();
        }
        p.mouseClicked = () => {
            //controllo se ho una callback in onMouseClicked
            if (this.onMouseClicked) {
                //ottengo il colore nel punto in cui ho cliccato il mouse
                let colorInPoint = p.get(p.mouseX, p.mouseY);
                //rimuovo il canale alpha
                colorInPoint.pop();
                let actionChoosen = this.whereIsClick(colorInPoint);
                this.onMouseClicked(actionChoosen);
            }
        }
    }

    //i valori sono in clickActionCode.js
    whereIsClick(coloreNelPunto) {
        if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreAumentaVelocita)) {
            return ClickAction.accelerate;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreDiminuisciVelocita)) {
            return ClickAction.decelerate;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreViraDestra)) {
            return ClickAction.turnRight;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreViraSinistra)) {
            return ClickAction.turnLeft;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreResettaTimone)) {
            return ClickAction.resetWheel;
        }
        else {
            return ClickAction.nothing;
        }
    }

    setCallbackToMouseClick(callback) {
        this.onMouseClicked = callback;
    }
}