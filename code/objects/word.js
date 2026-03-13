class Word
{
    constructor(difficulty = "easy")
    {
        this.x = width / 2;
        this.y = height / 4;
        this.text = generateWord(difficulty);
        this.displayText = this.text;
        this.difficulty = difficulty;
        this.typed = "";
        this.wrong = 0;
        this.accuracy = 1;
        this.timer = 0;
        this.wpm = 0;

        this.canType = true;
    }

    update()
    {
        if (this.text.length === 0)
        {
            if ((keyIsPressed && (key === "Enter" || key === " ")) || mouseIsPressed)
            {
                this.reset();
            }
        }
        else
        {
            if (this.typed !== "")
            {
                this.timer += deltaTime;
            }
        }        

        this.type();
    }

    display()
    {
        push();

        noStroke();

        fill(127);
        textSize(48);
        textAlign(CENTER, CENTER);
        textFont("Times");
        text(this.displayText, this.x, this.y);

        fill(0);
        textSize(48);
        textAlign(LEFT, CENTER);
        textFont("Times");
        text(this.typed, this.x - textWidth(this.displayText) / 2, this.y);

        pop();
    }

    type()
    {
        if (keyIsPressed && this.canType)
        {
            if (key === this.text[0])
            {
                this.typed += key;
                this.text = this.text.substring(1);
                this.canType = false;
            }
        }
        if (!keyIsPressed)
        {
            this.canType = true;
        }
    }

    reset()
    {
        this.accuracy = this.typed.length / (this.typed.length + this.wrong);
        this.wpm = (this.displayText.length) / (this.timer / 60000);

        this.text = generateWord(this.difficulty);
        this.displayText = this.text;
        this.typed = "";
        this.wrong = 0
        this.timer = 0;
            
        if (this.accuracy > 0.5) game.cannon.fire(constrain(this.accuracy * this.wpm / 20, 6, 25));
    }

    updateDifficulty(difficulty)
    {
        this.difficulty = difficulty;
        this.reset();
    }
}