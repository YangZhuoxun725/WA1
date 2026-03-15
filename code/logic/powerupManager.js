class PowerupManager
{
    constructor()
    {
        // Initialize powerups
        this.powerups = [];

        // Spawn cooldown
        this.spawnCooldown = 15000;
        this.lastSpawnTime = 0;

        // Active powerup
        this.activePowerup = null;
    }    

    update()
    {
        // Loop through powerups
        for (let powerup of this.powerups)
        {
            // Update powerup
            powerup.update();
        }

        // Spawn new powerups
        this.spawnPowerups();
    }

    display()
    {
        // Loop through powerups
        for (let powerup of this.powerups)
        {
            // Display powerup
            powerup.display();
        }
    }

    spawnPowerups()
    {
        // Check if it's time to spawn a new powerup
        if (millis() - this.lastSpawnTime > this.spawnCooldown)
        {
            // Spawn a new powerup at a random position above the screen
            let x = random(groundImg.width * 2, width - crateImg.width);
            let y = -crateImg.height;
            this.powerups.push(new Powerup(x, y));

            // Reset spawn timer
            this.lastSpawnTime = millis();
        }
    }

    killPowerups(ball)
    {
        // Loop through powerups
		for (let powerup of this.powerups)
		{
            // Check if the ball collides with the powerup
			ball.killPowerup(powerup);
		}
    }
}