class Game
{
	constructor()
	{
		// Settings
		this.settings = new Settings();

		// Game State
		this.firstPlay = true;
		this.cannon = new Cannon(groundImg.width, height - groundImg.height - cannonBaseImg.height);
		this.balls = [];
		this.word = new Word(this.settings.difficulty);
		this.crateManager = new CrateManager();
		this.powerupManager = new PowerupManager();
		this.particleManager = new ParticleManager();

		// Player State
		this.score = 0;
		this.highScore = this.score;
		this.health = 50;
		this.maxHealth = this.health;

		// UI State
		this.gameOver = false;
		this.titleScreen = true;
		this.pauseScreen = false;
		this.instructionsScreen = false;

		// Input State
		this.typing = true;

		// Start Button
		this.startButton = createButton("Start Game");
		this.startButton.parent(select("main"));
		this.startButton.addClass("menu-button");

		this.startButton.mousePressed(() => {
			if (this.firstPlay)
			{
				this.instructionsScreen = true;
				this.firstPlay = false;
			}

			this.titleScreen = false;
			this.gameOver = false;

			this.startButton.hide();
			this.difficultyContainer.hide();
		});

		// Restart Button
		this.restartButton = createButton("Back to Title Screen");
		this.restartButton.parent(select("main"));
		this.restartButton.addClass("menu-button");

		this.restartButton.mousePressed(() => {
			this.titleScreen = true;
			this.gameOver = false;

			this.restartButton.hide();
			this.startButton.show();
			this.difficultyContainer.show();

			this.resetGame();
		});

		// Difficulty Buttons
		this.difficultyButtons = [];

		this.difficultyContainer = createDiv();
		this.difficultyContainer.id("difficulty-group");
		this.difficultyContainer.parent(select("main"));

		Object.keys(availableWords).forEach((name) => {
			let button = createButton(name.toUpperCase());

			button.parent(this.difficultyContainer);
			button.addClass("difficulty-button");

			button.mousePressed(() => {
				this.difficultyButtons.forEach((btn) => btn.removeClass("active"));

				button.addClass("active");

				this.settings.difficulty = name;
				this.word.updateDifficulty(name);
			});

			this.difficultyButtons.push(button);
		});

		this.difficultyButtons[0].addClass("active");
		this.difficultyContainer.addClass("visible");
		this.settings.difficulty = "Easy";
		this.difficultyContainer.show();

		// Settings Panel
		this.uiContainer = createDiv();
		this.uiContainer.addClass("settings-panel");
		this.uiContainer.parent(select("main"));
		this.uiContainer.position(width / 2, height / 2);

		// Settings Checkboxes
		this.showScoreBox = createCheckbox(" Show Score", this.settings.showScore);
		this.showHealthBarBox = createCheckbox(" Show Health Bar", this.settings.showHealthBar);
		this.showPowerupEffectsBox = createCheckbox(" Show Powerup Effects", this.settings.showPowerupEffects);
		this.arrowKeysControlBox = createCheckbox(" Arrow Keys Control", this.settings.arrowKeysControl);

		this.showScoreBox.addClass("settings-option");
		this.showHealthBarBox.addClass("settings-option");
		this.showPowerupEffectsBox.addClass("settings-option");
		this.arrowKeysControlBox.addClass("settings-option");

		this.showScoreBox.parent(this.uiContainer);
		this.showHealthBarBox.parent(this.uiContainer);
		this.showPowerupEffectsBox.parent(this.uiContainer);
		this.arrowKeysControlBox.parent(this.uiContainer);

		this.showScoreBox.changed(() => {
			this.settings.showScore = this.showScoreBox.checked();
		});
		this.showHealthBarBox.changed(() => {
			this.settings.showHealthBar = this.showHealthBarBox.checked();
		});
		this.showPowerupEffectsBox.changed(() => {
			this.settings.showPowerupEffects = this.showPowerupEffectsBox.checked();
		});
		this.arrowKeysControlBox.changed(() => {
			this.settings.arrowKeysControl = this.arrowKeysControlBox.checked();
		});

		// Initial Visibility
		this.restartButton.hide();
		this.uiContainer.hide();

		// Music
		musicSound.setVolume(0.2);
		musicSound.loop();
	}
	
	update()
	{
		if (this.titleScreen)
		{

		}
		else if (this.gameOver)
		{
			this.restartButton.show();
			this.startButton.hide();
		}
		else if (this.pauseScreen)
		{
			if (keyIsPressed && (key === "Escape" || key === "Esc") && !this.typing)
			{
				this.typing = true;
				this.pauseScreen = false;

				this.uiContainer.hide();

				musicSound.play();
			}
			else if (!keyIsPressed)
			{
				this.typing = false;
			}
		}
		else if (this.instructionsScreen)
		{
			if ((keyIsPressed || mouseIsPressed) && !this.typing)
			{
				this.typing = true;
				this.instructionsScreen = false;
			}
			else if (!keyIsPressed && !mouseIsPressed)
			{
				this.typing = false;
			}
		}
		else
		{
			this.updateGame();

			if (keyIsPressed && (key === "Escape" || key === "Esc") && !this.typing)
			{
				this.typing = true;
				this.pauseScreen = true;

				this.uiContainer.show();

				musicSound.pause();
			}
			else if (!keyIsPressed)
			{
				this.typing = false;
			}
		}
	}
	
	display()
	{
		this.displayBackground();

		if (this.titleScreen)
		{
			this.displayTitleScreen();
		}
		else if (this.gameOver)
		{
			this.displayGameOverScreen();
		}
		else if (this.pauseScreen)
		{
			this.displayGame();
			this.displayPauseScreen();
		}
		else if (this.instructionsScreen)
		{
			this.displayInstructionsScreen();
		}
		else
		{
		 	this.displayGame();
		}
	}

	updateGame()
	{
		this.word.update();

		for (let ball of this.balls)
		{
			ball.update();
			ball.update();
		}

		this.crateManager.update();
		this.crateManager.update();
		
		for (let ball of this.balls)
		{
			this.crateManager.killCrates(ball);
		}

		for (let ball of this.balls)
		{
			this.powerupManager.killPowerups(ball);
		}		

		this.powerupManager.update();

		this.particleManager.update();

		this.cannon.update();

		if (this.health <= 0)
		{
			this.gameOver = true;
			if (this.score > this.highScore)
			{
				this.highScore = this.score;
			}
		}
	}

	displayTitleScreen()
	{
		push();

		textAlign(CENTER, CENTER);
		textFont("Times New Roman");
		textSize(96);
		fill(0);
		text("Crate Blaster", width / 2, height / 3);

		pop();
	}

	displayGameOverScreen()
	{
		push();

		textAlign(CENTER, CENTER);
		textFont("Times New Roman");
		textSize(64);
		fill(0);
		text("Game Over", width / 2, height / 4);

		textSize(24);
		text(`Score: ${this.score}`, width / 2, height / 3);
		text(`High Score: ${this.highScore}`, width / 2, height / 3 + 40);

		pop();
	}

	displayPauseScreen()
	{
		push();

		noStroke();
		fill(255, 255, 255, 200);
		rect(0, 0, width, height);
		textAlign(CENTER, CENTER);
		textFont("Times New Roman");
		textSize(64);
		fill(0);
		text("Paused", width / 2, height / 3);

		pop();
	}

	displayInstructionsScreen()
	{
		push();

		textAlign(CENTER, CENTER);
		textFont("Times New Roman");
		textSize(32);
		fill(0);
		text(
			`
			Use the mouse or arrow keys to aim and click to shoot
			Spell the word and press SPACE/ENTER or click to fire the cannon
			The faster and the more accurately you shoot, the more powerful your shots will be
			Don't let the crates reach the ground
			Collect powerups for special effects
			Heart powerups give you extra health
			Blue powerups make crates fall slower for 5 seconds
			Lightning powerups make crates give more points for 5 seconds
			Shield powerups make you invincible for 5 seconds
			Press ESC to pause the game
			`, 
			width / 2, height / 3
		);
		if (millis() % 1000 < 500)
		{
			text("PRESS ANY KEY TO BEGIN", width / 2, height * 2 / 3);
		}

		pop();
	}

	displayGame()
	{
		this.word.display();

		for (let ball of this.balls)
		{
			ball.display();
		}

		this.crateManager.display();

		this.powerupManager.display();

		this.particleManager.display();

		this.cannon.display();

		if (this.settings.showScore) { UI.displayScore(this); }
		if (this.settings.showHealthBar) { UI.displayHealthBar(this); }
		if (this.settings.showPowerupEffects) { UI.displayPowerup(this); }
	}

	displayBackground()
	{
		image(backgroundImg, 0, 0, width, height);
		
		for (let i = 0; i < width; i += groundImg.width)
		{
			image(groundImg, i, height - groundImg.height);
		}
	}

	resetGame()
	{
		this.cannon = new Cannon(groundImg.width, height - groundImg.height - cannonBaseImg.height);
		this.balls = [];
		this.word = new Word(this.settings.difficulty);
		this.crateManager = new CrateManager();
		this.powerupManager = new PowerupManager();
		this.particleManager = new ParticleManager();

		this.score = 0;
		this.health = this.maxHealth;
	}
}

function createToggle(label, checked, container)
{
	let wrapper = createDiv();
	wrapper.addClass("toggle");

	let checkbox = createCheckbox("", checked);

	let slider = createDiv();
	slider.addClass("slider");

	let text = createSpan(label);

	checkbox.parent(wrapper);
	slider.parent(wrapper);
	text.parent(wrapper);

	wrapper.parent(container);

	return checkbox;
}