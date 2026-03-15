class CustomButton
{
    constructor(x, y, width, height, image, onClick=() => {})
    {
        this.pos = createVector(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
        this.displayWidth = width;
        this.displayHeight = height;
        this.onClick = onClick;

        this.shown = true;
        this.clicked = false;
    }

    update()
    {
        let targetScale = this.isMouseOver() ? 1.2 : 1;

        if (this.isMouseOver())
        {
            if (mouseIsPressed && !this.clicked)
            {
                this.onClick();
                this.clicked = true;
            }
        }
        if (!mouseIsPressed)
        {
            this.clicked = false;
        }

        this.displayWidth = lerp(this.displayWidth, this.width * targetScale, 0.3);
        this.displayHeight = lerp(this.displayHeight, this.height * targetScale, 0.3);
    }

    display()
    {
        if (!this.shown) return;
        push();

        translate(this.pos.x, this.pos.y);
        image(this.image, -this.displayWidth / 2, -this.displayHeight / 2, this.displayWidth, this.displayHeight);

        pop();
    }

    isMouseOver()
    {
        return mouseX > this.pos.x - this.displayWidth / 2 &&
               mouseX < this.pos.x + this.displayWidth / 2 &&
               mouseY > this.pos.y - this.displayHeight / 2 &&
               mouseY < this.pos.y + this.displayHeight / 2;
    }

    show()
    {
        this.show = true;
    }

    hide()
    {
        this.show = false;
    }
}