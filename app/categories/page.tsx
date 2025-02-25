import Link from "next/link"

export default async function Categories() {
    const tags = await fetch("https://nvme0n1p.dev/v2/posts/tag",
		{
			cache: 'no-cache',
		},).then(res => res.json())
    return (
        <>
            <section className='border-grid border-b'>
                <div className='container-wrapper'>
                    <div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
                        <h1 className='text-xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
                            分类
                        </h1>
                        <p className='max-w-2xl text-balance text-lg font-light text-foreground'>
                            {tags.length} 个分类
                        </p>
                    </div>
                </div>
            </section>
            <div className='container-wrapper h-full overflow-auto flex-1'>
                <div className='container py-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {tags.map((tag: string) => (
                            <Link
								href={`/categories/${tag}`} 
                                key={tag}
                                className='p-4 border rounded-lg hover:bg-muted/50 transition-colors'
                            >
                                <h3 className='font-medium mb-2'>{tag}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
