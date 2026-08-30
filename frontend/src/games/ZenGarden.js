import { useCallback, useEffect, useRef } from "react";

const W = 560;
const H = 400;

// rake the sand around the stones, press and drag, button smooths it over
export default function ZenGarden() {
  const canvasRef = useRef(null);
  const drag = useRef(false);
  const prev = useRef(null);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#E9DFC6";
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = "rgba(120,100,70," + Math.random() * 0.09 + ")";
      ctx.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
    }
    [
      [140, 130, 26],
      [400, 250, 34],
      [330, 100, 18],
    ].forEach(([x, y, r]) => {
      ctx.strokeStyle = "rgba(130,110,78,.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, r + 14, 0, 6.283);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r + 26, 0, 6.283);
      ctx.stroke();
      ctx.fillStyle = "rgba(60,50,35,.25)";
      ctx.beginPath();
      ctx.ellipse(x + 3, y + 5, r, r * 0.8, 0, 0, 6.283);
      ctx.fill();
      const g = ctx.createRadialGradient(x - r / 3, y - r / 3, 2, x, y, r);
      g.addColorStop(0, "#8A8577");
      g.addColorStop(1, "#57534A");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.82, 0, 0, 6.283);
      ctx.fill();
    });
  }, []);

  useEffect(paint, [paint]);

  const pt = (e) => {
    const el = canvasRef.current;
    const r = el.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * el.width) / r.width,
      y: ((e.clientY - r.top) * el.height) / r.height,
    };
  };

  const onDown = (e) => {
    drag.current = true;
    prev.current = pt(e);
  };
  const onUp = () => {
    drag.current = false;
    prev.current = null;
  };
  const onMove = (e) => {
    if (!drag.current || !canvasRef.current) return;
    const p = pt(e);
    const q = prev.current;
    if (!q) {
      prev.current = p;
      return;
    }
    const dx = p.x - q.x;
    const dy = p.y - q.y;
    const len = Math.hypot(dx, dy);
    if (len < 3) return;
    const nx = -dy / len;
    const ny = dx / len;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
    [-8, 0, 8].forEach((o) => {
      ctx.strokeStyle = "rgba(125,104,72,.5)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(q.x + nx * o, q.y + ny * o);
      ctx.lineTo(p.x + nx * o, p.y + ny * o);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,250,235,.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(q.x + nx * (o + 3), q.y + ny * (o + 3));
      ctx.lineTo(p.x + nx * (o + 3), p.y + ny * (o + 3));
      ctx.stroke();
    });
    prev.current = p;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="block w-full max-w-[1140px] cursor-crosshair touch-none rounded-[18px]"
      />
      <button type="button" onClick={paint} className="m-pill">
        smooth the sand
      </button>
    </div>
  );
}
