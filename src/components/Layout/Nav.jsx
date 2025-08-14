import {
  createSignal,
  Show,
  For,
  onMount,
  createEffect,
  onCleanup,
} from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { Icon } from "@iconify-icon/solid";
import gsap from "gsap";

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = () => location.pathname;
  const [isMenuActive, setIsMenuActive] = createSignal(false);

  let menuBg;
  let socialIconsRef;
  let navLinksRef;

  createEffect(() => {
    if (isMenuActive()) {
      const icons = socialIconsRef?.querySelectorAll(".social-icon");

      if (icons?.length) {
        gsap.fromTo(
          icons,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }
  });

  createEffect(() => {
    if (isMenuActive()) {
      const links = navLinksRef?.querySelectorAll(".nav-item");

      if (links?.length) {
        gsap.set(links, {
          opacity: 1,
          y: -10,
          scale: 1,
          stagger: 0.1,
          ease: "power3.inOut",
        });

        gsap.fromTo(links, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.1,
          stagger: 0.1,
          ease: "power3.inOut",
        });
      }
    }
  });

  onMount(() => {
    // Animate logo
    gsap.fromTo(
      ".logo-container",
      { opacity: 0, y: -40, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    // Animate buttons
    gsap.fromTo(
      ".nav-button",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        delay: 0.3,
      }
    );
  });

  let hoverTimeline;
  const handleMouseMove = (e) => {
    if (!menuBg) return;

    const rect = menuBg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const overlay = menuBg.querySelector(".menu-overlay");
    if (!overlay) return;

    hoverTimeline?.kill();

    overlay.style.transformOrigin = `${x}px ${y}px`;

    hoverTimeline = gsap.to(overlay, {
      scale: 1,
      duration: 0.1,
      ease: "sine.out",
    });
  };

  const handleMouseLeave = () => {
    const overlay = menuBg?.querySelector(".menu-overlay");
    if (!overlay) return;

    hoverTimeline?.kill();

    gsap.fromTo(
      overlay,
      {
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        borderRadius: "20px",
      },
      {
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        borderRadius: "0%",
      }
    );
  };

  const links = [
    { title: "Home", href: "/" },
    { title: "Reviews", href: "#reviews_sec" },
    { title: "Contact Me", href: "#contact_sec" },
    { title: "Projects", href: "#projects_sec" },
  ];

  return (
    <nav class="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 sm:py-6 z-50 backdrop-blur-xs">
      {/* Logo - Responsive */}
      <div class="logo-container">
        <div class="text-3xl sm:text-5xl uppercase font-quicksand">
          <span class="text-4xl sm:text-6xl font-bold text-primary">H</span>
          <span class="lowercase">a</span>z<span class="lowercase">e</span>
          <span class="text-2xl sm:text-3xl font-semibold">m</span>
        </div>
      </div>

      {/* Buttons  */}
      <div class="flex gap-2 sm:gap-3 items-center text-lg sm:text-1xl">
        <a href="#contact_sec" class="btn btn-dark nav-button hidden sm:block">
          Let's Talk
        </a>

        <div class="relative">
          <button
            class="btn btn-light nav-button text-sm sm:text-base px-3 sm:px-4 py-2"
            onClick={() => {
              setIsMenuActive(!isMenuActive());
            }}
          >
            {isMenuActive() ? "Close" : "Menu"}
          </button>

          <Show when={isMenuActive()}>
            <div
              ref={menuBg}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              class="absolute top-12 sm:top-15 right-0 sm:right-4 bg-white shadow-xl border border-gray-100 rounded-2xl mt-2 p-4 flex flex-col sm:flex-row justify-between gap-4 w-72 sm:w-80 z-50"
            >
              <div class="menu-overlay absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]"></div>

              {/* Navigation Links */}
              <div
                ref={navLinksRef}
                class="flex flex-col gap-2 nav-links flex-1"
              >
                <For each={links}>
                  {(item) => (
                    <div
                      class={`nav-item transition duration-200 px-3 py-2 rounded opacity-0 text-sm sm:text-base ${
                        currentPath() === item.href
                          ? "text-primary font-semibold"
                          : "text-gray-500 cursor-pointer hover:bg-gray-50 hover:rounded-lg"
                      }`}
                      onClick={() => {
                        setIsMenuActive(false);
                        navigate(item.href);
                      }}
                    >
                      {item.title}
                    </div>
                  )}
                </For>

                {/* Show "Let's Talk" in mobile menu */}
                <div class="sm:hidden border-t border-gray-200 pt-6 mt-2">
                  <a
                    href="#contact_sec"
                    class="nav-item w-full text-left px-3 py-2 text-sm text-primary font-semibold hover:bg-gray-50 hover:rounded-lg opacity-0"
                    onClick={() => setIsMenuActive(false)}
                  >
                    Let's Talk
                  </a>
                </div>
              </div>

              {/* Social Icons  */}
              <div
                ref={socialIconsRef}
                class="flex flex-row sm:flex-col items-center justify-center sm:border-gray-200 sm:border-l-2 sm:pl-5 social-icons gap-2 sm:gap-0 border-t sm:border-t-0 border-gray-200 pt-3 sm:pt-0"
              >
                <a
                  class="social-icon hover:bg-gray-50 hover:rounded-full p-2 flex justify-center items-center"
                  href="#"
                >
                  <Icon
                    icon="ion:social-whatsapp"
                    width="32"
                    height="32"
                    class="sm:w-[50px] sm:h-[50px]"
                  />
                </a>
                <a
                  class="social-icon hover:bg-gray-50 hover:rounded-full p-2 flex justify-center items-center"
                  href="#"
                >
                  <Icon
                    icon="ion:social-github"
                    width="32"
                    height="32"
                    class="sm:w-[50px] sm:h-[50px]"
                  />
                </a>
                <a
                  class="social-icon hover:bg-gray-50 hover:rounded-full p-2 flex justify-center items-center"
                  href="#"
                >
                  <Icon
                    icon="mingcute:social-x-line"
                    width="32"
                    height="32"
                    class="sm:w-[50px] sm:h-[50px]"
                  />
                </a>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}
