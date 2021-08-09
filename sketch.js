const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1, base2, base3;
var bridge;
var jointPoint,jointLink;
var stones = [];
var axe;
var wood;
var zombie,zombie1,zombie2,zombie3,zombie4;
var breakButton;

function preload() {
  bg = loadImage("./assets/background.png");
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
     
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base1 = new Base(width/2, height - 40, width, 20);
  base2 = new Base(width-50,height/2,100,75);
  base3 = new Base(50,height/2,100,75);
  jointPoint = new Base(width-110,height/2-50);

  bridge = new Bridge(14,{x:50,y:height/2-70});
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  breakButton = createImg("./assets/axe.png");
  breakButton.position(width-60,height/2+30);
  breakButton.size(50,50);
  breakButton.mouseClicked(drop);

  zombie = createSprite(width/4,height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.velocityX = 4;
  zombie.scale = 0.07;

  
  for(var i=0; i<8; i++) {
    var x = random(width/2-200,width/2+300);
    var y = random(-10,140);
    var stone = new Stone(x,y,30);
    stones.push(stone);
  }

}

function draw() {
  background(112,217,255);
  image(bg, 0, 0, width, height);

  Engine.update(engine);

  for(var i=0;i<stones.length;i++) {
      stones[i].display();
  }

  base1.display();
  base2.display();
  base3.display();

  bridge.show();

  drawSprites();
}

function drop() {
  bridge.break();
  jointLink.detach();
  jointLink = null;
}
