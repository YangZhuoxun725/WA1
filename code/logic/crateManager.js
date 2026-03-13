class CrateManager
{
    constructor()
    {
        this.crates = [];
        this.spawnCooldown = 2000;
        this.lastSpawnTime = 0;

        this.invincible = false;
        this.speedChange = 1;
        this.scoreIncrease = 1;
    }

    update()
    {
        for (let crate of this.crates)
        {
            crate.update();

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

        for (let ball of game.balls)
        {
            ball.scoreIncrease = this.scoreIncrease;
        }

        this.spawnCrates();
    }

    display()
    {
        for (let crate of this.crates)
        {
            crate.display();
        }
    }

    spawnCrates()
    {
        if (millis() - this.lastSpawnTime > this.spawnCooldown)
        {
            let x = random(groundImg.width * 2, width - crateImg.width);
            let y = -crateImg.height;
            this.crates.push(new Crate(x, y));
            this.lastSpawnTime = millis();
        }
    }

    killCrates(ball)
    {
		for (let crate of this.crates)
		{
			ball.killCrate(crate);
		}
    }

    startSpeedChange(duration, value)
    {
        game.powerupManager.activePowerup = "speed";
        this.speedChange = value;
        setTimeout(() => {
            this.speedChange = 1;
            game.powerupManager.activePowerup = null;
        }, duration);
    }

    startInvincibility(duration, value)
    {
        game.powerupManager.activePowerup = "invincibility";
        this.invincible = value;
        setTimeout(() => {
            this.invincible = !value;
            game.powerupManager.activePowerup = null;
        }, duration);
    }

    startScoreIncrease(duration, value)
    {
        game.powerupManager.activePowerup = "score";
        this.scoreIncrease += value;
        setTimeout(() => {
            this.scoreIncrease -= value;
            game.powerupManager.activePowerup = null;
        }, duration);
    }
}