import Hero from "../components/Landing/Hero";
import Spark from "../components/Landing/Spark";
import ConnectingLine from "../components/Landing/ConnectingLine";
import ExperienceCanvas from "../components/Landing/ExperienceCanvas";
import About from "../components/Landing/About";
import Projects from "../components/Landing/Projects";
import Skills from "../components/Landing/Skills";
import Testimonials from "../components/Landing/Testimonials";
import Contact from "../components/Landing/Contact";

export default function Home() {
  return (
    <div>
      <ExperienceCanvas />
      <Hero />
      <ConnectingLine />
      <Spark />
      <About />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  );
}
