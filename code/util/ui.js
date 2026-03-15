class UI
{
    static displayHealthBar(gameInstance)
    {
        push();

        // Draw the background of the health bar
		stroke(0);
		strokeWeight(4);
		fill(0, 0, 0);
		rect(16, 64, 256, 32, 8);

        // Calculate the color of the health bar based on the player's current health
        let healthPercentage = gameInstance.health / gameInstance.maxHealth;
        let r = constrain((1 - healthPercentage) * 510, 0, 255)
        let g = healthPercentage < 0.5 ? constrain(healthPercentage * 510, 0, 255) : 255;

        // Draw the health bar
		fill(r, g, 0);
		rect(16, 64, 256 * constrain(gameInstance.health / gameInstance.maxHealth, 0, 1), 32, 8);

        // Check if the player's health exceeds the maximum health
		if (gameInstance.health > gameInstance.maxHealth)
		{
            // Draw the excess health bar in blue
			fill(0, 0, 255);
			rect(16 + 256, 64, 256 * (gameInstance.health - gameInstance.maxHealth) / gameInstance.maxHealth, 32, 8);
		}

		pop();
    }

    static displayScore(gameInstance)
    {
        push();

        // Draw the score text
		noStroke();
		fill(0);
		textSize(32);
		textAlign(LEFT, TOP);
		textFont("Times")
		text(`Score: ${gameInstance.score}`, 16, 16);

		pop();
    }

    static displayPowerup(gameInstance)
    {
        // Check if there is an active powerup
        if (gameInstance.powerupManager.activePowerup)
        {
            push();
            
            // Draw the powerup icon based on the active powerup type
            if (gameInstance.powerupManager.activePowerup === "health")
            {
                image(healthPowerupImg, width - 80, 16);
            }
            else if (gameInstance.powerupManager.activePowerup === "speed")
            {
                image(speedPowerupImg, width - 80, 16);
            }
            else if (gameInstance.powerupManager.activePowerup === "score")
            {
                image(scorePowerupImg, width - 80, 16);
            }
            else if (gameInstance.powerupManager.activePowerup === "invincibility")
            {
                image(invincibilityPowerupImg, width - 80, 16);
            }

            pop();
        }
    }
}