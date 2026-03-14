class Cannon
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.angle = 0;
        this.recoil = 0;
        this.recoilMax = 20;
        this.recoilSpeed = 2;
    }

    update()
    {
        if (game.settings.arrowKeysControl)
        {
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
            this.angle = atan2(mouseY - (this.y + cannonBaseImg.height * 4 / 17), mouseX - (this.x + cannonBaseImg.width / 2));
        }
        this.angle = constrain(this.angle, -PI / 2, 0);

        this.recoil = max(0, this.recoil - this.recoilSpeed);
    }

    display()
    {
        push();

        translate(this.x + cannonBaseImg.width / 2, this.y + cannonBaseImg.height * 4 / 17);
        rotate(this.angle);
        translate(-this.recoil, 0);
        image(cannonHeadImg, -cannonBaseImg.width / 2, -cannonHeadImg.height / 2);
        
        pop();

        image(cannonBaseImg, this.x, this.y);
    }

    fire(power)
    {
        let ball = new Ball(this.x + cannonBaseImg.width / 2, this.y + cannonBaseImg.height * 4 / 17, this.angle, power);
        game.balls.push(ball);

        this.recoil = this.recoilMax;

        cannonFireSound.rate(2.0);
        cannonFireSound.play();

        game.screenShake(6);
    }
}