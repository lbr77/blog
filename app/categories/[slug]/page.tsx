import NotFound from '@/app/not-found';
import { PostCard,PostCardProps } from '@/components/post-card'

export default async function CategoriesDetail({
	params,
}: {
	params: Promise<{ slug?: string }>
	searchParams: Promise<{ page?: string }>
}) {
	const slug = (await params).slug as string;
	const {posts} = (await fetch(`https://nvme0n1p.dev/v2/posts/tag/${slug}`,
		{
			cache: 'no-cache',
		},).then(
		res => res.json(),
	)) as {
		posts: PostCardProps[]
	};
	if(!posts.length){
		return <NotFound />
	}

	return (
		<>
			<section className='border-grid border-b'>
				<div className='container-wrapper'>
					<div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
						<h1 className='text-xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
							分类「{decodeURI(slug)}」下的文章
						</h1>
						<p className='max-w-2xl text-balance text-lg font-light text-foreground'>
							共计 {posts.length} 篇文章
						</p>
					</div>
				</div>
			</section>
			<div className='container-wrapper h-full overflow-auto flex-1'>
				<div className='grid grid-cols-1 lg:grid-cols-2'>
					{posts.map((p: PostCardProps, index: number) => (
						<PostCard key={p.id} {...p} index={index} />
					))}
				</div>
			</div>
		</>
	)
}
