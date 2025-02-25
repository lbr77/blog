// "use server";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
} from '@/components/ui/pagination'
import { PostCard,PostCardProps } from '@/components/post-card'

export default async function Index({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const page = (await searchParams).page || 1
	const size = 12
	const res = await fetch(
		`https://nvme0n1p.dev/v2/posts?page=${page}&length=${size}`,
		{
			cache: 'no-cache',
		},
	)
	const data = await res.json()
	const posts = data.posts
	const length = data.length
	return (
		<>
			<section className='border-grid border-b'>
				<div className='container-wrapper'>
					<div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-12'>
						<h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
							溴化锂的笔记本
						</h1>
						<p className='max-w-2xl text-balance text-lg font-light text-foreground'>
							井底之蛙不识海，却知晓天空之蓝。
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
				<div className='py-5'>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href={`?page=${Math.max(
										1,
										Number(page) - 1,
									)}`}
								/>
							</PaginationItem>
							{(() => {
								const currentPage = Number(page)
								const totalPages = length

								if (totalPages <= 5) {
									return [...Array(totalPages).keys()].map(
										i => (
											<PaginationItem key={i}>
												<PaginationLink
													href={`?page=${i + 1}`}
													isActive={
														currentPage === i + 1
													}
												>
													{i + 1}
												</PaginationLink>
											</PaginationItem>
										),
									)
								}

								const items = []
								// 始终显示第一页
								items.push(
									<PaginationItem key={1}>
										<PaginationLink
											href='?page=1'
											isActive={currentPage === 1}
										>
											1
										</PaginationLink>
									</PaginationItem>,
								)

								if (currentPage > 3) {
									items.push(
										<PaginationItem key='start-ellipsis'>
											<PaginationEllipsis />
										</PaginationItem>,
									)
								}

								// 显示当前页面的前后页
								for (
									let i = Math.max(2, currentPage - 1);
									i <=
									Math.min(totalPages - 1, currentPage + 1);
									i++
								) {
									items.push(
										<PaginationItem key={i}>
											<PaginationLink
												href={`?page=${i}`}
												isActive={currentPage === i}
											>
												{i}
											</PaginationLink>
										</PaginationItem>,
									)
								}

								if (currentPage < totalPages - 2) {
									items.push(
										<PaginationItem key='end-ellipsis'>
											<PaginationEllipsis />
										</PaginationItem>,
									)
								}

								// 始终显示最后一页
								items.push(
									<PaginationItem key={totalPages}>
										<PaginationLink
											href={`?page=${totalPages}`}
											isActive={
												currentPage === totalPages
											}
										>
											{totalPages}
										</PaginationLink>
									</PaginationItem>,
								)

								return items
							})()}
							<PaginationItem>
								<PaginationNext
									href={`?page=${Math.min(
										Math.ceil(length),
										Number(page) + 1,
									)}`}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</>
	)
}
