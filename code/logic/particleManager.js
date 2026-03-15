class ParticleManager
{
    constructor()
    {
        // Intialize particles
        this.particles = [];
    }

    update()
    {
        // Loops through particles
        for (let i = this.particles.length - 1; i >= 0; i--)
        {
            // Updates particle
            let particle = this.particles[i];
            particle.update();

            // Removes particle if lifetime is up
            if (particle.lifetime <= 0)
            {
                this.particles.splice(i, 1);
            }
        }
    }

    display()
    {
        // Loops through particles
        for (let particle of this.particles)
        {
            // Displays particle
            particle.display();
        }
    }
}