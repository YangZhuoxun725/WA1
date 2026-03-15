let backgroundImg, ballImg, cannonHeadImg, cannonBaseImg, crateImg, groundImg, healthPowerupImg, speedPowerupImg, scorePowerupImg, invincibilityPowerupImg
let questionButtonImg;
let musicSound, cannonFireSound, crateFloorBreakSound, crateBallBreakSound, powerupHitSound;

function preload()
{
    // Images
    backgroundImg = loadImage("assets/textures/background.png");
    ballImg = loadImage("assets/textures/ball.png");
    cannonHeadImg = loadImage("assets/textures/cannon.png");
    cannonBaseImg = loadImage("assets/textures/cannon2.png");
    crateImg = loadImage("assets/textures/crate.png");
    groundImg = loadImage("assets/textures/ground.png");
    healthPowerupImg = loadImage("assets/textures/health_powerup.png");
    speedPowerupImg = loadImage("assets/textures/speed_powerup.png");
    scorePowerupImg = loadImage("assets/textures/score_powerup.png");
    invincibilityPowerupImg = loadImage("assets/textures/invincibility_powerup.png");

    questionButtonImg = loadImage("assets/textures/question_button.png");

    // Sounds
    musicSound = loadSound("assets/sounds/music.mp3");
    cannonFireSound = loadSound("assets/sounds/cannon_fire.mp3");
    crateFloorBreakSound = loadSound("assets/sounds/crate_floor_break.mp3");
    crateBallBreakSound = loadSound("assets/sounds/crate_ball_break.mp3");
    powerupHitSound = loadSound("assets/sounds/powerup_hit.mp3");
}