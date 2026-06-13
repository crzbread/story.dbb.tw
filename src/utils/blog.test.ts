import assert from 'node:assert/strict'
import test from 'node:test'

import { getBlogSlug, normalizeBlogPost, sortBlogPosts } from './blog.ts'

test('removes the index segment from a folder-based post id', () => {
  assert.equal(getBlogSlug('example/index'), 'example')
})

test('preserves a non-index post id', () => {
  assert.equal(getBlogSlug('example'), 'example')
})

test('normalizes a post id without mutating the collection entry', () => {
  const post = { id: 'example/index', data: { publishDate: new Date('2026-06-13') } }

  assert.equal(normalizeBlogPost(post).id, 'example')
  assert.equal(post.id, 'example/index')
})

test('sorts posts by publishDate without promoting updated posts', () => {
  const olderUpdatedPost = {
    data: {
      publishDate: new Date('2026-06-01'),
      updatedDate: new Date('2026-06-13')
    }
  }
  const newerPost = {
    data: {
      publishDate: new Date('2026-06-10')
    }
  }

  assert.deepEqual(sortBlogPosts([olderUpdatedPost, newerPost]), [newerPost, olderUpdatedPost])
})
