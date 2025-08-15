import { onMount, onCleanup, createSignal } from "solid-js";
import { For } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  let sectionRef,
    titleRef,
    cursorRef,
    projectRefs = [],
    detailRefs = [];
  let tl;
  const [expandedProject, setExpandedProject] = createSignal(null);

  const projects = [
    {
      name: "spe-whats",
      type: "CMS Platform",
      lang: "js",
      status: "shipped",
      commits: "320+",
      artwork: "/images/projects/spe-whats.png",
      description:
        "Dynamic MERN stack CMS with live content editing and full admin control",
      fullDescription:
        "A full-featured content management system with complete admin control over pages, articles, and SEO settings. Features live content editing, responsive UI, and optimized performance. Built with a custom React + Vite dashboard and Next.js frontend.",
      tech: [
        "Node.js",
        "Next.js",
        "React",
        "Vite",
        "Styled Components",
        "MongoDB",
      ],
      metrics: {
        uptime: "99.9%",
        SEO: "Optimized",
        dynamic: "It has dashboard",
      },
      features: [
        "Full admin control",
        "SEO optimization",
        "Live content editing",
        "Responsive design",
      ],
      link: "https://spe-whats.com",
      gallery: [
        "/images/projects/spe/g1.png",
        "/images/projects/spe/g2.png",
        "/images/projects/spe/g3.png",
        "/images/projects/spe/dash.png",
        "/images/projects/spe/dash2.png",
      ],
    },
    {
      name: "WA Smart Sender",
      type: "Chrome Extension",
      lang: "js",
      status: "active",
      commits: "500+",
      artwork: "/images/projects/wa-smart-sender.png",
      description:
        "Smart WhatsApp automation Chrome extension with campaign management",
      fullDescription:
        "Powerful WhatsApp automation tool supporting bulk messaging, Excel-based variable injection, AI-powered auto-replies, group management, and campaign templates. Includes a full admin dashboard for subscription and user management.",
      tech: [
        "JavaScript",
        "React",
        "Node.js",
        "WPPConnect API",
        "Chrome Extension APIs",
        "MongoDB",
      ],
      metrics: { throughput: "50K+ msgs/month", saas: "True", users: "50+" },
      features: [
        "Bulk messaging",
        "Dynamic personalization",
        "Conditional logic",
        "Campaign analytics",
        "AI auto reply",
      ],
      link: "https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj?hl=en",
      gallery: [
        "/images/projects/was/3.jpg",
        "/images/projects/was/1.png",
        "/images/projects/was/2.jpg",
        "/images/projects/was/4.jpg",
      ],
    },
    {
      name: "ZOHU",
      type: "eCommerce",
      lang: "js",
      status: "shipped",
      commits: "210+",
      artwork: "/images/projects/zuho.png",
      description: "High-performance eCommerce platform inspired by Salla.sa",
      fullDescription:
        "Custom-built eCommerce frontend optimized for speed, mobile-first experience, and accessibility. Features product management, optimized checkout, and admin dashboard integration. Built using Next.js and TailwindCSS.",
      tech: ["Next.js", "TailwindCSS", "React", "Node.js", "MongoDB"],
      metrics: {},
      features: [
        "Mobile-first design",
        "Optimized checkout",
        "Performance tuning",
        "Admin dashboard",
      ],
      link: "https://fun-cottage.com",
    },
    {
      name: "Maze Bundler",
      type: "Shopify App",
      lang: "js",
      status: "active",
      commits: "150+",
      artwork: "/images/projects/maze-bundler.png",
      description:
        "Shopify app for creating advanced product bundles with gifts and discounts",
      fullDescription:
        "A Shopify app that enables store owners to create flexible bundle offers with tiered discounts and free gifts. Supports custom checkout flows, embedded Shopify admin dashboards, and integration with Shopify App Blocks for easy placement. Includes analytics for sales tracking and bundle performance.",
      tech: ["Node.js", "React", "Next.js", "Shopify API", "MongoDB"],
      metrics: { stores: "Multi-store support", uptime: "99.9%" },
      features: [
        "Custom bundle creation",
        "Free gift logic",
        "Embedded Shopify admin",
        "Custom checkout API",
        "Sales analytics",
      ],
      link: "https://apps.shopify.com",
      gallery: [
        "/images/projects/maze/1.png",
        "/images/projects/maze/2.png",
        "/images/projects/maze/3.png",
      ],
    },
    {
      name: "Cartat Campaign Manager",
      type: "Shopify Automation App",
      lang: "js",
      status: "shipped",
      commits: "200+",
      artwork: "/images/projects/cartat.png",
      description:
        "WhatsApp automation platform integrated with Salla & Shopify",
      fullDescription:
        "An advanced automation platform connected to Cartat's WhatsApp messaging API, allowing businesses to launch marketing campaigns, send review requests, auto-reply to customers, and distribute unique discount codes. Fully integrated with Salla and Shopify to sync clients, orders, and messaging triggers.",
      tech: [
        "Node.js",
        "React",
        "Next.js",
        "MongoDB",
        "Cartat API",
        "Shopify API",
        "Salla API",
      ],
      metrics: { throughput: "100K+ msgs/month", users: "Multi-store support" },
      features: [
        "Automated campaign launches",
        "AI-powered replies",
        "Discount code generation",
        "Order & client sync",
        "Queue-based safe sending",
      ],
      link: "#",
    },
    {
      name: "Cravio Restaurant Ordering",
      type: "Next.js Web App",
      lang: "js",
      status: "shipped",
      commits: "100+",
      artwork: "/images/projects/cravio.png",
      description:
        "Dynamic restaurant ordering system with multi-restaurant support",
      fullDescription:
        "A Next.js web app integrated with a backend to manage multiple restaurants. Each restaurant has a unique menu, banners, logos, and dynamic content. Users can browse categories, view popular dishes, and add items to cart with live subtotal calculation.",
      tech: ["Next.js", "React", , "bootstrap / Pure CSS"],
      metrics: {
        restaurants: "Multi-restaurant support",
        dynamic: "Full admin control",
      },
      features: [
        "Dynamic menu per restaurant",
        "Custom banners and logos",
        "Category-based navigation",
        "Cart and checkout integration",
        "Responsive design",
      ],
      link: "https://order.cravio.ai/?restaurant=3",
      gallery: [
        "/images/projects/cravio/c1.png",
        "/images/projects/cravio/c2.png",
        "/images/projects/cravio/c3.png",
      ],
    },
    {
      name: "Ride Theme Customization",
      type: "Shopify Theme Customization",
      lang: "Liquid / JS / CSS",
      status: "shipped",
      commits: "50+",
      artwork: "/images/projects/theme.png",
      description: "Full Shopify store identity overhaul using Ride theme.",
      fullDescription:
        "Customized the Ride Shopify theme to create a unique brand identity. This included color scheme updates, hero banner redesign, typography adjustments, layout modifications, and dynamic product presentation. Implemented using Liquid templates, CSS, JavaScript, and Shopify APIs. Ensured responsive design and optimized UX for better conversion.",
      tech: ["Liquid", "JavaScript", "CSS", "Shopify APIs"],
      metrics: {
        responsiveness: "100% mobile-friendly",
        performance: "Optimized for fast load",
        UX: "Improved conversion-ready layout",
      },
      features: [
        "Complete theme identity overhaul",
        "Custom hero and banners",
        "Responsive product sections",
        "Dynamic offers and promotions",
        "Optimized Shopify Liquid templates",
      ],
      link: "https://anagadha.com/",
      gallery: [
        "/images/projects/theme/1.png",
        "/images/projects/theme/2.png",
      ],
    },
  ];

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set([titleRef, ...projectRefs], { opacity: 0 });
      gsap.set(titleRef, { y: 30 });
      gsap.set(projectRefs, { y: 50, scale: 0.95 });

      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 75%",
        onEnter: () => {
          tl = gsap.timeline({ defaults: { ease: "power2.out" } });

          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          tl.to(
            projectRefs,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
            },
            "-=0.2"
          );
        },
      });

      gsap.set(detailRefs, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      });

      const handleProjectClick = (index) => {
        if (expandedProject() === index) {
          setExpandedProject(null);

          const tl = gsap.timeline();

          tl.to(detailRefs[index], {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });

          tl.to(
            projectRefs[index],
            {
              x: 0,
              width: "auto",
              duration: 0.5,
              ease: "power3.inOut",
            },
            "-=0.1"
          );
        } else {
          if (expandedProject() !== null) {
            const prevTl = gsap.timeline();
            prevTl.to(detailRefs[expandedProject()], {
              height: 0,
              opacity: 0,
              duration: 0.2,
              ease: "power2.inOut",
            });
            prevTl.to(
              projectRefs[expandedProject()],
              {
                x: 0,
                width: "auto",
                duration: 0.3,
                ease: "power2.inOut",
              },
              "-=0.1"
            );
          }

          setExpandedProject(index);

          const isMobile = window.innerWidth < 768;
          const isTablet = window.innerWidth < 1024;

          let expandWidth,
            translateX = 0;

          if (isMobile) {
            // Mobile: always full width, no translation needed
            expandWidth = "100%";
            translateX = 0;
          } else if (isTablet) {
            // Tablet: 2 columns
            const isLastInRow = (index + 1) % 2 === 0;
            expandWidth = "calc(200% + 24px)";

            if (isLastInRow) {
              // Last card in row - calculate distance to move left
              translateX = "calc(-100% - 24px)";
            } else {
              // First card - no translation needed
              translateX = 0;
            }
          } else {
            // Desktop: 3 columns
            const positionInRow = index % 3;
            expandWidth = "calc(300% + 48px)";

            if (positionInRow === 0) {
              // First card - no translation needed
              translateX = 0;
            } else if (positionInRow === 1) {
              // Middle card - move one column left
              translateX = "calc(-100% - 24px)";
            } else {
              // Last card - move two columns left
              translateX = "calc(-200% - 48px)";
            }
          }

          const tl = gsap.timeline();
          const cardRect = projectRefs[index].getBoundingClientRect();
          const rowStartIndex = isMobile
            ? index
            : isTablet
            ? index - (index % 2)
            : index - (index % 3);

          const firstColRect =
            projectRefs[rowStartIndex].getBoundingClientRect();
          const shiftPx = firstColRect.left - cardRect.left;

          // Stage 1: Shift into first column position
          if (shiftPx !== 0) {
            tl.to(projectRefs[index], {
              x: shiftPx,
              duration: 0.4,
              ease: "power3.inOut",
            });
          }

          // Stage 2: Expand width from left edge
          tl.to(
            projectRefs[index],
            {
              width: expandWidth,
              duration: 0.4,
              ease: "power2.out",
            },
            shiftPx !== 0 ? "-=0.2" : "0"
          );

          // Stage 3: Show details
          tl.to(
            detailRefs[index],
            {
              height: "auto",
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.2"
          );
        }
      };

      projectRefs.forEach((ref, index) => {
        if (ref) {
          ref.addEventListener("click", () => handleProjectClick(index));
        }
      });

      const handleResize = () => {
        if (expandedProject() !== null) {
          const currentIndex = expandedProject();
          gsap.set(projectRefs[currentIndex], { x: 0, width: "auto" });
          gsap.set(detailRefs[currentIndex], { height: 0, opacity: 0 });
          setExpandedProject(null);
          setTimeout(() => handleProjectClick(currentIndex), 50);
        }
      };

      window.addEventListener("resize", handleResize);
    });

    return () => {
      tl?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
      mm.revert();
    };
  });

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="py-32 overflow-hidden"
      id="projects_sec"
    >
      <div class="max-w-6xl mx-auto px-6">
        <div class="mb-12">
          <h2
            ref={(el) => (titleRef = el)}
            class="text-3xl font-bold mb-8 text-center"
          >
            My Projects
          </h2>

          {/* Project grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={projects}>
              {(project, index) => (
                <div class="relative">
                  <div
                    ref={(el) => (projectRefs[index()] = el)}
                    class={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 group ${
                      expandedProject() === index()
                        ? "border-blue-500 ring-2 ring-blue-200 shadow-2xl z-50"
                        : "border-gray-100 hover:border-blue-300 hover:shadow-xl transform hover:-translate-y-1 z-10"
                    }`}
                  >
                    {/* Main card content */}
                    <div class="p-6 pb-4">
                      <div class="flex items-center justify-between mb-4">
                        <div class="w-16 h-16 rounded-lg flex items-center justify-center border-2 border-gray-200">
                          <img
                            src={project.artwork || `/api/placeholder/64/64`}
                            alt={project.name}
                            class="w-full h-12 object-contain rounded-md"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
                            }}
                          />
                          <div class="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xl font-bold hidden">
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div
                          class={`w-3 h-3 rounded-full ${
                            project.status === "active"
                              ? "bg-green-500"
                              : project.status === "shipped"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                      </div>

                      <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {project.name}
                      </h3>

                      <p class="text-sm text-gray-600 font-medium mb-3">
                        {project.type}
                      </p>

                      <p class="text-gray-700 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <div class="px-6 pb-4">
                      <div class="flex items-center justify-between text-xs text-gray-500">
                        <span>{project.commits} commits</span>
                        <div class="flex items-center gap-2">
                          <span class="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                            Click to expand
                          </span>
                          <svg
                            class={`w-4 h-4 transform transition-all duration-300 group-hover:text-blue-500 ${
                              expandedProject() === index()
                                ? "rotate-180 text-blue-500"
                                : "rotate-0 text-gray-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Expanded details - hidden by default */}
                    <div
                      ref={(el) => (detailRefs[index()] = el)}
                      class="border-t border-gray-200 overflow-hidden"
                      style="height: 0; opacity: 0;"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div class="p-6 space-y-6">
                        {/* Full description */}
                        <div>
                          <h4 class="text-lg font-semibold text-gray-900 mb-3">
                            About
                          </h4>
                          <p class="text-gray-700 leading-relaxed">
                            {project.fullDescription}
                          </p>
                        </div>

                        {/* Gallery section */}
                        {project.gallery && project.gallery.length > 0 && (
                          <div>
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">
                              Gallery
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <For each={project.gallery}>
                                {(image) => (
                                  <div
                                    class="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <img
                                      src={image}
                                      alt={`${project.name} screenshot`}
                                      class="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextElementSibling.style.display =
                                          "flex";
                                      }}
                                    />
                                    <div class="hidden w-full h-32 bg-gray-100 items-center justify-center text-gray-400">
                                      <span class="text-sm">
                                        Image not found
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        )}

                        {/* Tech stack */}
                        <div>
                          <h4 class="text-lg font-semibold text-gray-900 mb-3">
                            Tech Stack
                          </h4>
                          <div class="flex flex-wrap gap-2">
                            <For each={project.tech}>
                              {(tech) => (
                                <span class="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-full font-medium">
                                  {tech}
                                </span>
                              )}
                            </For>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 class="text-lg font-semibold text-gray-900 mb-3">
                            Key Features
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <For each={project.features}>
                              {(feature) => (
                                <div class="flex items-center space-x-2">
                                  <span class="text-green-500 text-sm">✓</span>
                                  <span class="text-gray-700 text-sm">
                                    {feature}
                                  </span>
                                </div>
                              )}
                            </For>
                          </div>
                        </div>

                        {/* Metrics */}
                        {Object.keys(project.metrics).length > 0 && (
                          <div>
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">
                              Metrics
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <For each={Object.entries(project.metrics)}>
                                {([key, value]) => (
                                  <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                                    <div class="text-gray-500 text-xs uppercase font-medium mb-1">
                                      {key}
                                    </div>
                                    <div class="text-gray-900 font-semibold">
                                      {value}
                                    </div>
                                  </div>
                                )}
                              </For>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div class="text-sm text-gray-500">
                            <span class="font-medium">{project.commits}</span>{" "}
                            commits •
                            <span class="font-medium capitalize">
                              {" "}
                              {project.status}
                            </span>
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View Project</span>
                            <span class="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
