import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

const GithubIcon = ({ size = 18, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsData = [
  {
    title: "QuantumCFO",
    problem: "Excel-based models make financial planning, liquidity simulation, and multi-variable scenario testing slow and error-prone.",
    result: "High-performance Streamlit dashboard with multi-agent scenario simulations, enabling real-time CFO-level forecasting in seconds.",
    tags: ["Streamlit", "Python", "Pandas", "Multi-Agent AI"],
    type: "Financial AI",
    category: "ai",
    github: "https://github.com/Dtunder",
    live: null,
    badge: null
  },
  {
    title: "CRYPTO_HFT Core",
    problem: "Standard backtesting models fail to account for stochastic order book imbalances and dynamic microstructure shifts.",
    result: "Asyncio-driven backtesting engine with OBI bias modeling, ensemble alpha signals, and Avellaneda-Stoikov inventory risk management.",
    tags: ["Python", "Bybit API V5", "Asyncio", "Avellaneda-Stoikov"],
    type: "Quantitative Finance",
    category: "quant",
    github: "https://github.com/Dtunder",
    live: null,
    badge: "active"
  },
  {
    title: "Oekolopoly EVO-9",
    problem: "Traditional system dynamics models are static and fail to optimize complex multi-variable ecological-industrial feedback loops.",
    result: "MCTS + PPO reinforcement learning agent that discovers cap-free survival strategies across 10 parallel Jules-orchestrated seeds, outperforming academic baselines.",
    tags: ["Python", "Gymnasium", "MCTS", "SB3", "Jules Orchestration"],
    type: "Reinforcement Learning",
    category: "ai",
    github: "https://github.com/Dtunder/nasuta-evo8",
    live: null,
    badge: "research"
  },
  {
    title: "DeepMindMap",
    problem: "Standard mind mapping tools are static and disconnected from real-time AI reasoning — making knowledge synthesis and brainstorming inefficient.",
    result: "React/Vite knowledge graph application with AI-assisted node generation, dynamic relationship mapping, and interactive deep-dive into connected concepts.",
    tags: ["React", "Vite", "Node.js", "AI Integration"],
    type: "Knowledge Engineering",
    category: "web",
    github: "https://github.com/Dtunder/DeepMindMap",
    live: null,
    badge: null
  },
  {
    title: "Sonu CLI — Autonomous Agent",
    problem: "Gemini CLI lacks persistent memory, agentic tool-use loops, and a structured system for delegating complex multi-step tasks.",
    result: "Feature-rich terminal AI agent with health monitoring, RAM limits, multi-tool execution (file I/O, shell, search), /yolo mode, and a custom command system — all in a single Python CLI.",
    tags: ["Python", "Gemini API", "Rich TUI", "HealthMonitor"],
    type: "AI Infrastructure",
    category: "ai",
    github: "https://github.com/Dtunder",
    live: null,
    badge: "live"
  },
  {
    title: "Grandmaster Chess Bot",
    problem: "Building a competitive chess AI that reasons about long-term positional strategy beyond simple depth-limited minimax.",
    result: "Custom chess engine with alpha-beta pruning, iterative deepening, and advanced evaluation heuristics — benchmarked against Stockfish at various ELO levels.",
    tags: ["Python", "Alpha-Beta", "Iterative Deepening", "Chess"],
    type: "Game AI",
    category: "ai",
    github: "https://github.com/Dtunder",
    live: null,
    badge: null
  },
  {
    title: "Shree Jayswal Samaj Portal",
    problem: "The Jayswal community lacked a centralized digital platform for events, member registration, and news in German and Hindi.",
    result: "Full-stack community web portal with bilingual content, event calendar, member management, and a responsive premium UI serving 500+ members.",
    tags: ["React", "Node.js", "Community", "Bilingual"],
    type: "Web Development",
    category: "web",
    github: "https://github.com/Dtunder/shree-jayswal-samaj-portal",
    live: null,
    badge: null
  },
  {
    title: "Secure Local RAG for KMUs",
    problem: "German engineering KMUs want AI but cannot upload confidential IP, PDFs, and CAD files to cloud-based models due to DSGVO constraints.",
    result: "100% private, on-premise RAG pipeline using Llama 3/Mistral on local hardware, enabling secure semantic document search with zero data leaving the firm.",
    tags: ["Llama 3", "RAG", "DSGVO", "Ollama", "LangChain"],
    type: "Enterprise AI",
    category: "ai",
    github: "https://github.com/Dtunder",
    live: null,
    badge: null
  },
  {
    title: "Bewerbung_Tools",
    problem: "Manual PDF job description analysis and C1/C2 Anschreiben optimization are highly time-consuming — taking 2–4 hours per application.",
    result: "Fully automated Python/Gemini pipeline: parses PDFs, scores keyword match, generates AIDA-structured cover letters, and auto-fills AcroForm PDFs in under 30 seconds.",
    tags: ["Python", "Gemini API", "PyPDF", "AcroForms", "AIDA"],
    type: "AI Pipeline",
    category: "automation",
    github: "https://github.com/Dtunder",
    live: null,
    badge: null
  },
  {
    title: "API Key Rotator Daemon",
    problem: "Long-running AI workloads (multi-seed RL sweeps, Jules orchestration) fail unpredictably when API keys hit quota limits.",
    result: "Background daemon that probes key quota status on a rolling 60s cycle, atomically swaps .env credentials, and logs all rotations — giving 24/7 uninterrupted AI execution.",
    tags: ["Python", "Daemon", "API Management", "Keyring"],
    type: "DevOps & Infra",
    category: "automation",
    github: "https://github.com/Dtunder",
    live: null,
    badge: null
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'quant', label: 'Quant Finance' },
  { id: 'web', label: 'Web Dev' },
  { id: 'automation', label: 'Automation' },
];

const BADGE_CONFIG = {
  live: { label: '● Live', color: '#22c55e' },
  active: { label: '◆ Active', color: '#3b82f6' },
  research: { label: '◉ Research', color: '#a855f7' },
};

// ⚡ Bolt Optimization: Pre-calculate category counts once on module load
// instead of recalculating on every render within the map function
const CATEGORY_COUNTS = CATEGORIES.reduce((acc, cat) => {
  if (cat.id !== 'all') {
    acc[cat.id] = projectsData.filter(p => p.category === cat.id).length;
  }
  return acc;
}, {});

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // ⚡ Bolt Optimization: Memoize the filtered array so it doesn't recalculate
  // if the component re-renders for reasons other than activeFilter changing
  const filtered = useMemo(() => {
    return activeFilter === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Validated Case Studies</h2>
          <p className="section-subtitle">
            Real-world applications of complex software, AI infrastructure, and cybernetic engineering.
          </p>
        </div>

        {/* Category Filter */}
        <div className="projects-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="filter-count">
                  {CATEGORY_COUNTS[cat.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((project, index) => {
              const badge = project.badge ? BADGE_CONFIG[project.badge] : null;
              return (
                <motion.div
                  key={project.title}
                  className="premium-card project-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="project-header">
                    <div className="project-meta">
                      <span className="project-type">{project.type}</span>
                      {badge && (
                        <span className="project-badge" style={{ color: badge.color, borderColor: badge.color }}>
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-link-btn" title="GitHub">
                          <GithubIcon size={16} />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="icon-link-btn" title="Live Demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-title">{project.title}</h3>

                  <div className="case-study-details">
                    <p className="case-problem">
                      <span className="detail-label">Problem</span>
                      {project.problem}
                    </p>
                    <p className="case-result">
                      <span className="detail-label">Outcome</span>
                      {project.result}
                    </p>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a href="https://github.com/Dtunder" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <GithubIcon size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
