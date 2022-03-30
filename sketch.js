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




function preload(){
  imagemDeFundo = loadImage("/assets/bg.jpeg");
  playerImg = loadAnimation("/assets/shooter_2.png");
  Baladocanhao = loadAnimation("/assets/shooter_3.png");
  coracao1 = loadImage("/assets/heart_1.png");
  coracao3 = loadImage("/assets/heart_3.png");
  coracao2 = loadImage("/assets/heart_2.png");
  zumbiImg = loadImage("/assets/zombie.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);

Fundo = createSprite(width/2,height/2);
Fundo.addImage("Fundo",imagemDeFundo);

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
}
if(keyWentUp("SPACE")){
   player.changeAnimation("animationplayer");
}

if(grupodezumbi.isTouching(player)){
   for(var i = 0;i <grupodezumbi.length;i++){
    if(grupodezumbi[i].isTouching(player)){
    grupodezumbi[i].destroy();
    }
}

   }
   if(grupodezumbi.isTouching(grupobaladao)){
    for(var i = 0;i <grupodezumbi.length;i++){
     if(grupodezumbi[i].isTouching(grupobaladao)){
     grupodezumbi[i].destroy();
     grupobaladao.destroyEach();
     }
 
 
    }

}
if(balado === 0){
  estado = estadoTristeza;
}
grupinhoChato();
}
drawSprites();
if(estado === estadoVidas){
   text("Poxa!Pelo visto a tristeza visitou alguém",400,400);
   grupodezumbi.destroyEach();
   player.destroy();
}else if(estado === estadoFelicidade){
   text("Boa!Você sobreviveu e conseguiu encontrar a cura para a humanidade",400,400);
   grupodezumbi.destroyEach();
   player.destroy();
}else if(estado === estadoTristeza){
   text("Não podes deixar acabar a bala no meio da guerra patrão",400,400);
   grupodezumbi.destroyEach();
   player.destroy();
   grupobaladao.destroyEach();
}

}
function grupinhoChato(){
   if(frameCount%50 ===0){
   zumbi = createSprite(random(500,1100),random(100,500),40,40);
   zumbi.addImage(zumbiImg);
   zumbi.velocityX = -3;
   zumbi.scale = 0.20;
   zumbi.lifetime = 400;
   zumbi.debug = true;
   zumbi.setCollider("circle",0,0,250);
   grupodezumbi.add(zumbi);
   }

}