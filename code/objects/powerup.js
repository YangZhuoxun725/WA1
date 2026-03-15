class Powerup
{
    constructor(x, y)
    {
        // Initialize position and gravity
        this.pos = createVector(x, y);
        this.gravity = createVector(0, random(1, 2));

        // Randomly assign a type to the powerup
        let types = ["health", "speed", "score", "invincibility"];
        this.type = random(types);
    }

    update()
    {
        // Apply gravity to the powerup's position
        this.pos.add(this.gravity);

        // Check collision with the floor
        this.killFloor();
    }

    display()
    {
        push();

        translate(this.pos.x, this.pos.y);
        // Display image based on type
        if (this.type === "health")
        {
            // Make the powerup pulse in size using a sine wave
            let newSize = healthPowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                healthPowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "speed")
        {
            // Make the powerup pulse in size using a sine wave
            let newSize = speedPowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                speedPowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "score")
        {
            // Make the powerup pulse in size using a sine wave
            let newSize = scorePowerupImg.width * map(Math.sin(millis() / 100), -1, 1, 0.9, 1.1);
            image(
                scorePowerupImg, 
                -newSize / 2, -newSize / 2,
                newSize, newSize
            );
        }
        else if (this.type === "invincibility")
        {
            // Make the powerup pulse in size using a sine wave
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
        // Check if powerup has collided with the floor
        if (this.pos.y > height - groundImg.height - healthPowerupImg.height / 2)
        {
            // Kill powerup
            this.kill();
        }
    }
    
    kill()
    {
        // Kill powerup
        let index = game.powerupManager.powerups.indexOf(this);
        if (index !== -1)
        {
            game.powerupManager.powerups.splice(index, 1);
        }
    }
}