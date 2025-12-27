import { AnantGraphics } from "./utils/canvasAbstractions.js";
import { WIDTH, HEIGHT, PX_PER_METER } from "./data/params.js";

const ORIGIN = {
    x: WIDTH/2,
    y: 0
};

const PENDULUM = {
    x: WIDTH/2,
    y: 0,
    theta: Math.PI/Math.random()*1.2,
    len: 200,
    radi: 20
};

const getCtx = () => {
    const canvas = document.getElementById("sim-canvas");
    return canvas.getContext("2d");
};

class Simulation{
    constructor(){
        this.force = 0.001;
        this.gravity = 9.81;
        this.angAccel = 0.001;
        this.angVel = 0.0;

        this.dampeningRatio = 1.1;
        this.aGfx = new AnantGraphics(getCtx()); 
    }

    drawPendulum() {
        const { x: ox, y: oy } = ORIGIN;
        const { len, radi, theta } = PENDULUM;

        const x = ox + len * Math.sin(theta);
        const y = oy + len * Math.cos(theta);

        this.aGfx.setThickness(3);

        this.aGfx.drawLine(ox, oy, x, y);
        this.aGfx.setBob(x, y, radi);
    }

    play() {
    
        let last = performance.now();

        const step = async (now) => {

            const { theta: THETA } = PENDULUM;
            const L = PENDULUM.len/PX_PER_METER;
            const G = this.gravity;
            const omega0 = 1/Math.sqrt(L/G); 

            const dt = (now - last)/1000;
            last = now;
            
            const c = (1/(2*Math.PI))*omega0*this.dampeningRatio;

            this.angAccel = -(G/L)*Math.sin(THETA) - c*this.angVel;
            this.angVel += this.angAccel*dt;
            PENDULUM.theta += this.angVel*dt;

            this.aGfx.clear();
            this.drawPendulum();

            requestAnimationFrame(step);

        };

        requestAnimationFrame(step);
}
};

const sim = new Simulation();
sim.drawPendulum();
sim.play();




