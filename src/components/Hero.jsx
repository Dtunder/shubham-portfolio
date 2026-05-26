import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, Cpu } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="status-badge">
            <span className="pulse-dot"></span>
            Specializing in Industrial AI & Secure Local RAG
          </div>
          
          <h1 className="hero-title">
            Engineering <span className="gradient-text">Automation</span> <br/>
            & AI-Driven Systems.
          </h1>
          
          <p className="hero-description">
            I am Shubham Jayswal, a Mechatronics Engineering student at <strong>RWTH Aachen</strong>. 
            I bridge physical engineering and software by deploying secure local AI models, building high-performance Streamlit dashboards, and simulating cybernetic systems — fully documented in **C1/C2 Academic German**.
          </p>

          <div className="hero-actions">
            <a href="#loi" className="btn btn-primary">
              Draft Letter of Intent <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>
        </motion.div>

        <div className="feature-grid">
          <motion.div 
            className="premium-card feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Bot className="feature-icon" size={24} />
            <h3>AI Orchestration</h3>
            <p>Building local LLM pipelines and autonomous workflows to automate complex text and data tasks.</p>
          </motion.div>

          <motion.div 
            className="premium-card feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Code2 className="feature-icon" size={24} />
            <h3>Interactive Web</h3>
            <p>Developing high-performance dashboards using React, Vite, and Streamlit for financial and engineering data.</p>
          </motion.div>

          <motion.div 
            className="premium-card feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Cpu className="feature-icon" size={24} />
            <h3>Mechatronics & RL</h3>
            <p>Simulating cybernetic systems, reinforcement learning environments, and mechanical models.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
