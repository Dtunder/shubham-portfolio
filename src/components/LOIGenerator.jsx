import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download } from 'lucide-react';
import './LOIGenerator.css';

// ⚡ Bolt Optimization: Cache Intl.DateTimeFormat outside the component
// toLocaleDateString creates a new formatter instance every time it's called.
// By caching it, we prevent an expensive synchronous operation on every keystroke.
const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const LOIGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    projectTitle: '',
    hourlyRate: '50',
    weeklyHours: '10',
    projectScope: ''
  });

  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateLoiText = () => {
    const dateToday = dateFormatter.format(new Date());

    const cName = formData.companyName || '[Firmenname]';
    const cAddr = formData.companyAddress || '[Adresse]';
    const pTitle = formData.projectTitle || '[Projekttitel]';
    const pScope = formData.projectScope || '[Projektbeschreibung]';
    const rate = formData.hourlyRate || '50';
    const hours = formData.weeklyHours || '10';

    return `ABSICHTSERKLÄRUNG (LETTER OF INTENT)

Absender (Auftraggeber):
${cName}
${cAddr}

Empfänger:
Shubham Jayswal
Ahornstraße 55
52074 Aachen

Ort, Datum: Aachen, den ${dateToday}


Betreff: Absichtserklärung über eine freiberufliche Zusammenarbeit zu Studienzwecken (§ 21 Abs. 6 AufenthG)

Sehr geehrte Damen und Herren der Ausländerbehörde Städteregion Aachen,
sehr geehrter Herr Jayswal,

hiermit erklären wir, die ${cName}, unsere feste Absicht, eine freiberufliche und selbstständige Kooperation mit Herrn Shubham Jayswal (geboren am 15. November 2000, indischer Staatsangehöriger, Student der Mechatronik an der RWTH Aachen) einzugehen, sobald die erforderliche ausländerbehördliche Ausnahmegenehmigung erteilt wurde.

Für die geplante Zusammenarbeit wurden folgende Eckpunkte vereinbart:

1. Vertragsgegenstand & Projektaufgabe:
Herr Jayswal wird für uns Dienstleistungen im Bereich "${pTitle}" erbringen. Die spezifischen Aufgaben umfassen:
- ${pScope}
- Konzeptionelle Ausarbeitung mechatronischer System- und Softwareschnittstellen.
- Implementierung von Datenmodellen und Prozessautomatisierungen.

2. Arbeitszeit & Vereinbarkeit mit dem Studium:
Um den erfolgreichen Abschluss des Mechatronik-Studiums von Herrn Jayswal an der RWTH Aachen vollumfänglich zu priorisieren, wird die wöchentliche Arbeitszeit streng auf maximal ${hours} Stunden pro Woche begrenzt. Die Zusammenarbeit findet flexibel und studienbegleitend statt.

3. Vergütung:
Es wurde ein marktüblicher Honorarsatz von ${rate},- EUR pro Stunde vereinbart. Die Abrechnung erfolgt monatlich nach tatsächlich erbrachten Stunden per ordentlicher Rechnungstellung unter Anwendung der steuerlichen Kleinunternehmerregelung (§ 19 UStG).

Wir betonen ausdrücklich, dass die mathematisch-technischen Fähigkeiten von Herrn Jayswal als RWTH-Mechatroniker für unser Projekt von hohem innovativem Wert sind.

Wir würden uns über eine zeitnahe Genehmigung der selbstständigen Nebentätigkeit durch die zuständige Ausländerbehörde sehr freuen.

Mit freundlichen Grüßen,


____________________________________
(Unterschrift / Stempel des Auftraggebers)
${cName}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLoiText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateLoiText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const sanitizedName = (formData.companyName || 'Entwurf').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.href = url;
    link.download = `loi_entwurf_shubham_${sanitizedName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="loi" className="loi-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">LOI Generator</h2>
          <p className="section-subtitle">Dynamically generate an Ausländerbehörde-compliant Letter of Intent.</p>
        </div>

        <div className="loi-grid">
          {/* Form */}
          <motion.div 
            className="premium-card loi-form-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Project Parameters</h3>
            <form className="loi-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Aachen Tech GmbH"
                />
              </div>
              <div className="form-group">
                <label>Company Address</label>
                <input 
                  type="text" 
                  name="companyAddress" 
                  value={formData.companyAddress} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Templergraben 55, Aachen"
                />
              </div>
              <div className="form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  name="projectTitle" 
                  value={formData.projectTitle} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Automated Data Pipeline"
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Hourly Rate (€)</label>
                  <input 
                    type="number" 
                    name="hourlyRate" 
                    value={formData.hourlyRate} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group half">
                  <label>Hours / Week</label>
                  <input 
                    type="number" 
                    name="weeklyHours" 
                    value={formData.weeklyHours} 
                    onChange={handleInputChange} 
                    max="20"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Project Scope</label>
                <textarea 
                  name="projectScope" 
                  value={formData.projectScope} 
                  onChange={handleInputChange} 
                  placeholder="Brief 1-2 sentence description of technical tasks."
                  rows={3}
                />
              </div>
            </form>
          </motion.div>

          {/* Preview */}
          <motion.div 
            className="premium-card loi-preview-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="preview-header">
              <h3>Live Preview</h3>
              <div className="preview-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
                  {copied ? 'Copied!' : <><Copy size={14} /> Copy</>}
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleDownload}>
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
            <div className="preview-content">
              <pre>{generateLoiText()}</pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LOIGenerator;
