function pageBackground_onUpdate(t, frame) {
	let d = this;

	d.ctx.clearRect(0, 0, d.width, d.height);

	let s = Math.max(d.width, d.height);
	
	// calculate the maximum value that can be attained from x ^ y
	// Math.ceil(...): calculate number of bits required to store the max resolution number (s)
	// 2 **: "create" a number with that many bits, and set all bits to one
	// - 1: `2 **` was actually incorrect, convert from something like 1000 (incorrect) to 111 (correct)
	let maxPossibleValue = 2 ** Math.ceil(Math.log2(s)) - 1;
	
	for (let y = 0; y < d.height; y++) {
		for (let x = 0; x < d.width; x++) {
			let brightness = (x ^ y) / maxPossibleValue;
			
			brightness = (brightness + t / 32) % 1;
			
			// 2:1 ratio of red to green, for orange
			d.ctx.fillStyle = d.rgb(brightness * 255 / 2, brightness * 255 / 4, 0);
			
			d.ctx.fillRect(x, y, 1, 1);
		}
	}
}

let pageBackground = new Animation(null, 16, 16, null, pageBackground_onUpdate);
