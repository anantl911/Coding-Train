import { AnantGraphics } from "./utils/canvasAbstractions.js";
import { WIDTH, HEIGHT } from "./data/params.js";
import { getRandomInteger } from "./utils/randomizer.js";

const BIRD_RADIUS = 15;
const W_PIPE = 95;
const DISTANCE_BETWEEN_PIPES = 75 + W_PIPE*0.6;

class Pipe {
    pipePoses = {
        x: -1,
        y: -1
    }
}

class FlappyBird {

    constructor(context){
        // bird
        this.mass = 30;
        this.jumpImpulse = 1;
        
        this.aGfx = new AnantGraphics(context);
        
        // world
        this.gravity = 9.81;
        this.vel = 0.0;
        this.accl = 0.0;
        this.pipes = []

        this.birdPos = {
            x: WIDTH/3,
            y: HEIGHT/2
        }
    }

    RandomizePipe(){
        if(this.pipes.length === 0){
            for(let i = 0 ; i < 3 ; ++i){
                let pipe = new Pipe();
                getRandomInteger(0, HEIGHT-80);
            }
        }
    }

    Jump(){
        if (this.jumpImpulse > 0) {
            this.jumpImpulse = -this.accl*0.8;
        }
    }

    Draw(){
        const {x, y} = this.birdPos;
        this.aGfx.clear();
        this.aGfx.drawBird(x, y, 20);
        this.aGfx.drawPipe(WIDTH*0.75, HEIGHT-200, W_PIPE, 200);
    }

    Play(){
        let last = performance.now();
        const step = (now) => {
            const dt = (now - last)/1000;
            this.accl = (this.mass*this.gravity);
            this.vel += this.accl*dt + this.jumpImpulse;
            this.birdPos.y += this.vel*dt;
            last = now;
            
            // reset jump force.
            this.jumpImpulse = 1; 
            this.Draw();
            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
}

const canvas = document.getElementById("game-canvas");



const ctx = canvas.getContext("2d");
const game = new FlappyBird(ctx);

window.addEventListener("keydown", (e) => {
    if(e.code === "Space") game.Jump();
})

game.Play();

