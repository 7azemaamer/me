import { onMount, onCleanup } from "solid-js";
import { For } from "solid-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  let sectionRef,
    titleRef,
    skillRefs = [];
  let tl, orbitTl;

  const skillGroups = [
    {
      name: "Frontend",
      color: "text-blue-400",
      skills: [
        "React",
        "SolidJS",
        "Next.js",
        "TypeScript",
        "VueJS",
        "Tailwind CSS",
        "GSAP",
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
      ],
    },
    {
      name: "Backend",
      color: "text-green-400",
      skills: ["Node.js", "SQL", "REST APIs", "GraphQL"],
    },
    {
      name: "E-Commerce",
      color: "text-emerald-400",
      skills: [
        "Shopify",
        "Salla",
        "Theme Development",
        "App Development",
        "Liquid Templating",
        "Storefront Customization",
      ],
    },
    {
      name: "Automations",
      color: "text-yellow-400",
      skills: [
        "n8n",
        "Browser Automation",
        "Web Scraping",
        "API Integrations",
        "Task Scheduling",
        "Workflow Automation",
      ],
    },
  ];

  const allSkills = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill,
      color: group.color,
      group: group.name,
    }))
  );

  onMount(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(titleRef, { opacity: 0, y: 30 });
      gsap.set(skillRefs, { opacity: 0, scale: 0 });

      ScrollTrigger.create({
        trigger: sectionRef,
        start: "top 70%",
        onEnter: () => {
          tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(titleRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });

          tl.to(
            skillRefs,
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "back.out(1.4)",
            },
            "-=0.3"
          );

          tl.call(() => startOrbitAnimation());
        },
      });
    });

    return () => {
      tl?.kill();
      orbitTl?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  });

  const startOrbitAnimation = () => {
    orbitTl = gsap.timeline({ repeat: -1 });

    skillGroups.forEach((group, groupIndex) => {
      const groupRadius = 100 + groupIndex * 35;
      const groupSpeed = 20 + groupIndex * 5;
      const direction = groupIndex % 2 === 0 ? 1 : -1; // Alternate directions

      group.skills.forEach((skill, skillIndex) => {
        const totalSkillIndex =
          skillGroups
            .slice(0, groupIndex)
            .reduce((sum, g) => sum + g.skills.length, 0) + skillIndex;
        const ref = skillRefs[totalSkillIndex];

        if (ref) {
          const angleStep = 360 / group.skills.length;
          const currentAngle = skillIndex * angleStep + groupIndex * 25;

          // Animate rotation around center
          orbitTl.to(
            ref,
            {
              motionPath: {
                path: `M${
                  Math.cos((currentAngle * Math.PI) / 180) * groupRadius
                },${Math.sin((currentAngle * Math.PI) / 180) * groupRadius} 
                     A${groupRadius},${groupRadius} 0 1,${
                  direction > 0 ? 1 : 0
                } 
                     ${
                       Math.cos((currentAngle * Math.PI) / 180) * groupRadius
                     },${
                  Math.sin((currentAngle * Math.PI) / 180) * groupRadius
                }`,
                autoRotate: false,
              },
              duration: groupSpeed,
              ease: "none",
              repeat: -1,
            },
            0
          );
        }
      });
    });
  };

  return (
    <section
      ref={(el) => (sectionRef = el)}
      class="py-32 overflow-hidden relative"
    >
      <div class="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2
          ref={(el) => (titleRef = el)}
          class="text-6xl font-[300] mb-20 font-mono"
        >
          The Tools I Use
        </h2>

        <div class="relative flex justify-center items-center min-h-[500px]">
          {/* Orbiting Skills - Start positioned in orbits */}
          <For each={skillGroups}>
            {(group, groupIndex) => (
              <For each={group.skills}>
                {(skill, skillIndex) => {
                  const totalSkillIndex =
                    skillGroups
                      .slice(0, groupIndex())
                      .reduce((sum, g) => sum + g.skills.length, 0) +
                    skillIndex();
                  const groupRadius = 100 + groupIndex() * 35; // Tighter orbits
                  const angleStep = 360 / group.skills.length;
                  const angle = skillIndex() * angleStep + groupIndex() * 25; // Offset each group

                  return (
                    <div
                      ref={(el) => (skillRefs[totalSkillIndex] = el)}
                      class={`absolute ${group.color} font-mono text-xs bg-black/90 px-3 py-1.5 rounded-full border border-current/30 backdrop-blur-sm cursor-pointer hover:scale-110 transition-all group`}
                      style={`
                        left: calc(50% + ${
                          Math.cos((angle * Math.PI) / 180) * groupRadius
                        }px);
                        top: calc(50% + ${
                          Math.sin((angle * Math.PI) / 180) * groupRadius
                        }px);
                        transform: translate(-50%, -50%);
                      `}
                    >
                      <span class="group-hover:text-white transition-colors whitespace-nowrap">
                        {skill}
                      </span>

                      {/* Group label tooltip */}
                      <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {group.name}
                      </div>
                    </div>
                  );
                }}
              </For>
            )}
          </For>

          {/* Orbital rings showing skill groups */}
          <For each={skillGroups}>
            {(group, index) => {
              const radius = 100 + index() * 35;
              return (
                <div
                  class={`absolute rounded-full border opacity-10 ${group.color.replace(
                    "text-",
                    "border-"
                  )}`}
                  style={`width: ${radius * 2}px; height: ${
                    radius * 2
                  }px; border-width: 1px; left: 50%; top: 50%; transform: translate(-50%, -50%);`}
                ></div>
              );
            }}
          </For>
        </div>

        {/* Skill Groups Legend */}
        <div class="mt-16 flex flex-wrap justify-center gap-6 text-sm font-mono">
          <For each={skillGroups}>
            {(group) => (
              <div class="flex items-center space-x-2">
                <div
                  class={`w-3 h-3 rounded-full bg-current ${group.color}`}
                ></div>
                <span class="text-gray-400">{group.name}</span>
              </div>
            )}
          </For>
        </div>

        {/* Stats */}
        <div class="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto text-center font-mono">
          <div>
            <div class="text-2xl font-bold text-green-400">
              {allSkills.length}+
            </div>
            <div class="text-gray-500 text-sm">Technologies</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-blue-400">
              {skillGroups.length}
            </div>
            <div class="text-gray-500 text-sm">Domains</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-purple-400">∞</div>
            <div class="text-gray-500 text-sm">Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
}
