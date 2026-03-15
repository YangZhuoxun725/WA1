class Crate
{
    constructor(x, y)
    {
        // Initialize position, velocity, gravity, and angle
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), 0);
        this.gravity = createVector(0, 0.01);
        this.angle = 0;

        // Speed change factor for gravity
        this.speedChange = 1;

        // Invincibility flag to prevent health loss on floor break
        this.invincible = false;
    }

    update()
    {
        // Apply gravity to velocity and update angle based on horizontal velocity
        this.vel.add(this.gravity.copy().mult(this.speedChange));
        this.angle += this.vel.x * 0.1;

        // Update position based on velocity
        this.pos.add(this.vel);

        // Handle wall bouncing and floor collision
        this.bounceWalls();
        this.killFloor();
    }

    display()
    {
        push();

        // Translate to the crate's position and rotate based on its angle
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.angle));
        image(crateImg, - crateImg.width / 2, - crateImg.height / 2);
        
        pop();
    }

    bounceWalls()
    {
        // Bounce off the left and right walls
        if (this.pos.x < crateImg.width / 2 || 
            this.pos.x > width - crateImg.width / 2)
        {
            this.vel.x *= -1;
        }
    }

    killFloor()
    {
        // Check if the crate has hit the floor
        if (this.pos.y > height - groundImg.height - crateImg.height / 2)
        {
            // Kill the crate
            this.kill();

            // Reduce health if not invincible
            if (!this.invincible)
            {
                game.health -= 1;
            }

            // Play crate floor break sound effect
            crateFloorBreakSound.setVolume(game.settings.sfxVolume);
            crateFloorBreakSound.rate(2.5);
            crateFloorBreakSound.play();
        }
    }
    
    kill()
    {
        // Kill the crate
        let index = game.crateManager.crates.indexOf(this);
        if (index !== -1)
        {
            game.crateManager.crates.splice(index, 1);

            // Apply particle effect on crate destruction
            this.particleEffect();
        }
    }

    particleEffect()
    {
        // Create particles at the crate's position
        for (let i = 0; i < 10; i++)
        {
            let particle = new Particle(this.pos.x, this.pos.y, random(10, 16), [200, 100, 50]);
            game.particleManager.particles.push(particle);
        }
    }
}