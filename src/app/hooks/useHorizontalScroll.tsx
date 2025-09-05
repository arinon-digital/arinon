"use client";

import { useEffect } from "react";

const useHorizontalScroll = () => {
  useEffect(() => {
    let mm: any; // optional reference for future Split/MatchMedia usage
    let ctx: any;
    let st: any;

    // run only in browser
    if (typeof window === "undefined") return;

    let killed = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Respect reduced-motion
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const container = document.querySelector(".thecontainer") as HTMLElement | null;
      const sections = gsap.utils.toArray<HTMLElement>(".panel");

      if (!container || sections.length === 0) return;

      // helper: set panel widths so xPercent math works
      const setSizes = () => {
        const w = window.innerWidth;
        sections.forEach((s) => {
          s.style.width = `${w}px`;
        });
      };

      setSizes();

      // Make sure any previous triggers are killed (hot reload)
      ScrollTrigger.getAll().forEach((t: any) => t.kill());

      // Use a context so cleanup is easier on HMR
      ctx = gsap.context(() => {
        const totalX = container.scrollWidth - window.innerWidth;

        // If nothing to scroll, skip
        if (totalX <= 0) return;

        // Move the whole container left by the scrollable width
        const tween = gsap.to(container, {
          x: () => -totalX,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => "+=" + totalX,
            pin: true,
            scrub: 0.6,
            snap: sections.length > 1 ? 1 / (sections.length - 1) : 1,
            invalidateOnRefresh: true,
            // optional callbacks for debugging
            onEnter: () => {},
          },
        });

        st = tween.scrollTrigger;
      }, container);

      // refresh on resize / orientation change
      let tId: number | null = null;
      const onResize = () => {
        setSizes();
        if (tId) window.clearTimeout(tId);
        tId = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);
      };
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onResize);

      // refresh after fonts load (optional)
      if ((document as any).fonts && (document as any).fonts.ready) {
        (document as any).fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      }

      // cleanup fn
      return () => {
        killed = true;
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        try {
          if (st) st.kill();
        } catch (e) {}
        try {
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
        } catch (e) {}
        try {
          if (ctx) ctx.revert();
        } catch (e) {}
      };
    })();

    // final cleanup for useEffect return — ensures HMR or unmount cleans up
    return () => {
      try {
        // kill any ScrollTrigger instances — safe guard
        const { ScrollTrigger } = (window as any).ScrollTrigger ? (window as any) : { ScrollTrigger: null };
        if (ScrollTrigger && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
        }
      } catch (e) {}
    };
  }, []);
};

export default useHorizontalScroll;
