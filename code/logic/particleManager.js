class ParticleManager
{
    constructor()
    {
        this.particles = [];
    }

    update()
    {
        for (let i = this.particles.length - 1; i >= 0; i--)
        {
            let particle = this.particles[i];
            particle.update();
            if (particle.lifetime <= 0)
            {
                this.particles.splice(i, 1);
            }
        }
    }

    display()
    {
        for (let particle of this.particles)
        {
            particle.display();
        }
    }
}