import { useMemo, useState } from 'react'
import { ArrowUpRight, Code2, Mail, CheckCircle2, FlaskConical, MapPin } from 'lucide-react'
import ProjectArchive from './ProjectArchive'
import './App.css'

const categories = [
  { id: 'all', label: 'Alle Projekte' },
  { id: 'engineering', label: 'Engineering & Messdaten' },
  { id: 'software', label: 'Software & KI' },
  { id: 'research', label: 'Forschung & Simulation' }
]

const projects = [
  {
    title: 'IMU-Signalfilter in Python',
    category: 'engineering',
    evidence: 'Quellcode und Tests vorhanden',
    summary: 'Implementierung von Kalman-, Komplementär- und Tiefpassfiltern mit Konfiguration und Unit-Testdateien.',
    stack: ['Python', 'Signalverarbeitung', 'Tests'],
    url: 'https://github.com/Dtunder/mecha-imu-filter'
  },
  {
    title: 'PID-Regelung und Streckensimulation',
    category: 'engineering',
    evidence: 'Quellcode und Tests vorhanden',
    summary: 'PID-Controller, vereinfachtes Streckenmodell mit Verzögerung und Verfahren zur Parameterabstimmung.',
    stack: ['Python', 'Regelungstechnik', 'Simulation'],
    url: 'https://github.com/Dtunder/pid-controller-simulator'
  },
  {
    title: 'WindCartPole – eigene RL-Umgebung',
    category: 'software',
    evidence: 'Quellcode und Tests vorhanden',
    summary: 'Erweiterung einer Gymnasium-CartPole-Umgebung mit konfigurierbaren äußeren Windstörungen.',
    stack: ['Python', 'Gymnasium', 'Reinforcement Learning'],
    url: 'https://github.com/Dtunder/rl-cartpole-custom'
  },
  {
    title: 'Ökolopoly – RL-Experiment',
    category: 'research',
    evidence: 'Experimenteller Code vorhanden',
    summary: 'Modellierung eines nichtlinearen Systems mit Reinforcement Learning; Evaluationsskripte sind öffentlich, Ergebnisangaben nicht unabhängig verifiziert.',
    stack: ['PPO', 'Simulation', 'Evaluation'],
    url: 'https://github.com/Dtunder/Oekolopoly_Evo12'
  },
  {
    title: 'Gleitlager: Zustands- und Lebensdauerprognose',
    category: 'engineering',
    evidence: 'Bachelorarbeit · Forschungsdaten nicht öffentlich',
    summary: 'Prüfstands- und Sensorsignale unter Mischreibung mit MATLAB ausgewertet; Methodik zur Lebensdauerprognose mittels Bayes’scher Inferenz.',
    stack: ['MATLAB', 'Sensorik', 'Bayes'],
    url: null
  },
  {
    title: 'DED-Arc: Lagenauftragsgenauigkeit',
    category: 'research',
    evidence: 'RWTH-Projektarbeit · Unterlagen nicht öffentlich',
    summary: 'Modellgestützte Optimierung gependelter Überlappungen im drahtbasierten additiven Fertigungsprozess.',
    stack: ['Optimierung', 'Fertigung', 'Modellierung'],
    url: null
  },
  {
    title: 'NASIM: Zeitreihen und Abflusskennwerte',
    category: 'research',
    evidence: 'Projektanalyse · Rohdaten nicht öffentlich',
    summary: 'Aufbereitung langjähriger Simulationszeitreihen mit Fehlwertprüfungen, Aggregation und Plausibilisierung von Kennzahlen.',
    stack: ['Python', 'Zeitreihen', 'Datenqualität'],
    url: null
  },
  {
    title: 'AquaRevier – WebGIS & Geodaten am ISA',
    category: 'software',
    evidence: 'Berufserfahrung · Institutsdaten nicht öffentlich',
    summary: 'Arbeit an interaktiven Webkarten und Geodatenintegration im AquaRevier-/RWTH-Kontext. Live-App und interne Projektdaten sind nicht für die Portfolio-Verlinkung freigegeben.',
    stack: ['JavaScript', 'Leaflet', 'Geodaten'],
    url: null
  }
]

const highlights = [
  { title: 'Ingenieurwissenschaften', detail: 'Maschinenbau B.Sc. abgeschlossen, RWTH Aachen · Master Produktionstechnik seit 10/2026' },
  { title: 'Praktische Erfahrung', detail: 'ISA, MSE und WZL an der RWTH sowie industrielle Praxis bei TRUMPF und SLTL' },
  { title: 'Nachvollziehbare Arbeit', detail: 'Messdaten, Simulation und Software mit expliziten Tests, Annahmen und Grenzen' }
]

function App() {
  const [filter, setFilter] = useState('all')
  const visible = useMemo(
    () => filter === 'all' ? projects : projects.filter(project => project.category === filter),
    [filter]
  )

  return (
    <div className="site">
      <header className="topbar">
        <div className="layout topbar-inner">
          <a className="brand" href="#start" aria-label="Startseite Shubham Jayswal"><span className="brand-mark">SJ</span><span>Shubham Jayswal</span></a>
          <nav className="nav" aria-label="Hauptnavigation">
            <a href="#projekte">Highlights</a>
            <a href="#archiv">Archiv</a>
            <a href="#profil">Profil</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="start">
          <div className="layout hero-grid">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> ENGINEERING · SOFTWARE · DATEN</p>
              <h1>Technische Probleme verstehen.<br/><em>Nachvollziehbare Lösungen entwickeln.</em></h1>
              <p className="lead">Ich bin Shubham Jayswal, Maschinenbauabsolvent und Masterstudent der Produktionstechnik an der RWTH Aachen. Ich verbinde Prüfstands- und Messdatenanalyse mit Python, Simulation und sorgfältig getesteten Software-Workflows.</p>
              <div className="hero-actions">
                <a className="action action-primary" href="#projekte">Arbeitsproben ansehen <ArrowUpRight size={17}/></a>
                <a className="action action-secondary" href="https://github.com/Dtunder" target="_blank" rel="noreferrer">GitHub-Profil <Code2 size={17}/></a>
              </div>
              <p className="location"><MapPin size={15}/> Aachen, NRW · Deutsch und Englisch</p>
            </div>
            <aside className="hero-panel" aria-label="Qualifikationen">
              <div className="panel-monogram">SJ<span>.</span></div>
              <p className="panel-overline">Mein Schwerpunkt</p>
              <strong>Von realen Messsignalen zu überprüfbaren digitalen Werkzeugen.</strong>
              <div className="panel-line" />
              <span>Sensorik / Messdaten</span>
              <span>Python / API-Workflows</span>
              <span>Simulation / Qualitätsprüfung</span>
            </aside>
          </div>
        </section>

        <section className="projects layout" id="projekte">
          <div className="section-head">
            <div><p className="eyebrow">ARBEITSPROBEN</p><h2>Ausgewählte Projekte</h2></div>
            <p>Öffentlicher Quellcode wird direkt verlinkt. Bei Hochschul- und Institutsarbeiten bleiben nicht freigegebene Daten privat.</p>
          </div>
          <div className="filters" aria-label="Projekte filtern">
            {categories.map(c => <button key={c.id} type="button" onClick={() => setFilter(c.id)} className={filter === c.id ? 'filter selected' : 'filter'} aria-pressed={filter === c.id}>{c.label}</button>)}
          </div>
          <div className="project-grid">
            {visible.map(p => (
              <article className="project-card" key={p.title}>
                <div className="project-status">{p.url ? <CheckCircle2 size={15} /> : <FlaskConical size={15}/>} {p.evidence}</div>
                <h3>{p.title}</h3><p>{p.summary}</p>
                <div className="chips">{p.stack.map(t => <span key={t}>{t}</span>)}</div>
                {p.url
                  ? <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer">Quellcode ansehen <ArrowUpRight size={16}/></a>
                  : <span className="project-unavailable">Keine öffentlichen Projektdaten</span>}
              </article>
            ))}
          </div>
          <p className="evidence-note"><strong>Transparenz:</strong> Das Vorhandensein von Code oder Testdateien ist kein Nachweis für fehlerfreie Software, wissenschaftlich validierte Ergebnisse oder produktiven Unternehmenseinsatz. Dieses Portfolio unterscheidet öffentliche Arbeitsproben von nicht freigegebenen Forschungsarbeiten.</p>
        </section>

        <ProjectArchive />

        <section className="profile" id="profil">
          <div className="layout">
            <p className="eyebrow">HINTERGRUND</p><h2>Was ich mitbringe</h2>
            <div className="highlight-grid">
              {highlights.map((item, i) => <div className="highlight" key={item.title}><span className="highlight-num">0{i+1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}
            </div>
            <p className="techline"><strong>Technologien:</strong> Python · MATLAB · JavaScript/HTML · Git · REST/JSON · Leaflet · Signal- und Zeitreihenanalyse</p>
          </div>
        </section>

        <section className="contact layout" id="kontakt">
          <p className="eyebrow">KONTAKT</p><h2>Interesse an meiner Arbeit?</h2>
          <p>Für Rückfragen zu den öffentlich dokumentierten Projekten oder zu passenden technischen Tätigkeiten bin ich per E-Mail erreichbar.</p>
          <div className="hero-actions">
            <a href="mailto:jayswalshubham13@gmail.com" className="action action-primary"><Mail size={17}/> E-Mail schreiben</a>
            <a href="https://github.com/Dtunder/shubham-portfolio" className="action action-secondary" target="_blank" rel="noreferrer"><Code2 size={17}/> Quellcode dieser Webseite</a>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="layout footer-inner"><span>© 2026 Shubham Jayswal · Aachen</span><span>Stand: 25.10.2026 · Angaben ohne vertrauliche Institutsdaten</span></div></footer>
    </div>
  )
}

export default App
