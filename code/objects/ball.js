class Ball
{
    constructor(x, y, angle, power)
    {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.fromAngle(angle).mult(power);
        this.gravity = createVector(0, 0.1);
        this.friction = 0.99;

        this.scoreIncrease = 1;

        this.killAfterTime();
    }

    update()
    {
        this.vel.add(this.gravity);
        this.vel.mult(this.friction);

        if (Math.abs(this.vel.x) < 0.05)
        {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < 0.05)
        {
            this.vel.y = 0;
        }

        this.pos.add(this.vel);

        this.bounceFloor();
    }

    display()
    {
        push();
        translate(this.pos.x, this.pos.y);
        image(ballImg, -ballImg.width / 2, -ballImg.height / 2);
        pop();
    }

    bounceFloor()
    {
        if (this.pos.y > height - groundImg.height - ballImg.height / 2)
        {
            this.pos.y = height - groundImg.height - ballImg.height / 2;
            this.vel.y *= -0.5;
        }
    }

    killCrate(crate)
    {
        let distance = p5.Vector.sub(this.pos, crate.pos);
        if (distance.mag() < ballImg.width / 2 + crateImg.width / 2)
        {
            crate.kill();
            game.score += this.scoreIncrease;
        }
    }

    killPowerup(powerup)
    {
        let distance = p5.Vector.sub(this.pos, powerup.pos);
        if (distance.mag() < ballImg.width / 2 + healthPowerupImg.width / 2)
        {
            powerup.kill();

            if (powerup.type === "health")
            {
                game.health += 10;
            }
            else if (powerup.type === "speed")
            {
                game.powerupManager.activePowerup = "speed";
                game.crateManager.setSpeedChange(0.5);
                setTimeout(() => {
                    game.powerupManager.activePowerup = null;
                    game.crateManager.setSpeedChange(1);
                }, 5000);
            }
            else if (powerup.type === "score")
            {
                game.powerupManager.activePowerup = "score";
                this.scoreIncrease += 1;
                setTimeout(() => {
                    game.powerupManager.activePowerup = null;
                    this.scoreIncrease -= 1;
                }, 5000);
            }
            else if (powerup.type === "invincibility")
            {
                game.powerupManager.activePowerup = "invincibility";
                game.crateManager.setInvincibility(true);
                setTimeout(() => {
                    game.powerupManager.activePowerup = null;
                    game.crateManager.setInvincibility(false);
                }, 5000);
            }
        }
    }

    killAfterTime()
    {
        setTimeout(() => {
            let index = game.balls.indexOf(this);
            if (index !== -1)
            {
                game.balls.splice(index, 1);
            }
        }, 5000);
    }
}