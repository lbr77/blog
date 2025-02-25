import { FriendCardProps,FriendCard } from "@/components/friend-card"
export const dynamic = 'force-dynamic'
export default async function Friends() {
    const links = await fetch('https://nvme0n1p.dev/v2/links',
		{
			cache: 'no-store',
		},).then(res => res.json())
	return (
		<>
			<section className='border-grid border-b'>
				<div className='container-wrapper'>
					<div className='container flex flex-col items-center gap-1 py-8 md:py-10 lg:py-6'>
						<h1 className='text-xl font-semibold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
							朋友们
						</h1>
                        <p className='max-w-2xl text-balance text-lg font-light text-foreground'>
							网络邻居！
						</p>
					</div>
				</div>
			</section>
            <div className='container-wrapper h-full overflow-auto flex-1'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
					{links.map((l: FriendCardProps,) => (
						<FriendCard key={l.id} {...l} />
					))}
                </div>
            </div>
		</>
	)
}
