class Button
{
    constructor(x, y, padding, text, textSize, textColor, buttonColor, scaleChange, onClick)
    {
        this.pos = createVector(x, y);
        this.size = createVector(textWidth(text) + padding, textAscent(textSize) + textDescent(textSize) + padding);
        this.text = text;
        this.textSize = textSize;
        this.textColor = textColor;
        this.buttonColor = buttonColor;
        this.onClick = onClick;
        this.scale = 1;
        this.scaleChange = scaleChange;
        this.show = true;
    }

    update()
    {
        if (this.show)
        {
            if (mouseX > this.pos.x - this.size.x / 2 && 
                mouseX < this.pos.x + this.size.x / 2 && 
                mouseY > this.pos.y - this.size.y / 2 && 
                mouseY < this.pos.y + this.size.y / 2)
            {
                this.scale *= this.scaleChange;

                if (mouseIsPressed)
                {
                    this.onClick();
                }
            }
            else
            {
                this.scale /= this.scaleChange;
            }
        }
    }

    display()
    {
        if (this.show)
        {
            push();

            rectMode(CENTER);
            textAlign(CENTER, CENTER);
            textFont("Times");
            textSize(this.textSize * this.scale);
            fill(this.buttonColor);
            rect(this.pos.x, this.pos.y, this.size.x * this.scale, this.size.y * this.scale, 8);
            fill(this.textColor);
            text(this.text, this.pos.x, this.pos.y);
            
            pop();
        }
    }

    hide()
    {
        this.show = false;
    }

    show()
    {
        this.show = true;
    }
}