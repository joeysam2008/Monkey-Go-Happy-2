var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodsGroup, obstaclesGroup;
var ground, score;
var survivalTime=0;
var PLAY =1;
var END =0;
var gameState = PLAY;
var  bananaImage, obstacleImage, obstacleGroup;
var backgroundImage, gameOver, gameOverImage, gameOverSound;
var score = 0

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
backgroundImage = loadImage("Forest Image 2.webp");
 gameOverImage = loadAnimation("GameOverImage2.png");
  gameOverSound = loadSound("game-over-sound-effect.mp3");
 
}


function setup() {
  createCanvas(600,400);
  
  background1 = createSprite(350,210);
  background1.addImage(backgroundImage);
  background1.scale = 1.8
  background1.velocityX=-3
  background1.x = background1.width /2;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4
  ground.x = ground.width /2;
  ground.visible = false;
  
  gameOverImage = createSprite(300,250,5,5);
gameOverImage.addAnimation("GameOverImage2.png");
  gameOverImage.scale = 2;
  
  
  obstaclesGroup = createGroup();
  foodsGroup = createGroup();
  
}


function draw() {
   background("white");
  
   if(gameState===PLAY){
     
     //moving background
     if(background1.x<200){
     background1.x = 400;
     }
     
     //moving ground
     if (ground.x < 0){
      ground.x = ground.width/2;
      }
     
     //making monkey jump
     if(keyDown("space")){
      monkey.velocityY= -12; 
      }
     
     //adding gravity
     monkey.velocityY = monkey.velocityY + 0.8;
     monkey.collide(ground)
     
     //survival time
     var survivalTime=0;
     stroke("black")
     textSize(20);
     fill("black");
     survivalTime=   Math.ceil(frameCount/frameRate());
     text("Survival Time:"+survivalTime,100,50);
     survivalTime.visible = false;
     
    if(foodsGroup.isTouching(monkey))
    {
      foodsGroup.destroyEach();
      score = score + 2
      
      score = Math.round(random(10,40));
      switch(score) 
      {
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.15;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
      }
    } 
     
     food();
     obstacles();
     
     if(obstaclesGroup.isTouching(monkey)){
     monkey.scale=0.2;
     gameState=END;
     
     }
      gameOverImage.visible = false;
      }
  
  if(gameState===END){
    background1.velocityX=0; 
    background1.visible=false;
     monkey.destroy();
     foodsGroup.destroyEach();
     obstaclesGroup.destroyEach();
  //   gameOver.visible = true;
     gameOverSound.play();
     background("lightblue") 
     stroke("black")
     textSize(50);
     fill("black");
     text("Game Over!",200,200);
  
     }
  
  
  drawSprites();
  
  //show score
     stroke("white")
     textSize(20);
     fill("white");
     text("Score:"+score,450,50);
     
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(500,120,30,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-8;
    banana.lifetime = 300;
    foodsGroup.add(banana);

  }

}


function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,20,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
   
   obstaclesGroup.add(obstacle);
 }
}
