import { AnantGraphics } from "./utils/canvasAbstractions.js";
import { WIDTH, HEIGHT } from "./data/params.js";

const ORIGIN = {
    x: WIDTH/2,
    y: 0
};

const PENDULUM = {
    x: WIDTH/2,
    y: 0,
    theta: Math.PI/(Math.random()*5),
    len: 180,
    radi: 20
};

const getCtx = () => {
    const canvas = document.getElementById("sim-canvas");
    return canvas.getContext("2d");
};

class Simulation{
    constructor(){
        this.force = 0.001;
        this.gravity = 0.001;
        this.angAccel = 0.001;
        this.angVel = 0.0;
        this.theta = Math.PI/4;

        this.damepningFactor = 0.995;
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

    delay = async (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms * 1000);
        })
    }

    play() {
    const step = async () => {
        this.force = this.gravity * Math.sin(PENDULUM.theta);
        this.angAccel = -this.force;
        this.angVel += this.angAccel;
        PENDULUM.theta += this.angVel;
        this.angVel *= this.damepningFactor;

        this.aGfx.clear();
        this.drawPendulum();

        requestAnimationFrame(step);

    };
    step();
}
};

const sim = new Simulation();
sim.drawPendulum();
sim.play();




