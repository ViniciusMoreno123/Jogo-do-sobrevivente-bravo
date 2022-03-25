var imagemDeFundo
var player,playerImg;
var Fundo;
var Baladocanhao;

function preload(){
  imagemDeFundo = loadImage("/assets/bg.jpeg");
  playerImg = loadAnimation("/assets/shooter_2.png");
  Baladocanhao = loadAnimation("/assets/shooter_3.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);

Fundo = createSprite(width/2,height/2);
Fundo.addImage("Fundo",imagemDeFundo);

player = createSprite(width-1150,height-300);
player.addAnimation("animationplayer",playerImg);
player.addAnimation("balado",Baladocanhao);
player.scale = 0.7

}

function draw() {
background("black");
if(keyIsDown(UP_ARROW)){
 player.y -= 30;
}
if(keyIsDown(DOWN_ARROW)){
 player.y += 30;
}
if(keyWentDown("SPACE")){
   player.changeAnimation("balado");
}
if(keyWentUp("SPACE")){
   player.changeAnimation("animationplayer");
}

drawSprites();

}