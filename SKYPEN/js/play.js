"use strict"

let canvas;
let context;

// 플레이어 이동 방향과 속도
let dx = 0;
let dy = 0;

// 키 이벤트로 인해 인식된 keycode 변수
let keycode;



// 전역변수로서 이미지 객체 생성
let imgChar = new Image();
imgChar.src = "images/character.png";
let imgBg =  new Image();
imgBg.src = "images/background.png";

let x = 600, y = 500; // 정 가운데 위치
let w = 60, h = 65; // 플레이어 이미지 절반 사이즈

function Init(){
    canvas = document.getElementById('c1');
    context = canvas.getContext('2d');

    runGame(); // 게임 진행
    setInterval(runGame, 10); 
}

function runGame(){
    moveAll(); // 캐릭터 움직이기
    drawAll(); // 이미지들 그리기
}

function moveAll(){
    x += dx;
    y += dy;
}
function drawAll(){
    context.drawImage(imgBg, 0,0,1200,590);
    context.drawImage(imgChar, x-w,y-h,w*2,h*2);

    // 키 코드값 글씨 그리기
    context.fillStyle = "white"
    context.font= "30px sans-serif"
    context.fillText(keycode,500,400);

    // 점수 그리기
    let score = 'SCORE 1000';
    context.fillStyle = "black"
    context.font= "30px sans-serif"
    context.fillText(score,20,40);

    // 타이머 그리기
    let timer = 'TIMER 30';
    context.fillStyle = "black"
    context.font= "30px sans-serif"
    context.fillText(timer,25,80);
}

function keydown(){
    //눌러진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: dx=-4; break; //left
        // case 38: dy=-2; break; //up
        case 39: dx=4; break; //right
        // case 40: dy=2; break; //down
    }
}
function keyup(){
    //떨어진 key의 코드값
    keycode=event.keyCode;
    switch(keycode){
        case 37: 
        case 39: dx=0; break;
        case 38:
        case 40: dy=0; break;
    }
}