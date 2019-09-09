import 'p5';
import { InterfacciaParametrizzata } from '../core/classes/interfacciaParametrizzata.class';

//da fare come adminConsolep5?
export function teamConsoleP5(p) {
    let bg = p.color(45,45,45);
    let ip = new InterfacciaParametrizzata(p, 710,720,bg);

    p.setup = function(){
        p.createCanvas(710, 740);
        //p.background(255, 200, 220);
        //p, width, height, coloreBackground
    }
    p.draw = function(){
        //p.ellipse(50, 50, 100,100);
        p.background(bg);
        ip.display();
    }
}