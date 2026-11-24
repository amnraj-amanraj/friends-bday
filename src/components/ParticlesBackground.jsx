import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Floating celebratory bokeh particles
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 9000), 100);
    let particles = [];

    // Pastel vibrant palette for light theme
    const colors = [
      'rgba(147, 51, 234, ',  // royal purple
      'rgba(59, 130, 246, ',  // sky blue
      'rgba(245, 158, 11, ',  // warm gold
      'rgba(244, 63, 94, ',   // rose
      'rgba(16, 185, 129, '   // emerald
    ];

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.45 + 0.15,
          speedAlpha: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          speedY: Math.random() * 0.25 + 0.1,
          speedX: (Math.random() - 0.5) * 0.15
        });
      }
    }

    initParticles();

    // Shooting sparkle / golden meteor
    let shootingStar = null;
    let shootingStarTimer = 0;

    function createShootingStar() {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.35,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 6 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 0.7,
        width: 2
      };
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient watercolor nebulas
      const grad1 = ctx.createRadialGradient(
        width * 0.15, height * 0.25, 40,
        width * 0.15, height * 0.25, Math.max(width * 0.45, 300)
      );
      grad1.addColorStop(0, 'rgba(238, 242, 255, 0.7)');
      grad1.addColorStop(0.5, 'rgba(243, 232, 255, 0.4)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.85, height * 0.65, 40,
        width * 0.85, height * 0.65, Math.max(width * 0.5, 350)
      );
      grad2.addColorStop(0, 'rgba(254, 243, 199, 0.5)');
      grad2.addColorStop(0.5, 'rgba(240, 249, 255, 0.4)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render floating bokeh sparkles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha += p.speedAlpha;
        if (p.alpha > 0.6 || p.alpha < 0.1) {
          p.speedAlpha = -p.speedAlpha;
        }

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.radius > 1.8 ? 6 : 0;
        ctx.shadowColor = 'rgba(124, 58, 237, 0.25)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Handle shooting sparkles
      shootingStarTimer++;
      if (!shootingStar && shootingStarTimer > 320) {
        if (Math.random() < 0.05) {
          createShootingStar();
          shootingStarTimer = 0;
        }
      }

      if (shootingStar) {
        const endX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGrad = ctx.createLinearGradient(
          shootingStar.x, shootingStar.y,
          endX, endY
        );
        starGrad.addColorStop(0, `rgba(217, 119, 6, ${shootingStar.opacity})`);
        starGrad.addColorStop(0.4, `rgba(147, 51, 234, ${shootingStar.opacity * 0.6})`);
        starGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = shootingStar.width;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
