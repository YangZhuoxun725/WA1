class CustomButton
{
    constructor(x, y, width, height, image, onClick=() => {})
    {
        // Initialize position, size, image, and click handler
        this.pos = createVector(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
        this.displayWidth = width;
        this.displayHeight = height;
        this.onClick = onClick;

        // State variables
        this.shown = true;
        this.clicked = false;
    }

    update()
    {
        // Determine target scale based on mouse hover state
        let targetScale = this.isMouseOver() ? 1.2 : 1;

        // Check if mouse is over the button
        if (this.isMouseOver())
        {
            // Check if mouse is pressed and button wasn't already clicked
            if (mouseIsPressed && !this.clicked)
            {
                // Trigger the click handler
                this.onClick();
                
                // Disable further clicks until mouse is released
                this.clicked = true;
            }
        }
        // Reset clicked state when mouse is released
        if (!mouseIsPressed)
        {
            this.clicked = false;
        }

        // Smoothly increase/decrease the display size towards the target scale
        this.displayWidth = lerp(this.displayWidth, this.width * targetScale, 0.3);
        this.displayHeight = lerp(this.displayHeight, this.height * targetScale, 0.3);
    }

    display()
    {
        // Only display the button if it's shown
        if (!this.shown) return;

        push();

        // Display the button image centered at its position
        translate(this.pos.x, this.pos.y);
        image(this.image, -this.displayWidth / 2, -this.displayHeight / 2, this.displayWidth, this.displayHeight);

        pop();
    }

    isMouseOver()
    {
        // Check if the mouse is within the button's bounds
        return mouseX > this.pos.x - this.displayWidth / 2 &&
               mouseX < this.pos.x + this.displayWidth / 2 &&
               mouseY > this.pos.y - this.displayHeight / 2 &&
               mouseY < this.pos.y + this.displayHeight / 2;
    }

    show()
    {
        // Show button
        this.shown = true;
    }

    hide()
    {
        // Hide button
        this.shown = false;
    }
}