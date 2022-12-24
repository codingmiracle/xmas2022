var maxFlakes = 200;
const maxFlakeSize = 10;

export default class Snowflake {
    constructor(h, ctx) {
        this.x = Math.floor(Math.random() * ctx.canvas.width);
        this.y = h;
        this.size = Math.floor(Math.random() * maxFlakeSize);
        this.itensity = Math.floor((Math.random() * 8) + 2) / 10;
        this.g = Math.floor(Math.random() * 4) + 1;
        this.behavior = Math.floor((Math.random() * 2) - 1);
        this.ctx = ctx
    }

    update() {
        this.y += this.g;
        this.x += this.behavior;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(131, 255, 154, ' + this.itensity + ')'
        this.ctx.fill();
    }

    hitsGround() {
        if (this.y >= this.ctx.canvas.height || this.x < 0 || this.x > this.ctx.canvas.width) {
            return 1;
        }
        return 0;
    }
}

var snowflakes;
var groundflakes;

export function initSnow(ctx) {
    snowflakes = [];
    groundflakes = [];
    for (let i = 0; i < maxFlakes; i++) {
        snowflakes.push(new Snowflake(Math.floor(Math.random() * ctx.canvas.height), ctx));
    }

    for (let i = 0; i < Math.floor(ctx.canvas.width / 40); i++) {
        groundflakes.push(new Snowflake(ctx.canvas.height, ctx))
        groundflakes[i].itensity = 1;
    }
}

export function updateSnow(ctx) {
    for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].update();
        if (snowflakes[i].hitsGround()) {
            snowflakes.splice(i, 1);
        }
    }

    while (snowflakes.length < maxFlakes) {
        snowflakes.push(new Snowflake(-10, ctx));
    }

}

export function drawSnow() {
    snowflakes.forEach(function (snowflake) {
        snowflake.draw();
    })
}
