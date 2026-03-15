class Word
{
    constructor(difficulty = "easy")
    {
        // Initialize position
        this.pos = createVector(width / 2, height / 4);

        // Set difficulty
        this.difficulty = difficulty;

        // Generate a word
        this.text = generateWord(difficulty);

        // Set display text and typed text
        this.displayText = this.text;
        this.typed = "";

        // Initialize stats
        this.wrong = 0;
        this.accuracy = 1;
        this.timer = 0;
        this.wpm = 0;

        // Control typing
        this.canType = true;
    }

    update()
    {
        if (this.text.length === 0)
        {
            // Reset the word if the player has finished typing and typed Enter or Space, or if the mouse is pressed
            if ((keyIsPressed && (key === "Enter" || key === " ")) || mouseIsPressed)
            {
                this.reset();
            }
        }
        else
        {
            // Increment timer if the player has started typing
            if (this.typed !== "")
            {
                this.timer += deltaTime;
            }
        }        

        // Check for typing input
        this.type();
    }

    display()
    {
        push();

        noStroke();

        // Display original word
        fill(127);
        textSize(48);
        textAlign(CENTER, CENTER);
        textFont("Times");
        text(this.displayText, this.pos.x, this.pos.y);

        // Display typed word
        fill(0);
        textSize(48);
        textAlign(LEFT, CENTER);
        textFont("Times");
        text(this.typed, this.pos.x - textWidth(this.displayText) / 2, this.pos.y);

        pop();
    }

    type()
    {
        // Check if a key is pressed and the player can type
        if (keyIsPressed && this.canType)
        {
            // Check if the key matches the first character of the text
            if (key === this.text[0])
            {
                // Add the key to the typed text and remove it from the display text
                this.typed += key;
                this.text = this.text.substring(1);

                // Disable typing until the key is released
                this.canType = false;
            }
        }
        // If no key is pressed, allow typing again
        if (!keyIsPressed)
        {
            this.canType = true;
        }
    }

    reset()
    {
        // Calculate accuracy and WPM
        this.accuracy = this.typed.length / (this.typed.length + this.wrong);
        this.wpm = (this.displayText.length) / (this.timer / 60000);

        // Generate new word and reset display text and typed text
        this.text = generateWord(this.difficulty, game.score);
        this.displayText = this.text;
        this.typed = "";

        // Reset stats
        this.wrong = 0
        this.timer = 0;
        
        // Fire cannon based on accuracy and WPM
        if (this.accuracy > 0.5) game.cannon.fire(constrain(this.accuracy * this.wpm / 20, 6, 25));
    }

    updateDifficulty(difficulty)
    {
        // Update difficulty and reset the word
        this.difficulty = difficulty;
        this.reset();
    }
}