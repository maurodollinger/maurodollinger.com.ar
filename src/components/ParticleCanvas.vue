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
      animationFrame: null,
      cameraDistance: 900,
      focalLength: 700,
      mouse: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        active: false,
      },
    };
  },
  mounted() {
    this.initializeCanvas();
    this.addEventListeners();
    this.createParticles();
    this.animateParticles();
  },
  beforeUnmount() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerleave', this.handlePointerLeave);
  },
  methods: {
    initializeCanvas() {
      this.canvas = this.$refs.particleCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    addEventListeners() {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('pointermove', this.handlePointerMove);
      window.addEventListener('pointerleave', this.handlePointerLeave);
    },
    createParticles() {
      const count = 38;
      this.particles = [];

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * this.canvas.width * 0.9;
        const y = (Math.random() - 0.5) * this.canvas.height * 0.9;
        const z = (Math.random() - 0.5) * 700;

        this.particles.push(
          new this.Particle(x, y, z, this.ctx, this.cameraDistance, this.focalLength)
        );
      }
    },
    animateParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.updateParticles();
      this.drawParticles();

      this.animationFrame = requestAnimationFrame(this.animateParticles);
    },
    updateParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].mouse = this.mouse;
        this.particles[i].flock(this.particles);
        this.particles[i].update();
      }
    },
    drawParticles() {
      const projected = this.particles.map((particle) => ({
        particle,
        ...particle.project(),
      }));

      const connectionDistance = 350;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance && a.scale > 0.16 && b.scale > 0.16) {
            const alpha = (1 - distance / connectionDistance) * 0.22;
            this.ctx.beginPath();
            this.ctx.moveTo(a.x, a.y);
            this.ctx.lineTo(b.x, b.y);
            this.ctx.strokeStyle = `rgba(150, 180, 255, ${alpha})`;
            this.ctx.lineWidth = 0.45;
            this.ctx.stroke();
            this.ctx.closePath();
          }
        }
      }

      for (const item of projected) {
        item.particle.draw();
      }
    },
    handleResize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    handlePointerMove(event) {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.mouse.active = true;
    },
    handlePointerLeave() {
      this.mouse.active = false;
    },
    Particle: class {
      constructor(x, y, z, ctx, cameraDistance, focalLength) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.ctx = ctx;
        this.cameraDistance = cameraDistance;
        this.focalLength = focalLength;
        this.mouse = { x: 0, y: 0, active: false };
        this.size = Math.random() * 1.3 + 0.1;
        this.maxSpeed = 1.2;
        this.maxForce = 0.07;
        this.vx = (Math.random() - 0.5) * 1.3;
        this.vy = (Math.random() - 0.5) * 1.3;
        this.vz = (Math.random() - 0.5) * 1.3;
      }

      project() {
        const perspective = this.focalLength / (this.cameraDistance + this.z);
        const x = this.x * perspective + this.ctx.canvas.width / 2;
        const y = this.y * perspective + this.ctx.canvas.height / 2;

        return {
          x,
          y,
          scale: perspective,
        };
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        const limitX = this.ctx.canvas.width/2 * 0.5;
        const limitY = this.ctx.canvas.height/2 * 0.65;
        const limitZ = 500;

        if (this.x > limitX || this.x < -limitX) {
          this.vx *= -1;
        }

        if (this.y > limitY || this.y < -limitY) {
          this.vy *= -1;
        }

        if (this.z > limitZ || this.z < -limitZ) {
          this.vz *= -1;
        }

        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;
        this.vz += (Math.random() - 0.5) * 0.02;
      }

      draw() {
        const { x, y, scale } = this.project();
        const radius = this.size * (0.7 + scale * 1.1);
        const alpha = Math.min(1, 0.2 + scale * 0.75);

        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(170, 195, 255, ${alpha})`;
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
      }

      flock(particles) {
        const cohesion = this.cohere(particles);
        const separation = this.separate(particles);
        const alignment = this.align(particles);
        const mouseForce = this.mouseInfluence();

        this.vx += cohesion.x + separation.x + alignment.x + mouseForce.x;
        this.vy += cohesion.y + separation.y + alignment.y + mouseForce.y;
        this.vz += cohesion.z + separation.z + alignment.z + mouseForce.z;

        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2 + this.vz ** 2);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
          this.vz = (this.vz / speed) * this.maxSpeed;
        }
      }

      cohere(particles) {
        const radius = 140;
        let total = 0;
        let avgX = 0;
        let avgY = 0;
        let avgZ = 0;

        for (const particle of particles) {
          if (particle === this) continue;

          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const dz = this.z - particle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance > 0 && distance < radius) {
            avgX += particle.x;
            avgY += particle.y;
            avgZ += particle.z;
            total++;
          }
        }

        if (!total) {
          return { x: 0, y: 0, z: 0 };
        }

        avgX /= total;
        avgY /= total;
        avgZ /= total;

        return {
          x: (avgX - this.x) * 0.0008,
          y: (avgY - this.y) * 0.0008,
          z: (avgZ - this.z) * 0.0008,
        };
      }

      separate(particles) {
        const radius = 55;
        let total = 0;
        let avgX = 0;
        let avgY = 0;
        let avgZ = 0;

        for (const particle of particles) {
          if (particle === this) continue;

          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const dz = this.z - particle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance > 0 && distance < radius) {
            const force = 1 - distance / radius;
            avgX += (dx / distance) * force;
            avgY += (dy / distance) * force;
            avgZ += (dz / distance) * force;
            total++;
          }
        }

        if (!total) {
          return { x: 0, y: 0, z: 0 };
        }

        avgX /= total;
        avgY /= total;
        avgZ /= total;

        return {
          x: avgX * 0.08,
          y: avgY * 0.08,
          z: avgZ * 0.08,
        };
      }

      align(particles) {
        const radius = 90;
        let total = 0;
        let avgVx = 0;
        let avgVy = 0;
        let avgVz = 0;

        for (const particle of particles) {
          if (particle === this) continue;

          const dx = this.x - particle.x;
          const dy = this.y - particle.y;
          const dz = this.z - particle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance > 0 && distance < radius) {
            avgVx += particle.vx;
            avgVy += particle.vy;
            avgVz += particle.vz;
            total++;
          }
        }

        if (!total) {
          return { x: 0, y: 0, z: 0 };
        }

        avgVx /= total;
        avgVy /= total;
        avgVz /= total;

        return {
          x: (avgVx - this.vx) * 0.008,
          y: (avgVy - this.vy) * 0.008,
          z: (avgVz - this.vz) * 0.008,
        };
      }

      mouseInfluence() {
        if (!this.mouse || !this.mouse.active) {
          return { x: 0, y: 0, z: 0 };
        }

        const centerX = this.ctx.canvas.width / 2;
        const centerY = this.ctx.canvas.height / 2;
        const px = this.x * (this.focalLength / (this.cameraDistance + this.z)) + centerX;
        const py = this.y * (this.focalLength / (this.cameraDistance + this.z)) + centerY;
        const dx = this.mouse.x - px;
        const dy = this.mouse.y - py;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 180 || distance === 0) {
          return { x: 0, y: 0, z: 0 };
        }

        const force = (180 - distance) / 180;
        const directionX = dx / distance;
        const directionY = dy / distance;

        return {
          x: -directionX * force * 0.12,
          y: -directionY * force * 0.12,
          z: (Math.random() - 0.5) * 0.12,
        };
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
