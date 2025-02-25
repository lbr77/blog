import { PostCardProps } from "@/components/post-card"
import { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = {
    title: "归档 | 溴化锂的笔记本"
}
type PostDiv = {
    [year: number]: PostCardProps[]
}
export const dynamic = 'force-dynamic'
export default async function Archives() {
    const { posts } = await fetch('https://nvme0n1p.dev/v2/posts',
		{
			cache: 'no-store',
		},).then((res) =>
        res.json(),
    )
    const yearDiv: PostDiv = {}
    for(const post of posts){
        const year = new Date(post.created_time).getFullYear()
        if(!yearDiv[year]){
            yearDiv[year] = []
        }
        yearDiv[year].push(post)
    }

    // 获取所有年份并降序排列
    const years = Object.keys(yearDiv).map(Number).sort((a, b) => b - a)

    return (
        <>
            <section className='border-grid border-b'>
                <div className='container-wrapper'>
                    <div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
                        <h1 className='text-xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
                            归档
                        </h1>
                        <p className='max-w-2xl text-balance text-lg font-light text-foreground'>
                            共 {posts.length} 篇文章
                        </p>
                    </div>
                </div>
            </section>
            <div className='container-wrapper h-full overflow-auto flex-1'>
                <div className='container py-6'>
                    <div className='space-y-8'>
                        {years.map((year) => (
                            <div key={year} className='relative'>
                                <div className='sticky top-0 bg-background/95 backdrop-blur z-10 py-2'>
                                    <h2 className='text-2xl font-bold'>{year}</h2>
                                </div>
                                <div className='mt-4 space-y-4'>
                                    {yearDiv[year].map((post) => (
                                        <Link
                                            href={`/post/${post.slug}`}
                                            key={post.id}
                                            className='block p-4 border rounded-lg hover:bg-muted/50 transition-colors'
                                        >
                                            <div className='flex justify-between items-start gap-4'>
                                                <h3 className='font-medium'>{post.Content}</h3>
                                                <time className='text-sm text-muted-foreground whitespace-nowrap'>
                                                    {new Date(post.created_time).toLocaleDateString('zh-CN')}
                                                </time>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}