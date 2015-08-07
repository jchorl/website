$(function() {
	var ball = {
		x: 470,
		y: 160,
		r: 10,
		dx: 2,
		dy: -4
	};
	var paddle = {
		w: 75,
		h: 10
	};
	var canvas;
	var rightDown = false;
	var leftDown = false;
	var bricks = [];
	var rows = 9;
	var cols = 41;
	var brick = {
		h: 15,
		padding: 1
	};
	var timer;
	var active = false;
	var started = false;
	var button;

	function setButtonText(text) {
		button.innerHTML = text;
	}

	function setButtonClick(fn) {
		button.onclick = fn;
	}

	function init_game() {
		canvas = document.getElementById('game-canvas').getContext("2d");
		button = document.getElementById('game-button');
		canvas.w = canvas.canvas.width;
		canvas.h = canvas.canvas.height;
		init_paddle();
		init_mouse();
		init_bricks();
		setButtonText('Start');
		setButtonClick(function() {
			if (!started) {
				init_game();
				start();
			}
			else if (active) {
				pause();
			}
			else if (!active) {
				start();
			}
		});
	}
	function init_paddle(){
		paddle.x = (canvas.w-paddle.w)/2;
	}
	function init_mouse() {
		canvas.minx = canvas.canvas.offsetLeft;
		canvas.maxx = canvas.minx + canvas.w;
	}
	function init_bricks() {
		brick.w = (canvas.w/cols) - 1;

		for (var i=0; i < rows; i++) {
			bricks[i] = [];
			for (var j=0; j < cols; j++) {
				bricks[i][j] = {
					active: 1
				};
			}
		}

		var coords = [
			//JOSH
			[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,2],[4,2],[5,2],[6,2],[7,2],[6,1],[7,1],[3,4],[4,4],[5,4],[6,4],[7,4],[3,5],[4,5],[5,5],[6,5],[7,5],[3,7],[4,7],[5,7],[7,7],[3,8],[5,8],[6,8],[7,8],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[3,11],[4,11],[4,12],[5,12],[6,12],[7,12],

			//CHORLTON
			[1,15],[2,15],[3,15],[4,15],[5,15],[6,15],[7,15],[1,16],[2,16],[1,17],[2,17],[6,16],[6,17],[7,16],[7,17],[1,19],[2,19],[3,19],[4,19],[5,19],[6,19],[7,19],[3,20],[4,20],[4,21],[5,21],[6,21],[7,21],[3,23],[4,23],[5,23],[6,23],[7,23],[3,24],[4,24],[5,24],[6,24],[7,24],[3,26],[4,26],[5,26],[6,26],[7,26],[4,27],[1,29],[2,29],[3,29],[4,29],[5,29],[6,29],[7,29],[1,31],[2,31],[3,31],[4,31],[5,31],[6,31],[7,31],[4,30],[4,32],[3,34],[4,34],[5,34],[6,34],[7,34],[3,35],[4,35],[5,35],[6,35],[7,35],[3,37],[4,37],[5,37],[6,37],[7,37],[4,38],[4,39],[5,39],[6,39],[7,39]
		];
		for (var i = coords.length - 1; i >= 0; i--) {
			bricks[coords[i][0]][coords[i][1]].active = 0;
		};
	}

	function drawBall() {
		canvas.fillStyle = "#fff";
		canvas.beginPath();
		canvas.arc(ball.x, ball.y, ball.r, 0, Math.PI*2, true);
		canvas.closePath();
		canvas.fill();
	}

	function rect(x,y,w,h, fillStyle) {
		canvas.fillStyle = fillStyle;
		canvas.beginPath();
		canvas.rect(x,y,w,h);
		canvas.closePath();
		canvas.fill();
	}

	function drawBrick(b) {
		canvas.fillStyle = "#fff";
		canvas.beginPath();
		canvas.rect(b.x,b.y,brick.w,brick.h);
		canvas.closePath();
		canvas.fill();
	}

	function drawPaddle() {
		canvas.fillStyle = "#fff";
		canvas.beginPath();
		canvas.rect(paddle.x, canvas.h-paddle.h, paddle.w, paddle.h);
		canvas.closePath();
		canvas.fill();
	}

	function drawText() {
		canvas.fillStyle = "#fff";
		canvas.font = "30px Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif"
		canvas.textAlign = 'center';
		canvas.fillText("Instructions:",canvas.w/2,canvas.h/2 + 50);
		canvas.font = "20px Avenir, 'Helvetica Neue', Helvetica, Arial, sans-serif"
		canvas.fillText("Move with the mouse or arrow keys",canvas.w/2,canvas.h/2+80);
		canvas.fillText("Pause with P or the pause button",canvas.w/2,canvas.h/2+110);
	}

	function clear() {
		canvas.clearRect(0, 0, canvas.w, canvas.h);
		rect(0, 0, canvas.w, canvas.h, "rgba(0,0,0,0)");
	}

	function onKeyDown(evt) {
		if (evt.keyCode === 39 && paddle.x + paddle.w < canvas.w){
			rightDown = true;
		}
		else if (evt.keyCode === 37 && paddle.x > 0){
			leftDown = true;
		}
		else if (evt.keyCode === 80) {
			if (active) {
				pause();
			}
			else {
				start();
			}
		}
	}

	function onKeyUp(evt) {
		if(evt.keyCode === 39){
			rightDown = false;
		}
		else if(evt.keyCode === 37){
			leftDown = false;
		}
	}

	function onMouseMove(evt) {
		if (evt.pageX - paddle.w/2 > canvas.minx && evt.pageX < canvas.maxx) {
			if (evt.pageX - canvas.minx >= canvas.w - paddle.w){
				paddle.x = canvas.w - paddle.w;
			}
			else{
				paddle.x = evt.pageX - canvas.minx - paddle.w/2;
			}
		}
	}

	function collision(b){
		var distX = Math.abs(ball.x - b.x-brick.w/2);
		var distY = Math.abs(ball.y - b.y-brick.h/2);

		if (distX > (brick.w/2 + ball.r)) { return false; }
		if (distY > (brick.h/2 + ball.r)) { return false; }

		if (distX <= (brick.w/2)) { return true; } 
		if (distY <= (brick.h/2)) { return true; }

		var difx=distX-brick.w/2;
		var dify=distY-brick.h/2;
		return (difx*difx+dify*dify<=(ball.r*ball.r));
	}

	function start() {
		if (!started) {
			ball = {
				x: 470,
				y: 160,
				r: 10,
				dx: 2,
				dy: -4
			};
		}
		timer = setInterval(draw, 20);
		active = true;
		started = true;
		setButtonText('Pause');
	}

	function pause() {
		clearInterval(timer);
		active = false;
		setButtonText('Resume');
	};

	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	$(document).mousemove(onMouseMove);

	function draw() {

		// check for keys pressed
		if (rightDown && paddle.x + paddle.w < canvas.w){
			paddle.x += 5;
		}
		else if (leftDown && paddle.x > 0){
			paddle.x -= 5;
		}

		//check for brickcollision
		//height of one row
		var rowheight = brick.h + brick.padding;
		//width of one column
		var colwidth = brick.w + brick.padding;

		row = Math.floor(ball.y/rowheight);
		col = Math.floor(ball.x/colwidth);

		if(active){
			// if the ball is in an area that could contain bricks
			if (row <= rows && col <= cols){
				// if collision on top
				if (row > 0 && col < cols && bricks[row-1][col].active === 1 && collision(bricks[row-1][col])){
					ball.dy = -ball.dy;
					bricks[row-1][col].active = 0;
				}

				// if collision on left
				else if (row < rows && col > 0 && bricks[row][col-1].active === 1 && collision(bricks[row][col-1])){
					ball.dx = -ball.dx;
					bricks[row][col-1].active = 0;
				}

				// if collision on right
				else if (row < rows && col + 1 < cols && bricks[row][col+1].active === 1 && collision(bricks[row][col+1])){
					ball.dx = -ball.dx;
					bricks[row][col+1].active = 0;
				}

				// if collision on bottom
				else if (row + 1 < rows && col < cols && bricks[row+1][col].active === 1 && collision(bricks[row+1][col])){
					ball.dy = -ball.dy;
					bricks[row+1][col].active = 0;
				}

				// if collision on top left
				else if (row > 0 && col > 0 && bricks[row-1][col-1].active === 1 && collision(bricks[row-1][col-1])) {
					if (ball.dy < 0){
						ball.dy = -ball.dy;
					}
					if (ball.dx < 0) {
						ball.dx = -ball.dx;
					}
					bricks[row-1][col-1].active = 0;
				}

				// if collision on top right
				else if (row > 0 && col+1 < cols && bricks[row-1][col+1].active === 1 && collision(bricks[row-1][col+1])) {
					if (ball.dy < 0){
						ball.dy = -ball.dy;
					}
					if (ball.dx > 0) {
						ball.dx = -ball.dx;
					}
					bricks[row-1][col+1].active = 0;
				}

				// if collision on bottom left
				else if (row + 1 < rows && col > 0 && bricks[row+1][col-1].active === 1 && collision(bricks[row+1][col-1])){
					if (ball.dy > 0){
						ball.dy = -ball.dy;
					}
					if (ball.dx < 0) {
						ball.dx = -ball.dx;
					}
					bricks[row+1][col-1].active = 0;
				}

				// if collision on bottom right
				else if (row + 1 < rows && col + 1 < cols && bricks[row+1][col+1].active === 1 && collision(bricks[row+1][col+1])){
					if (ball.dy > 0){
						ball.dy = -ball.dy;
					}
					if (ball.dx > 0) {
						ball.dx = -ball.dx;
					}
					bricks[row+1][col+1].active = 0;
				}
			}

			// if the ball hits a horizontal bound
			if (ball.x + ball.dx + ball.r > canvas.w || ball.x + ball.dx - ball.r < 0) {
				ball.dx = -ball.dx;
			}

			// if the ball hits the top
			if (ball.y + ball.dy - ball.r < 0) {
				ball.dy = -ball.dy;
			}

			// if the ball should hit the paddle
			else if (ball.y + ball.dy + ball.r > canvas.h - paddle.h) {
				// if it does
				if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
					//move the ball differently based on where it hit the paddle
					ball.dx = 8 * ((ball.x-(paddle.x+paddle.w/2))/paddle.w);
					ball.dy = -ball.dy;
				}
				else if (ball.y + ball.dy + ball.r > canvas.h){
					//game over
					started = false;
					pause();
					draw();
					drawText();
      				setButtonText('Restart');
				}
			}
			ball.x += ball.dx;
			ball.y += ball.dy;
		}

		clear();

		drawBall();

		//draw paddle
		drawPaddle();

		//draw bricks
		for (var i=0; i < rows; i++) {
			for (var j=0; j < cols; j++) {
				if (bricks[i][j].active === 1) {
					bricks[i][j].x = (j * (brick.w + brick.padding)) + brick.padding;
					bricks[i][j].y = (i * (brick.h + brick.padding)) + brick.padding;
					drawBrick(bricks[i][j]);
				}
			}
		}
	}

	init_game();
	draw();
	drawText();
});
