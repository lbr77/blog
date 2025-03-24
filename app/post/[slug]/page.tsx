import { NotionRenderer } from '@/components/notion-renderer'
import { NotionAPI } from 'notion-client'
import { NOTION_API } from '@/config/site'
import { Twikoo } from '@/components/comments'
import NotFound from '@/app/not-found'
import { BlogPosting, WithContext } from 'schema-dts'
const getDate = (date: string) => {
	const d = new Date(date)
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
export const dynamic = 'force-dynamic'
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string }>
}) {
	const slug = (await params).slug as string
	const postInfo = await fetch(
		`https://nvme0n1p.dev/v2/posts/${slug}?info=true`,
	).then(res => res.json())
	if (!postInfo.post) {
		return {
			title: '404 | 溴化锂的笔记本',
		}
	}

	return {
		title: `${postInfo.post.Content} | 溴化锂的笔记本`,
		icons: ['favicon.png'],
	}
}
export default async function Post({
	params,
}: {
	params: Promise<{ slug?: string }>
}) {
	
	const slug = (await params).slug
	const notion = new NotionAPI({
		authToken: NOTION_API.autoToken,
		activeUser: NOTION_API.activeUser,
	})
	const postInfo = await fetch(
		`https://nvme0n1p.dev/v2/posts/${slug}?info=true`,
		{
			cache: 'no-store',
		},
	).then(res => res.json())
	const jsonLD: WithContext<BlogPosting> = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `https://nvme0n1p.dev/post/${slug}`,
		"name": `${postInfo.post.Content} | 溴化锂的笔记本`,
		"description": postInfo.post.excerpt
	}
	if (!postInfo.post) {
		return <NotFound />
	}
	const recordMap = await notion.getPage(postInfo.post.id)
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }} />
			<section className='border-grid border-b'>
				<div className='container-wrapper'>
					<div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
						<h1 className='text-3xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
							{postInfo.post.Content}
						</h1>
						<time className='py-2'>
							{getDate(postInfo.post.created_time)}
						</time>
						<p className='max-w-2xl text-balance text-lg py-2 font-light text-foreground'>
							{postInfo.post.excerpt}
						</p>
					</div>
				</div>
			</section>
			<div className='container-wrapper h-full overflow-auto flex-1'>
				<div className='container py-6'>
					<NotionRenderer recordMap={recordMap} />
				</div>
			</div>
			<div className='container-wrapper border-t'>
				<div className='container w-full md:w-[720px]'>
					{/* Next / Previous */}
				</div>
			</div>
			<div className='container-wrapper border-t'>
				<div className='container w-full md:w-[720px]'>
					<Twikoo />
				</div>
			</div>
		</>
	)
}
