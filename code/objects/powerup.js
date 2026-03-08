class Powerup
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.gravity = createVector(0, 0.01);
        this.friction = 0.99;

        let types = ["health", "speed", "score", "invincibility"];
        this.type = random(types);
    }

    update()
    {
        this.vel.add(this.gravity);
        this.vel.mult(this.friction);

        this.pos.add(this.vel);

        this.killFloor();
    }

    display()
    {
        if (this.type === "health")
        {
            image(healthPowerupImg, this.pos.x - healthPowerupImg.width / 2, this.pos.y - healthPowerupImg.height / 2);
        }
        else if (this.type === "speed")
        {
            image(speedPowerupImg, this.pos.x - speedPowerupImg.width / 2, this.pos.y - speedPowerupImg.height / 2);
        }
        else if (this.type === "score")
        {
            image(scorePowerupImg, this.pos.x - scorePowerupImg.width / 2, this.pos.y - scorePowerupImg.height / 2);
        }
        else if (this.type === "invincibility")
        {
            image(invincibilityPowerupImg, this.pos.x - invincibilityPowerupImg.width / 2, this.pos.y - invincibilityPowerupImg.height / 2);
        }
    }

    killFloor()
    {
        if (this.pos.y > height - groundImg.height - healthPowerupImg.height / 2)
        {
            this.kill();
        }
    }
    
    kill()
    {
        let index = game.powerupManager.powerups.indexOf(this);
        if (index !== -1)
        {
            game.powerupManager.powerups.splice(index, 1);
        }
    }
}