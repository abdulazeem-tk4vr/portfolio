import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Certifications } from "./components/Certifications";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MobileScrollToTop } from "./components/MobileScrollToTop";
import { OpenSource } from "./components/OpenSource";
import { Projects } from "./components/Projects";
import { Research } from "./components/Research";
import { StructuredData } from "./components/StructuredData";
import { Navigation } from "./components/Sidebar";

export default function App() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen page-shell">
        <Navigation />
        <div className="portfolio-content flex min-h-screen flex-col">
          <main
            id="main-content"
            tabIndex={-1}
            className="portfolio-main flex-1"
            itemScope
            itemType="https://schema.org/ProfilePage"
          >
            <Hero />
            <About />
            <Experience />
            <Research />
            <OpenSource />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
          </main>
          <MobileScrollToTop />
        </div>
      </div>
    </>
  );
}
