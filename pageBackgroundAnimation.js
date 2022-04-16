// get the amount of bits it takes to store a positive number
function bitCount(x) {
	return x == 0 ? 1 : Math.ceil(Math.log2(x + 1));
}

function pageBackground_onUpdate(t, frame) {
	let d = this;

	d.ctx.clearRect(0, 0, d.width, d.height);

	// maximum value that the component of a coordinate can have
	//
	// on a 1920x1080 canvas, this would be 1919.
	//
	// it doesn't matter that in that example, only the x component
	// can have a value that large. this is what we want.
	//
	// 1 is subtracted because coordinates start from 0
	let s = Math.max(d.width, d.height) - 1;
	
	// calculate the maximum value that can be attained from x ^ y
	// bitCount(s): calculate number of bits taken to store the max val the component of a coord could have
	// 2 **: "create" a number with that many bits, and set all bits to one
	// - 1: `2 **` was actually incorrect, convert from something like 1000 (incorrect) to 111 (correct)
	let maxPossibleValue = 2 ** bitCount(s) - 1;
	
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
