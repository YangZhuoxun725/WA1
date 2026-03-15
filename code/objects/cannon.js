class Cannon
{
    constructor(x, y)
    {
        // Position
        this.pos = createVector(x, y);

        // Angle and recoil
        this.angle = 0;
        this.recoil = 0;
        this.recoilMax = 20;
        this.recoilSpeed = 2;
    }

    update()
    {
        if (game.settings.arrowKeysControl)
        {
            // Arrow keys or WASD to control the cannon angle
            if (keyIsDown(UP_ARROW))
            {
                this.angle -= 0.05;
            }
            if (keyIsDown(DOWN_ARROW))
            {
                this.angle += 0.05;
            }
            if (keyIsDown("W".charCodeAt(0)))
            {
                this.angle -= 0.05;
            }
            if (keyIsDown("S".charCodeAt(0)))
            {
                this.angle += 0.05;
            }
        }
        else
        {
            // Mouse to control the cannon angle
            this.angle = atan2(mouseY - (this.pos.y + cannonBaseImg.height * 4 / 17), mouseX - (this.pos.x + cannonBaseImg.width / 2));
        }
        // Constrain the angle to prevent shooting backwards
        this.angle = constrain(this.angle, -PI / 2, 0);

        // Reduce recoil over time
        this.recoil = max(0, this.recoil - this.recoilSpeed);
    }

    display()
    {
        push();

        // Rotate the cannon head around the pivot point and apply recoil
        translate(this.pos.x + cannonBaseImg.width / 2, this.pos.y + cannonBaseImg.height * 4 / 17);
        rotate(this.angle);
        translate(-this.recoil, 0);
        image(cannonHeadImg, -cannonBaseImg.width / 2, -cannonHeadImg.height / 2);
        
        pop();

        // Draw the cannon base
        image(cannonBaseImg, this.pos.x, this.pos.y);
    }

    fire(power)
    {
        // Create a new ball with the current angle and power
        let ball = new Ball(this.pos.x + cannonBaseImg.width / 2, this.pos.y + cannonBaseImg.height * 4 / 17, this.angle, power);
        game.balls.push(ball);

        // Set recoil to max when firing
        this.recoil = this.recoilMax;

        // Play cannon fire sound
        cannonFireSound.setVolume(game.settings.sfxVolume);
        cannonFireSound.rate(2.0);
        cannonFireSound.play();

        // Screen shake effect
        game.screenShake(6);
    }
}