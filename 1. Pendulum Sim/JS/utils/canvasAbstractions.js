import { WIDTH, HEIGHT } from "../data/params.js";

export class AnantGraphics {

    constructor(context){
        this.startingAngle = 0;
        this.endingAngle = 2*Math.PI;
        this.ctx = context;
        this.fillColor = "blue";
        this.strokeColor = "red";
    }

    setThickness = (t) => {
        this.ctx.lineWidth = t;
    }

    setColor = (c) => {
        this.strokeColor = c; 
    }

    setFillColor = (c) => {
        this.fillColor = c;
    }

    clear = () => {
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    drawLine = (startX, startY, endX, endY) => {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        ctx.strokeStyle = this.strokeColor;

        ctx.stroke();
    }

    // Draws a circle.
    setBob = (x, y, radius) => {

        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(x, y, radius, this.startingAngle, this.endingAngle);
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;


        ctx.fill();
        ctx.stroke();
    }
};
