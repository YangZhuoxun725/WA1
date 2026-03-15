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
		this.health = 25;
		this.maxHealth = this.health;

		// UI State
		this.gameOver = false;
		this.titleScreen = true;
		this.pauseScreen = false;
		this.instructionsScreen = false;

		// Input State
		this.typing = true;

		// Custom Buttons
		this.instructionsButton = new CustomButton(width - questionButtonImg.width / 2 - 16, questionButtonImg.height / 2 + 16, 64, 64, questionButtonImg, () => {
			if (this.titleScreen)
			{
				this.instructionsScreen = true;
			}
		});

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
		});

		// Restart Button
		this.restartButton = createButton("Back to Title Screen");
		this.restartButton.parent(select("main"));
		this.restartButton.addClass("menu-button");

		this.restartButton.mousePressed(() => {
			this.titleScreen = true;
			this.gameOver = false;

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
		this.settings.difficulty = "easy";
		this.difficultyContainer.show();

		// Settings Panel
		this.uiContainer = createDiv();
		this.uiContainer.addClass("settings-panel");
		this.uiContainer.parent(select("main"));
		this.uiContainer.position(width / 2, height / 3);

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

		// Settings Volume Sliders
		this.musicVolumeOption = createDiv();
		this.musicVolumeOption.addClass("settings-option");
		this.musicVolumeOption.addClass("settings-volume-option");
		this.musicVolumeOption.parent(this.uiContainer);

		this.musicHeader = createDiv();
		this.musicHeader.addClass("settings-volume-header");
		this.musicHeader.parent(this.musicVolumeOption);

		this.musicLabel = createSpan("Music Volume");
		this.musicLabel.parent(this.musicHeader);

		this.musicPercent = createSpan(Math.round(this.settings.musicVolume * 100) + "%");
		this.musicPercent.addClass("settings-volume-percent");
		this.musicPercent.parent(this.musicHeader);

		this.musicVolumeSlider = createSlider(0, 2, this.settings.musicVolume, 0.01);
		this.musicVolumeSlider.addClass("settings-volume-slider");
		this.musicVolumeSlider.parent(this.musicVolumeOption);

		this.sfxVolumeOption = createDiv();
		this.sfxVolumeOption.addClass("settings-option");
		this.sfxVolumeOption.addClass("settings-volume-option");
		this.sfxVolumeOption.parent(this.uiContainer);

		this.sfxHeader = createDiv();
		this.sfxHeader.addClass("settings-volume-header");
		this.sfxHeader.parent(this.sfxVolumeOption);

		this.sfxLabel = createSpan("SFX Volume");
		this.sfxLabel.parent(this.sfxHeader);

		this.sfxPercent = createSpan(Math.round(this.settings.sfxVolume * 100) + "%");
		this.sfxPercent.addClass("settings-volume-percent");
		this.sfxPercent.parent(this.sfxHeader);

		this.sfxVolumeSlider = createSlider(0, 2, this.settings.sfxVolume, 0.01);
		this.sfxVolumeSlider.addClass("settings-volume-slider");
		this.sfxVolumeSlider.parent(this.sfxVolumeOption);

		this.musicVolumeSlider.input(() => {
			this.settings.musicVolume = this.musicVolumeSlider.value();
			this.musicPercent.html(Math.round(this.settings.musicVolume * 100) + "%");
			musicSound.setVolume(0.2 * this.settings.musicVolume);
		});

		this.sfxVolumeSlider.input(() => {
			this.settings.sfxVolume = this.sfxVolumeSlider.value();
			this.sfxPercent.html(Math.round(this.settings.sfxVolume * 100) + "%");
		});

		// Settings Exit Button
		this.exitGameButton = createButton("Exit Game");
		this.exitGameButton.addClass("exit-button");
		this.exitGameButton.parent(this.uiContainer);

		this.exitGameButton.mousePressed(() => {
			this.titleScreen = false;
			this.instructionsScreen = false;
			this.pauseScreen = false;
			this.health = 0;

			musicSound.play();
		});

		// Initial Visibility
		this.restartButton.hide();
		this.uiContainer.hide();

		// Music
		musicSound.setVolume(0.2 * this.settings.musicVolume);
		musicSound.loop();

		// Screen Shake
		this.screenShakeIntensity = 0;
		this.screenShakeDecay = 0.95;
	}
	
	update()
	{
		if (this.titleScreen && !this.instructionsScreen)
		{
			this.instructionsButton.update();
			this.difficultyContainer.show();
			this.startButton.show();
			this.restartButton.hide();
			this.uiContainer.hide();
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
			this.instructionsButton.hide();
			this.difficultyContainer.hide();
			this.startButton.hide();
			this.restartButton.hide();
			this.uiContainer.hide();
		}
		else if (this.gameOver)
		{
			this.restartButton.show();
			this.startButton.hide();

			this.instructionsButton.hide();
			this.difficultyContainer.hide();
			this.startButton.hide();
			this.restartButton.show();
			this.uiContainer.hide();
		}
		else if (this.pauseScreen)
		{
			if (keyIsPressed && keyCode === ESCAPE && !this.typing)
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

			this.instructionsButton.hide();
			this.difficultyContainer.hide();
			this.startButton.hide();
			this.restartButton.hide();
			this.uiContainer.show();
		}
		else
		{
			this.updateGame();

			if (keyIsPressed && keyCode === ESCAPE && !this.typing)
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

			this.instructionsButton.hide();
			this.difficultyContainer.hide();
			this.startButton.hide();
			this.restartButton.hide();
			this.uiContainer.hide();
		}
	}
	
	display()
	{
		push();

		let shakeX = map(noise(millis() * 0.05), 0, 1, -this.screenShakeIntensity, this.screenShakeIntensity);
		let shakeY = map(noise(millis() * 0.05), 0, 1, -this.screenShakeIntensity, this.screenShakeIntensity);
		translate(shakeX, shakeY);

		this.displayBackground();

		if (this.titleScreen && !this.instructionsScreen)
		{
			this.displayTitleScreen();
			this.instructionsButton.display();
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

		pop();

		this.screenShakeIntensity *= this.screenShakeDecay;

		if (this.screenShakeIntensity < 0.01)
		{
			this.screenShakeIntensity = 0;
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
		text("Paused", width / 2, height / 4);

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
		if (floor(millis() / 500) % 2 === 0)
		{
			text("PRESS ANY KEY TO CONTINUE", width / 2, height * 2 / 3);
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

	screenShake(intensity)
	{
		this.screenShakeIntensity = intensity;
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