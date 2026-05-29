'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated intelligence globe — slerp arcs, GIS graticule, golden-spiral nodes,
 * mouse parallax, pulses. Ported from /hero-canvas.js.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let DPR = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, cx = 0, cy = 0, R = 0;

    const resize = () => {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2;
      cy = H * 0.55;
      R = Math.min(W, H) * 0.42;
    };
    resize();
    window.addEventListener('resize', resize);

    type Pt = { x: number; y: number; z: number; isNode: boolean };
    const POINTS: Pt[] = [];
    const N = 1100;
    const phi0 = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi0 * i;
      POINTS.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, isNode: false });
    }
    const NODE_COUNT = 28;
    const NODE_IDX: number[] = [];
    for (let k = 0; k < NODE_COUNT; k++) {
      const idx = Math.floor(((k + 0.5) / NODE_COUNT) * N);
      POINTS[idx].isNode = true;
      NODE_IDX.push(idx);
    }

    type Arc = { a: number; b: number; t: number; speed: number; life: number };
    const ARCS: Arc[] = [];
    const spawnArc = () => {
      const a = NODE_IDX[Math.floor(Math.random() * NODE_IDX.length)];
      let b = a;
      while (b === a) b = NODE_IDX[Math.floor(Math.random() * NODE_IDX.length)];
      ARCS.push({ a, b, t: 0, speed: 0.003 + Math.random() * 0.004, life: 1 });
    };
    for (let i = 0; i < 7; i++) spawnArc();

    const PULSES: { idx: number; t: number }[] = [];

    let rotY = 0,
      rotX = -0.15,
      targetRotY = 0;
    let mouseX = 0,
      mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouse);

    const project = (p: { x: number; y: number; z: number }) => {
      const cy_ = Math.cos(rotY),
        sy = Math.sin(rotY);
      const cx_ = Math.cos(rotX),
        sx = Math.sin(rotX);
      let x = p.x * cy_ - p.z * sy;
      let z = p.x * sy + p.z * cy_;
      let y = p.y * cx_ - z * sx;
      z = p.y * sx + z * cx_;
      const persp = 1.6 / (1.6 - z * 0.4);
      return { sx: cx + x * R * persp, sy: cy + y * R * persp, z, persp };
    };

    const arcPoint = (a: Pt, b: Pt, t: number) => {
      const dot = a.x * b.x + a.y * b.y + a.z * b.z;
      const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
      const so = Math.sin(omega) || 1e-6;
      const w1 = Math.sin((1 - t) * omega) / so;
      const w2 = Math.sin(t * omega) / so;
      const lift = 1 + 0.18 * Math.sin(t * Math.PI);
      return {
        x: (a.x * w1 + b.x * w2) * lift,
        y: (a.y * w1 + b.y * w2) * lift,
        z: (a.z * w1 + b.z * w2) * lift
      };
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(140, 180, 230, 0.05)';
      ctx.lineWidth = 1;
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (lat * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 4) {
          const lam = (lon * Math.PI) / 180;
          const sp = project({
            x: Math.cos(phi) * Math.cos(lam),
            y: Math.sin(phi),
            z: Math.cos(phi) * Math.sin(lam)
          });
          if (sp.z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(sp.sx, sp.sy);
            started = true;
          } else ctx.lineTo(sp.sx, sp.sy);
        }
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 15) {
        const lam = (lon * Math.PI) / 180;
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const phi = (lat * Math.PI) / 180;
          const sp = project({
            x: Math.cos(phi) * Math.cos(lam),
            y: Math.sin(phi),
            z: Math.cos(phi) * Math.sin(lam)
          });
          if (sp.z < -0.05) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(sp.sx, sp.sy);
            started = true;
          } else ctx.lineTo(sp.sx, sp.sy);
        }
        ctx.stroke();
      }
    };

    const drawPoints = () => {
      for (let i = 0; i < POINTS.length; i++) {
        const p = POINTS[i];
        const sp = project(p);
        if (sp.z < -0.1) continue;
        const front = (sp.z + 1) / 2;
        const alpha = 0.18 + front * 0.55;
        if (p.isNode) {
          const r = 1.4 + front * 1.4;
          ctx.fillStyle = `rgba(120, 190, 255, ${0.6 + front * 0.4})`;
          ctx.beginPath();
          ctx.arc(sp.sx, sp.sy, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(160, 200, 240, ${alpha * 0.35})`;
          ctx.fillRect(sp.sx, sp.sy, 1, 1);
        }
      }
    };

    const drawArcs = () => {
      for (let i = ARCS.length - 1; i >= 0; i--) {
        const arc = ARCS[i];
        arc.t += arc.speed;
        if (arc.t >= 1) {
          PULSES.push({ idx: arc.b, t: 0 });
          ARCS.splice(i, 1);
          spawnArc();
          continue;
        }
        const A = POINTS[arc.a];
        const B = POINTS[arc.b];

        ctx.strokeStyle = 'rgba(120, 180, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= 1.001; s += 0.04) {
          const sp = project(arcPoint(A, B, s));
          if (sp.z < -0.15) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(sp.sx, sp.sy);
            started = true;
          } else ctx.lineTo(sp.sx, sp.sy);
        }
        ctx.stroke();

        const tailLen = 0.22;
        const segs = 18;
        for (let k = 0; k < segs; k++) {
          const t0 = Math.max(0, arc.t - tailLen * (1 - k / segs));
          const t1 = Math.max(0, arc.t - tailLen * (1 - (k + 1) / segs));
          if (t1 <= 0) continue;
          const sp0 = project(arcPoint(A, B, t0));
          const sp1 = project(arcPoint(A, B, t1));
          if (sp0.z < -0.15 && sp1.z < -0.15) continue;
          const alpha = (k / segs) * 0.9;
          ctx.strokeStyle = `rgba(140, 200, 255, ${alpha})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(sp0.sx, sp0.sy);
          ctx.lineTo(sp1.sx, sp1.sy);
          ctx.stroke();
        }

        const sph = project(arcPoint(A, B, arc.t));
        if (sph.z > -0.15) {
          ctx.fillStyle = 'rgba(180, 220, 255, 1)';
          ctx.beginPath();
          ctx.arc(sph.sx, sph.sy, 2.2, 0, Math.PI * 2);
          ctx.fill();
          const grd = ctx.createRadialGradient(sph.sx, sph.sy, 0, sph.sx, sph.sy, 18);
          grd.addColorStop(0, 'rgba(140, 200, 255, 0.45)');
          grd.addColorStop(1, 'rgba(140, 200, 255, 0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(sph.sx, sph.sy, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawPulses = () => {
      for (let i = PULSES.length - 1; i >= 0; i--) {
        const pl = PULSES[i];
        pl.t += 0.02;
        if (pl.t > 1) {
          PULSES.splice(i, 1);
          continue;
        }
        const sp = project(POINTS[pl.idx]);
        if (sp.z < -0.1) continue;
        const radius = 4 + pl.t * 28;
        ctx.strokeStyle = `rgba(140, 200, 255, ${1 - pl.t})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(sp.sx, sp.sy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawHalo = () => {
      const grd = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.3);
      grd.addColorStop(0, 'rgba(60, 120, 220, 0.18)');
      grd.addColorStop(0.6, 'rgba(40, 80, 200, 0.06)');
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(140, 200, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const r0 = R * 1.04;
        const r1 = R * (i % 5 === 0 ? 1.08 : 1.06);
        ctx.strokeStyle = i % 5 === 0 ? 'rgba(140, 200, 255, 0.35)' : 'rgba(140, 200, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
        ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        ctx.stroke();
      }
    };

    let raf = 0;
    const tick = () => {
      targetRotY += 0.0015;
      rotY += (targetRotY + mouseX * 0.25 - rotY) * 0.04;
      rotX += (-0.15 + mouseY * 0.15 - rotX) * 0.04;
      ctx.clearRect(0, 0, W, H);
      drawHalo();
      drawGrid();
      drawPoints();
      drawArcs();
      drawPulses();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas id="heroCanvas" ref={ref} />;
}
