import assert from 'node:assert/strict'
import test from 'node:test'

import { getNextTheme } from './theme.ts'

test('cycles from system to dark', () => {
  assert.equal(getNextTheme('system'), 'dark')
})

test('cycles from dark to light', () => {
  assert.equal(getNextTheme('dark'), 'light')
})

test('cycles from light back to system', () => {
  assert.equal(getNextTheme('light'), 'system')
})

test('treats a missing stored theme as system', () => {
  assert.equal(getNextTheme(null), 'dark')
  assert.equal(getNextTheme(undefined), 'dark')
})
