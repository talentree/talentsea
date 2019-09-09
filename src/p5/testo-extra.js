
    //codice extra setDimensioni()
    /*
        this.altezzaCollisioneImminente = height * 0.03;

        this.windstarText = {
            x: width * 0.11,
            y: height * 0.05,
            ytemaName: height * 0.09
        }

        this.posizionefuel = {
            x: width * 0.5,
            y: height * 0.4
        }
        this.temaName = "NAVE";
        this.speed = 34;
        this.gameTime = 0;
        this.windForce = 30;
        this.windDirection = 200;
        this.ultimaPosRilevata = {
            x: 0,
            y: 0
        }
    */

    //triangolo vento
    /*    
        this.coloreTriangoloVento = this.p.color(0, 0, 255);
        this.baseVento = this.raggioAnelloBussola * 0.23;
        this.altezzaVento = this.windForce / this.W * 0.75 * this.raggioAnelloBussola;
        this.angoloVentoTotale = - this.direction + this.windDirection;
        this.p.fill(this.p.color(255, 255, 255));
        let centroBaseTriangoloVento = {
            x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola) * Math.sin(angoloVentoTotale * Math.PI / 180),
            y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola) * Math.cos(angoloVentoTotale * Math.PI / 180)
        }
        this.p.ellipse(centroBaseTriangoloVento.x, centroBaseTriangoloVento.y, 10, 10);

        let centroVerticeTriangoloVento = {
        x: this.centroBussola.x + (this.raggioAnelloBussola - this.spessoreAnelloBussola - altezzaVento) * Math.sin(angoloVentoTotale * Math.PI / 180),
        y: this.centroBussola.y - (this.raggioAnelloBussola - this.spessoreAnelloBussola - altezzaVento) * Math.cos(angoloVentoTotale * Math.PI / 180)
        }
        this.p.ellipse(centroVerticeTriangoloVento.x, centroVerticeTriangoloVento.y, 10, 10);

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
        }
    */