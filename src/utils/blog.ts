type BlogPostWithDate = {
  data: {
    publishDate: Date
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
