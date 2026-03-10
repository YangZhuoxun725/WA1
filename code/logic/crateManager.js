class CrateManager
{
    constructor()
    {
        this.crates = [];
        this.spawnCooldown = 2000;
        this.lastSpawnTime = 0;
    }

    update()
    {
        for (let crate of this.crates)
        {
            crate.update();
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

    setSpeedChange(value)
    {
        for (let crate of this.crates)
        {
            crate.speedChange = value;
        }
    }

    setInvincibility(value)
    {
        for (let crate of this.crates)
        {
            crate.invincible = value;
        }
    }
}