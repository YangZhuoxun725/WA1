class CrateManager
{
    constructor()
    {
        // Intialize crates
        this.crates = [];

        // Spawn cooldown
        this.spawnCooldown = 2000;
        this.lastSpawnTime = 0;

        // Powerup states
        this.invincible = false;
        this.speedChange = 1;
        this.scoreIncrease = 1;
    }

    update()
    {
        // Loop through the crates
        for (let crate of this.crates)
        {
            // Update crate
            crate.update();

            // Apply powerup effects
            crate.speedChange = this.speedChange;
            if (this.invincible)
            {
                crate.invincible = true;
            }
            else
            {
                crate.invincible = false;
            }
        }

        // Update ball score increase
        for (let ball of game.balls)
        {
            ball.scoreIncrease = this.scoreIncrease;
        }

        // Spawn crates
        this.spawnCrates();
    }

    display()
    {
        // Loop through the crates
        for (let crate of this.crates)
        {
            // Display crate
            crate.display();
        }
    }

    spawnCrates()
    {
        // Check if cooldown is over
        if (millis() - this.lastSpawnTime > this.spawnCooldown)
        {
            // Spawn a new crate at a random x position above the screen
            let x = random(groundImg.width * 4, width - crateImg.width);
            let y = -crateImg.height;
            this.crates.push(new Crate(x, y));

            // Reset cooldown
            this.lastSpawnTime = millis();
        }
    }

    killCrates(ball)
    {
        // Loop through the crates
		for (let crate of this.crates)
		{
            // Check if the ball collides with the crate
			ball.killCrate(crate);
		}
    }

    startSpeedChange(duration, value)
    {
        // Set active powerup
        game.powerupManager.activePowerup = "speed";

        // Apply speed change
        this.speedChange = value;

        // Reset speed change after duration
        setTimeout(() => {
            this.speedChange = 1;
            game.powerupManager.activePowerup = null;
        }, duration);
    }

    startInvincibility(duration, value)
    {
        // Set active powerup
        game.powerupManager.activePowerup = "invincibility";

        // Apply invincibility
        this.invincible = value;

        // Reset invincibility after duration
        setTimeout(() => {
            this.invincible = !value;
            game.powerupManager.activePowerup = null;
        }, duration);
    }

    startScoreIncrease(duration, value)
    {
        // Set active powerup
        game.powerupManager.activePowerup = "score";

        // Apply score increase
        this.scoreIncrease += value;

        // Reset score increase after duration
        setTimeout(() => {
            this.scoreIncrease -= value;
            game.powerupManager.activePowerup = null;
        }, duration);
    }
}