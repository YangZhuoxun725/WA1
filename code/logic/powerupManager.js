class PowerupManager
{
    constructor()
    {
        this.powerups = [];
        this.spawnCooldown = 15000;
        this.lastSpawnTime = 0;
        this.activePowerup = null;
    }    

    update()
    {
        for (let powerup of this.powerups)
        {
            powerup.update();
        }

        this.spawnPowerups();
    }

    display()
    {
        for (let powerup of this.powerups)
        {
            powerup.display();
        }
    }

    spawnPowerups()
    {
        if (millis() - this.lastSpawnTime > this.spawnCooldown)
        {
            let x = random(groundImg.width * 2, width - crateImg.width);
            let y = -crateImg.height;
            this.powerups.push(new Powerup(x, y));
            this.lastSpawnTime = millis();
        }
    }

    killPowerups(ball)
    {
		for (let powerup of this.powerups)
		{
			ball.killPowerup(powerup);
		}
    }
}