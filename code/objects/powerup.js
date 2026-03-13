class Powerup
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.gravity = createVector(0, random(1, 2));

        let types = ["health", "speed", "score", "invincibility"];
        this.type = random(types);
    }

    update()
    {
        this.pos.add(this.gravity);

        this.killFloor();
    }

    display()
    {
        push();

        translate(this.pos.x, this.pos.y);
        if (this.type === "health")
        {
            let newSize = healthPowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                healthPowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "speed")
        {
            let newSize = speedPowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                speedPowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "score")
        {
            let newSize = scorePowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                scorePowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "invincibility")
        {
            let newSize = invincibilityPowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                invincibilityPowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }

        pop();
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