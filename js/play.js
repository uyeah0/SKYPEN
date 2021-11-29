// "use strict"

let canvas;
let context;
let canvasBuffer;
let contextBuffer;


// 전역변수로서 이미지 객체 생성
let imgChar = new Image();
imgChar.src = "images/character.png";
let imgBg =  new Image();
imgBg.src = "images/background.png";
let shape =  new Image();
shape.src = "images/hamburger.png";


let screenHeight = 600;
let screenWidth = 1500;
let shapes = {};
let shapeIndex = 0;
let fallSpeed = 1;
let shapeGenerateSpeed = 500;
let score = 0;

function Init(){
    canvas = document.getElementById('canvas-view');
    context = canvas.getContext('2d');

    // canvasBuffer = document.createElement('canvas');
    // contextBuffer = canvasBuffer.getContext('2d');
    // contextBuffer.canvas.width = canvas.width;
    // contextBuffer.canvas.height = canvas.height;

    shapeGenerate()
    setInterval(Updater, 10);
    setInterval(shapeGenerate, shapeGenerateSpeed);
    //context.drawImage(canvasBuffer, 0, 0);
}


function keydown(){
    //눌러진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: 
            character.Velocity.X = -5;
        break; //left
        // case 38: dy=-2; break; //up
        case 39: 
            character.Velocity.X = 5;
            break; //right
        // case 40: dy=2; break; //down
    }
}

function keyup(){
    //떨어진 key의 코드값
    character.Velocity.X = 0;
}

// 하늘에서 떨어지는 것들 모양
function Shape(posX, width, height) {
    this.Width = width;
    this.Height = height;
    this.Position = {
        X: posX,
        Y: -this.Height
    };
    this.Velocity = Math.random() * fallSpeed +1;
    this.Index = shapeIndex;

    shapes[shapeIndex] = this;
    shapeIndex++

    // 충돌 확인
    this.checkCollisions = function() {
      if(this.Position.Y >= screenHeight){
        delete shapes[this.Index];
      }
    }

    // 캐릭터 위치 업데이트
    this.updatePosition = function() {
        this.Position.Y += this.Velocity;
    }

    // 캐릭터 업데이트 될 때마다 그리기
    this.Draw = function() {
        context.drawImage(shape, this.Position.X, this.Position.Y, this.Width, this.Height);
        //context.drawImage(imgBg, 0, 0, 1200, 590);
    }

    this.update = function(){
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}

// 캐릭터 
let character = new Character(screenWidth/2, 90, 90);

// 캐릭터
function Character(posX, width, height) {
    this.Width = width
    this.Height = height
    this.Position = {X: posX, Y:screenHeight - this.Height}
    this.Velocity = {X:0, Y: 0}

    this.checkCollisions = function(){
        function collision(a,b){
          if (
            a.Position.X <= b.Position.X + b.Width &&
            a.Position.X + a.Width >= b.Position.X &&
            a.Position.Y + a.Height >= b.Position.Y &&
            a.Position.Y <= b.Position.Y + b.Height ){
              return true
          }
        }

        // 만약 캐릭터와 아이템이 닿았을 시
        let i = 0;
        for (i in shapes){
            if(collision(this, shapes[i])){
              newGame();
            }
        }
      }
    
      this.updatePosition = function(){
        this.Position.X += this.Velocity.X;
        this.Position.Y += this.Velocity.Y;
    }

    this.Draw = function(){
        context.drawImage(imgChar, this.Position.X, this.Position.Y, this.Width, this.Height);
    }
    
    this.update = function(){
        this.checkCollisions();
        this.updatePosition();
        this.Draw();
    }
}

// 게임 끝남
function newGame() {
    location.href = "score.html"
    character = new Character(screenWidth/2, 80, 80);
    shapes = {};
    score = 0;
}


function shapeGenerate(){
    new Shape(Math.random() * screenWidth, 70, 70);
    score++;
    document.getElementById('score').textContent = score;
}

function Updater() {
    context.clearRect(0, 0, screenWidth, screenHeight);
    var i = 0;
    for(i in shapes){
      shapes[i].update();
    }
    character.update();
}
