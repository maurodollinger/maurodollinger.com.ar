<template>
  <div>
    <canvas ref="particleCanvas" style="position: absolute; top: 0; left: 0;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
    };
  },
  mounted() {
    this.initializeCanvas();
    this.addEventListeners();
    this.createParticles(); // Iniciar partículas al cargar la página
    this.animateParticles();
  },
  methods: {
    initializeCanvas() {
      this.canvas = this.$refs.particleCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      // Configurar el fondo transparente del canvas
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    addEventListeners() {
      window.addEventListener('resize', this.handleResize);
    },
    createParticles() {
      for (let i = 0; i < 5; i++) {
        const y =  Math.random() * this.canvas.height;
        const x =  Math.random() * this.canvas.height;
        this.particles.push(new this.Particle(x, y, this.ctx));
      }
    },
    animateParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.updateParticles();
      this.drawParticles();

      requestAnimationFrame(this.animateParticles);
    },
    updateParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].flock(this.particles);
        this.particles[i].update();
      }
    },
    drawParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].draw();

        // Dibujar líneas a partículas adyacentes
        if(i<this.particles.length-1){
            for (let j = i + 1; j < this.particles.length; j++) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.lineWidth = 0.1;
                this.ctx.beginPath();
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
      }
    },
    handleResize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      // Volver a configurar el fondo transparente después de cambiar el tamaño
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    Particle: class {
      constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.maxSpeed = 2;
        this.maxForce = 0.5;
        this.speedX = Math.random() * this.maxSpeed * 2 - this.maxSpeed;
        this.speedY = Math.random() * this.maxSpeed * 2 - this.maxSpeed;
        this.ctx = ctx;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote en los bordes del canvas
        if (this.x > this.ctx.canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }

        if (this.y > this.ctx.canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
       // this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 0.1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      }

      flock(particles) {
        const cohesion = this.cohere(particles);
        const separation = this.separate(particles);

        // Ajustar la velocidad según las reglas de flocking
        this.speedX += cohesion.x + separation.x;
        this.speedY += cohesion.y + separation.y;

        // Limitar la velocidad para evitar movimientos demasiado rápidos
        const speedMagnitude = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
        if (speedMagnitude > this.maxSpeed) {
          this.speedX = (this.speedX / speedMagnitude) * this.maxSpeed;
          this.speedY = (this.speedY / speedMagnitude) * this.maxSpeed;
        }
      }

      cohere(particles) {
        const perceptionRadius = 10;
        let total = 0;
        let avgX = 0;
        let avgY = 0;

        for (const particle of particles) {
          const distance = Math.sqrt((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2);
          if (particle !== this && distance < perceptionRadius) {
            avgX += particle.x;
            avgY += particle.y;
            total++;
          }
        }

        if (total > 0) {
          avgX /= total;
          avgY /= total;

          const cohesionForceX = (avgX - this.x) * this.maxForce;
          const cohesionForceY = (avgY - this.y) * this.maxForce;

          return { x: cohesionForceX, y: cohesionForceY };
        } else {
          return { x: 0, y: 0 };
        }
      }

      separate(particles) {
        const perceptionRadius = 50;
        let total = 0;
        let avgX = 0;
        let avgY = 0;

        for (const particle of particles) {
          const distance = Math.sqrt((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2);
          if (particle !== this && distance < perceptionRadius) {
            const diffX = this.x - particle.x;
            const diffY = this.y - particle.y;
            const dist = Math.sqrt(diffX ** 2 + diffY ** 2);
            avgX += diffX / dist;
            avgY += diffY / dist;
            total++;
          }
        }

        if (total > 0) {
          avgX /= total;
          avgY /= total;

          const separationForceX = (avgX - this.speedX) * this.maxForce;
          const separationForceY = (avgY - this.speedY) * this.maxForce;

          return { x: separationForceX, y: separationForceY };
        } else {
          return { x: 0, y: 0 };
        }
      }
    },
  },
};
</script>

<style>
canvas {
  display: block;
}
</style>
