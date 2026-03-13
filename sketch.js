let game;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
  
    game = new Game();
}

function draw() 
{
    background(0);
  
    game.update();
    game.display();
}