import { onMount, onCleanup } from "solid-js";
import { For } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  let sectionRef,
    titleRef,
    cardRefs = [],
    starRefs = [];
  let tl, starTl;

  const testimonials = [
    {
      text: "exceptional.execution()",
      description:
        "Built our entire e-commerce platform from scratch. Clean architecture, zero downtime.",
      name: "sarah_chen",
      rating: 5
    },
    {
      text: "beyond.expectations++",
      description:
        "Delivered complex automation system ahead of schedule. Perfect code quality.",
      name: "marcus_rodriguez",
      rating: 5
    },
    {
      text: "pure_excellence.deploy()",
      description:
        "Transformed our legacy system into modern scalable architecture. Incredible work.",
      name: "ahmed_mansouri",
      rating: 5
    },
  ];

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Initial state - everything hidden
      gsap.set([titleRef, ...cardRefs], { opacity: 0 });
      gsap.set(titleRef, { y: 20, scaleX: 0.8 });
      gsap.set(cardRefs, { opacity: 0, y: 30 });
      gsap.set(starRefs, { opacity: 0, scale: 0 });

      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 80%",
        onEnter: () => {
          tl = gsap.timeline({ defaults: { ease: "power2.out" } });

          // Title glitch in
          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            scaleX: 1,
            duration: 0.5,
          });

          // Cards materialize with delay
          tl.to(
            cardRefs,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.1"
          );

          // Stars pulse in
          tl.to(
            starRefs,
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              stagger: 0.02,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          );

          tl.call(() => startStarAnimation());
        },
      });

      // Futuristic hover effects
      cardRefs.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scaleX: 1.02,
              duration: 0.2,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scaleX: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          });
        }
      });
    });

    return () => {
      tl?.kill();
      starTl?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  const startStarAnimation = () => {
    starRefs.forEach((star, index) => {
      if (star) {
        // Pulsing effect
        gsap.to(star, {
          opacity: 0.2,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Subtle float
        gsap.to(star, {
          y: -5,
          duration: 3 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    });
  };

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="py-32 relative overflow-hidden"
    >
      {/* Minimal Stars */}
      <For each={Array.from({ length: 6 })}>
        {(_, index) => (
          <div
            ref={(el) => (starRefs[index()] = el)}
            class="absolute  text-xs pointer-events-none "
            style={`
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
            `}
          >
            +
          </div>
        )}
      </For>

      <div class="max-w-3xl mx-auto px-6">
        {/* Futuristic Title */}
        <h2
          ref={(el) => (titleRef = el)}
          class="text-4xl text-center mb-24 tracking-wider"
        >
          &gt; client.feedback_
        </h2>

        {/* Code-like Testimonials */}
        <div class="space-y-12 ">
          <For each={testimonials}>
            {(testimonial, index) => (
              <div
                ref={(el) => (cardRefs[index()] = el)}
                class="group cursor-pointer"
              >
                {/* Terminal prompt */}
                <div class="flex items-start space-x-4">
                  <span class=" text-sm mt-1">
                    {String(index() + 1).padStart(2, "0")}
                  </span>
                  <div class="flex-1">
                    <div class="text-lg mb-3 group-hover:text-gray-800 transition-colors">
                      {testimonial.text}
                    </div>
                    <div class="text-sm mb-3 leading-relaxed">
                      {testimonial.description}
                    </div>
                    <div class="flex items-center justify-between">
                      <div class=" text-xs">// {testimonial.name}</div>
                      <div class="text-xs">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <span class="text-white/60">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class=" text-xs">[verified]</div>
                </div>

                {/* Subtle line */}
                <div class="h-px bg-white/10 mt-8 group-hover:bg-white/20 transition-colors"></div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
