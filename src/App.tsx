import { useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MobileScrollToTop } from "./components/MobileScrollToTop";
import { OpenSource } from "./components/OpenSource";
import { Projects } from "./components/Projects";
import { Research } from "./components/Research";
import { StructuredData } from "./components/StructuredData";
import {
  MobileTopBar,
  Sidebar,
  useActiveSection,
} from "./components/Sidebar";
import { navLinks, socialLinks } from "./data/profile";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.id);
  const activeSection = useActiveSection(sectionIds);

  const navigate = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <StructuredData />
      <div className="min-h-screen lg:flex page-shell">
        <Sidebar
          navLinks={navLinks}
          socialLinks={socialLinks}
          activeSection={activeSection}
          onNavigate={navigate}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-56">
          <MobileTopBar onMenuOpen={() => setMobileOpen(true)} />

          <main
            className="mx-auto w-full max-w-7xl flex-1 px-6 pb-12 lg:px-10 lg:pb-16 xl:px-12"
            itemScope
            itemType="https://schema.org/profilePage"
          >
            <Hero />
            <Experience />
            <Research />
            <Projects />
            <OpenSource />
            <About />
            <Contact />
            <Footer />
          </main>
          <MobileScrollToTop />
        </div>
      </div>
    </>
  );
}
