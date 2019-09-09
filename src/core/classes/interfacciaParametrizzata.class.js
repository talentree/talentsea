export class InterfacciaParametrizzata {

    constructor(p, width, height, bgColor) {
        this.p = p;
        this.bgColor = bgColor;
        this.radar = [false, true, true, false, false, false, true];
        this.collisionOccurred = false;
        this.direction = 20; 
        this.barra = 5; //barra verrà moltiplicata per 10

        if (width && height) {
            this.setDimensioni(width, height);
        }
    }

    setDimensioni(width, height) {
        //BUSSOLA
        //anello bussola
        this.centroBussola = {
            x: width * 0.5,
            y: height * 0.4
        }
        this.raggioAnelloBussola = width * 0.38;
        this.spessoreAnelloBussola = width * 0.05;
        this.coloreAnelloBussola = this.p.color(255, 204, 0);

        //triangolo timone
        this.coloreTriangoloTimone = this.p.color(0, 255, 0);
        this.baseTimone = this.raggioAnelloBussola * 0.21;
        this.altezzaTimone = this.raggioAnelloBussola * 0.80;

        //centro bussola
        this.raggioCentroBussola = this.raggioAnelloBussola * 0.09;
        this.coloreResettaTimone = [255, 1, 0];

        //indicatori N-E-S-O
        this.dimensioniTesti = height * 0.02 * 2
        this.coloreTesti = this.p.color(255, 255, 255);

        //TIMONE
        //manopola timone
        this.centroManopolaMotore = {
            x: width * 0.5,
            y: height * 0.85
        }
        this.altezzaManopolaMotore = height * 0.28 / 2;
        this.larghezzaManopolaMotore = width * 0.15 / 2;

        //triangoli timone
        this.distanzaBaseComandiTimone = width * 0.13;
        this.dimBaseComandiTimone = height * 0.09;
        this.dimAltezzaComandiTimone = width * 0.26;
        this.coloreViraDestra = [255, 200, 0];
        this.coloreViraSinistra = [255, 201, 0];
        this.coloreAumentaspeedocita = [255, 202, 0];
        this.coloreDiminuiscispeedocita = [255, 203, 0];

        //RADAR
        //radar
        this.lunghezzaRadar = width * 0.78;
        this.altezzaRadar = height * 0.04;
        this.coloreRadar = {
            normal: this.p.color(0, 255, 0),
            alert: this.p.color(255, 0, 0)
        }
        this.angoloAltoASxRadar = {
            x: width * 0.11,
            y: height * 0.95
        }
    }

    display() {
        this.drawCompass();
        this.drawWheel();
        this.drawRadar();
    }

    drawCompass() {
        //anello bussola
        this.p.fill(this.coloreAnelloBussola);
        this.p.noStroke();
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, this.raggioAnelloBussola * 2);
        this.p.fill(this.bgColor);
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, (this.raggioAnelloBussola - this.spessoreAnelloBussola) * 2);

        //triangolo timone
        this.p.angleMode(this.p.DEGREES);
        let puntiTriangoloTimone = [
            this.centroBussola.x + this.baseTimone / 2 * Math.sin((this.barra - 90) * Math.PI / 180),
            this.centroBussola.y - this.baseTimone / 2 * Math.cos((this.barra - 90) * Math.PI / 180),
            this.centroBussola.x + this.baseTimone / 2 * Math.sin((this.barra + 90) * Math.PI / 180),
            this.centroBussola.y - this.baseTimone / 2 * Math.cos((this.barra + 90) * Math.PI / 180),
            this.centroBussola.x + this.altezzaTimone * Math.sin(this.barra * Math.PI / 180),
            this.centroBussola.y - this.altezzaTimone * Math.cos(this.barra * Math.PI / 180)
        ]
        this.p.fill(this.coloreTriangoloTimone);
        this.p.triangle(puntiTriangoloTimone[0], puntiTriangoloTimone[1], puntiTriangoloTimone[2], puntiTriangoloTimone[3], puntiTriangoloTimone[4], puntiTriangoloTimone[5]);

        //centro bussola
        this.p.fill(this.coloreResettaTimone);
        this.p.stroke(this.coloreAnelloBussola);
        this.p.ellipse(this.centroBussola.x, this.centroBussola.y, this.raggioCentroBussola, this.raggioCentroBussola);
        
        //indicatori N-E-S-O
        this.p.fill(this.p.color(0, 0, 0));
        for (let i = 0; i < 4; i++) {
            let directionIndicatore = -this.direction + 90 * i;
            this.p.textAlign(this.p.CENTER, this.p.CENTER);
            this.p.textSize(this.dimensioniTesti);
            let posNord = {
                x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola / 2) * Math.sin(directionIndicatore * Math.PI / 180),
                y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola / 2) * Math.cos(directionIndicatore * Math.PI / 180)
            }
            this.p.translate(posNord.x, posNord.y);
            this.p.rotate(directionIndicatore);
            let lettera = "X";
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
            this.p.rotate(- directionIndicatore);
            this.p.translate(-posNord.x, -posNord.y);
        }
    }

    drawWheel() {
        //manopola timone
        this.p.fill(this.coloreAumentaspeedocita);
        this.p.stroke(this.bgColor);
        this.p.rect(this.centroManopolaMotore.x - this.larghezzaManopolaMotore / 2, this.centroManopolaMotore.y - this.altezzaManopolaMotore / 2, this.larghezzaManopolaMotore, this.altezzaManopolaMotore / 2);
        this.p.fill(this.coloreDiminuiscispeedocita);
        this.p.rect(this.centroManopolaMotore.x - this.larghezzaManopolaMotore / 2, this.centroManopolaMotore.y, this.larghezzaManopolaMotore, this.altezzaManopolaMotore / 2);
    
        //triangolo sinistro timone
        let timoneSxBase = {
            x: this.centroManopolaMotore.x - this.distanzaBaseComandiTimone,
            y: this.centroManopolaMotore.y
        }
        let timoneSxVertice = {
            x: timoneSxBase.x - this.dimAltezzaComandiTimone,
            y: timoneSxBase.y
        }
        this.p.fill(this.coloreViraSinistra);
        this.p.triangle(timoneSxBase.x, timoneSxBase.y - this.dimBaseComandiTimone / 2, timoneSxBase.x, timoneSxBase.y + this.dimBaseComandiTimone / 2, timoneSxVertice.x, timoneSxVertice.y);

        //triangolo destro timone
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
    }

    drawRadar() {
        if (!this.collisionOccurred) { //radar
            this.p.stroke(this.bgColor);
            for (let i = 0; i < 7; i++) {
                if (this.radar[i] != 1) {
                    this.p.fill(this.coloreRadar.normal);
                }
                else {
                    this.p.fill(this.coloreRadar.alert);
                }
                this.p.rect(this.angoloAltoASxRadar.x + (this.lunghezzaRadar / 7) * i, this.angoloAltoASxRadar.y, this.lunghezzaRadar / 7, this.altezzaRadar);
            }
        } else { //collisione avvenuta
            this.p.fill(this.coloreRadar.alert);
            this.p.rect(this.angoloAltoASxRadar.x, this.angoloAltoASxRadar.y, this.lunghezzaRadar, this.altezzaRadar);
        }
    }
    
    //0 se esterno, 1 se aumento speedocita, 2 de diminuisco, 3 se viro a dx, 4 se viro a sx, 5 se resetto timones
    whereIsClick(coloreNelPunto) {
        console.log(coloreNelPunto);
        if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreAumentaspeedocita)) {
            return 1;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreDiminuiscispeedocita)) {
            return 2;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreViraDestra)) {
            return 3;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreViraSinistra)) {
            return 4;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreResettaTimone)) {
            return 5;
        }
        else {
            return 0;
        }
    }
}