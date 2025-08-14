import { onMount, onCleanup, createSignal } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  let sectionRef, titleRef, ctaRef, planeRef, messageRef, formRef;
  let tl, planeAnimation;
  const [isMessageSent, setIsMessageSent] = createSignal(false);

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Initial state
      gsap.set([titleRef, ctaRef, formRef], { opacity: 0 });
      gsap.set(titleRef, { y: 30 });
      gsap.set(ctaRef, { y: 20 });
      gsap.set(formRef, { y: 40 });
      gsap.set(planeRef, { x: -100, y: 20, rotation: -15, opacity: 0 });
      gsap.set(messageRef, { scale: 0, opacity: 0 });

      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 75%",
        onEnter: () => {
          tl = gsap.timeline({ defaults: { ease: "power2.out" } });

          // Title slides in
          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          // CTA appears
          tl.to(
            ctaRef,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.3"
          );

          // Form slides up
          tl.to(
            formRef,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
            },
            "-=0.2"
          );

          // Paper plane flies in
          tl.to(
            planeRef,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.4"
          );

          // Start continuous plane animation
          tl.call(() => startPlaneAnimation());
        },
      });
    });

    return () => {
      tl?.kill();
      planeAnimation?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  const startPlaneAnimation = () => {
    planeAnimation = gsap.timeline({ repeat: -1 });

    // Floating motion
    planeAnimation.to(planeRef, {
      y: -10,
      rotation: 2,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Occasional paper effect
    planeAnimation.to(
      planeRef,
      {
        x: 10,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsMessageSent(true);

    gsap.to(planeRef, {
      x: 200,
      y: -100,
      rotation: 25,
      scale: 0.5,
      duration: 1.5,
      ease: "power2.inOut",
    });

    gsap.to(messageRef, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.8,
    });

    setTimeout(() => {
      gsap.to(messageRef, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(planeRef, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      setTimeout(() => {
        setIsMessageSent(false);
        startPlaneAnimation();
      }, 1500);
    }, 3000);
  };

  return (
    <section
      ref={(el) => (sectionRef = el)}
      id="contact_sec"
      class="py-32  relative overflow-hidden"
    >
      <div class="max-w-4xl mx-auto px-6 text-center relative">
        {/* Title */}
        <h2
          ref={(el) => (titleRef = el)}
          class="text-4xl md:text-6xl font-bold text-black mb-8"
        >
          Let's Talk
        </h2>
        {/* CTA Text */}
        <p
          ref={(el) => (ctaRef = el)}
          class="text-xl md:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Ready to bring your vision to life? Let's collaborate and build
          something extraordinary together.
        </p>
        {/* Contact Form */}
        <div
          ref={(el) => (formRef = el)}
          id="contact-form"
          class="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Project Subject"
                class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div>
              <textarea
                placeholder="Tell me about your project..."
                rows="5"
                required
                class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white/80 backdrop-blur-sm"
              ></textarea>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="group relative overflow-hidden bg-black hover:bg-gray-800 text-white px-12 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
                disabled={isMessageSent()}
              >
                <span class="relative z-10 flex items-center space-x-2">
                  <span>{isMessageSent() ? "Sending..." : "Send Message"}</span>
                  <span class="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-gray-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </div>
          </form>

          <div class="mt-16 pt-8 border-t border-gray-200">
            <p class="text-gray-500 mb-6">Or reach out directly:</p>
            <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                href="mailto:contact@example.com"
                class="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors group"
              >
                <span>Email</span>
              </a>
              <a
                href="tel:+1234567890"
                class="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors group"
              >
                <span>Phone</span>
              </a>
              <a
                href="#"
                class="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors group"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
