import { useCallback, useEffect, useRef, useState } from "react";
import { cssVar } from "../theme";

const W = 560;
const H = 420;
const ROUND = 60; // seconds

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, Math.max(w, 0.01), h, r);
}

// catch falling leaves in the cup, one minute a round
// score is how many you gather before the minute runs out
export default function LeafCatch({ pace = 1, onFinish }) {
  const canvasRef = useRef(null);
  const c = useRef({ x: 280, items: [], caught: 0, last: 0, ripples: [], startedAt: 0 });
  const [over, setOver] = useState(false);
  const paceRef = useRef(pace);
  paceRef.current = pace;
  const overRef = useRef(false);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  const reset = useCallback(() => {
    c.current = { x: 280, items: [], caught: 0, last: 0, ripples: [], startedAt: 0 };
    overRef.current = false;
    setOver(false);
  }, []);

  useEffect(() => {
    let raf;
    const draw = (now) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const s = c.current;
        const p = paceRef.current;
        const left = s.startedAt
          ? Math.max(0, ROUND - (now - s.startedAt) / 1000)
          : ROUND;

        if (s.startedAt && left === 0 && !overRef.current) {
          overRef.current = true;
          setOver(true);
          if (finishRef.current) finishRef.current(s.caught);
        }

        if (!overRef.current && now - s.last > 1050 / p) {
          s.last = now;
          s.items.push({
            x: 40 + Math.random() * 480,
            y: -20,
            vy: (0.9 + Math.random() * 0.7) * p,
            rot: Math.random() * 6.28,
            vr: (Math.random() - 0.5) * 0.06,
            leaf: Math.random() > 0.35,
          });
        }

        ctx.clearRect(0, 0, W, H);

        s.items = s.items.filter((it) => {
          it.y += it.vy * 1.6;
          it.rot += it.vr;
          if (
            !overRef.current &&
            it.y > 322 &&
            it.y < 360 &&
            Math.abs(it.x - s.x) < 46
          ) {
            s.caught++;
            s.ripples.push({ x: it.x, y: 330, r: 4, a: 0.6 });
            return false;
          }
          if (it.y > 430) return false;
          ctx.save();
          ctx.translate(it.x, it.y);
          ctx.rotate(it.rot);
          ctx.globalAlpha = it.y > 370 ? Math.max(0, 1 - (it.y - 370) / 60) : 1;
          if (it.leaf) {
            ctx.fillStyle = "#5FC22F";
            ctx.beginPath();
            ctx.ellipse(0, 0, 11, 5.5, 0, 0, 6.283);
            ctx.fill();
            ctx.strokeStyle = "#2F7D14";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-9, 0);
            ctx.lineTo(9, 0);
            ctx.stroke();
          } else {
            ctx.fillStyle = "#4FB227";
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, 6.283);
            ctx.fill();
          }
          ctx.restore();
          return true;
        });

        s.ripples = s.ripples.filter((rp) => {
          rp.r += 1.4;
          rp.a -= 0.02;
          if (rp.a <= 0) return false;
          ctx.strokeStyle = "rgba(74,107,58," + rp.a + ")";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r, 0, 6.283);
          ctx.stroke();
          return true;
        });

        const x = Math.max(40, Math.min(520, s.x));
        rr(ctx, x - 34, 330, 68, 62, [4, 4, 18, 18]);
        ctx.fillStyle = "#A9C48A";
        ctx.fill();
        rr(ctx, x - 34, 330, 68, 62, [4, 4, 18, 18]);
        ctx.strokeStyle = "#33502A";
        ctx.lineWidth = 2;
        ctx.stroke();
        rr(ctx, x - 34, 330, 68, 22, [4, 4, 0, 0]);
        ctx.fillStyle = "#4C6B3C";
        ctx.fill();
        ctx.fillStyle = "#26401A";
        ctx.beginPath();
        ctx.arc(x - 12, 366, 3, 0, 6.283);
        ctx.arc(x + 12, 366, 3, 0, 6.283);
        ctx.fill();
        ctx.strokeStyle = "#26401A";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, 370, 6, 0.3, 2.84);
        ctx.stroke();

        ctx.fillStyle = cssVar("--m-ink", "#2B3A26");
        ctx.font = "14px Jost, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("gathered, " + s.caught, 18, 32);
        ctx.textAlign = "right";
        ctx.fillText(
          overRef.current
            ? "time"
            : s.startedAt
            ? Math.ceil(left) + "s left"
            : "move to start",
          542,
          32
        );
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    const el = canvasRef.current;
    if (!el || overRef.current) return;
    const r = el.getBoundingClientRect();
    c.current.x = ((e.clientX - r.left) * el.width) / r.width;
    if (!c.current.startedAt) c.current.startedAt = performance.now();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onPointerMove={onMove}
        className="mx-auto block w-full max-w-[1140px] cursor-none touch-none rounded-[18px] bg-gradient-to-b from-bg2 to-bg"
      />
      {over && (
        <button type="button" onClick={reset} className="m-pill">
          another minute
        </button>
      )}
    </div>
  );
}
