import assert from 'node:assert/strict'
import test from 'node:test'

import { getNextTheme } from './theme.ts'

test('switches from the currently rendered dark theme to light', () => {
  assert.equal(getNextTheme(true), 'light')
})

test('switches from the currently rendered light theme to dark', () => {
  assert.equal(getNextTheme(false), 'dark')
})
