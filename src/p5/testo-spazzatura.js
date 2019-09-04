export class InterfacciaParametrizzata {

    constructor(p, width, height, coloreBackground) {
        this.p = p;
        if (width && height) {
            this.setDimensioni(width, height);
        }
        this.coloreBackground = coloreBackground;
        this.radar = [false, true, true, false, false, false, true];
        this.collisioneAvvenuta = false;

        this.nomeNave = "NAVE";
        this.gameTime = 0;
        this.direzione = 20;
        this.vel = 34;
        this.ultimaPosRilevata = {
            x: 0,
            y: 0
        }

        this.messaggi = "Nessun messaggio";
        this.carburante = 100;

        this.coloreResettaTimone = [255, 1, 0];
        this.coloreViraDestra = [255, 200, 0];
        this.coloreViraSinistra = [255, 201, 0];
        this.coloreAumentaVelocita = [255, 202, 0];
        this.coloreDiminuisciVelocita = [255, 203, 0];
        this.coloreAnelloBussola = this.p.color(255, 204, 0);
        this.coloreTesti = this.p.color(255, 255, 255);

        //barra verrà moltiplicata per 10
        this.barra = 5;
        this.intVento = 30;
        this.maxIntVento = 1;
        this.direzioneVento = 200;

        this.motore = 0;
        
    }

    setDimensioni(width, height) {
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

    display() {
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
            this.centroBussola.x + baseTimone / 2 * Math.sin((this.barra - 90) * Math.PI / 180),
            this.centroBussola.y - baseTimone / 2 * Math.cos((this.barra - 90) * Math.PI / 180),
            this.centroBussola.x + baseTimone / 2 * Math.sin((this.barra + 90) * Math.PI / 180),
            this.centroBussola.y - baseTimone / 2 * Math.cos((this.barra + 90) * Math.PI / 180),
            this.centroBussola.x + altezzaTimone * Math.sin(this.barra * Math.PI / 180),
            this.centroBussola.y - altezzaTimone * Math.cos(this.barra * Math.PI / 180)
        ]
        this.p.fill(coloreTriangoloTimone);
        this.p.triangle(puntiTriangoloTimone[0], puntiTriangoloTimone[1], puntiTriangoloTimone[2], puntiTriangoloTimone[3], puntiTriangoloTimone[4], puntiTriangoloTimone[5]);

        //disegno triangolo vento
        let coloreTriangoloVento = this.p.color(0, 0, 255);
        let baseVento = this.raggioAnelloBussola * 0.23;
        let altezzaVento = this.intVento / this.maxIntVento * 0.75 * this.raggioAnelloBussola;
        let angoloVentoTotale = - this.direzione + this.direzioneVento;
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
            if (this.radar[i] != 1) {
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

    //0 se esterno, 1 se aumento velocita, 2 de diminuisco, 3 se viro a dx, 4 se viro a sx, 5 se resetto timones
    whereIsClick(coloreNelPunto) {
        console.log(coloreNelPunto);
        //console.log(coloreNelPunto);
        if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreAumentaVelocita)) {
            return 1;
        }
        else if (JSON.stringify(coloreNelPunto) == JSON.stringify(this.coloreDiminuisciVelocita)) {
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