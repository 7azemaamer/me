import { onMount, onCleanup } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const headline = "Every Byte Has a Beginning";
  const sub = "This is where ideas turn into code.";

  let titleRef, subRef, cursorRef, glowRef;
  let tl;

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const letters = titleRef.querySelectorAll(".letter");

      gsap.set([letters, subRef, cursorRef], { opacity: 0 });
      gsap.set(glowRef, { opacity: 0 });

      tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // glow in
      tl.to(glowRef, { opacity: 1, duration: 0.8 });

      // typewriter effect
      tl.to(
        letters,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.02,
          stagger: 0.03,
          onStart: () => {
            gsap.to(cursorRef, { opacity: 1, duration: 0.2 });
            gsap.to(cursorRef, {
              opacity: 0.2,
              repeat: -1,
              yoyo: true,
              duration: 0.5,
            });
          },
        },
        "-=0.2"
      );

      tl.to(cursorRef, { opacity: 1, duration: 0.2 });

      tl.fromTo(
        subRef,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "+=0.1"
      );

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "+=200",
        onUpdate: (self) => {},
      });
    });

    return () => {
      tl?.kill();
      gsap.globalTimeline.clear();
      mm.revert();
    };
  });

  const split = (text) => {
    const words = text.split(" ");

    return words
      .map((word, wordIndex) => {
        return [
          ...word.split("").map((ch, charIndex) => {
            if (wordIndex === words.length - 1 && ch.toLowerCase() === "g") {
              return (
                <span
                  class="letter inline-block will-change-transform"
                  style="filter:blur(6px)"
                  id="beginning-word"
                >
                  {ch}
                </span>
              );
            }
            return (
              <span
                class="letter inline-block will-change-transform"
                style="filter:blur(6px)"
              >
                {ch}
              </span>
            );
          }),
          wordIndex < words.length - 1 ? (
            <span
              class="letter inline-block will-change-transform"
              style="filter:blur(6px)"
            >
              {"\u00A0"}
            </span>
          ) : null,
        ];
      })
      .flat()
      .filter(Boolean);
  };

  return (
    <section
      class="relative min-h-screen translate-x-0 text-neutral-900 flex items-center justify-center overflow-hidden"
      aria-label="Intro"
    >
      {/* Soft colored glow */}
      <div
        ref={(el) => (glowRef = el)}
        class="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full"
          style="
            background: radial-gradient(closest-side, rgba(28,117,188,0.08), transparent 60%);
            filter: blur(25px);
          "
        />
      </div>

      <div class="relative text-center px-6">
        <h1
          ref={(el) => (titleRef = el)}
          class="font-[600] tracking-[-0.02em] leading-[1.05] text-[42px] sm:text-[64px] md:text-[88px] select-none"
        >
          {split(headline)}
          <span
            ref={(el) => (cursorRef = el)}
            class="inline-block ml-2 align-baseline text-[#8c8c8c]"
          >
            |
          </span>
        </h1>
        <p
          ref={(el) => (subRef = el)}
          class="mt-5 text-[16px] sm:text-[18px] md:text-[20px] text-neutral-600"
        >
          {sub}
        </p>
      </div>
    </section>
  );
}
