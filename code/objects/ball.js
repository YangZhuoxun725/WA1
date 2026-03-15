class Ball
{
    constructor(x, y, angle, power)
    {
        // Initialize position, velocity, gravity, and friction
        this.pos = createVector(x, y);
        this.vel = p5.Vector.fromAngle(angle).mult(power);
        this.gravity = createVector(0, 0.1);
        this.friction = 0.99;

        // Score increase for killing crates
        this.scoreIncrease = 1;

        // Start the timer to kill the ball after a certain time
        this.killAfterTime();
    }

    update()
    {
        // Apply gravity and friction to velocity
        this.vel.add(this.gravity);
        this.vel.mult(this.friction);

        // Set velocity to zero if it's very small to prevent endless sliding
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

        // Update position based on velocity
        this.pos.add(this.vel);

        // Check for collisions with the floor and kill if out of bounds
        this.bounceFloor();
        this.killOutofBounds();
    }

    display()
    {
        push();

        // Draw the ball image centered on its position
        translate(this.pos.x, this.pos.y);
        image(ballImg, -ballImg.width / 2, -ballImg.height / 2);

        pop();
    }

    bounceFloor()
    {
        // Check if the ball is below the floor level and bounce it back up
        if (this.pos.y > height - groundImg.height - ballImg.height / 2)
        {
            this.pos.y = height - groundImg.height - ballImg.height / 2;
            this.vel.y *= -0.5;
        }
    }

    killCrate(crate)
    {
        // Calculate distance between the ball and the crate
        let distance = p5.Vector.sub(this.pos, crate.pos);

        // Check for collision
        if (distance.mag() < ballImg.width / 2 + crateImg.width / 2 && crate.pos.y > 0)
        {
            if (this.vel.mag() > 0.5)
            {
                // Kill the crate and increase the score
                crate.kill();

                // Increase score
                game.score += this.scoreIncrease;

                // Play crate ball break sound effect
                crateBallBreakSound.setVolume(game.settings.sfxVolume);
                crateBallBreakSound.rate(2.0);
                crateBallBreakSound.play();
            }
            else
            {
                // Kill the ball if its too slow
                this.kill();

                // Create particle effect on ball death
                this.particleEffect();
            }
        }
    }

    killPowerup(powerup)
    {
        // Calculate distance between the ball and the powerup
        let distance = p5.Vector.sub(this.pos, powerup.pos);

        // Check for collision
        if (distance.mag() < ballImg.width / 2 + healthPowerupImg.width / 2)
        {
            // Kill powerup
            powerup.kill();

            // Apply powerup effect based on type
            if (powerup.type === "health")
            {
                game.health += 5;
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

            // Play powerup hit sound effect
            powerupHitSound.setVolume(game.settings.sfxVolume);
            powerupHitSound.rate(2.0);
            powerupHitSound.play();
        }
    }

    killAfterTime()
    {
        // Kill the ball after a certain time to prevent too many balls on screen
        setTimeout(() => {
            this.kill();
        }, 5000);
    }

    killOutofBounds()
    {
        // Kill the ball if it goes out of bounds
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
        // Kill the ball
        let index = game.balls.indexOf(this);
        if (index !== -1)
        {
            game.balls.splice(index, 1);
        }
    }

    particleEffect()
    {
        // Create  particles at the ball's position
        for (let i = 0; i < 10; i++)
        {
            let particle = new Particle(this.pos.x, this.pos.y, random(10, 16), [50, 50, 50]);
            game.particleManager.particles.push(particle);
        }
    }
}