import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { projectArchive } from '../src/archiveData.js'

// Regression test for mixed-category and mixed-status project families.
// The actual filter/group functions are extracted from the React component.
const source = readFileSync(new URL('../src/ProjectArchive.jsx', import.meta.url), 'utf8')
const grouping = source.match(/function groupByFamily\(items\) \{[\s\S]*?\n\}/)?.[0]
const filtering = source.match(/const filtered = useMemo\(\(\) => \{([\s\S]*?)\}, \[query, badgeFilter, category\]\)/)?.[1]
assert.ok(grouping && filtering, 'Archive grouping/filtering implementation must be present')
const rank = { 'VERIFIED DEMO': 0, 'VERIFIED CODE': 1, 'DOCUMENTED PROJECT': 2, PROTOTYPE: 3, 'CONCEPT / IN PROGRESS': 4, 'BROKEN / NOT PRESENTABLE': 5 }
const groupByFamily = new Function('rank', grouping + '; return groupByFamily')(rank)
const filter = new Function('allFamilies', 'query', 'badgeFilter', 'category', filtering)
function families({ query = '', badgeFilter = 'all', category = 'Alle' } = {}) {
  return filter(groupByFamily(projectArchive), query, badgeFilter, category)
}

test('category filter shows only matching HFT source and links', () => {
  const family = families({ category: 'Engineering & Sensorik' }).find(f => f.family === 'HFT / Algorithmischer Handel')
  assert.ok(family)
  assert.equal(family.representative.category, 'Engineering & Sensorik')
  assert.ok(family.entries.every(e => e.category === 'Engineering & Sensorik'))
  assert.equal(family.links.length, 1)
})

test('prototype filter does not show a verified-code representative', () => {
  const family = families({ badgeFilter: 'PROTOTYPE' }).find(f => f.family === 'HFT / Algorithmischer Handel')
  assert.ok(family)
  assert.equal(family.representative.badge, 'PROTOTYPE')
  assert.ok(family.entries.every(e => e.badge === 'PROTOTYPE'))
})

test('search returns only matching HFT source links', () => {
  const family = families({ query: 'Backtest' }).find(f => f.family === 'HFT / Algorithmischer Handel')
  assert.ok(family)
  assert.equal(family.entries.length, 1)
  assert.equal(family.links.length, 1)
  assert.equal(family.links[0].id, 'gh-hft-backtest-simulator')
})

test('archive prose must not assert an incorrect static inventory count', () => {
  const count = source.match(/Vollständige Übersicht aller (\d+) inventarisierten Arbeiten/)
  if (count) assert.equal(Number(count[1]), projectArchive.length)
})

test('unfiltered archive preserves every entry and family', () => {
  const all = families()
  assert.equal(all.length, new Set(projectArchive.map(e => e.family)).size)
  assert.equal(all.reduce((n, f) => n + f.entries.length, 0), projectArchive.length)
})
