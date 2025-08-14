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
      lang: "js",
      status: "shipped",
      commits: "320+",
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
        dynamic: "it has dashboard",
      },
      features: [
        "Full admin control",
        "SEO optimization",
        "Live content editing",
        "Responsive design",
      ],
      link: "https://spe-whats.com",
    },
    {
      name: "WASender",
      lang: "js",
      status: "active",
      commits: "500+",
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
    },
    {
      name: "ZOHU",
      lang: "js",
      status: "shipped",
      commits: "210+",
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
  ];

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set([titleRef, ...projectRefs], { opacity: 0 });
      gsap.set(titleRef, { y: 30 });
      gsap.set(projectRefs, { x: -50 });

      gsap.to(cursorRef, {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

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
              x: 0,
              duration: 0.6,
              stagger: 0.15,
            },
            "-=0.2"
          );
        },
      });

      // Set initial state for detail panels - completely hidden
      gsap.set(detailRefs, {
        height: 0,
        opacity: 0,
        scaleY: 0,
        transformOrigin: "top",
        overflow: "hidden",
      });

      const handleProjectClick = (index) => {
        if (expandedProject() === index) {
          // Collapse if already expanded
          setExpandedProject(null);
          gsap.to(detailRefs[index], {
            height: 0,
            scaleY: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else {
          // Collapse any currently expanded project
          if (expandedProject() !== null) {
            gsap.to(detailRefs[expandedProject()], {
              height: 0,
              scaleY: 0,
              opacity: 0,
              duration: 0.2,
              ease: "power2.inOut",
            });
          }

          // Expand clicked project
          setExpandedProject(index);
          gsap.to(detailRefs[index], {
            height: "auto",
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      };

      // Add click listeners to project rows
      projectRefs.forEach((ref, index) => {
        if (ref) {
          ref.addEventListener("click", () => handleProjectClick(index));
        }
      });
    });

    return () => {
      tl?.kill();
      hoverTimeline?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-black/90";
      case "building":
        return "text-yellow-500";
      case "shipped":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return "●";
      case "building":
        return "◐";
      case "shipped":
        return "✓";
      default:
        return "○";
    }
  };

  return (
    <section ref={(el) => (sectionRef = el)} class="py-32  overflow-hidden" id="projects_sec">
      <div class="max-w-4xl mx-auto px-6">
        <div class="mb-12">
          <div class="flex items-center mb-6">
            <div class="flex space-x-2 mr-4">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span class="text-gray-500 text-sm">~/projects</span>
          </div>

          <div class="border border-gray-800 bg-black/10 rounded-lg p-6">
            <div class="flex items-center mb-4">
              <span class="text-black/90">$</span>
              <span class="ml-2 ">ls -la --projects</span>
              <span ref={(el) => (cursorRef = el)} class="ml-1 text-black/90">
                |
              </span>
            </div>

            <h2 ref={(el) => (titleRef = el)} class="text-2xl mb-6">
              # My Code, My{" "}
              <span class="bg-white text-black font-bold border border-green-300 rounded-lg px-2">
                Canvas
              </span>
            </h2>

            {/* Project list */}
            <div class="space-y-1">
              <For each={projects}>
                {(project, index) => (
                  <div>
                    <div
                      ref={(el) => (projectRefs[index()] = el)}
                      class={`flex items-center justify-between py-3 px-4 hover:bg-gray-900/10 rounded-lg transition-all duration-200 cursor-pointer group ${
                        expandedProject() === index()
                          ? "bg-gray-900/30 border-l-2 border-green-400"
                          : ""
                      }`}
                    >
                      <div class="flex items-center space-x-4">
                        <span
                          class={`${getStatusColor(project.status)} text-xs`}
                        >
                          {getStatusIcon(project.status)}
                        </span>
                        <span class=" group-hover:text-green-800 transition-colors">
                          {project.name}
                        </span>
                        <span class="text-gray-800 text-sm">
                          .{project.lang}
                        </span>
                      </div>

                      <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span class="hidden sm:inline">{project.commits}</span>
                        <span class="text-gray-600">
                          {expandedProject() === index() ? "▼" : "▶"}
                        </span>
                      </div>
                    </div>

                    <div
                      ref={(el) => (detailRefs[index()] = el)}
                      class="overflow-hidden mt-2 bg-black/20 border border-green-700/30 mx-2 mb-4 relative rounded-lg"
                      style="height: 0; transform-origin: top; transform: scaleY(0); opacity: 0;"
                    >
                      {/* Terminal header */}
                      <div class="bg-black/80 border-b border-green-700/20 px-4 py-2 flex items-center justify-between rounded">
                        <div class="flex items-center space-x-3">
                          <div class="flex space-x-1">
                            <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                          <span class="text-white font-bold text-xs">
                            [PROJECT_ANALYSIS]
                          </span>
                        </div>
                        <span class="text-white text-xs">
                          {project.name}.{project.lang}
                        </span>
                      </div>

                      <div class="p-6 text-sm space-y-6">
                        {/* Full description */}
                        <div class="border-l-2 border-green-700/40 pl-4">
                          <p class="text-black/90 text-xs mb-2">
                            [DESCRIPTION]
                          </p>
                          <p class="text-black leading-relaxed">
                            {project.fullDescription}
                          </p>
                        </div>

                        {/* Metrics grid */}
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <For each={Object.entries(project.metrics)}>
                            {([key, value]) => (
                              <div class="bg-black/60 border border-green-400/20 p-3 rounded">
                                <div class="text-white text-xs uppercase mb-1">
                                  {key}
                                </div>
                                <div class="text-white font-bold capitalize">
                                  {value}
                                </div>
                              </div>
                            )}
                          </For>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <p class="text-black/90 text-xs font-bold mb-3">
                            [TECH_STACK]
                          </p>
                          <div class="flex flex-wrap gap-2">
                            <For each={project.tech}>
                              {(tech) => (
                                <span class="px-3 py-1 bg-black/60 border border-green-400/20 text-white text-xs rounded ">
                                  {tech.toLowerCase()}
                                </span>
                              )}
                            </For>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <p class="text-black/90 text-xs font-bold mb-3">
                            [FEATURES]
                          </p>
                          <div class="grid grid-cols-2 gap-2 text-xs">
                            <For each={project.features}>
                              {(feature) => (
                                <div class="flex items-center space-x-2">
                                  <span class="text-black/90">✓</span>
                                  <span class="text-black/70">{feature}</span>
                                </div>
                              )}
                            </For>
                          </div>
                        </div>

                        {/* Actions */}
                        <div class="flex justify-between items-center pt-4 border-t border-gray-800">
                          <div class="text-xs text-gray-500">
                            <span class="text-black/90">{project.commits}</span>{" "}
                            commits •
                            <span class="text-black/90"> {project.status}</span>
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center space-x-2 bg-green-400/10 hover:bg-green-400/20 text-black/90 px-4 py-2 rounded border border-green-400/30 hover:border-green-400 transition-all text-xs group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>OPEN</span>
                            <span class="group-hover:translate-x-1 transition-transform">
                              ↗
                            </span>
                          </a>
                        </div>
                      </div>

                      {/* Scan lines effect */}
                      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
                      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
                    </div>
                  </div>
                )}
              </For>
            </div>

            {/* Terminal footer */}
            <div class="mt-6 pt-4 border-t border-gray-800">
              <div class="flex items-center text-gray-500 text-sm">
                <span class="text-black/90">✓</span>
                <span class="ml-2">3 repositories found</span>
                <span class="ml-auto">last updated: just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
