var bananaImage,obstacleImage,obstacleGroup,backImage,score;
var player_running,backpic, invisibleGround;

function preload() {
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backpic=loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  backImage = createSprite(200,200);
  backImage.addImage("background" ,backpic);
  backImage.velocityX = -6;
  
  invisibleGround = createSprite(200,395,400,10);
  invisibleGround.visible = false;
  
  player = createSprite(100,360,50,50);
  player.addAnimation("Monkey",player_running);
  player.scale = 0.1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}

function draw() {
  background(220);
  
  if (keyDown("space")){
    player.velocityY = -12;
  }
  
  player.velocityY = player.velocityY+0.8;
  
  if(backImage.x < 0) {
    backImage.x = backImage.width/2;
  }
  
  if(bananaGroup.isTouching(player)) {
   score = score+2;
    bananaGroup.destroyEach();
    switch(score){
      case 10: player.scale = 0.12;
        break;
      case 20: player.scale = 0.14;
        break;
      case 30: player.scale = 0.16;
        break;
      case 40: player.scale = 0.18;
        break;
      default: break;
    }
  }
  
  if(obstacleGroup.isTouching(player)) {
    player.scale = 0.1;
  }
  
  player.collide(invisibleGround);
  
  food();
  spawnobstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,300,50);
}

function food() {
  if (frameCount % 80===0){
    var banana = createSprite(400,400,10,10);
    banana.y = random(140,220);
    banana.velocityX = -4;
    banana.addAnimation("Banana",bananaImage);
    banana.scale = 0.05;
    
    banana.lifetime = 100;
    
    bananaGroup.add(banana);
  }
}

function spawnobstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,350,10,40);
    obstacle.addAnimation("Stone",obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
}
}