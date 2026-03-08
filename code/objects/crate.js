class Crate
{
    constructor(x, y)
    {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.gravity = createVector(0, random(0.01, 0.03));
        this.friction = 0.99;

        this.speedChange = 1;
        this.invincible = false;
    }

    update()
    {
        this.vel.add(this.gravity);
        this.vel.mult(this.friction);
        this.vel.mult(this.speedChange);

        this.pos.add(this.vel);

        this.killFloor();
    }

    display()
    {
        image(crateImg, this.pos.x - crateImg.width / 2, this.pos.y - crateImg.height / 2);
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