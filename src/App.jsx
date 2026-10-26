import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Code2,
  Mail,
  CheckCircle2,
  FlaskConical,
  MapPin,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Terminal
} from 'lucide-react'
import ProjectArchive from './ProjectArchive'
import portraitWebp from './assets/shubham-jayswal.webp'
import portraitWebp320 from './assets/shubham-jayswal-320.webp'
import portraitJpg from './assets/shubham-jayswal.jpg'
import './App.css'

const categories = [
  { id: 'all', label: 'Alle Highlights' },
  { id: 'engineering', label: 'Engineering & Regelung' },
  { id: 'software', label: 'Software & KI' },
  { id: 'research', label: 'Forschung & Institut' }
]

const highlightProjects = [
  {
    title: 'IMU-Signalfilter in Python',
    category: 'engineering',
    badge: 'VERIFIED CODE',
    evidence: '14/14 Unit-Tests bestanden (pytest)',
    summary: 'Implementierung und Vergleich von Kalman-, Komplementär- und Tiefpassfiltern zur Sensorfusions- und Orientierungsschätzung auf realitätsnahen Sensorsignalen.',
    stack: ['Python', 'Sensorfusion', 'Kalman-Filter', 'Pytest'],
    url: 'https://github.com/Dtunder/mecha-imu-filter',
    githubText: 'GitHub Repo'
  },
  {
    title: 'PID-Regelung & Streckensimulation',
    category: 'engineering',
    badge: 'VERIFIED CODE',
    evidence: '18/18 Unit-Tests bestanden (pytest)',
    summary: 'Diskreter PID-Controller mit Totzeitmodellierung, Anti-Windup und automatisierter Parameterabstimmung zur robusten Störunterdrückung.',
    stack: ['Python', 'Regelungstechnik', 'Simulation', 'Pytest'],
    url: 'https://github.com/Dtunder/pid-controller-simulator',
    githubText: 'GitHub Repo'
  },
  {
    title: 'CAD-to-Quote & JobPack Copilot',
    category: 'engineering',
    badge: 'VERIFIED CODE',
    evidence: '30+ Unit-Tests lokal verifiziert',
    summary: 'Ingenieur-Vorkalkulation für CNC-Fräsen und Blechzuschnitt aus DXF- und STL-Dateien mit Geometrieextraktion, Stundensätzen und revisionssicherem PDF-JobPack.',
    stack: ['Python', 'CAD-Parsing (ezdxf)', 'ReportLab', 'Fertigung'],
    url: null,
    githubText: null
  },
  {
    title: 'WindCartPole – RL-Environment',
    category: 'software',
    badge: 'VERIFIED CODE',
    evidence: '33/33 Unit-Tests bestanden (pytest)',
    summary: 'Erweiterung der Standard-Gymnasium-CartPole-Umgebung um stochastische Seitenwind- und Turbulenzstörungen zur Evaluierung robuster Reinforcement-Learning-Agenten.',
    stack: ['Python', 'Gymnasium', 'Reinforcement Learning', 'Pytest'],
    url: 'https://github.com/Dtunder/rl-cartpole-custom',
    githubText: 'GitHub Repo'
  },
  {
    title: 'BOM-Kalkulator & CAD-Stücklistenoptimierung',
    category: 'engineering',
    badge: 'VERIFIED CODE',
    evidence: '12/12 Unit-Tests bestanden (pytest)',
    summary: 'Automatisierte Bereinigung, Deduplizierung und hierarchische Kostenaggregation von mehrstufigen CAD- und ERP-Stücklisten (BOM).',
    stack: ['Python', 'Datenbereinigung', 'Stücklisten', 'Pytest'],
    url: 'https://github.com/Dtunder/bom-optimizer',
    githubText: 'GitHub Repo'
  },
  {
    title: 'Gleitlager: RUL-Verschleißprognose (B.Sc. RWTH)',
    category: 'research',
    badge: 'DOCUMENTED PROJECT',
    evidence: 'Bachelorarbeit MSE RWTH · Daten geschützt',
    summary: 'Zustandsüberwachung und Restlebensdauerabschätzung von Gleitlagern unter Mischreibung. Analyse von Prüfstandssignalen und Bayes’sche Inferenz.',
    stack: ['MATLAB', 'Tribologie', 'Bayes-Inferenz', 'Prüfstandsdaten'],
    url: null,
    githubText: null
  },
  {
    title: 'AquaRevier – WebGIS am ISA der RWTH Aachen',
    category: 'research',
    badge: 'DOCUMENTED PROJECT',
    evidence: 'HiWi-Tätigkeit am ISA · Datenschutz gewahrt',
    summary: 'Entwicklung interaktiver Kartenkomponenten und Pegel-Auswertungen im Strukturwandelprojekt AquaRevier. Interne Dienst- und Kontaktdaten bleiben geschützt.',
    stack: ['JavaScript', 'Leaflet', 'GeoJSON', 'Zeitreihen'],
    url: null,
    githubText: null
  },
  {
    title: 'Adaptive Fertigungssteuerung (Master-Simulator)',
    category: 'software',
    badge: 'CONCEPT / IN PROGRESS',
    evidence: 'Roadmap M.Sc. Produktionstechnik RWTH',
    summary: 'Geplante interaktive Websimulation zur Visualisierung von dynamischen Regelkreisen und Sensorunsicherheiten in vernetzten Fertigungsprozessen.',
    stack: ['Python', 'Simulation', 'Produktionstechnik', 'Roadmap'],
    url: null,
    githubText: null
  }
]

const profilePillars = [
  {
    icon: GraduationCap,
    title: 'Akademische Fundierung',
    detail: 'B.Sc. Maschinenbau an der RWTH Aachen (2026 abgeschlossen); laufendes Masterstudium Produktionstechnik (M.Sc., seit Oktober 2026).'
  },
  {
    icon: Briefcase,
    title: 'Institut & Industriepraxis',
    detail: 'Studentische Hilfskraft am ISA der RWTH Aachen; Vorerfahrung an Instituten (MSE, WZL) sowie Industrieerfahrung bei TRUMPF und SLTL.'
  },
  {
    icon: Terminal,
    title: 'Strenge Software-Disziplin',
    detail: 'Verbindung von Ingenieurmodellen mit sauberer Python-Entwicklung, nachvollziehbaren Unit-Tests (pytest) und solider Datenverarbeitung.'
  }
]

export default function App() {
  const [filter, setFilter] = useState('all')

  const visibleProjects = useMemo(() => {
    if (filter === 'all') return highlightProjects
    return highlightProjects.filter(p => p.category === filter)
  }, [filter])

  return (
    <div className="site">
      <header className="topbar">
        <div className="layout topbar-inner">
          <a className="brand" href="#start" aria-label="Startseite Shubham Jayswal">
            <span className="brand-mark">SJ</span>
            <span>Shubham Jayswal</span>
          </a>
          <nav className="nav" aria-label="Hauptnavigation">
            <a href="#projekte">Highlights</a>
            <a href="#archiv">Projektarchiv</a>
            <a href="#profil">Werdegang</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <div className="topbar-cta">
            <a className="btn-contact-nav" href="#kontakt">
              <Mail size={15} aria-hidden="true" />
              <span>Kontakt</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="start">
          <div className="layout hero-grid">
            <div className="hero-text-col">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                INGENIEURWESEN · SOFTWARE · DATENANALYSE
              </p>
              <h1>
                Technische Systeme verstehen.<br />
                <em>Nachweisbare Lösungen entwickeln.</em>
              </h1>
              <p className="lead">
                Ich bin Shubham Jayswal, B.Sc. Maschinenbau und Masterstudent der Produktionstechnik an der RWTH Aachen.
                Ich verbinde ingenieurwissenschaftliche Methodik mit Python, Simulation und sorgfältig getesteten Software- und KI-Workflows.
              </p>

              <div className="hero-actions">
                <a className="action action-primary" href="#projekte">
                  Arbeitsproben ansehen <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a
                  className="action action-secondary"
                  href="https://github.com/Dtunder"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub @Dtunder <ExternalLink size={16} aria-hidden="true" />
                </a>
                <a className="action action-outline" href="#kontakt">
                  <Mail size={16} aria-hidden="true" /> Kontakt aufnehmen
                </a>
              </div>

              <div className="hero-meta-bar">
                <span className="location">
                  <MapPin size={15} aria-hidden="true" /> Aachen, NRW · Deutsch & Englisch
                </span>
                <span className="hero-meta-pill">
                  <ShieldCheck size={14} aria-hidden="true" /> Geprüfte Nachweise
                </span>
              </div>
            </div>

            {/* HERO PROFILE PHOTO CARD */}
            <aside className="hero-portrait-card" aria-label="Porträt Shubham Jayswal">
              <div className="portrait-image-wrapper">
                <picture>
                  <source srcSet={portraitWebp320} media="(max-width: 480px)" type="image/webp" />
                  <source srcSet={portraitWebp} type="image/webp" />
                  <img
                    src={portraitJpg}
                    alt="Bewerbungsfoto von Shubham Jayswal (Maschinenbau B.Sc., RWTH Aachen)"
                    className="portrait-photo"
                    width="280"
                    height="350"
                    loading="eager"
                  />
                </picture>
                <div className="portrait-badge">
                  <span className="portrait-badge-dot" />
                  RWTH Aachen · M.Sc. Produktionstechnik
                </div>
              </div>
              <div className="portrait-info">
                <strong>Shubham Jayswal</strong>
                <span>B.Sc. Maschinenbau · HiWi am ISA (RWTH)</span>
              </div>
            </aside>
          </div>
        </section>

        {/* HIGHLIGHT PROJECTS SECTION */}
        <section className="projects layout" id="projekte">
          <div className="section-head">
            <div>
              <p className="eyebrow">AUSGEWÄHLTE ARBEITSPROBEN</p>
              <h2>Fokusprojekte mit Qualitätsnachweis</h2>
            </div>
            <p>
              Jedes öffentlich angebotene Projekt wurde lokal ausgeführt und anhand von Unit-Tests verifiziert.
              Bei RWTH- und Institutsarbeiten bleiben geschützte Forschungs- und Personendaten vertraulich.
            </p>
          </div>

          <div className="filters" aria-label="Projekte nach Kategorie filtern">
            {categories.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={filter === c.id ? 'filter selected' : 'filter'}
                aria-pressed={filter === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map(p => {
              const isVerified = p.badge === 'VERIFIED CODE'
              const isDocumented = p.badge === 'DOCUMENTED PROJECT'
              return (
                <article className="project-card" key={p.title}>
                  <div className="project-card-header">
                    <span className={isVerified ? 'project-status-verified' : isDocumented ? 'project-status-documented' : 'project-status-concept'}>
                      {isVerified ? <CheckCircle2 size={14} aria-hidden="true" /> : <FlaskConical size={14} aria-hidden="true" />}
                      {p.badge}
                    </span>
                    <span className="project-evidence-tag">{p.evidence}</span>
                  </div>

                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>

                  <div className="chips">
                    {p.stack.map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    {p.url ? (
                      <a
                        className="project-link"
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Quellcode auf GitHub <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="project-unavailable">
                        {isDocumented ? 'Forschungs- / Institutsarbeit' : 'In Bearbeitung'}
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <p className="evidence-note">
            <strong>Qualitätsversprechen:</strong> Als <em>VERIFIED CODE</em> gekennzeichnete Repositories enthalten keine bloßen Dummy-Dateien, sondern wurden in einer frischen Testumgebung lokal gebaut und getestet (100% bestandene Tests).
          </p>
        </section>

        {/* FULL PROJECT ARCHIVE */}
        <ProjectArchive />

        {/* PROFILE / WERDEGANG SECTION */}
        <section className="profile" id="profil">
          <div className="layout">
            <p className="eyebrow">WERDEGANG & KOMPETENZEN</p>
            <h2>Ingenieurwissen trifft Implementierungskraft</h2>
            <div className="highlight-grid">
              {profilePillars.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div className="highlight" key={item.title}>
                    <div className="highlight-icon-box">
                      <IconComponent size={20} aria-hidden="true" />
                      <span className="highlight-num">0{i + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                )
              })}
            </div>
            <div className="tech-box">
              <p className="techline">
                <strong>Kerntechnologien:</strong> Python (NumPy, SciPy, pytest, Gymnasium, ezdxf) · MATLAB / Simulink · JavaScript / HTML5 / Leaflet · Git & CI · REST-APIs · CAD-Datenanalyse
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION (PRIORITY 2) */}
        <section className="contact-section layout" id="kontakt">
          <div className="contact-card">
            <div className="contact-header">
              <p className="eyebrow">DIREKTE KONTAKTAUFNAHME</p>
              <h2>Lassen Sie uns ins Gespräch kommen</h2>
              <p className="contact-subline">
                Ich freue mich über den fachlichen Austausch zu Ingenieur- und Softwareprojekten,
                Masterarbeitsthemen oder passenden Einstiegsmöglichkeiten.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-item-label">Vollständiger Name</span>
                <strong>Shubham Jayswal</strong>
                <span className="contact-item-sub">B.Sc. Maschinenbau · M.Sc. Produktionstechnik</span>
              </div>

              <div className="contact-item">
                <span className="contact-item-label">Standort</span>
                <strong>Aachen, Nordrhein-Westfalen</strong>
                <span className="contact-item-sub">RWTH Aachen Campus</span>
              </div>

              <div className="contact-item">
                <span className="contact-item-label">E-Mail (Direktkontakt)</span>
                <a
                  href="mailto:jayswalshubham13@gmail.com"
                  className="contact-link contact-email-link"
                >
                  <Mail size={16} aria-hidden="true" />
                  jayswalshubham13@gmail.com
                </a>
                <span className="contact-item-sub">Klicken zum Verfassen</span>
              </div>

              <div className="contact-item">
                <span className="contact-item-label">GitHub-Profil</span>
                <a
                  href="https://github.com/Dtunder"
                  className="contact-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Code2 size={16} aria-hidden="true" />
                  github.com/Dtunder
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <span className="contact-item-sub">Öffentliche Repositories & Tests</span>
              </div>
            </div>

            <div className="contact-cta-row">
              <a
                href="mailto:jayswalshubham13@gmail.com?subject=Anfrage%20via%20Portfolio%20Shubham%20Jayswal"
                className="action action-primary action-large"
              >
                <Mail size={18} aria-hidden="true" /> E-Mail schreiben
              </a>
              <a
                href="https://github.com/Dtunder/shubham-portfolio"
                className="action action-secondary"
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={17} aria-hidden="true" /> Quellcode dieses Portfolios
              </a>
            </div>

            <p className="privacy-notice">
              <strong>Hinweis zum Datenschutz:</strong> Zum Schutz der Privatsphäre werden private Telefonnummern, Geburtsdaten und Wohnanschriften nicht im Web veröffentlicht. Ausführliche Zeugnisse und Kontaktdaten stelle ich auf Anfrage gerne direkt zur Verfügung.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="layout footer-inner">
          <div className="footer-left">
            <span>© 2026 Shubham Jayswal · Aachen, Deutschland</span>
            <span className="footer-bullet">•</span>
            <span>Entwickelt mit React & Vite</span>
          </div>
          <div className="footer-right">
            <span>Stand: Oktober 2026</span>
            <span className="footer-bullet">•</span>
            <a href="https://github.com/Dtunder" target="_blank" rel="noreferrer">
              github.com/Dtunder
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
