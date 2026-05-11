import { useEffect, useRef } from "react";

type Props = {
  label: string;
  name: string;
  handle: string;
  bio: string;
};

export default function HeroSection({ label, name, handle, bio }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frontRef = useRef<HTMLHeadingElement | null>(null);
  const backRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    if (!section || !front || !back) return;

    let cancelled = false;
    let cleanup = () => {};

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      const frontX = gsap.quickTo(front, "x", { duration: 0.45, ease: "power3.out" });
      const frontY = gsap.quickTo(front, "y", { duration: 0.45, ease: "power3.out" });
      const backX = gsap.quickTo(back, "x", { duration: 0.6, ease: "power3.out" });
      const backY = gsap.quickTo(back, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const rx = (event.clientX - rect.left) / rect.width - 0.5;
        const ry = (event.clientY - rect.top) / rect.height - 0.5;
        frontX(rx * 16);
        frontY(ry * 10);
        backX(rx * -26);
        backY(ry * -14);
      };

      const onLeave = () => {
        frontX(0);
        frontY(0);
        backX(0);
        backY(0);
      };

      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="js-hero relative overflow-hidden border-b border-[var(--border)] py-14 pb-12 max-[768px]:py-10 max-[768px]:pb-9"
    >
      <p className="mb-4 [font-family:var(--font-mono)] text-xs tracking-[0.12em] text-[var(--muted)] uppercase">{label}</p>
      <p
        ref={backRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-0 z-[0] m-0 [font-family:var(--font-display)] text-[clamp(3.8rem,15vw,12rem)] leading-[0.86] tracking-[0.04em] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--fg)_22%,transparent)] select-none max-[768px]:top-22 max-[768px]:text-[clamp(2.3rem,16vw,4.8rem)]"
      >
        {handle}
      </p>
      <h1
        ref={frontRef}
        className="relative z-[1] m-0 max-w-[12ch] [font-family:var(--font-display)] text-[clamp(2.5rem,8.8vw,6.8rem)] leading-[0.9] tracking-[0.02em] [text-shadow:0_0_24px_color-mix(in_srgb,var(--fg)_24%,transparent)] max-[768px]:max-w-[14ch] max-[768px]:text-[clamp(1.85rem,9.2vw,3.2rem)]"
      >
        {name}
      </h1>
      <p className="relative z-[1] mt-4 mb-3 [font-family:var(--font-mono)] text-base text-[var(--muted)] max-[768px]:text-sm">
        @{handle}
      </p>
      <p className="relative z-[1] m-0 max-w-[66ch] text-[1.03rem] leading-[1.62] text-[color:color-mix(in_srgb,var(--fg)_90%,var(--bg))] max-[768px]:text-[0.94rem] max-[768px]:leading-[1.52]">
        {bio}
      </p>
    </section>
  );
}

