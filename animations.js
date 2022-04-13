
function bouncingHello_onStart() {
	this.tWave = x => Math.abs(Math.abs(x) % 2 - 1);

	this.pos = [Math.random(), Math.random()];
	let theta = Math.random() * Math.PI * 2;
	this.dir = [Math.cos(theta), Math.sin(theta)];

	this.speed = 250;
	
	this.ctx.textBaseline = "top";
	this.ctx.font = "2em Arial";
	
	let txt = "Hello";
	let txm = this.ctx.measureText(txt);

	this.txt = txt;

	let txtWidth = txm.width;
	let txtHeight = txm.actualBoundingBoxDescent;

	this.maxX = this.width - txtWidth;
	this.maxY = this.height - txtHeight;
}

function bouncingHello_onUpdate(t, frame) {
	let d = this;

	d.ctx.clearRect(0, 0, d.width, d.height);

	/*
	d.pos: random starting offset
	+ t: movement over time
	* d.dir: speed scaling in that direction

	/ d.width:
		scale the speed so that it crosses the width at the same speed,
		not in the same amount of time

	* d.speed: speed
	
	* d.maxX: scale output from 0...1 to 0...(maximum x value)
	*/
	let x = d.tWave(d.pos[0] + t * d.dir[0] / d.width * d.speed) * d.maxX;
	let y = d.tWave(d.pos[1] + t * d.dir[1] / d.height * d.speed) * d.maxY;

	//d.debug(`position: x = ${Math.floor(x)}, y = ${Math.floor(y)}`);

	d.ctx.fillText(d.txt, x, y);
}

let bouncingHello = new Animation("ANIMATION_BouncingHello", 256, 128, bouncingHello_onStart, bouncingHello_onUpdate);

function isPointInMandelbrot(cX, cY, iterations) {
	let zReal = 0;
	let zImag = 0;
	
	for (let i = 0; i < iterations; i++) {
		let tmp = zReal;
		
		zReal = zReal * zReal - zImag * zImag  + cX;
		zImag = 2 * tmp * zImag                + cY;

		if (zReal * zReal + zImag * zImag > 4) {
			return i;
		}
	}

	return true;
}

function mandelbrot_onUpdate(t, frame) {
	let d = this;
	
	let y = frame;
	
	if (y > d.height) {
		this.pause();
		return;
	}
	
	// / d.width * 4: divide by width instead of height to avoid squishing
	let cY = (y - d.height / 2) / d.width * 4;
	
	for (let x = 0; x < d.width; x++) {
		// 1.5 instead of 2 puts it closer towards the middle
		let cX = (x - d.width / 1.5) / d.width * 4;
		
		let isIn_or_iters = isPointInMandelbrot(cX, cY, 100);
		
		if (isIn_or_iters === true) {
			d.ctx.fillStyle = d.rgb(0, 0, 0);
		} else {
			d.ctx.fillStyle = d.hsl(isIn_or_iters * 2, 100, 50);
		}
		d.ctx.fillRect(x, y, 1, 1);
	}
}

let mandelbrot = new Animation("ANIMATION_Mandelbrot", 512, 256, null, mandelbrot_onUpdate);

