import { onMount, onCleanup } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectingLine() {
  let pathRef, svgRef, scrollTrigger;

  const createArtPath = () => {
    const startEl = document.getElementById("beginning-word");
    const endEl = document.getElementById("how-it-started");

    if (!startEl || !endEl) {
      console.warn("ConnectingLine: Missing start or end element");
      return false;
    }

    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 + window.scrollX;
    const startY = startRect.bottom + 10 + window.scrollY;
    const endX = endRect.left + endRect.width / 2 + window.scrollX;
    const endY = endRect.top - 15 + window.scrollY;

    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const height = endY - startY;

    let path = `M ${startX},${startY}`;

    const curve1Y = startY + height * 0.2;
    const offset1 = 120;
    path += ` Q ${startX + offset1},${curve1Y} ${centerX - 80},${curve1Y + 60}`;

    const loopRadius = 45;
    const loopCenterX = centerX;
    const loopCenterY = centerY - 40;

    path += ` Q ${loopCenterX - loopRadius},${loopCenterY} ${loopCenterX},${
      loopCenterY - loopRadius
    }`;
    path += ` Q ${loopCenterX + loopRadius},${loopCenterY} ${loopCenterX},${
      loopCenterY + loopRadius
    }`;
    path += ` Q ${loopCenterX - loopRadius},${loopCenterY} ${
      loopCenterX - 20
    },${loopCenterY + 30}`;

    const curve2Y = endY - height * 0.25;
    const offset2 = -100;
    path += ` Q ${centerX + offset2},${curve2Y} ${endX - 40},${curve2Y + 40}`;

    path += ` Q ${endX + 30},${endY - 30} ${endX},${endY}`;

    pathRef.setAttribute("d", path);

    const length = pathRef.getTotalLength();
    pathRef.style.strokeDasharray = length;
    pathRef.style.strokeDashoffset = length;

    return true;
  };

  onMount(() => {
    setTimeout(() => {
      if (!createArtPath()) return;

      window.addEventListener("resize", () => {
        setTimeout(createArtPath, 100);
        ScrollTrigger.refresh();
      });

      scrollTrigger = ScrollTrigger.create({
        trigger: document.getElementById("beginning-word"),
        start: "bottom 50%",
        endTrigger: document.getElementById("how-it-started"),
        end: "top 100%",
        scrub: 2,
        onUpdate: (self) => {
          const length = pathRef.getTotalLength();
          pathRef.style.strokeDashoffset = length * (1 - self.progress);
          pathRef.style.opacity = self.progress > 0.02 ? 0.9 : 0;
        },
        onComplete: () => {
          pathRef.style.strokeDashoffset = 0;
          pathRef.style.opacity = 0.9;
        },
      });
    }, 500);
  });

  onCleanup(() => {
    if (scrollTrigger) scrollTrigger.kill();
    window.removeEventListener("resize", createArtPath);
  });

  return (
    <svg
      ref={(el) => (svgRef = el)}
      class="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style="overflow: visible;"
    >
      <defs>
        <linearGradient id="appleGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.6)" />
          <stop offset="50%" stop-color="rgba(200,220,255,0.4)" />
          <stop offset="100%" stop-color="rgba(170,170,170,0.2)" />
        </linearGradient>
        <filter id="subtleBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        ref={(el) => (pathRef = el)}
        fill="none"
        stroke="url(#appleGlass)"
        stroke-width="2"
        opacity="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#subtleBlur)"
      />
    </svg>
  );
}
