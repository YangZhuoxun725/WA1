class Particle
{
    constructor(x, y, size, color = [255, 150, 0])
    {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1, 3));
        this.gravity = createVector(0, 0.05);
        this.lifetime = 255;
        this.size = size;
        this.color = color;
    }

    update()
    {
        this.vel.add(this.gravity);
        this.pos.add(this.vel);
        this.lifetime -= 5;
    }

    display()
    {
        push();

        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.lifetime);
        ellipse(0, 0, this.size);

        pop();
    }
}