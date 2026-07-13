import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Journey from "./components/Journey.jsx";
import Projects from "./components/Projects.jsx";
import Certificates from "./components/Certificates.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Catch-all keeps deep links / refreshes on GitHub Pages landing
              on the real single-page site instead of a dead route. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
