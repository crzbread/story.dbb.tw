import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatTimelineDate,
  getBlogSlug,
  getFeaturedBlogPosts,
  normalizeBlogPost,
  serializeJsonForScript,
  sortBlogPosts
} from './blog.ts'

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

test('filters featured posts and sorts them by publishDate', () => {
  const olderFeaturedPost = {
    data: {
      featured: true,
      publishDate: new Date('2026-06-01')
    }
  }
  const newerFeaturedPost = {
    data: {
      featured: true,
      publishDate: new Date('2026-06-10')
    }
  }
  const regularPost = {
    data: {
      publishDate: new Date('2026-06-15')
    }
  }

  assert.deepEqual(getFeaturedBlogPosts([olderFeaturedPost, regularPost, newerFeaturedPost]), [
    newerFeaturedPost,
    olderFeaturedPost
  ])
})

test('formats a timeline date as zero-padded UTC yyyy-mm-dd', () => {
  assert.equal(formatTimelineDate(new Date('2026-06-05T00:00:00Z')), '2026-06-05')
  assert.equal(formatTimelineDate(new Date('2026-11-15T23:59:59Z')), '2026-11-15')
})

test('serializes JSON for an inline script without allowing script termination', () => {
  const serialized = serializeJsonForScript({
    description: '內容包含 </script><script>alert(1)</script>'
  })

  assert.equal(serialized.includes('</script>'), false)
  assert.equal(JSON.parse(serialized).description, '內容包含 </script><script>alert(1)</script>')
})
