class Game
{
	constructor()
	{
		this.settings = new Settings();
		this.settings.arrowKeysControl = false;
		this.settings.difficulty = "normal";

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
		});
		this.restartButton.hide();
	}
	
	update()
	{
		if (this.titleScreen)
		{
			this.displayTitleScreen();
		}
		else if (this.gameOver)
		{
			this.displayGameOverScreen();
			this.restartButton.show();
			this.startButton.hide();
			this.balls = [];
			this.crateManager.crates = [];
			this.powerupManager.powerups = [];
			this.score = 0;
			this.health = this.maxHealth;
		}
		else
		{
			this.updateGame();
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
		
		for (let ball of this.balls)
		{
			this.crateManager.killCrates(ball);
		}

		this.crateManager.update();
		this.crateManager.update();

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
		text("Game Over", width / 2, height / 3);

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
}