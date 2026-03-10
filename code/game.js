class Game
{
	constructor()
	{
		this.settings = new Settings();

		this.cannon = new Cannon(groundImg.width, height - groundImg.height - cannonBaseImg.height);
		this.balls = [];
		this.word = new Word(this.settings.difficulty);
		this.crateManager = new CrateManager();
		this.powerupManager = new PowerupManager();

		this.score = 0;
		this.highScore = this.score;
		this.health = 50;
		this.maxHealth = this.health;

		this.gameOver = false;
		this.titleScreen = true;
		this.pauseScreen = false;

		this.typing = false;

		this.startButton = createButton("Start Game");
		this.startButton.addClass("centered-button");
		this.startButton.parent(select("main"))
		this.startButton.mousePressed(() => {
			this.titleScreen = false;
			this.gameOver = false;
			this.startButton.hide();
		});

		this.restartButton = createButton("Back to Title Screen");
		this.restartButton.addClass("centered-button");
		this.restartButton.parent(select("main"))
		this.restartButton.mousePressed(() => {
			this.titleScreen = true;
			this.gameOver = false;
			this.restartButton.hide();
			this.startButton.show();

			this.resetGame();
		});
		this.restartButton.hide();

		this.container = createDiv();
		this.container.addClass("checkbox-container");
		this.container.position(width / 2, height / 2);

		this.showScoreBox = createToggle("Show Score", this.settings.showScore, this.container);
		this.showHealthBarBox = createToggle("Show Health Bar", this.settings.showHealthBar, this.container);
		this.showPowerupEffectsBox = createToggle("Show Powerup Effects", this.settings.showPowerupEffects, this.container);
		this.arrowKeysControlBox = createToggle("Arrow Keys Control", this.settings.arrowKeysControl, this.container);

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

		this.container.hide();
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
				this.pauseScreen = !this.pauseScreen;

				this.container.hide();
			}
			else if (!keyIsPressed)
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
				this.pauseScreen = !this.pauseScreen;

				this.container.show();
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

	displayGame()
	{
		this.word.display();

		for (let ball of this.balls)
		{
			ball.display();
		}

		this.crateManager.display();

		this.powerupManager.display();

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

		this.score = 0;
		this.highScore = this.score;
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