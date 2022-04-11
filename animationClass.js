class Animation {
	constructor(containerId, width, height, onStart, onUpdate) {
		let section = document.getElementById("animations");

		let isPageBackground = containerId === null;

		let container;
		if (isPageBackground) {
			container = document.body;
		} else {
			container = document.getElementById(containerId);
			container.setAttribute("class", "centerdiv");
		}
		
			let canvas = document.createElement("canvas");
			if (isPageBackground) {
				canvas.setAttribute("id", "pageBackground_animationCanvas");
			} else {
				canvas.setAttribute("class", "animationCanvas");
			}
			canvas.setAttribute("width", width);
			canvas.setAttribute("height", height);
			
			let debugBox = document.createElement("code");
			
			if (isPageBackground) {
				debugBox.setAttribute("id", "pageBackground_animationDebug");
			} else {
				debugBox.setAttribute("class", "animationDebug");
			}
		
		if (isPageBackground) {
			container.insertBefore(debugBox, container.firstChild);
			container.insertBefore(canvas, container.firstChild);
		} else {
			container.appendChild(canvas);
			container.appendChild(debugBox);
		}

		let ctx = canvas.getContext("2d");
		
		this.width = width;
		this.height = height;
		
		this.canvas = canvas;
		this.debugBox = debugBox;
		this.ctx = ctx;
		
		this.onStart = onStart || function() {};
		this.onUpdate = onUpdate;
		
		this.onStart();
		
		this.time = 0.0;
		this.frame = 0;

		this.play();
	}
	
	play() {
		const FPS = 60;

		this.interval = setInterval(() => {
			this.onUpdate(this.time, this.frame);
			this.time += 1/FPS;
			this.frame++;
		}, 1000 / FPS);
	}
	
	pause() {
		clearInterval(this.interval);
		this.interval = null;
	}
	
	debug(txt) {
		this.debugBox.innerText = txt;
	}
	
	rgb(r, g, b, a=255) {
		return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
	}
	
	hsl(h, s, l, a=255) {
		return `hsla(${h}, ${s}%, ${l}%, ${a / 255})`;
	}
}
