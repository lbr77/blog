import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch("https://nvme0n1p.dev/v2/posts").then(res => res.json())
    const posts = response.posts
    const urls = posts.map((post: { slug: string }) => ({
        url: `/posts/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))
    const tags = await fetch("https://nvme0n1p.dev/v2/posts/tag").then(res => res.json())
    const tagUrls = tags.map((tag: string) => ({
        url: `/categories/${tag}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))
	return [
		{
			url: 'https://nvme0n1p.dev/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: '/about',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
        ...urls,
        ...tagUrls,
	]
}
