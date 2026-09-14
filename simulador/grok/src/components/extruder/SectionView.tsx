import { useEffect, useRef } from "react";
import { GEOM, barrelRadius, rPeak } from "@/lib/screw/params";
import { rotateStadium } from "@/lib/screw/geometry";
import { runtime } from "@/lib/screw/runtime";
import { useSim } from "@/store/sim";

const bufA: { x: number; y: number }[] = [];
const bufB: { x: number; y: number }[] = [];

export function SectionView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewMode = useSim((s) => s.viewMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    const ptsA = bufA;
    const ptsB = bufB;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w, h) / (GEOM.centerDistance + barrelRadius * 2 + 8);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(scale, -scale);

      const cd = GEOM.centerDistance;
      const c0 = viewMode === "pair" ? -cd / 2 : 0;
      const c1 = cd / 2;
      const angle = runtime.angle;

      ctx.strokeStyle = "rgba(154,164,178,0.35)";
      ctx.lineWidth = 1.1 / scale;
      ctx.beginPath();
      ctx.arc(c0, 0, barrelRadius, 0, Math.PI * 2);
      if (viewMode === "pair") ctx.arc(c1, 0, barrelRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(154,164,178,0.05)";
      ctx.beginPath();
      ctx.arc(c0, 0, barrelRadius, 0, Math.PI * 2);
      ctx.fill();
      if (viewMode === "pair") {
        ctx.beginPath();
        ctx.arc(c1, 0, barrelRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      rotateStadium(angle, ptsA);
      drawScrew(ctx, c0, ptsA, "#d6dbe3", angle);
      if (viewMode === "pair") {
        rotateStadium(angle + Math.PI / 2, ptsB);
        drawScrew(ctx, c1, ptsB, "#9aa4b2", angle);
      }

      drawArrow(ctx, c0, angle, scale);
      if (viewMode === "pair") drawArrow(ctx, c1, angle, scale);

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [viewMode]);

  return (
    <div className="panel overflow-hidden rounded-lg p-2">
      <div className="mb-1 flex items-center justify-between px-1">
        <p className="text-[10px] font-medium tracking-wide text-muted uppercase">
          Sección
        </p>
        <p className="font-mono text-[10px] text-muted tabular">Ø {GEOM.odNominal}</p>
      </div>
      <canvas
        ref={canvasRef}
        className="block h-36 w-full md:h-40"
        aria-label="Sección transversal de los tornillos co-rotantes"
      />
      <p className="px-1 pt-1 text-[10px] leading-snug text-muted">
        Ambos tornillos giran en el mismo sentido. Desfase 90°.
      </p>
    </div>
  );
}

function drawScrew(
  ctx: CanvasRenderingContext2D,
  cx: number,
  pts: { x: number; y: number }[],
  fill: string,
  _angle: number,
) {
  ctx.save();
  ctx.translate(cx, 0);
  ctx.beginPath();
  if (!pts.length) {
    ctx.restore();
    return;
  }
  ctx.moveTo(pts[0]!.x, pts[0]!.y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.globalAlpha = 0.88;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(12,13,15,0.55)";
  ctx.lineWidth = 0.35;
  ctx.stroke();

  const s = GEOM.squareShaftSide / 2;
  ctx.fillStyle = "#0c0d0f";
  ctx.fillRect(-s, -s, s * 2, s * 2);
  ctx.strokeStyle = "rgba(214,219,227,0.45)";
  ctx.lineWidth = 0.25;
  ctx.strokeRect(-s, -s, s * 2, s * 2);
  ctx.restore();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  angle: number,
  scale: number,
) {
  const r = rPeak + 2.4;
  ctx.save();
  ctx.translate(cx, 0);
  ctx.strokeStyle = "rgba(214,219,227,0.55)";
  ctx.lineWidth = 1.2 / scale;
  ctx.beginPath();
  const a0 = angle + 0.35;
  const a1 = angle + 1.15;
  ctx.arc(0, 0, r, a0, a1);
  ctx.stroke();
  const x = r * Math.cos(a1);
  const y = r * Math.sin(a1);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x - 1.4 * Math.cos(a1 - 0.5),
    y - 1.4 * Math.sin(a1 - 0.5),
  );
  ctx.lineTo(
    x - 1.4 * Math.cos(a1 + 0.9),
    y - 1.4 * Math.sin(a1 + 0.9),
  );
  ctx.closePath();
  ctx.fillStyle = "rgba(214,219,227,0.7)";
  ctx.fill();
  ctx.restore();
}
