import { onMount } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Spark() {
  const headline = "The Spark";
  const subheadline = "How It All Started";
  const story =
    "Late nights, glowing screen, endless curiosity. That first 'Hello World' wasn't just code it was the moment everything clicked.";

  let sectionRef,
    titleRef,
    subtitleRef,
    storyRef,
    glowRef,
    codeRef,
    dotsRef,
    laptopRef;

  onMount(() => {
    gsap.set([titleRef, subtitleRef, storyRef, codeRef, laptopRef], {
      opacity: 0,
      y: 20,
    });
    gsap.set(glowRef, { opacity: 0, scale: 0.8 });
    gsap.set(dotsRef?.children, { opacity: 0, scale: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      defaults: { ease: "power2.out" },
    });

    // Glow fades in & grows
    tl.to(glowRef, { opacity: 1, scale: 1, duration: 1.2 });

    // Laptop silhouette appears
    tl.to(laptopRef, { opacity: 0.15, duration: 1 }, "-=0.8");

    // Headline
    tl.to(titleRef, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // Subheadline
    tl.to(subtitleRef, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // Typewriter story
    tl.call(() => {
      storyRef.textContent = "";
      let index = 0;
      const typer = setInterval(() => {
        storyRef.textContent += story[index];
        index++;
        if (index >= story.length) clearInterval(typer);
      }, 30);
    });

    tl.to(storyRef, { opacity: 1, duration: 0.5 }, "-=1");

    // Code snippet
    tl.to(codeRef, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

    // Floating dots
    tl.to(
      dotsRef?.children,
      {
        opacity: 0.3,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
      },
      "-=0.6"
    );

    // Loop animations
    gsap.to(glowRef, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(dotsRef?.children, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });
  });

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="relative md:min-h-[600px] bg-white text-neutral-900 flex items-center justify-center overflow-hidden px-6"
    >
      {/* Glow Background */}
      <div
        ref={(el) => (glowRef = el)}
        class="absolute w-[400px] h-[400px] rounded-full bg-gray-200 blur-3xl opacity-50"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Floating dots */}
      <div
        ref={(el) => (dotsRef = el)}
        class="absolute w-full h-full pointer-events-none"
      >
        {Array.from({ length: 10 }).map(() => (
          <div
            class="absolute w-2 h-2 bg-gray-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div class="relative text-center max-w-3xl mx-auto z-10">
        <h2
          ref={(el) => (titleRef = el)}
          class="font-bold tracking-tight text-[42px] sm:text-[64px] md:text-[72px] mb-4"
        >
          {headline}
        </h2>

        <h3
          ref={(el) => (subtitleRef = el)}
          id="how-it-started"
          class="text-lg sm:text-xl md:text-2xl text-neutral-600 mb-8 font-medium"
        >
          {subheadline}
        </h3>

        <p
          ref={(el) => (storyRef = el)}
          class="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed mb-8 opacity-0"
        ></p>

        <div
          ref={(el) => (codeRef = el)}
          class="inline-block bg-neutral-50 border border-neutral-200 rounded-lg px-6 py-4 font-mono text-sm text-neutral-700 opacity-0"
        >
          <span class="text-purple-600">console</span>
          <span class="text-neutral-400">.</span>
          <span class="text-blue-600">log</span>
          <span class="text-neutral-400">(</span>
          <span class="text-green-600">"Hello World"</span>
          <span class="text-neutral-400">);</span>
          <span class="animate-pulse text-neutral-400 ml-1">|</span>
        </div>
      </div>
    </section>
  );
}
