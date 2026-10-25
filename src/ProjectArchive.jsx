import { useMemo, useState } from 'react'
import { Search, ArrowUpRight, FolderOpen, ShieldAlert, Code2 } from 'lucide-react'
import { projectArchive } from './archiveData'
import './ProjectArchive.css'

const filters = [
  ['all', 'Alle Nachweise'],
  ['code', 'Mit öffentlichem Code'],
  ['private', 'Interne Arbeiten'],
  ['stub', 'Repo-Entwürfe']
]
const rank = { code: 0, review: 1, private: 2, stub: 3 }
function groupByFamily(items) {
  const map = new Map()
  items.forEach(item => {
    if (!map.has(item.family)) map.set(item.family, [])
    map.get(item.family).push(item)
  })
  return [...map.entries()].map(([family,entries]) => {
    const sorted = [...entries].sort((a,b) => rank[a.state]-rank[b.state])
    return {family, entries:sorted, representative:sorted[0], links: sorted.filter(x=>x.link && x.state==='code')}
  }).sort((a,b)=>(b.links.length>0)-(a.links.length>0) || a.family.localeCompare(b.family,'de'))
}
const allFamilies = groupByFamily(projectArchive)

export default function ProjectArchive() {
  const [query,setQuery] = useState('')
  const [status,setStatus] = useState('all')
  const [category,setCategory] = useState('Alle')
  const [expanded,setExpanded] = useState(false)
  const categories = useMemo(()=>['Alle', ...new Set(projectArchive.map(e=>e.category))].sort((a,b)=>a==='Alle'?-1:b==='Alle'?1:a.localeCompare(b,'de')),[])
  const filtered = useMemo(()=>{
    const term=query.trim().toLocaleLowerCase('de-DE')
    return allFamilies.filter(f => {
      if(category!=='Alle' && !f.entries.some(e=>e.category===category))return false
      if(status==='code' && !f.links.length)return false
      if(status==='private' && !f.entries.some(e=>e.state==='private'||e.state==='review'))return false
      if(status==='stub' && !f.entries.some(e=>e.state==='stub'))return false
      if(!term)return true
      return f.entries.some(e=>[e.title,e.family,e.category,e.description,e.source].join(' ').toLocaleLowerCase('de-DE').includes(term))
    })
  },[query,status,category])
  const visible=expanded||query.trim()?filtered:filtered.slice(0,12)
  const codeCount=projectArchive.filter(e=>e.link && e.state==='code').length
  return <section className="archive-zone" id="archiv" aria-labelledby="archive-title">
    <div className="layout archive-content">
      <div className="archive-intro">
        <div><p className="eyebrow">PROJEKTARCHIV · STAND OKTOBER 2026</p><h2 id="archive-title">Mehr als nur die Highlights.</h2></div>
        <p>Öffentliche Codebeispiele, private Entwicklungsprototypen, Ingenieurarbeiten und Forschungsversuche. Verwandte Versionen werden als Projektfamilie zusammengefasst. <strong>Nicht alles ist fertig oder öffentlich freigegeben.</strong></p>
      </div>
      <div className="archive-stats">
        <div><strong>{projectArchive.length}</strong><span>Dokumentierte Quelleneinträge</span></div>
        <div><strong>{allFamilies.length}</strong><span>Projektfamilien und Themen</span></div>
        <div><strong>{codeCount}</strong><span>Öffentliche Code-Links</span></div>
      </div>
      <div className="archive-toolbar">
        <label className="archive-search">
          <Search size={17} aria-hidden="true"/>
          <span className="visually-hidden">Projekte durchsuchen</span>
          <input type="search" value={query} placeholder="Suchen: CAD, AquaRevier, NASIM, Plugins …" onChange={e=>{setQuery(e.target.value);setExpanded(false)}}/>
        </label>
        <label>
          <span className="visually-hidden">Fachgebiet</span>
          <select value={category} onChange={e=>{setCategory(e.target.value);setExpanded(false)}}>{categories.map(c=><option key={c} value={c}>{c==='Alle'?'Alle Fachgebiete':c}</option>)}</select>
        </label>
      </div>
      <div className="archive-filters" aria-label="Nachweisstatus">
        {filters.map(([value,label])=><button key={value} type="button" aria-pressed={status===value} className={status===value?'archive-filter active':'archive-filter'} onClick={()=>{setStatus(value);setExpanded(false)}}>{label}</button>)}
      </div>
      <p className="archive-count" role="status">{filtered.length} passende Projektfamilien · {filtered.reduce((n,f)=>n+f.entries.length,0)} Quelleneinträge</p>
      <div className="archive-grid">
        {visible.map(f=>{
          const p=f.representative
          const hasCode=f.links.length>0
          return <article key={f.family} className="archive-card">
            <div className="archive-card-top">
              <span className="archive-category">{p.category}</span>
              <span className={hasCode?'archive-status archive-status-code':'archive-status archive-status-pending'}>
                {hasCode?<Code2 size={13}/>:<ShieldAlert size={13}/>}
                {hasCode?'Code vorhanden':'Ohne öffentliche Demo'}
              </span>
            </div>
            <h3>{f.family}</h3>
            <p>{p.description}</p>
            <div className="archive-card-bottom">
              <span className="archive-sources"><FolderOpen size={14}/>{f.entries.length} {f.entries.length===1?'Eintrag':'Versionen / Quellen'}</span>
              {f.links.length===1 && <a className="archive-link" href={f.links[0].link} target="_blank" rel="noopener noreferrer">Code ansehen <ArrowUpRight size={15}/></a>}
              {f.links.length>1 && <details className="archive-variants"><summary>{f.links.length} Code-Versionen</summary><ul>{f.links.map(e=><li key={e.id}><a href={e.link} target="_blank" rel="noopener noreferrer">{e.title}</a></li>)}</ul></details>}
            </div>
            {!hasCode && <p className="archive-caution">{p.state==='stub'?'Bislang nur README, kein vorzeigbarer Code-Link.':'Nur allgemeine Beschreibung; keine freigegebenen Projektdaten oder Demo.'}</p>}
          </article>
        })}
      </div>
      {!filtered.length && <p className="archive-empty">Keine Treffer. Bitte Suchbegriff oder Filter ändern.</p>}
      {!query.trim() && filtered.length>12 && <button type="button" className="archive-more" onClick={()=>setExpanded(!expanded)}>{expanded?'Weniger anzeigen':'Alle '+filtered.length+' Projektfamilien anzeigen'}</button>}
      <p className="archive-disclaimer"><strong>Nachweisgrenzen:</strong> Quellcode im Repository beweist weder erfolgreiche Tests noch Produktreife. Die private 30er-Prototypenserie ist nicht öffentlich freigegeben. Nicht veröffentlichte RWTH-/ISA-Arbeitsdaten, Kundendaten und interne Plugin-Konfigurationen bleiben privat.</p>
      <div className="archive-roadmap"><span className="roadmap-tag">Zukunftsvorhaben · keine fertige Demo</span><h3>Interaktiver Forschungs- und Masterarbeits-Simulator</h3><p>Perspektivisch veränderbare Parameter, Modelle, Unsicherheiten und Simulationsergebnisse sichtbar machen – erst nach fachlicher Validierung und Freigabe.</p></div>
    </div>
  </section>
}
