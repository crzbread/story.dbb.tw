import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'

test('keeps the demo pages available for review', () => {
  assert.equal(existsSync(new URL('../pages/fable-demo.astro', import.meta.url)), true)
  assert.equal(existsSync(new URL('../pages/codex-demo.astro', import.meta.url)), true)
})
