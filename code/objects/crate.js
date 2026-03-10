class Crate
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-2, 2), 0);
        this.gravity = createVector(0, 0.01);
        this.angle = 0;

        this.speedChange = 1;
        this.invincible = false;
    }

    update()
    {
        this.vel.add(this.gravity);
        this.vel.mult(this.speedChange);
        this.angle += this.vel.x * 0.1;

        this.pos.add(this.vel);

        this.bounceWalls();
        this.killFloor();
    }

    display()
    {
        push();

        translate(this.pos.x, this.pos.y);
        rotate(radians(this.angle));
        image(crateImg, - crateImg.width / 2, - crateImg.height / 2);
        
        pop();
    }

    bounceWalls()
    {
        if (this.pos.x < crateImg.width / 2 || 
            this.pos.x > width - crateImg.width / 2)
        {
            this.vel.x *= -1;
        }
    }

    killFloor()
    {
        if (this.pos.y > height - groundImg.height - crateImg.height / 2)
        {
            this.kill();
            if (!this.invincible)
            {
                game.health -= 1;
            }
        }
    }
    
    kill()
    {
        let index = game.crateManager.crates.indexOf(this);
        if (index !== -1)
        {
            game.crateManager.crates.splice(index, 1);
        }
    }
}