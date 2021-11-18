var ninja , ninjaRunning , ninjaAttack1 , ninjaAttack2 ;
var bg ,bgImg ;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var enemy3 , enemy1 , enemy2;
var enemy1Img , enemy2Img , enemy3Img;
var enemy1Group , enemy2Group , enemy3Group,enemy4Group,enemy4Img ;

var gameOverImg,restartImg;
var score
var invisibleGround


function preload(){
ninjaRunning= loadImage("Attack.jpg")
ninjaCollided=loadImage("Attack2.jpg")

enemy1Img=loadImage("enemy1.jpg")
enemy2Img=loadImage("enemy2.jpg")

enemy3Img=loadImage("enemy3.jpg")
enemy4Img=loadImage("enemy4.jpg")

gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
groundImg=loadImage("ground.webp")
checkPointSound=loadSound("checkPoint.mp3")
dieSound=loadSound("die.mp3")
jumpSound=loadSound("jump.mp3")



}

function setup() {
  createCanvas(1250,610);
  ninja = createSprite(150, 400, 50, 50);
  ninja.scale = 0.2
ninja.addImage("running",ninjaRunning)
 // bg = createSprite(625,305,1250,610)
 // bg.addImage("bg",bgImg)

//ground=createSprite(0,0,1250,610)
//ground.addImage(groundImg)
//ground.scale=3
  //ninja.addImage("ninjaAttact1",ninjaAttack1);
  invisibleGround=createSprite(0,610,400,10)
  gameOver=createSprite(200,200)
  gameOver.addImage(gameOverImg)

  restart=createSprite(200,400)
  restart.addImage(restartImg)
   score=0;

   enemy1Group = new Group();
   enemy2Group = new Group();
   enemy3Group = new Group();
   enemy4Group = new Group()
}

function draw() {
  background(groundImg);  

  // condition
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
   
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
   
    //jump when the space key is pressed
    if(keyDown("space")&& ninja.y >= 100) {
        ninja.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    ninja.velocityY = ninja.velocityY + 0.8
  
    Spenemy1();
  Spenemy2();
  Spenemy3();
  Spenemy4();
    
  if(enemy1Group){
    if(enemy1Group.isTouching(ninja)){
        //ninja.velocityY = -12;
       // jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the ninja animation
      ninja.changeAnimation("collided", ninjaCollided);
    
     
        ninja.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    enemy1Group.setLifetimeEach(-1);
    enemy2Group.setLifetimeEach(-1)
    enemy3Group.setLifetimeEach(-1)

     
     enemy1Group.setVelocityXEach(0);
     enemy2Group.setVelocityXEach(0);
     enemy3Group.setVelocityXEach(0);

   }
  }

  ninja.collide(invisibleGround)

  
  drawSprites();
}

function Spenemy1(){

if (frameCount%200 === 0){
 enemy1 = createSprite(1200,300,80,80)
enemy1.scale=0.3
  enemy1.addImage(enemy1Img)
  enemy1.velocityX = -5;
  enemy1.lifetime = 300
  enemy1Group.add(enemy1)
}

}

function Spenemy2(){

  if (frameCount%300 === 0){
   var enemy2 = createSprite(1100,300,80,80)

  enemy2.scale=0.5

   enemy2.addImage(enemy2Img)
    enemy2.visible = false
    enemy2.velocityX = -5;
    enemy2.lifetime = 300
    enemy2Group.add(enemy2)
  }
  
  }

function Spenemy3(){

  if (frameCount%60 === 0){
   var enemy3 = createSprite(1100,100,80,80)
   enemy3.scale=0.2
    enemy3.addImage(enemy3Img)
    enemy3.velocityX = -5;
    enemy3.lifetime = 300
    enemy3Group.add(enemy3)
  }
  
  }

  function Spenemy4(){

    if (frameCount%100 === 0){
     var enemy4 = createSprite(1200,450,80,80)
     enemy4.scale=0.3
      enemy4.addImage(enemy4Img)
      enemy4.velocityX = -5;
      enemy4.lifetime = 300
      enemy4Group.add(enemy4)
    }
    
    }

  