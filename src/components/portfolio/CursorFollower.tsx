import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const shapeRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const shape = shapeRef.current;
    if (!dot || !shape) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      dot.style.display = "none";
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      const dotSize = dot.getBoundingClientRect().width || 44;
      const offset = dotSize / 2;
      let lastX = window.innerWidth / 2;
      let lastY = window.innerHeight / 2;
      let lastT = performance.now();
      let settleTween: { kill: () => void } | null = null;

      gsap.set(dot, { x: window.innerWidth / 2 - offset, y: window.innerHeight / 2 - offset });
      gsap.set(shape, { transformOrigin: "50% 50%" });

      const xTo = gsap.quickTo(dot, "x", { duration: 1, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        const now = performance.now();
        const dt = Math.max(now - lastT, 8);
        const speed = Math.min((Math.hypot(dx, dy) / dt) * 16.67, 42);
        const stretch = 1 + speed * 0.018;
        const squeeze = Math.max(1 - speed * 0.012, 0.72);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        xTo(event.clientX - offset);
        yTo(event.clientY - offset);

        gsap.to(shape, {
          rotate: Number.isFinite(angle) ? angle : 0,
          scaleX: stretch,
          scaleY: squeeze,
          duration: 0.18,
          ease: "power2.out",
          overwrite: true
        });

        settleTween?.kill();
        settleTween = gsap.to(shape, {
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.38,
          ease: "power3.out",
          delay: 0.03,
          overwrite: true
        });

        lastX = event.clientX;
        lastY = event.clientY;
        lastT = now;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        settleTween?.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 h-11 w-11 text-white mix-blend-difference will-change-transform"
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true" focusable="false">
        <g ref={shapeRef}>
          <circle cx="24" cy="24" r="24" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
