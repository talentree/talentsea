import 'p5';

export function teamConsoleP5(p) {
    p.setup = function(){
        p.createCanvas(600, 600);
        p.background(255, 200, 220);
    }
    p.draw = function(){
        p.ellipse(50, 50, 100,100);
    }
}