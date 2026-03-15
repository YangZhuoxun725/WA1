class Particle
{
    constructor(x, y, size, color = [255, 150, 0])
    {
        // Initialize position, velocity, gravity, lifetime, size, and color
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(1, 3));
        this.gravity = createVector(0, 0.05);
        this.lifetime = 255;
        this.size = size;
        this.color = color;
    }

    update()
    {
        // Update velocity with gravity
        this.vel.add(this.gravity);

        // Update position with velocity
        this.pos.add(this.vel);

        // Decrease lifetime
        this.lifetime -= 5;
    }

    display()
    {
        push();

        translate(this.pos.x, this.pos.y);
        noStroke();

        // Set fill color with alpha based on lifetime
        fill(this.color[0], this.color[1], this.color[2], this.lifetime);

        // Draw the particle as a circle
        ellipse(0, 0, this.size);

        pop();
    }
}