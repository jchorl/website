import React, { Component } from "react";

import "./BrickGame.css";

const nameBricks = [
  //JOSH
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [6, 1],
  [7, 1],
  [3, 4],
  [4, 4],
  [5, 4],
  [6, 4],
  [7, 4],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [7, 5],
  [3, 7],
  [4, 7],
  [5, 7],
  [7, 7],
  [3, 8],
  [5, 8],
  [6, 8],
  [7, 8],
  [1, 10],
  [2, 10],
  [3, 10],
  [4, 10],
  [5, 10],
  [6, 10],
  [7, 10],
  [3, 11],
  [4, 11],
  [4, 12],
  [5, 12],
  [6, 12],
  [7, 12],

  //CHORLTON
  [1, 15],
  [2, 15],
  [3, 15],
  [4, 15],
  [5, 15],
  [6, 15],
  [7, 15],
  [1, 16],
  [2, 16],
  [1, 17],
  [2, 17],
  [6, 16],
  [6, 17],
  [7, 16],
  [7, 17],
  [1, 19],
  [2, 19],
  [3, 19],
  [4, 19],
  [5, 19],
  [6, 19],
  [7, 19],
  [3, 20],
  [4, 20],
  [4, 21],
  [5, 21],
  [6, 21],
  [7, 21],
  [3, 23],
  [4, 23],
  [5, 23],
  [6, 23],
  [7, 23],
  [3, 24],
  [4, 24],
  [5, 24],
  [6, 24],
  [7, 24],
  [3, 26],
  [4, 26],
  [5, 26],
  [6, 26],
  [7, 26],
  [4, 27],
  [1, 29],
  [2, 29],
  [3, 29],
  [4, 29],
  [5, 29],
  [6, 29],
  [7, 29],
  [1, 31],
  [2, 31],
  [3, 31],
  [4, 31],
  [5, 31],
  [6, 31],
  [7, 31],
  [4, 30],
  [4, 32],
  [3, 34],
  [4, 34],
  [5, 34],
  [6, 34],
  [7, 34],
  [3, 35],
  [4, 35],
  [5, 35],
  [6, 35],
  [7, 35],
  [3, 37],
  [4, 37],
  [5, 37],
  [6, 37],
  [7, 37],
  [4, 38],
  [4, 39],
  [5, 39],
  [6, 39],
  [7, 39]
];

export default class BrickGame extends Component {
  constructor() {
    super();

    this.ball = {
      x: 470,
      y: 160,
      r: 10,
      dx: 2,
      dy: -4
    };
    this.paddle = {
      w: 75,
      h: 10
    };
    this.rightDown = false;
    this.leftDown = false;
    this.bricks = [];
    this.rows = 9;
    this.cols = 41;
    this.brick = {
      h: 15,
      padding: 1
    };
    this.active = false;
    this.started = false;
  }

  setButtonText = text => {
    this.button.innerHTML = text;
  };

  setButtonClick = fn => {
    this.button.onclick = fn;
  };

  initGame = () => {
    this.canvas = document.getElementById("gameCanvas").getContext("2d");
    this.button = document.getElementById("gameButton");
    this.canvas.w = this.canvas.canvas.width;
    this.canvas.h = this.canvas.canvas.height;
    this.initPaddle();
    this.initMouse();
    this.initBricks();
    this.setButtonText("Start");
    this.setButtonClick(() => {
      if (!this.started) {
        this.initGame();
        this.start();
      } else if (this.active) {
        this.pause();
      } else {
        this.start();
      }
    });
  };

  initPaddle = () => {
    this.paddle.x = (this.canvas.w - this.paddle.w) / 2;
  };

  initMouse = () => {
    this.canvas.minx = this.canvas.canvas.offsetLeft;
    this.canvas.maxx = this.canvas.minx + this.canvas.w;
  };

  initBricks = () => {
    this.brick.w = this.canvas.w / this.cols - 1;

    for (let i = 0; i < this.rows; i++) {
      this.bricks[i] = [];
      for (var j = 0; j < this.cols; j++) {
        this.bricks[i][j] = {
          active: 1
        };
      }
    }

    for (let i = nameBricks.length - 1; i >= 0; i--) {
      this.bricks[nameBricks[i][0]][nameBricks[i][1]].active = 0;
    }
  };

  drawBall = () => {
    this.canvas.fillStyle = "#fff";
    this.canvas.beginPath();
    this.canvas.arc(
      this.ball.x,
      this.ball.y,
      this.ball.r,
      0,
      Math.PI * 2,
      true
    );
    this.canvas.closePath();
    this.canvas.fill();
  };

  rect = (x, y, w, h, fillStyle) => {
    this.canvas.fillStyle = fillStyle;
    this.canvas.beginPath();
    this.canvas.rect(x, y, w, h);
    this.canvas.closePath();
    this.canvas.fill();
  };

  drawBrick = b => {
    this.rect(b.x, b.y, this.brick.w, this.brick.h, "#fff");
  };

  drawPaddle = () => {
    this.rect(
      this.paddle.x,
      this.canvas.h - this.paddle.h,
      this.paddle.w,
      this.paddle.h,
      "#fff"
    );
  };

  drawText = () => {
    this.canvas.fillStyle = "#fff";
    this.canvas.font = "30px Nunito, sans-serif";
    this.canvas.textAlign = "center";
    this.canvas.fillText(
      "Instructions:",
      this.canvas.w / 2,
      this.canvas.h / 2 + 50
    );
    this.canvas.font = "20px Nunito, sans-serif";
    this.canvas.fillText(
      "Move with the mouse or arrow keys",
      this.canvas.w / 2,
      this.canvas.h / 2 + 80
    );
    this.canvas.fillText(
      "Pause with P or the pause button",
      this.canvas.w / 2,
      this.canvas.h / 2 + 110
    );
  };

  clear = () => {
    this.canvas.clearRect(0, 0, this.canvas.w, this.canvas.h);
    this.rect(0, 0, this.canvas.w, this.canvas.h, "rgba(0,0,0,0)");
  };

  onKeyDown = evt => {
    if (evt.keyCode === 39 && this.paddle.x + this.paddle.w < this.canvas.w) {
      this.rightDown = true;
    } else if (evt.keyCode === 37 && this.paddle.x > 0) {
      this.leftDown = true;
    } else if (evt.keyCode === 80) {
      if (this.active) {
        this.pause();
      } else {
        this.start();
      }
    }
  };

  onKeyUp = evt => {
    if (evt.keyCode === 39) {
      this.rightDown = false;
    } else if (evt.keyCode === 37) {
      this.leftDown = false;
    }
  };

  onMouseMove = evt => {
    if (
      evt.pageX - this.paddle.w / 2 > this.canvas.minx &&
      evt.pageX < this.canvas.maxx
    ) {
      if (evt.pageX - this.canvas.minx >= this.canvas.w - this.paddle.w) {
        this.paddle.x = this.canvas.w - this.paddle.w;
      } else {
        this.paddle.x = evt.pageX - this.canvas.minx - this.paddle.w / 2;
      }
    }
  };

  collision = b => {
    let distX = Math.abs(this.ball.x - b.x - this.brick.w / 2);
    let distY = Math.abs(this.ball.y - b.y - this.brick.h / 2);

    if (distX > this.brick.w / 2 + this.ball.r) {
      return false;
    }
    if (distY > this.brick.h / 2 + this.ball.r) {
      return false;
    }

    if (distX <= this.brick.w / 2) {
      return true;
    }
    if (distY <= this.brick.h / 2) {
      return true;
    }

    var difx = distX - this.brick.w / 2;
    var dify = distY - this.brick.h / 2;
    return difx * difx + dify * dify <= this.ball.r * this.ball.r;
  };

  start = () => {
    if (!this.started) {
      this.ball = {
        x: 470,
        y: 160,
        r: 10,
        dx: 2,
        dy: -4
      };
    }
    this.timer = setInterval(this.draw, 20);
    this.active = true;
    this.started = true;
    this.setButtonText("Pause");
  };

  pause = () => {
    clearInterval(this.timer);
    this.active = false;
    this.setButtonText("Resume");
  };

  draw = () => {
    // check for keys pressed
    if (this.rightDown && this.paddle.x + this.paddle.w < this.canvas.w) {
      this.paddle.x += 5;
    } else if (this.leftDown && this.paddle.x > 0) {
      this.paddle.x -= 5;
    }

    //check for brickcollision
    //height of one row
    let rowheight = this.brick.h + this.brick.padding;
    //width of one column
    let colwidth = this.brick.w + this.brick.padding;

    let row = Math.floor(this.ball.y / rowheight);
    let col = Math.floor(this.ball.x / colwidth);

    if (this.active) {
      // if the ball is in an area that could contain this.bricks
      if (row <= this.rows && col <= this.cols) {
        // if collision on top
        if (
          row > 0 &&
          col < this.cols &&
          this.bricks[row - 1][col].active === 1 &&
          this.collision(this.bricks[row - 1][col])
        ) {
          this.ball.dy = -this.ball.dy;
          this.bricks[row - 1][col].active = 0;
        }

        // if collision on left
        else if (
          row < this.rows &&
          col > 0 &&
          this.bricks[row][col - 1].active === 1 &&
          this.collision(this.bricks[row][col - 1])
        ) {
          this.ball.dx = -this.ball.dx;
          this.bricks[row][col - 1].active = 0;
        }

        // if collision on right
        else if (
          row < this.rows &&
          col + 1 < this.cols &&
          this.bricks[row][col + 1].active === 1 &&
          this.collision(this.bricks[row][col + 1])
        ) {
          this.ball.dx = -this.ball.dx;
          this.bricks[row][col + 1].active = 0;
        }

        // if collision on bottom
        else if (
          row + 1 < this.rows &&
          col < this.cols &&
          this.bricks[row + 1][col].active === 1 &&
          this.collision(this.bricks[row + 1][col])
        ) {
          this.ball.dy = -this.ball.dy;
          this.bricks[row + 1][col].active = 0;
        }

        // if collision on top left
        else if (
          row > 0 &&
          col > 0 &&
          this.bricks[row - 1][col - 1].active === 1 &&
          this.collision(this.bricks[row - 1][col - 1])
        ) {
          if (this.ball.dy < 0) {
            this.ball.dy = -this.ball.dy;
          }
          if (this.ball.dx < 0) {
            this.ball.dx = -this.ball.dx;
          }
          this.bricks[row - 1][col - 1].active = 0;
        }

        // if collision on top right
        else if (
          row > 0 &&
          col + 1 < this.cols &&
          this.bricks[row - 1][col + 1].active === 1 &&
          this.collision(this.bricks[row - 1][col + 1])
        ) {
          if (this.ball.dy < 0) {
            this.ball.dy = -this.ball.dy;
          }
          if (this.ball.dx > 0) {
            this.ball.dx = -this.ball.dx;
          }
          this.bricks[row - 1][col + 1].active = 0;
        }

        // if collision on bottom left
        else if (
          row + 1 < this.rows &&
          col > 0 &&
          this.bricks[row + 1][col - 1].active === 1 &&
          this.collision(this.bricks[row + 1][col - 1])
        ) {
          if (this.ball.dy > 0) {
            this.ball.dy = -this.ball.dy;
          }
          if (this.ball.dx < 0) {
            this.ball.dx = -this.ball.dx;
          }
          this.bricks[row + 1][col - 1].active = 0;
        }

        // if collision on bottom right
        else if (
          row + 1 < this.rows &&
          col + 1 < this.cols &&
          this.bricks[row + 1][col + 1].active === 1 &&
          this.collision(this.bricks[row + 1][col + 1])
        ) {
          if (this.ball.dy > 0) {
            this.ball.dy = -this.ball.dy;
          }
          if (this.ball.dx > 0) {
            this.ball.dx = -this.ball.dx;
          }
          this.bricks[row + 1][col + 1].active = 0;
        }
      }

      // if the ball hits a horizontal bound
      if (
        this.ball.x + this.ball.dx + this.ball.r > this.canvas.w ||
        this.ball.x + this.ball.dx - this.ball.r < 0
      ) {
        this.ball.dx = -this.ball.dx;
      }

      // if the this.ball hits the top
      if (this.ball.y + this.ball.dy - this.ball.r < 0) {
        this.ball.dy = -this.ball.dy;
      } else if (
        this.ball.y + this.ball.dy + this.ball.r >
        this.canvas.h - this.paddle.h
      ) {
        // check for paddle collision
        if (
          this.ball.x > this.paddle.x &&
          this.ball.x < this.paddle.x + this.paddle.w
        ) {
          //move the this.ball differently based on where it hit the paddle
          this.ball.dx =
            8 *
            ((this.ball.x - (this.paddle.x + this.paddle.w / 2)) /
              this.paddle.w);
          this.ball.dy = -this.ball.dy;
        } else if (this.ball.y + this.ball.dy + this.ball.r > this.canvas.h) {
          //game over
          this.started = false;
          this.pause();
          this.draw();
          this.drawText();
          this.setButtonText("Restart");
        }
      }
      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;
    }

    this.clear();
    this.drawBall();
    this.drawPaddle();

    //draw bricks
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.bricks[i][j].active === 1) {
          this.bricks[i][j].x =
            j * (this.brick.w + this.brick.padding) + this.brick.padding;
          this.bricks[i][j].y =
            i * (this.brick.h + this.brick.padding) + this.brick.padding;
          this.drawBrick(this.bricks[i][j]);
        }
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.initGame();
    this.draw();
    this.drawText();
  }

  render() {
    return (
      <div id="brickGame">
        <canvas id="gameCanvas" width="1170" height="400" />
        <button id="gameButton">Start</button>
      </div>
    );
  }
}
