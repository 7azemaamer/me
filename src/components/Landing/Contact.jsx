import { onMount, onCleanup, createSignal, Show } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  let sectionRef, titleRef, ctaRef, planeRef, messageRef, formRef;
  let tl, planeAnimation;

  // Form state
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [subject, setSubject] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [success, setSuccess] = createSignal(false);
  const [error, setError] = createSignal("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous states
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name(),
          email: email(),
          message: `Subject: ${subject()}\n\n${message()}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setIsMessageSent(true);

        // Clear form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");

        // Animate plane flying away
        gsap.to(planeRef, {
          x: 200,
          y: -100,
          rotation: 25,
          scale: 0.5,
          duration: 1.5,
          ease: "power2.inOut",
        });

        // Show success message
        gsap.to(messageRef, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          delay: 0.8,
        });

        // Reset animations after success
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
            setSuccess(false);
            startPlaneAnimation();
          }, 1500);
        }, 3000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(
        "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
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
            {/* Error Message */}
            <Show when={error()}>
              <div class="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-center">
                {error()}
              </div>
            </Show>

            {/* Success Message */}
            <Show when={success()}>
              <div class="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-center">
                Message sent successfully! I'll get back to you soon.
              </div>
            </Show>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name()}
                  onInput={(e) => setName(e.target.value)}
                  required
                  disabled={loading()}
                  class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm disabled:opacity-50"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading()}
                  class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Project Subject"
                value={subject()}
                onInput={(e) => setSubject(e.target.value)}
                disabled={loading()}
                class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm disabled:opacity-50"
              />
            </div>

            <div>
              <textarea
                placeholder="Tell me about your project..."
                rows="5"
                value={message()}
                onInput={(e) => setMessage(e.target.value)}
                required
                disabled={loading()}
                class="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white/80 backdrop-blur-sm disabled:opacity-50"
              ></textarea>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="group relative overflow-hidden bg-black hover:bg-gray-800 text-white px-12 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={loading() || isMessageSent()}
              >
                <span class="relative z-10 flex items-center space-x-2">
                  <span>
                    {loading()
                      ? "Sending..."
                      : isMessageSent()
                      ? "Sent!"
                      : "Send Message"}
                  </span>
                  <Show when={!loading()}>
                    <span class="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Show>
                  <Show when={loading()}>
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </Show>
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-gray-600 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
