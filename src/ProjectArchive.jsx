import { useMemo, useState } from 'react'
import { Search, ArrowUpRight, FolderOpen, ShieldAlert, Code2, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react'
import { projectArchive } from './archiveData'
import './ProjectArchive.css'

const filters = [
  ['all', 'Alle Nachweise'],
  ['VERIFIED CODE', 'Verified Code'],
  ['DOCUMENTED PROJECT', 'Dokumentiert (RWTH/Privat)'],
  ['PROTOTYPE', 'Prototypen'],
  ['CONCEPT / IN PROGRESS', 'Konzepte / In Arbeit'],
  ['BROKEN / NOT PRESENTABLE', 'Gesperrt / Datenschutz']
]

const rank = {
  'VERIFIED DEMO': 0,
  'VERIFIED CODE': 1,
  'DOCUMENTED PROJECT': 2,
  'PROTOTYPE': 3,
  'CONCEPT / IN PROGRESS': 4,
  'BROKEN / NOT PRESENTABLE': 5
}

function groupByFamily(items) {
  const map = new Map()
  items.forEach(item => {
    if (!map.has(item.family)) map.set(item.family, [])
    map.get(item.family).push(item)
  })
  return [...map.entries()].map(([family, entries]) => {
    const sorted = [...entries].sort((a, b) => (rank[a.badge] ?? 99) - (rank[b.badge] ?? 99))
    const validLinks = sorted.filter(x => x.link && x.badge !== 'BROKEN / NOT PRESENTABLE')
    return {
      family,
      entries: sorted,
      representative: sorted[0],
      links: validLinks
    }
  }).sort((a, b) => {
    const rankA = rank[a.representative.badge] ?? 99
    const rankB = rank[b.representative.badge] ?? 99
    if (rankA !== rankB) return rankA - rankB
    return a.family.localeCompare(b.family, 'de')
  })
}

const allFamilies = groupByFamily(projectArchive)

function getBadgeClass(badge) {
  switch (badge) {
    case 'VERIFIED DEMO': return 'badge-tag badge-verified-demo'
    case 'VERIFIED CODE': return 'badge-tag badge-verified-code'
    case 'DOCUMENTED PROJECT': return 'badge-tag badge-documented'
    case 'PROTOTYPE': return 'badge-tag badge-prototype'
    case 'CONCEPT / IN PROGRESS': return 'badge-tag badge-concept'
    case 'BROKEN / NOT PRESENTABLE': return 'badge-tag badge-broken'
    default: return 'badge-tag'
  }
}

function getBadgeIcon(badge) {
  switch (badge) {
    case 'VERIFIED DEMO':
    case 'VERIFIED CODE':
      return <CheckCircle2 size={13} aria-hidden="true" />
    case 'DOCUMENTED PROJECT':
      return <Code2 size={13} aria-hidden="true" />
    case 'PROTOTYPE':
      return <AlertTriangle size={13} aria-hidden="true" />
    case 'CONCEPT / IN PROGRESS':
      return <HelpCircle size={13} aria-hidden="true" />
    case 'BROKEN / NOT PRESENTABLE':
      return <ShieldAlert size={13} aria-hidden="true" />
    default:
      return null
  }
}

export default function ProjectArchive() {
  const [query, setQuery] = useState('')
  const [badgeFilter, setBadgeFilter] = useState('all')
  const [category, setCategory] = useState('Alle')
  const [expanded, setExpanded] = useState(false)

  const categories = useMemo(
    () => ['Alle', ...new Set(projectArchive.map(e => e.category))].sort((a, b) =>
      a === 'Alle' ? -1 : b === 'Alle' ? 1 : a.localeCompare(b, 'de')
    ),
    []
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('de-DE')
    return allFamilies.filter(f => {
      if (category !== 'Alle' && !f.entries.some(e => e.category === category)) return false
      if (badgeFilter !== 'all' && !f.entries.some(e => e.badge === badgeFilter)) return false
      if (!term) return true
      return f.entries.some(e =>
        [e.title, e.family, e.category, e.description, e.source, e.evidence, e.badge]
          .join(' ')
          .toLocaleLowerCase('de-DE')
          .includes(term)
      )
    })
  }, [query, badgeFilter, category])

  const visible = expanded || query.trim() ? filtered : filtered.slice(0, 12)
  const verifiedCodeCount = projectArchive.filter(e => e.badge === 'VERIFIED CODE').length
  const publicLinksCount = projectArchive.filter(e => e.link && e.badge !== 'BROKEN / NOT PRESENTABLE').length

  return (
    <section className="archive-zone" id="archiv" aria-labelledby="archive-title">
      <div className="layout archive-content">
        <div className="archive-intro">
          <div>
            <p className="eyebrow">TRANSPARENTES PROJEKTARCHIV · AUDIT 2026</p>
            <h2 id="archive-title">Vollständiges Register aller Arbeiten</h2>
          </div>
          <p>
            Vollständige Übersicht aller 98 inventarisierten Arbeiten aus GitHub, Google Drive und RWTH-Projekten.
            Jedes Projekt ist nach einem strengen 6-Stufen-Verifikationsschema eingestuft.
            <strong> Keine erfundenen Erfolge, keine ungeprüften Behauptungen.</strong>
          </p>
        </div>

        <div className="archive-stats">
          <div><strong>{projectArchive.length}</strong><span>Inventarisierte Einträge</span></div>
          <div><strong>{allFamilies.length}</strong><span>Projektfamilien / Themen</span></div>
          <div><strong>{verifiedCodeCount}</strong><span>Lokal verifizierter Code (100% Tests)</span></div>
          <div><strong>{publicLinksCount}</strong><span>Sichere öffentliche Repositories</span></div>
        </div>

        <div className="archive-toolbar">
          <label className="archive-search">
            <Search size={17} aria-hidden="true" />
            <span className="visually-hidden">Projekte durchsuchen</span>
            <input
              type="search"
              value={query}
              placeholder="Suchen nach CAD, IMU, PID, AquaRevier, NASIM, CartPole …"
              onChange={e => { setQuery(e.target.value); setExpanded(false) }}
            />
          </label>
          <label>
            <span className="visually-hidden">Fachgebiet filtern</span>
            <select value={category} onChange={e => { setCategory(e.target.value); setExpanded(false) }}>
              {categories.map(c => (
                <option key={c} value={c}>{c === 'Alle' ? 'Alle Fachgebiete' : c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="archive-filters" aria-label="Verifikationsstatus filtern">
          {filters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={badgeFilter === value}
              className={badgeFilter === value ? 'archive-filter active' : 'archive-filter'}
              onClick={() => { setBadgeFilter(value); setExpanded(false) }}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="archive-count" role="status">
          {filtered.length} passende Projektfamilien · {filtered.reduce((n, f) => n + f.entries.length, 0)} Quelleneinträge
        </p>

        <div className="archive-grid">
          {visible.map(f => {
            const p = f.representative
            const badge = p.badge
            const hasSafeLink = f.links.length > 0 && badge !== 'BROKEN / NOT PRESENTABLE'
            return (
              <article key={f.family} className="archive-card">
                <div className="archive-card-top">
                  <span className="archive-category">{p.category}</span>
                  <span className={getBadgeClass(badge)}>
                    {getBadgeIcon(badge)}
                    {badge}
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>

                {p.evidence && (
                  <div className="archive-evidence-box">
                    <strong>Nachweis:</strong> {p.evidence}
                  </div>
                )}

                <div className="archive-card-bottom">
                  <span className="archive-sources">
                    <FolderOpen size={14} aria-hidden="true" />
                    {f.entries.length} {f.entries.length === 1 ? 'Eintrag' : 'Versionen / Quellen'}
                  </span>
                  {hasSafeLink && f.links.length === 1 && (
                    <a className="archive-link" href={f.links[0].link} target="_blank" rel="noopener noreferrer">
                      Code ansehen <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  {hasSafeLink && f.links.length > 1 && (
                    <details className="archive-variants">
                      <summary>{f.links.length} Repositories</summary>
                      <ul>
                        {f.links.map(e => (
                          <li key={e.id}>
                            <a href={e.link} target="_blank" rel="noopener noreferrer">{e.title}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {!hasSafeLink && (
                    <span className="archive-unavailable">
                      {badge === 'BROKEN / NOT PRESENTABLE' ? 'Datenschutzsperre' : 'Nicht öffentlich'}
                    </span>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {!filtered.length && (
          <p className="archive-empty">Keine Treffer für diese Filterkombination. Bitte Filter anpassen.</p>
        )}

        {!query.trim() && filtered.length > 12 && (
          <button
            type="button"
            className="archive-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Weniger anzeigen' : `Alle ${filtered.length} Projektfamilien anzeigen`}
          </button>
        )}

        <p className="archive-disclaimer">
          <strong>Methodischer Prüfhinweis:</strong> Als <em>VERIFIED CODE</em> sind ausschließlich Projekte gekennzeichnet, deren automatisierte Unit-Tests in reproduzierbaren Testläufen zu 100% bestanden haben. Hochschul- und Institutsdaten (RWTH Aachen / ISA / MSE / WZL) sowie vertrauliche Kontaktdaten unterliegen dem Datenschutz und werden nicht öffentlich exponiert.
        </p>

        <div className="archive-roadmap">
          <span className="roadmap-tag">Roadmap / Zukunftsprojekt · Keine fertige Software</span>
          <h3>Interaktiver Simulator zur Masterarbeit</h3>
          <p>
            Im Rahmen des laufenden Masterstudiums der Produktionstechnik an der RWTH Aachen ist ein interaktiver technischer Simulator zur vergleichenden Prozess- und Regelungssimulation geplant. Besucher werden hier später Modellparameter, Sensorrauschen und Störungen interaktiv im Webbrowser variieren können.
          </p>
        </div>
      </div>
    </section>
  )
}
