
import { motion } from 'framer-motion';
import { Bot, Shield, BarChart3 } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    title: "Industrial AI Agents",
    icon: <Bot size={24} className="service-icon" />,
    description: "Building custom 'Observer Agents' that monitor industrial machine logs or MQTT telemetry streams to autonomously detect anomalies, predict maintenance needs, and trigger reports.",
    benefit: "Prevents costly downtime for manufacturing SMEs."
  },
  {
    title: "Privacy-First Local RAG",
    icon: <Shield size={24} className="service-icon" />,
    description: "Deploying secure, on-premise Large Language Models (LLMs like Llama 3 / Mistral) with Retrieval-Augmented Generation (RAG). Engineers can safely chat with decades of confidential PDFs and design manuals.",
    benefit: "Protects engineering IP with 100% data sovereignty."
  },
  {
    title: "Interactive BI & Simulation Dashboards",
    icon: <BarChart3 size={24} className="service-icon" />,
    description: "Converting static, complex Excel models or mechatronic simulations into high-performance, real-time Streamlit or React web dashboards for risk forecasting and decision-making.",
    benefit: "Transitions your R&D and operations from Excel Hell to BI Excellence."
  }
];

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Specialized Services</h2>
          <p className="section-subtitle">Bridging complex mechatronic systems and secure, high-performance software.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <motion.div 
              key={index}
              className="premium-card service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-header-row">
                <div className="service-icon-wrapper">{service.icon}</div>
                <h3 className="service-card-title">{service.title}</h3>
              </div>
              <p className="service-desc">{service.description}</p>
              <div className="service-benefit-badge">
                <span className="benefit-label">Business Value:</span> {service.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
