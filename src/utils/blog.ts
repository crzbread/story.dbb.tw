type BlogPostWithDate = {
  data: {
    publishDate: Date
  }
}

type BlogPostWithFeatured = BlogPostWithDate & {
  data: {
    featured?: boolean
  }
}

type BlogTimelinePost = BlogPostWithDate & {
  id: string
  data: {
    description: string
    tags: string[]
    title: string
  }
}

export function getBlogSlug(id: string) {
  return id.replace(/\/index$/, '')
}

export function normalizeBlogPost<T extends { id: string }>(post: T): T {
  return { ...post, id: getBlogSlug(post.id) }
}

export function sortBlogPosts<T extends BlogPostWithDate>(posts: readonly T[]) {
  return [...posts].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
}

export function getFeaturedBlogPosts<T extends BlogPostWithFeatured>(posts: readonly T[]) {
  return sortBlogPosts(posts.filter((post) => post.data.featured))
}

export function formatTimelineDate(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getBlogTimelineItems<T extends BlogTimelinePost>(posts: readonly T[]) {
  return sortBlogPosts(posts).map((post) => {
    const slug = getBlogSlug(post.id)

    return {
      date: formatTimelineDate(post.data.publishDate),
      description: post.data.description,
      href: `/blog/${slug}`,
      tags: post.data.tags,
      title: post.data.title,
      updateText: `新增了「${post.data.title}」文章`
    }
  })
}

export function serializeJsonForScript(value: unknown) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}
