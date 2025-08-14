import Hero from "../components/Landing/Hero";
import Spark from "../components/Landing/Spark";
import ConnectingLine from "../components/Landing/ConnectingLine";
import ExperienceCanvas from "../components/Landing/ExperienceCanvas";
import Projects from "../components/Landing/Projects";
import Skills from "../components/Landing/Skills";
import Testimonials from "../components/Landing/Testimonials";

export default function Home() {
  return (
    <div>
      <ExperienceCanvas />
      <Hero />
      <ConnectingLine />
      <Spark />
      <Projects />
      <Skills />
      <Testimonials />
    </div>
  );
}
