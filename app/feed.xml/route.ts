import RSS from 'rss';

export async function GET() {
    const feed = new RSS({
        title: "溴化锂的笔记本",
        feed_url: 'https://nvme0n1p.dev/feed.xml',
        site_url: 'https://nvme0n1p.dev',
        image_url: 'https://nvme0n1p.dev/favicon.png',
        language: 'zh-CN',
        pubDate: new Date(),
    });

    try {
        const response = await fetch("https://nvme0n1p.dev/v2/posts");
        const { posts } = await response.json();

        posts.forEach((post: {
            Content: string;
            slug: string;
            excerpt?: string;
            created_time: string;
            content?: string;
        }) => {
            feed.item({
                title: post.Content,
                description: post.excerpt || '',
                url: `https://nvme0n1p.dev/posts/${post.slug}`,
                date: new Date(post.created_time),
                guid: post.slug,
            });
        });

        return new Response(feed.xml({ indent: true }), {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    } catch (error) {
        console.error('Error generating feed:', error);
        return new Response('Error generating feed', { status: 500 });
    }
}