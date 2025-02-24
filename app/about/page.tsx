import { NotionRenderer } from '@/components/notion-renderer'
import { NotionAPI } from 'notion-client'
import { NOTION_API, NOTION_DB } from '@/config/site'
import { Twikoo } from '@/components/comments'

export default async function About() {
	const notion = new NotionAPI({
		authToken: NOTION_API.autoToken,
		activeUser: NOTION_API.activeUser,
	})
	const recordMap = await notion.getPage(NOTION_DB.ABOUT_PAGE)
	return (
		<>
			<section className='border-grid border-b'>
				<div className='container-wrapper'>
					<div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
						<h1 className='text-xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
							关于我
						</h1>
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
					<Twikoo />
				</div>
			</div>
		</>
	)
}
