let canvas; let canvasContext;
let ballX = 400; let ballY = 300;
let xSpeed = 10; let ySpeed = 2;
let padX = 4; let padY = 246; let enemyX = 780; let enemyY = 246;
let p1Score = 0; let p2Score = 0;
let sprint = 2; let deltaY; let hits = 0;
const PAD_H = 128; const WINNING = 7;


window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function(){
        draw();
        move();
    }, 1000/framesPerSecond);
    canvas.addEventListener('mousemove', function(evt){
        let mousePos = calcMouse(evt);
        padY = mousePos.y - PAD_H/2;
    })
}
function ballReset(){
    if(ballX < 20){
        p2Score++;
        if(p2Score == WINNING){
            alert("p2 won!");
            p2Score = 0;
            p1Score = 0;
            sprint = 2;
        }
        xSpeed = -10;
        ySpeed = 2;
    }else{
        p1Score++;
        sprint++;
        if(p1Score == WINNING){
            alert("p1 won!");
            p2Score = 0;
            p1Score = 0;
            sprint = 2;
        }
        xSpeed = 10;
        ySpeed = -2;
    }
    
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    hits = 0;
}
function enemyMove(){
    if((enemyY + PAD_H/2) < ballY - 20){
        enemyY += sprint;
    }
    else if((enemyY + PAD_H/2) > ballY + 20){
        enemyY -= sprint;
    }
}
function move(){
    enemyMove();
    if(ballX > 796 || ballX < 4){
        ballReset();
    }
    if((ballX < 24 && ballY < (padY + PAD_H) && ballY > padY) || (ballX > 776 && ballY < (enemyY + PAD_H) && ballY > enemyY)){    
        if(ballX < 24){
            deltaY = ballY - (padY + PAD_H/2);
        } else {
            deltaY = ballY - (enemyY + PAD_H/2);
        }
        ySpeed = Math.round(deltaY/6);
        xSpeed = -xSpeed;
        hits++;
        console.log(hits);
        console.log(xSpeed);
        if(hits == 4){
            if (xSpeed < 0){ 
                xSpeed-=2;
            }else{
                xSpeed+=2;
            }
        }
        if(hits == 7){
            if (xSpeed < 0){ 
                xSpeed-=2;
            }else{
                xSpeed+=2;
            }
        }
        if(hits == 10){
            if (xSpeed < 0){ 
                xSpeed-=2;
            }else{
                xSpeed+=2;
            }
        }
    }
    ballX += xSpeed;
    if(ballY > 596 || ballY < 4){
        ySpeed = -ySpeed;
    }
    ballY += ySpeed;
}
function calcMouse(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return{
        x: mouseX,
        y: mouseY
    };

}
function colorRect(x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}
function colorCir(cx, cy, rad, ccolor){
    canvasContext.fillStyle = ccolor;
    canvasContext.beginPath();
    canvasContext.arc(cx, cy, rad, 0, Math.PI*2, true);
    canvasContext.fill();
}
function drawNet(){
    for (var i = 0; i < canvas.height; i += 40){
        colorRect(canvas.width/2 -2, i, 4, 20, 'white');
    }
}
function draw(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');  //background
    colorRect(padX, padY, 16, PAD_H, 'white');              //my paddle
    colorRect(enemyX, enemyY, 16, PAD_H, 'white');          //enemy
    colorCir(ballX, ballY, 10, 'red');                      //ball
    drawNet();
    canvasContext.fillStyle = 'white';
    canvasContext.font = '24px arial';
    canvasContext.fillText(p1Score, 150, 100);
    canvasContext.fillText(p2Score, 650, 100);

}
