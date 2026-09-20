import React, { useEffect, useRef } from 'react';

const YELLOW = { r: 255, g: 229, b: 0 };

const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const buildGraph = (width, height, compact) => {
  const rand = mulberry32(20260905);
  const nodes = [];
  const edges = [];
  const layers = compact ? 5 : 7;
  const perLayer = compact ? 6 : 8;
  const padX = width * 0.05;
  const padY = height * 0.08;
  const columns = [];

  for (let layer = 0; layer < layers; layer += 1) {
    const count = perLayer + (layer % 2 === 0 ? 1 : 0);
    const ids = [];
    const x = padX + (layer / Math.max(1, layers - 1)) * (width - padX * 2);

    for (let i = 0; i < count; i += 1) {
      const y = padY + (i / Math.max(1, count - 1)) * (height - padY * 2);
      const depth = 0.35 + (layer / Math.max(1, layers - 1)) * 0.45;
      nodes.push({
        bx: x + (rand() - 0.5) * 44,
        by: y + (rand() - 0.5) * 32,
        x: 0,
        y: 0,
        depth,
        radius: 1.6 + depth * 1.5,
      });
      ids.push(nodes.length - 1);
    }
    columns.push(ids);
  }

  nodes.forEach((node) => {
    node.x = node.bx;
    node.y = node.by;
  });

  const link = (a, b) => {
    if (a === b) return;
    if (edges.some((edge) => (edge.a === a && edge.b === b) || (edge.a === b && edge.b === a))) return;
    edges.push({ a, b });
  };

  columns.forEach((ids, layer) => {
    const next = columns[layer + 1];
    ids.forEach((id, index) => {
      if (next) {
        const target = Math.round((index / Math.max(1, ids.length - 1)) * (next.length - 1));
        link(id, next[target]);
        if (next[target + 1]) link(id, next[target + 1]);
        if (next[target - 1]) link(id, next[target - 1]);
      }
      if (index < ids.length - 1) link(id, ids[index + 1]);
    });
  });

  return { nodes, edges };
};

const NeuralField = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 768px)').matches;

    let width = 0;
    let height = 0;
    let graph = { nodes: [], edges: [] };
    let raf = 0;
    let running = true;
    const pointer = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      inside: false,
      influence: 0,
    };

    const resize = () => {
      width = Math.max(1, wrap.clientWidth);
      height = Math.max(1, wrap.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(width, height, compact);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Completely invisible if mouse influence has faded out
      if (pointer.influence <= 0.001) return;

      const radius = compact ? 170 : 220;
      const inf = pointer.influence;

      // Subtle ambient backlight strictly under the cursor
      const grad = ctx.createRadialGradient(
        pointer.x, pointer.y, 0,
        pointer.x, pointer.y, radius
      );
      grad.addColorStop(0, `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, ${0.07 * inf})`);
      grad.addColorStop(0.55, `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, ${0.02 * inf})`);
      grad.addColorStop(1, `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Connecting links (0% base opacity, quadratic proximity falloff)
      graph.edges.forEach((edge) => {
        const a = graph.nodes[edge.a];
        const b = graph.nodes[edge.b];
        const midX = (a.x + b.x) * 0.5;
        const midY = (a.y + b.y) * 0.5;
        const dist = Math.hypot(pointer.x - midX, pointer.y - midY);

        if (dist >= radius) return;

        const proximity = 1 - dist / radius;
        const intensity = proximity * proximity * inf;
        if (intensity <= 0.002) return;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, ${(intensity * 0.45).toFixed(3)})`;
        ctx.lineWidth = 1 + intensity * 0.6;
        ctx.stroke();
      });

      // Nodes (0% base opacity, quadratic proximity falloff)
      graph.nodes.forEach((node) => {
        const dist = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        if (dist >= radius) return;

        const proximity = 1 - dist / radius;
        const intensity = proximity * proximity * inf;
        if (intensity <= 0.002) return;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + intensity * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${YELLOW.r}, ${YELLOW.g}, ${YELLOW.b}, ${(intensity * 0.8).toFixed(3)})`;
        ctx.fill();
      });
    };

    const step = () => {
      if (!running) return;

      const targetInfluence = pointer.inside ? 1 : 0;
      const lerpSpeed = pointer.inside ? 0.08 : 0.12;
      pointer.influence += (targetInfluence - pointer.influence) * lerpSpeed;
      if (!pointer.inside && pointer.influence < 0.005) {
        pointer.influence = 0;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      if (pointer.influence > 0.001 || pointer.inside) {
        const time = performance.now() * 0.0003;
        graph.nodes.forEach((node, i) => {
          const idleX = Math.sin(time + i * 0.73) * 2 * node.depth;
          const idleY = Math.cos(time * 0.86 + i * 0.51) * 1.5 * node.depth;
          const parallax = (pointer.x / width - 0.5) * (node.depth - 0.4) * 8 * pointer.influence;
          const parally = (pointer.y / height - 0.5) * (node.depth - 0.4) * 6 * pointer.influence;
          const ox = node.bx + idleX + parallax;
          const oy = node.by + idleY + parally;
          node.x += (ox - node.x) * 0.06;
          node.y += (oy - node.y) * 0.06;
        });
        draw();
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        pointer.inside = false;
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointer.inside = inside;
      if (inside) {
        pointer.tx = event.clientX - rect.left;
        pointer.ty = event.clientY - rect.top;
        if (pointer.influence < 0.01) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
      }
    };

    const onLeave = () => {
      pointer.inside = false;
    };

    const onVisibility = () => {
      if (document.hidden) {
        pointer.inside = false;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    if (!reduced) {
      raf = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div ref={wrapRef} className="neural-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default NeuralField;
