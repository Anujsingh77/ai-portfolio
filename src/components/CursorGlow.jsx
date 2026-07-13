import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

// The site's signature element: in dark mode a live neural / mesh network
// (nodes forming edges, reacting to the cursor like a live graph — a nod to
// decentralized mesh-network systems) and in light mode a calmer field of
// rising aqua bubbles with a soft cursor glow. Pure canvas, one RAF loop,
// theme-aware without ever restarting the simulation.
export default function CursorGlow() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let raf = null;

    function particleCount() {
      const area = width * height;
      const base = window.innerWidth < 640 ? 26 : 55;
      return Math.min(base, Math.max(16, Math.floor(area / 26000)));
    }

    function resize() {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const n = particleCount();
      particles = new Array(n).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1.2,
        wobble: Math.random() * Math.PI * 2,
      }));
    }

    function step() {
      const isDark = themeRef.current === "dark";
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        drawMesh(isDark);
      } else {
        drawBubbles();
      }

      raf = requestAnimationFrame(step);
    }

    function drawMesh() {
      const maxDist = Math.min(190, width / 4.2);
      // update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }
      // edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = `rgba(124,108,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseDist = maxDist * 1.6;
          if (dist < mouseDist) {
            const alpha = (1 - dist / mouseDist) * 0.55;
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const p of particles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        grad.addColorStop(0, "rgba(124,108,255,0.9)");
        grad.addColorStop(1, "rgba(124,108,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(210,205,255,0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // cursor glow
      if (mouse.active) {
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          140
        );
        g.addColorStop(0, "rgba(0,212,255,0.16)");
        g.addColorStop(1, "rgba(0,212,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawBubbles() {
      for (const p of particles) {
        p.wobble += 0.01;
        p.y -= p.r * 0.12 + 0.15;
        p.x += Math.sin(p.wobble) * 0.25;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        const grad = ctx.createRadialGradient(
          p.x - p.r * 3,
          p.y - p.r * 3,
          0,
          p.x,
          p.y,
          p.r * 9
        );
        grad.addColorStop(0, "rgba(56,189,248,0.30)");
        grad.addColorStop(0.7, "rgba(6,182,212,0.10)");
        grad.addColorStop(1, "rgba(6,182,212,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(14,165,233,0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (mouse.active) {
        const g = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          160
        );
        g.addColorStop(0, "rgba(56,189,248,0.20)");
        g.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    if (reduceMotion) {
      // Single static frame, no loop — respects the user's OS setting.
      drawMesh(true);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
