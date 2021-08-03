var bg,bgImg;
var player, shooterImg, shooter_shooting, arrow, arrowGroup, arrowImage;
var bluey,blueGroup, blueImg;
var life, lifeImg, lifeImg2, lifeImg3;
var score=0;
var gameState=0;
var gameOver, gameOverImg;




function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  arrowImage= loadImage("bullet.png");
  bgImg = loadImage("assets/bg.jpeg");
  blueImg= loadImage("assets/zombie.png");
  lifeImg= loadImage("assets/heart_1.png");
  life2Img= loadImage("assets/heart_2.png");
  life3Img= loadImage("assets/heart_3.png");
  gameOverImg= loadImage("assets/gameover.jpg");

  
}

function setup() {

  
  createCanvas(displayWidth,displayHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

life=createSprite(1200,60, 20,20);
life.addImage(life3Img);
life.scale=0.5;

gameOver= createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
gameOver.addImage(gameOverImg);
gameOver.visible=false;
gameOver.scale=3.5;
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5;
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)
  

   arrowGroup = new Group();
   blueGroup= new Group();
}

function draw() {
  background(0); 

  
  if(keyWentDown("space")){
    createArrow();
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
pumpkinBalloon();

if(player.isTouching(blueGroup)){
  score=score+1;
  blueGroup.destroyEach();
}


if(score===1){
  life.addImage(life2Img);
}
else if(score===2){
  life.addImage(lifeImg);
}
else if(score===3){
  life.visible=false;
  gameState=1;
}
else{
  life.visible= true;
  life.addImage(life3Img);
}





if(gameState===1){
  player.destroy();
  blueGroup.destroyEach();
  gameOver.visible=true;
  
}



if(arrowGroup.isTouching(blueGroup)){
  
  blueGroup.destroyEach();
  arrowGroup.destroyEach();
}

console.log(mouseX, mouseY);
console.log(score);
drawSprites();

}

function createArrow(){
  arrow= createSprite(100, 100, 60, 10);
arrow.addImage(arrowImage);
arrow.x = 360;
arrow.y=player.y;
arrow.velocityX = 4;           
arrow.lifetime = 250;
arrow.scale = 0.2;
arrow.debug=false;
arrow.setCollider("circle",20,20,100);
arrowGroup.add(arrow);
 
}

function pumpkinBalloon(){
  if(frameCount%250===0){
  bluey = createSprite(displayWidth,Math.round(random(20,displayHeight)),10,10);
  bluey.addImage(blueImg);
  bluey.velocityX=-4;
  bluey.lifetime=250;
  bluey.scale=0.3;
  blueGroup.add(bluey)
  }
  
}