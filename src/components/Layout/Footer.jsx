import { onMount, onCleanup } from "solid-js";
import gsap from "gsap";

export default function Footer() {
  let footerRef, terminalRef, cursorRef;
  let tl;

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(footerRef, { opacity: 0 });
      gsap.set(terminalRef, { y: 20 });

      gsap.to(cursorRef, {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(footerRef, {
        opacity: 1,
        duration: 0.8,
      });

      tl.to(
        terminalRef,
        {
          y: 0,
          duration: 0.6,
        },
        "-=0.4"
      );
    });

    return () => {
      tl?.kill();
      mm.revert();
    };
  });

  return (
    <footer
      ref={(el) => (footerRef = el)}
      class="py-10 border-t border-gray-800"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div
          ref={(el) => (terminalRef = el)}
          class="border border-gray-700 bg-black/10 rounded-lg p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8"
        >
          {/* Terminal header + info */}
          <div class="flex-1 min-w-[200px]">
            <div class="flex items-center mb-4 ">
              <div class="flex space-x-2 mr-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-gray-900 text-sm">~/hazem-aamer</span>
            </div>

            <div class="space-y-1 text-sm">
              <div>
                <span class="font-bold">role:</span> "Software Engineer"
              </div>
              <div>
                <span class="font-bold">status:</span> "Available for projects"
              </div>
            </div>
          </div>

          {/* Command + copyright */}
          <div class="flex flex-col justify-between flex-1 min-w-[200px] md:justify-start">
            <div class="flex items-center text-center md:text-left text-sm mb-4">
              <span class="text-green-400">$</span>
              <span class="ml-2">
                echo "© {new Date().getFullYear()} - Built with passion"
              </span>
              <span ref={(el) => (cursorRef = el)} class="ml-1 text-green-400">
                |
              </span>
            </div>

            {/* Links */}
            <div class="flex gap-6 text-sm text-gray-800 mt-auto  text-center font-bold">
              <a href="#" class="hover:text-blue-900 transition-colors">
                GitHub
              </a>
              <a href="#" class="hover:text-green-500 transition-colors">
                WhatsApp
              </a>
              <a href="#" class="hover:text-red-600 transition-colors">
                Gmail
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
