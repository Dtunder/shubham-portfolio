
import { motion } from 'framer-motion';
import { Settings, Terminal, Globe } from 'lucide-react';
import './Skills.css';

const skillGroups = [
  {
    title: "Engineering & Modeling",
    icon: <Settings size={20} />,
    skills: [
      { name: "Mechatronic Systems", level: "RWTH Level" },
      { name: "Control Systems & Simulation", level: "Excellent" },
      { name: "CAD Modeling (SolidWorks)", level: "Advanced" },
      { name: "Reinforcement Learning", level: "Applied" }
    ]
  },
  {
    title: "Software & AI",
    icon: <Terminal size={20} />,
    skills: [
      { name: "Python (Pandas, PyTorch)", level: "Expert" },
      { name: "AI Agent Orchestration", level: "Expert" },
      { name: "React / Vite / Streamlit", level: "Advanced" },
      { name: "Git / CI/CD", level: "Professional" }
    ]
  },
  {
    title: "Languages & Workflow",
    icon: <Globe size={20} />,
    skills: [
      { name: "German (C1/C2 Academic)", level: "Fluent" },
      { name: "English", level: "Fluent" },
      { name: "First-Principles Thinking", level: "Standard" },
      { name: "Systematic Structuring", level: "Reliable" }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">Bridging the gap between physical engineering and high-end software.</p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex}
              className="premium-card skill-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <div className="sg-header">
                <div className="sg-icon">{group.icon}</div>
                <h3>{group.title}</h3>
              </div>
              <ul className="skill-list">
                {group.skills.map((skill, index) => (
                  <li key={index}>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
