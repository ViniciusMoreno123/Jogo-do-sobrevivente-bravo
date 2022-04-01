var imagemDeFundo
var player,playerImg;
var Fundo;
var Baladocanhao;
var coracao1,coracao2,coracao3;
var vida1,vida2,vida3;
var zumbiImg,grupodezumbi,zumbi;
var balado = 70;
var grupobaladao;
var municao;
var estadoPlay = 0;
var estadoTristeza = 1;
var estadoVidas = 2;
var estadoFelicidade = 3;
var estado = estadoPlay;
var pontos = 0;
var vidas = 3;
var explosao, felicidade, tristeza;
var somtristeza = false;
var somFelicidade = false;
var final;





function preload(){
  imagemDeFundo = loadImage("/assets/bg.jpeg");
  playerImg = loadAnimation("/assets/shooter_2.png");
  Baladocanhao = loadAnimation("/assets/shooter_3.png");
  coracao1 = loadImage("/assets/heart_1.png");
  coracao3 = loadImage("/assets/heart_3.png");
  coracao2 = loadImage("/assets/heart_2.png");
  zumbiImg = loadImage("/assets/zombie.png");
  explosao = loadSound("/assets/explosion.mp3");
  felicidade = loadSound("/assets/win.mp3");
  tristeza = loadSound("/assets/lose.mp3");
  final = loadImage("/assets/casa.webp");
}

function setup() {
createCanvas(windowWidth,windowHeight);

Fundo = createSprite(width/2,height/2);
Fundo.addImage("Fundo",imagemDeFundo);
Fundo.addImage("Fim",final);

vida1 = createSprite(width-150,40,20,20);
vida2 = createSprite(width-100,40,20,20);
vida3 = createSprite(width-150,40,20,20);

vida1.addImage("vida1",coracao1);
vida2.addImage("vida2",coracao2);
vida3.addImage("vida3",coracao3);

vida1.scale = 0.5;
vida2.scale = 0.5;
vida3.scale = 0.5;

vida1.visible = false;
vida2.visible = false;
vida3.visible = true;

grupodezumbi = new Group();
grupobaladao = new Group();



player = createSprite(width-1150,height-300);
player.addAnimation("animationplayer",playerImg);
player.addAnimation("balado",Baladocanhao);
player.scale = 0.7
player.debug = false;
player.setCollider("rectangle",0,0,300,300);

}

function draw() {
background("black");
if (estado === estadoPlay){


if(keyIsDown(UP_ARROW)){
 player.y -= 30;
}
if(keyIsDown(DOWN_ARROW)){
 player.y += 30;
}
if(keyWentDown("SPACE")){
   player.changeAnimation("balado");
   municao = createSprite(player.x,player.y-60,20,10);
   municao.velocityX = 20;
   grupobaladao.add(municao);
   balado -= 1;
   explosao.play();
}

if(keyWentUp("SPACE")){
   player.changeAnimation("animationplayer");
}
if(keyIsDown(RIGHT_ARROW)){
    player.x += 30;
   }
   if(keyIsDown(LEFT_ARROW)){
    player.x -= 30;
   }
if(grupodezumbi.isTouching(player)){
   for(var i = 0;i <grupodezumbi.length;i++){
    if(grupodezumbi[i].isTouching(player)){
    grupodezumbi[i].destroy();
    vidas -=1;
    }
}

   }
   if(grupodezumbi.isTouching(grupobaladao)){
    for(var i = 0;i <grupodezumbi.length;i++){
     if(grupodezumbi[i].isTouching(grupobaladao)){
     grupodezumbi[i].destroy();
     grupobaladao.destroyEach();
     pontos += 2;
     }
 
 
    }

}
if(balado === 0){
  estado = estadoTristeza;
  tristeza.play();
}
grupinhoChato();
}
if(vidas ===3){
   vida1.visible = false;
   vida2.visible = false;
   vida3.visible = true;
}
if(vidas ===2){
    vida1.visible = false;
    vida2.visible = true;
    vida3.visible = false;
 }
 if(vidas ===1){
    vida1.visible = true;
    vida2.visible = false;
    vida3.visible = false;
 }
 if(vidas === 0){
     estado = estadoVidas;
     if(!somtristeza && !tristeza.isPlaying()){
        tristeza.playMode("untilDone");
        tristeza.play();
        somtristeza = true;
     }
   
     vida1.visible = false;

 }
 if(pontos === 100){
   estado = estadoFelicidade
   if(!somFelicidade && !felicidade.isPlaying()){
    felicidade.playMode("untilDone");
    felicidade.play();
    somFelicidade = true;
 }
   
 }
drawSprites();
textSize(20);
fill("red");
text("Balas = "+balado,width-210,height/2-250);
text("Pontuação ="+pontos,width-200,height/2-220);
if(estado === estadoVidas){
    textSize(40);
   text("Poxa!Pelo visto a tristeza visitou alguém",550,600);
   grupodezumbi.destroyEach();
   player.destroy();
   
   
}else if(estado === estadoFelicidade){
    Fundo.changeImage("Fim",final);
    Fundo.scale = 2.5;
   textSize(40)
   fill("black");
   text("Boa!Você sobreviveu e conseguiu encontrar a cura para a humanidade",350,600);
   grupodezumbi.destroyEach();
   
   
  
}else if(estado === estadoTristeza){
    
    textSize(40);
   text("Não podes deixar acabar a bala no meio da guerra patrão",400,600);
   grupodezumbi.destroyEach();
   player.destroy();
   grupobaladao.destroyEach();
  
}

}
function grupinhoChato(){
   if(frameCount%50 ===0){
   zumbi = createSprite(random(800,1500),random(100,500),40,40);
   zumbi.addImage(zumbiImg);
   zumbi.velocityX = -3;
   zumbi.scale = 0.20;
   zumbi.lifetime = 400;
   zumbi.debug = false;
   zumbi.setCollider("circle",0,0,250);
   grupodezumbi.add(zumbi);
   }

}