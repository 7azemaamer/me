import { onMount, onCleanup, For } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  let sectionRef,
    titleRef,
    infoRefs = [],
    summaryRef,
    skillsRef;
  let tl;

  const personalInfo = [
    { label: "Name", value: "Hazem Aamer" },
    { label: "Role", value: "MERN Stack Developer" },
    {
      label: "Location",
      value: "Egypt (open to remote or relocation in Europe)",
    },
    { label: "Email", value: "zicoaaamer@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/hazemaamer" },
    { label: "GitHub", value: "github.com/7azemaamer" },
  ];

  const skills = {
    Frontend: [
      "HTML, CSS, TailwindCSS",
      "JavaScript, TypeScript",
      "React.js, Next.js, Vue.js, SolidJS",
      "GSAP (animations), Framer Motion",
      "Chrome Extension APIs",
    ],
    Backend: [
      "Node.js, Express.js, REST APIs",
      "MongoDB, Supabase, PostgreSQL",
      "RabbitMQ, n8n (automation workflows)",
    ],
    "Other / Tools": [
      "Git, GitLab, Vite, Postman",
      "OOP, Data Structures, Algorithms, Python",
      "AI integration (Gemini, OpenAI)",
      "Scheduling & queue systems for automation",
      "Shopify Apps (embedded apps, bundles, custom checkout flows)",
    ],
  };

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Set initial states
      gsap.set([titleRef, summaryRef, skillsRef], { opacity: 0, y: 30 });
      gsap.set(infoRefs, { opacity: 0, x: -20 });

      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 75%",
        onEnter: () => {
          tl = gsap.timeline({ defaults: { ease: "power2.out" } });

          // Animate title
          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          // Animate personal info
          tl.to(
            infoRefs,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.08,
            },
            "-=0.4"
          );

          // Animate summary
          tl.to(
            summaryRef,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.2"
          );

          // Animate skills
          tl.to(
            skillsRef,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.4"
          );
        },
      });
    });

    return () => {
      tl?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="py-32 overflow-hidden"
      id="about_sec"
    >
      <div class="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div class="text-center mb-16">
          <h2
            ref={(el) => (titleRef = el)}
            class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-quicksand"
          >
            About Me
          </h2>
        </div>

        <div class="space-y-16">
          {/* Personal Information */}
          <div class="bg-white rounded-xl border border-gray-200 p-8">
            <h3 class="text-2xl font-semibold text-gray-900 mb-8">
              Personal Information
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <For each={personalInfo}>
                {(info, index) => (
                  <div
                    ref={(el) => (infoRefs[index()] = el)}
                    class="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <span class="text-gray-600 font-medium">{info.label}:</span>
                    <span class="text-gray-900 text-right max-w-xs">
                      {info.value}
                    </span>
                  </div>
                )}
              </For>
            </div>
          </div>

          {/* Summary */}
          <div
            ref={(el) => (summaryRef = el)}
            class="bg-white rounded-xl border border-gray-200 p-8"
          >
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">Summary</h3>
            <div class="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A highly motivated full-stack developer with extensive
                experience in React, Next.js, Node.js, and MongoDB. Passionate
                about building performant, user-friendly, and interactive web
                applications, with a particular focus on automation, AI
                integration, N8N workflows, AI agents, and developer tools.
              </p>

              <div class="mt-6">
                <h4 class="text-lg font-medium text-gray-900 mb-3">
                  Highlights:
                </h4>
                <ul class="space-y-2 text-gray-700">
                  <li>
                    • Building custom SaaS solutions, Chrome extensions, and
                    Shopify apps
                  </li>
                  <li>
                    • Integrating AI agents and automation workflows in real
                    projects
                  </li>
                  <li>
                    • Creating portfolio projects with modern front-end
                    frameworks like Vue.js, and Next.js with smooth animations
                    and interactivity
                  </li>
                  <li>
                    • Strong focus on security, maintainability, and scalability
                  </li>
                  <li>• Open to remote work or relocation in Europe</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div class="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div class="bg-white rounded-xl border border-gray-200 p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">
                Education
              </h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium text-gray-900">
                    Bachelor of Computer Science
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Shorouk Academy, Cairo, Egypt
                  </p>
                  <p class="text-gray-600 text-sm">Oct 2021 – Jun 2025</p>
                  <p class="text-gray-600 text-sm">
                    <span class="font-bold">Grade:</span> Very Good
                  </p>
                  <p class="text-gray-700 text-sm">
                    <span class="font-bold">Graduation Project:</span> Excellent
                  </p>
                  <p class="text-gray-700 text-sm mt-2">
                    Mentored students on frontend best practices and portfolio
                    projects
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div class="bg-white rounded-xl border border-gray-200 p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">
                Experience
              </h3>
              <div class="space-y-4">
                {/* Current Role */}
                <div class="border-l-4 border-blue-500 pl-4">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 class="font-medium text-gray-900">
                      Web Developer & AI Agents Engineer
                    </h4>
                    <span class="text-blue-600 text-sm font-medium">
                      Current
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">Anagadha (Part-time)</p>
                  <p class="text-gray-700 text-sm">
                    Building AI-powered workflows, web apps, and automation
                    systems
                  </p>
                </div>

                {/* Freelance Work */}
                <div class="border-l-4 border-green-500 pl-4">
                  <h4 class="font-medium text-gray-900 mb-2">
                    Freelance Web Developer
                  </h4>
                  <div class="grid sm:grid-cols-1 gap-3 text-sm">
                    <div>
                      <p class="text-gray-800 font-bold">Mostaql Platform</p>
                      <p class="text-gray-700">10+ projects delivered</p>
                    </div>
                    <div>
                      <p class="text-gray-800 font-bold">
                        Spe-plus (Ongoing)
                      </p>
                      <p class="text-gray-700">WhatsApp & social automation</p>
                    </div>
                  </div>
                </div>

                {/* Previous Role */}
                <div class="border-l-4 border-gray-400 pl-4">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 class="font-medium text-gray-900">
                      Frontend Developer
                    </h4>
                    <span class="text-gray-500 text-sm">
                      May 2025 – Aug 2025
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">
                    Maizny, Saudi Arabia (Remote)
                  </p>
                  <p class="text-gray-700 text-sm">
                    React/Next.js development and performance optimization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div class="text-center pt-8">
            <a href="#contact_sec" class="btn btn-dark">
              Let's Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
