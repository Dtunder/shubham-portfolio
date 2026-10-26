import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const picture = source.match(/<picture>([\s\S]*?)<\/picture>/)?.[1]
assert.ok(picture, 'Hero portrait picture must exist')
const sources = [...picture.matchAll(/<source\s+([^>]+?)\s*\/>/g)].map(m => m[1])

test('mobile portrait source is evaluated first with max-width media', () => {
  assert.ok(sources.length >= 2, 'Mobile and default WebP sources required')
  assert.match(sources[0], /srcSet=\{portraitWebp320\}/)
  assert.match(sources[0], /media="\(max-width: 480px\)"/)
})

test('default portrait source remains second for desktop', () => {
  assert.match(sources[1], /srcSet=\{portraitWebp\}/)
  assert.doesNotMatch(sources[1], /media=/)
})
