import { useEffect, useRef, useState } from "react";
import { cssVar } from "../theme";

const W = 560;
const H = 420;

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, Math.max(w, 0.01), h, r);
}

function fresh() {
  return {
    mouse: null,
    prev: null,
    speed: 0,
    rate: 0,
    t: 0,
    froth: 0,
    rot: 0,
    done: false,
    startedAt: 0,
    elapsed: 0,
    foam: Array.from({ length: 70 }, () => ({
      a: Math.random() * 6.28,
      r: Math.random(),
      s: 1.5 + Math.random() * 2.5,
    })),
  };
}

// slow circles in the bowl froth the tea, going too fast loses froth
// score is how many seconds it takes to fill the froth bar
export default function WhiskGame({ onFinish }) {
  const canvasRef = useRef(null);
  const w = useRef(fresh());
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const draw = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const s = w.current;
        if (!s.done) s.froth = Math.max(0, s.froth - 0.012);
        s.speed *= 0.96;
        s.rate *= 0.93;

        ctx.clearRect(0, 0, W, H);
        const cx = 280;
        const cy = 230;
        const R = 145;

        ctx.fillStyle = "#6B6152";
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, 6.283);
        ctx.fill();

        const gr = ctx.createRadialGradient(cx - 30, cy - 30, 20, cx, cy, R - 12);
        gr.addColorStop(0, "#87AE62");
        gr.addColorStop(1, "#4FB227");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(cx, cy, R - 12, 0, 6.283);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,.16)";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(cx, cy, 45 + i * 32, s.rot + i * 2.1, s.rot + i * 2.1 + 1.5);
          ctx.stroke();
        }

        const n = Math.floor((s.froth / 100) * s.foam.length);
        ctx.fillStyle = "rgba(240,247,228,.9)";
        for (let i = 0; i < n; i++) {
          const f = s.foam[i];
          ctx.beginPath();
          ctx.arc(
            cx + Math.cos(f.a + s.rot * 0.15) * f.r * (R - 30),
            cy + Math.sin(f.a + s.rot * 0.15) * f.r * (R - 30),
            f.s,
            0,
            6.283
          );
          ctx.fill();
        }

        if (s.mouse) {
          const mx = cx + Math.max(-R + 40, Math.min(R - 40, s.mouse.x - cx));
          const my = cy + Math.max(-R + 40, Math.min(R - 40, s.mouse.y - cy));
          ctx.strokeStyle = "#A98555";
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(mx, my - 78);
          ctx.lineTo(mx, my - 26);
          ctx.stroke();
          ctx.strokeStyle = "#C9A876";
          ctx.lineWidth = 2;
          for (let i = -4; i <= 4; i++) {
            ctx.beginPath();
            ctx.moveTo(mx, my - 26);
            ctx.quadraticCurveTo(mx + i * 5, my - 6, mx + i * 4, my + 14);
            ctx.stroke();
          }
        }

        rr(ctx, 180, 22, 200, 16, 8);
        ctx.fillStyle = "rgba(128,128,128,.28)";
        ctx.fill();
        rr(ctx, 180, 22, (200 * s.froth) / 100, 16, 8);
        ctx.fillStyle = "#4FB227";
        ctx.fill();

        const secs = s.done
          ? s.elapsed
          : s.startedAt
          ? (performance.now() - s.startedAt) / 1000
          : 0;

        ctx.fillStyle = cssVar("--m-ink", "#2B3A26");
        ctx.textAlign = "center";
        ctx.font = s.done ? "16px Jost, sans-serif" : "13px Jost, sans-serif";
        ctx.fillText(
          s.done
            ? "frothed in " + secs.toFixed(1) + "s, take a sip ♡"
            : s.rate > 12
            ? "too fast, slow down into gentle circles"
            : "froth, gentle circles, not fast ones",
          280,
          58
        );
        if (!s.done && s.startedAt) {
          ctx.font = "13px Jost, sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(secs.toFixed(1) + "s", 18, 32);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    const el = canvasRef.current;
    const s = w.current;
    if (!el || s.done) return;
    const r = el.getBoundingClientRect();
    const p = {
      x: ((e.clientX - r.left) * el.width) / r.width,
      y: ((e.clientY - r.top) * el.height) / r.height,
    };
    const t = performance.now();
    if (!s.startedAt) s.startedAt = t;
    s.mouse = p;
    const a = Math.atan2(p.y - 230, p.x - 280);
    if (s.prev != null) {
      let d = a - s.prev;
      if (d > Math.PI) d -= 6.283;
      if (d < -Math.PI) d += 6.283;
      const dt = Math.max(0.008, (t - (s.t || t)) / 1000);
      s.rate = s.rate * 0.7 + (Math.abs(d) / dt) * 0.3;
      s.speed = s.speed * 0.8 + Math.abs(d) * 0.2;
      s.rot += d;
      if (s.rate > 12) s.froth = Math.max(0, s.froth - 0.35);
      else if (s.speed > 0.008)
        s.froth = Math.min(100, s.froth + Math.min(Math.abs(d), 0.3) * 6);
      if (s.froth >= 100) {
        s.done = true;
        s.mouse = null;
        s.elapsed = (t - s.startedAt) / 1000;
        setDone(true);
        if (onFinish) onFinish(Number(s.elapsed.toFixed(1)));
      }
    }
    s.t = t;
    s.prev = a;
  };

  const again = () => {
    w.current = fresh();
    setDone(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerMove={onMove}
        className="mx-auto block w-full max-w-[1140px] cursor-crosshair touch-none rounded-[18px] bg-bg2"
      />
      {done && (
        <button type="button" onClick={again} className="m-pill">
          whisk another bowl
        </button>
      )}
    </div>
  );
}
