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
    { title: "About Me", href: "/about" },
    { title: "Contact Me", href: "/contact" },
    { title: "Projects", href: "/projects" },
  ];

  return (
    <nav class="w-full flex justify-between items-center px-8 py-6">
      {/* Logo */}
      <div class="logo-container">
        <div class="text-5xl uppercase font-quicksand">
          <span class="text-6xl font-bold text-primary">H</span>
          <span class="lowercase">a</span>z<span class="lowercase">e</span>
          <span class="text-3xl font-semibold">m</span>
        </div>
      </div>

      {/* Buttons */}
      <div class="flex gap-3 items-center text-2xl">
        <button class="btn btn-dark nav-button">Let's Talk</button>

        <div class="relative">
          <button
            class="btn btn-light nav-button"
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
              class="absolute top-15 right-4 bg-white shadow-xl border border-gray-100 rounded-2xl mt-2 p-4 flex justify-between gap-4 w-80 z-50"
            >
              <div class="menu-overlay  absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]"></div>
              <div ref={navLinksRef} class="flex flex-col gap-2 nav-links">
                <For each={links}>
                  {(item) => (
                    <div
                      class={`nav-item transition duration-200 px-2 py-1 rounded opacity-0 ${
                        currentPath() === item.href
                          ? "text-primary font-semibold"
                          : "text-gray-500 cursor-pointer hover:bg-white hover:rounded-lg"
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
              </div>
              <div
                ref={socialIconsRef}
                class="flex flex-col items-center justify-center border-gray-200 border-l-2 pl-5 social-icons"
              >
                <a
                  class="social-icon hover:bg-white hover:rounded-full px-2 py-1 flex justify-center items-center"
                  href="#"
                >
                  <Icon icon="ion:social-whatsapp" width="50" height="50" />
                </a>
                <a
                  class="social-icon hover:bg-white hover:rounded-full px-2 py-1 flex justify-center items-center"
                  href="#"
                >
                  <Icon icon="ion:social-github" width="50" height="50" />
                </a>
                <a
                  class="social-icon hover:bg-white hover:rounded-full px-2 py-1 flex justify-center items-center"
                  href="#"
                >
                  <Icon icon="mingcute:social-x-line" width="50" height="50" />
                </a>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
}
