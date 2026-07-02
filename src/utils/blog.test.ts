import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getBlogSlug,
  getBlogTimelineItems,
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

test('builds timeline items from blog posts in publish date order', () => {
  const olderPost = {
    id: 'older-story/index',
    data: {
      title: '舊文章',
      description: '比較早發表的文章',
      publishDate: new Date('2026-01-01'),
      tags: ['文學']
    }
  }
  const newerPost = {
    id: 'newer-story/index',
    data: {
      title: '新文章',
      description: '比較晚發表的文章',
      publishDate: new Date('2026-06-15'),
      tags: ['科幻', '都市']
    }
  }

  assert.deepEqual(getBlogTimelineItems([olderPost, newerPost]), [
    {
      date: '2026-06-15',
      description: '比較晚發表的文章',
      href: '/blog/newer-story',
      tags: ['科幻', '都市'],
      title: '新文章',
      updateText: '新增了「新文章」文章'
    },
    {
      date: '2026-01-01',
      description: '比較早發表的文章',
      href: '/blog/older-story',
      tags: ['文學'],
      title: '舊文章',
      updateText: '新增了「舊文章」文章'
    }
  ])
})

test('serializes JSON for an inline script without allowing script termination', () => {
  const serialized = serializeJsonForScript({
    description: '內容包含 </script><script>alert(1)</script>'
  })

  assert.equal(serialized.includes('</script>'), false)
  assert.equal(JSON.parse(serialized).description, '內容包含 </script><script>alert(1)</script>')
})
