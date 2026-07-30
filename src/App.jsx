
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import LOIGenerator from './components/LOIGenerator';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Subtle ambient gradient at the top */}
      <div className="ambient-header-glow" />

      <header className="site-header">
        <div className="container header-container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="logo"
          >
            <span className="logo-text">SJ.</span>
            <span className="logo-badge">RWTH</span>
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="main-nav"
          >
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#loi">LOI Generator</a>
          </motion.nav>
        </div>
      </header>

      <main>
        <Hero />
        <Services />
        <Projects />
        <Skills />
        <LOIGenerator />
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>© 2026 Shubham Jayswal. Mechatronics Engineering at RWTH Aachen.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
