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
        if (this.vel == createVector(0, 0))
        {
            this.kill();
        }

        this.pos.add(this.vel);

        this.bounceFloor();
        this.killOutofBounds();
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
        if (distance.mag() < ballImg.width / 2 + crateImg.width / 2 && crate.pos.y > 0)
        {
            if (this.vel.mag() > 0.5)
            {
                crate.kill();
                game.score += this.scoreIncrease;

                crateBallBreakSound.rate(2.0);
                crateBallBreakSound.play();
            }
            else
            {
                this.kill();
                
                this.particleEffect();
            }
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
                game.crateManager.startSpeedChange(5000, 0.5, this);
            }
            else if (powerup.type === "score")
            {
                game.crateManager.startScoreIncrease(5000, 1, this);
            }
            else if (powerup.type === "invincibility")
            {
                game.crateManager.startInvincibility(5000, this);
            }

            powerupHitSound.rate(2.0);
            powerupHitSound.play();
        }
    }

    killAfterTime()
    {
        setTimeout(() => {
            this.kill();
        }, 5000);
    }

    killOutofBounds()
    {
        if (this.pos.x < -ballImg.width || 
            this.pos.x > width + ballImg.width || 
            this.pos.y < -ballImg.height ||
            this.pos.y > height + ballImg.height)
        {
            this.kill();
        }
    }

    kill()
    {
        let index = game.balls.indexOf(this);
        if (index !== -1)
        {
            game.balls.splice(index, 1);
        }
    }

    particleEffect()
    {
        for (let i = 0; i < 10; i++)
        {
            let particle = new Particle(this.pos.x, this.pos.y, random(10, 16), [50, 50, 50]);
            game.particleManager.particles.push(particle);
        }
    }
}