import Link from 'next/link'
const getDate = (date: string) => {
	const d = new Date(date)
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export interface PostCardProps {
	id: string
	Content: string
	excerpt: string
	created_time: string
	slug: string
	index: number
	Tags: string[]
}
export const PostCard = (props: PostCardProps) => {
	return (
		<div
			className={`grid w-full h-[160px] border-b border-grid ${
				props.index % 2 === 0 ? 'border-r' : ''
			}`}
		>
			<div className='text-start py-5 px-10'>
				<Link href={`/post/${props.slug}`}>
					<span className='text-l font-semibold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>
						{props.Content}
					</span>
					<p className='max-w-2xl text-balance text-lg font-light text-foreground'>
						{props.excerpt}
					</p>
					<time className='text-sm font-light text-foreground'>
						{getDate(props.created_time)}
					</time>
				</Link>
				<div className=''>
					{props.Tags.map(tag => {
						return (
							<Link
								href={`/categories/${tag}`}
								key={tag}
								className={`inline-block px-1 py-1 mr-1 text-xs font-semibold text-dark dark:text-white  rounded-md`}
							>
								#{tag}
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}
