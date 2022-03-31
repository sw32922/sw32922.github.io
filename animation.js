let canvas = document.getElementById("canvas");

let WIDTH  = canvas.getAttribute("width");
let HEIGHT = canvas.getAttribute("height");

let ctx = canvas.getContext("2d");

let debugEl = document.getElementById("debug");
function debug(txt) {
	debugEl.innerText = txt;
}

// triangle wave function, outputs 0 to 1
let tWave=x=>Math.abs(Math.abs(x) % 2 - 1);

let pos = [Math.random(), Math.random()];
let theta = Math.random() * Math.PI * 2;
let dir = [Math.cos(theta), Math.sin(theta)];

let speed = 1.5;

ctx.textBaseline = "top";
ctx.font = "2em Arial";
let txt = "Hello";
let txm = ctx.measureText(txt);
let txtWidth = txm.width;
let txtHeight = txm.fontBoundingBoxDescent;

let prevTime = 0.0;
let t = 0.0;

const FPS = 60;

function animation() {

	ctx.clearRect(0, 0, WIDTH, HEIGHT);

	let deltaTime = t - prevTime;

	let x = tWave(pos[0] + t * dir[0] * speed) * (WIDTH - txtWidth);
	let y = tWave(pos[1] + t * dir[1] * speed) * (HEIGHT - txtHeight);

	//debug(`position: x = ${Math.floor(x)}, y = ${Math.floor(y)}`);

	ctx.fillText(txt, x, y);

	prevTime = t;
	t += 1/60;
}

setInterval(animation, 1000/FPS);