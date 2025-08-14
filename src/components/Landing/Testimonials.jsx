import { onMount, onCleanup, createSignal } from "solid-js";
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

  const [currentPage, setCurrentPage] = createSignal(0);
  const [showAll, setShowAll] = createSignal(false);
  const itemsPerPage = 6;

  const testimonials = [
    {
      text: "flawless.delivery()",
      description:
        "May God bless your hands, my friend. We will have many future projects together, God willing. Highly recommended!",
      name: "Hisham K.",
      rating: 5,
    },
    {
      text: "fast_and_perfect()",
      description:
        "Honestly, one of the best programmers I’ve worked with. Fast completion, 100% precision, and understands your ideas before you finish explaining. Thank you, engineer Hazem.",
      name: "Khaled A.",
      rating: 5,
    },
    {
      text: "patient.and_committed()",
      description:
        "I have programming knowledge and worked with Hazem on multiple projects. He’s meticulous, patient, and provides service even after delivery. I’ll definitely work with him again.",
      name: "Turki A.",
      rating: 5,
    },
    {
      text: "above_expectations()",
      description:
        "Delivered a beautiful, professional site. Accepted many revisions with great patience and commitment to deadlines. Highly recommended.",
      name: "Ahmed S.",
      rating: 5,
    },
    {
      text: "solutions_on_point()",
      description:
        "An excellent, dedicated young man who quickly understands and delivers solutions. We’ll definitely work together again.",
      name: "Yusuf I.",
      rating: 5,
    },
    {
      text: "top_quality.service()",
      description:
        "One of the best I’ve worked with. Highly recommended without hesitation.",
      name: "Mohammed A.",
      rating: 5,
    },
    {
      text: "responsive.and_skilled()",
      description:
        "Accurate, highly responsive, and able to understand every detail. Thank you Hazem, I will definitely work with you again.",
      name: "Abdulrahman A.",
      rating: 5,
    },
    {
      text: "creative_and_reliable()",
      description:
        "Hazem did an outstanding, professional job designing our WordPress homepage.",
      name: "Abdullah A.",
      rating: 5,
    },
    {
      text: "fast_response()",
      description:
        "Professional, quick response, and great cooperation. Looking forward to more projects together.",
      name: "Doaa A.",
      rating: 5,
    },
    {
      text: "highly_recommended()",
      description:
        "Highly recommend working with him. Excellent experience from start to finish.",
      name: "Turki A.",
      rating: 5,
    },
    {
      text: "professional.timing()",
      description:
        "Thank you engineer Hazem for your professionalism and accurate delivery.",
      name: "Ahmad A.",
      rating: 5,
    },
  ];

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      id="reviews_sec"
      class="py-32 relative overflow-hidden"
    >
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
        <h2
          ref={(el) => (titleRef = el)}
          class="text-4xl md:text-6xl text-center  mb-20 font-bold"
        >
          client.feedback
        </h2>

        {/* Stats Bar */}
        <div class="mb-12 flex justify-center items-center space-x-8 text-sm ">
          <div class="text-black/90/60">
            total_reviews:{" "}
            <span class="text-black/90">{testimonials.length}</span>
          </div>
          <div class="text-black/90/60">
            avg_rating: <span class="text-black/90">5.0</span>
          </div>
          <div class="text-black/90/60">
            showing:{" "}
            <span class="text-black/90">
              {showAll()
                ? testimonials.length
                : Math.min(itemsPerPage, testimonials.length)}
            </span>
          </div>
        </div>

        <div class="space-y-12">
          <For
            each={
              showAll() ? testimonials : testimonials.slice(0, itemsPerPage)
            }
          >
            {(testimonial, index) => (
              <div
                ref={(el) => (cardRefs[index()] = el)}
                class="group cursor-pointer"
              >
                {/* Terminal prompt */}
                <div class="flex items-start space-x-4">
                  <span class="text-black/90/40 text-sm mt-1 ">
                    {String((showAll() ? index() : index()) + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                  <div class="flex-1">
                    <div class="text-black/90 text-lg mb-3 group-hover:text-gray-900 transition-colors font-bold">
                      {testimonial.text}
                    </div>
                    <div class="text-black/90/70 text-sm mb-3 leading-relaxed">
                      {testimonial.description}
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-black/90/50 text-xs">
                        // {testimonial.name}
                      </div>
                      <div class="text-xs">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <span class="text-black/90/60">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="text-black/90/30 font-bold text-xs">
                    [verified]
                  </div>
                </div>

                {/* Subtle line */}
                <div class="h-px bg-white/10 mt-8 group-hover:bg-white/20 transition-colors"></div>
              </div>
            )}
          </For>
        </div>

        {/* Load More / Show Less Button */}
        {testimonials.length > itemsPerPage && (
          <div class="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll())}
              class=" text-sm font-bold border border-white/20 px-6 py-3 hover:bg-white/5 transition-all duration-300 hover:border-white/40"
            >
              {showAll()
                ? `> hide_reviews() // showing ${testimonials.length}`
                : `> load_more() // +${
                    testimonials.length - itemsPerPage
                  } more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
