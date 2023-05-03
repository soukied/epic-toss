const GROUND_POS = 600 - 50;

class GameScene {
	canvas = {width:800, height: 600}
	// Set initial position and velocity of the object
	object_init_X = 100;
	object_init_Y = this.canvas.height / 2;
	objectX = this.object_init_X;
	objectY = this.object_init_Y;
	velocityX = 0;
	velocityY = 0;

	// Set initial state of the game
	aiming = true;
	targetX = this.canvas.width;
	targetY = this.canvas.height / 2;
	targetYDirection = 1;
	targetYSpeed = 10;

	// Function to draw the object
	drawObject(ctx) {
		ctx.beginPath();
		ctx.arc(this.objectX, this.objectY, 20, 0, Math.PI * 2);
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.closePath();
	}

	// Function to update the position of the object
	updatePosition() {
		this.objectX += this.velocityX;
		this.objectY += this.velocityY;
	}

	// Function to clear the canvas
	clearCanvas(ctx) {
		ctx.clearRect(0, 0, this.canvas.width, this.this.canvas.height);
	}

	// Function to update the canvas
	updateCanvas(ctx) {
		if (this.aiming) {
			this.drawTargetLine(ctx);
			this.updateTargetLinePosition();
		} else {
			this.drawObject(ctx);
			this.updatePosition();
		}
	}

	// Function to draw the target line
	drawTargetLine(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.objectX, this.objectY);
		ctx.lineTo(this.targetX, this.targetY);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();
	}

	// Function to update the position of the target line
	updateTargetLinePosition() {
		this.targetY += this.targetYDirection * this.targetYSpeed;

		// If the target line goes beyond the canvas bounds, reverse its direction
		if (this.targetY < 0) {
			this.targetY = 0;
			this.targetYDirection = 1;
		} else if (this.targetY > this.canvas.height) {
			this.targetY = this.canvas.height;
			this.targetYDirection = -1;
		}
	}

	// Event listener for mouse click

	camera_pos = {
		x: 0,
		y: 0
	}

	ground_pos = HEIGHT - 50;
	starting_pos = [20, HEIGHT - 200];
	handleMouseClick(event) {
            if (this.aiming) {
                const angle = Math.atan2(this.objectY - this.targetY, this.targetX - this.objectX);
                this.velocityX = Math.cos(angle) * 10;
                this.velocityY = -Math.sin(angle) * 10;

                this.aiming = false;
            }
	}

	init() {
		console.log("Hello World\n");
		// Function to handle mouse click
        // Event listener for mouse click
        addEventListener("keydown", this.handleMouseClick.bind(this));
	}

	update() {

	}

	/**
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	draw(ctx) {
		ctx.clearRect(0, 0, 800, 600);
		ctx.fillStyle = '#87CEEB';
		ctx.fillRect(0, 0, WIDTH , HEIGHT);

		ctx.fillStyle = "#41980a";
		ctx.fillRect(0, this.ground_pos, WIDTH, 50)

		ctx.fillStyle = "brown";
		ctx.fillRect(this.object_init_X - 5, this.object_init_Y, 10, 250);

		this.updateCanvas(ctx)
	}
}


class Player {
	pos_x = null;
	pos_y = null;
	vel_x = 0;
	vel_y = 0;
	constructor(x, y) {
		this.pos_x = x;
		this.pos_y = y;
	}

	update() {
		if (this.pos_x === null || this.pos_y === null) return;
		this.pos_x += this.vel_x;
		this.pos_y += this.vel_y;
	}

}