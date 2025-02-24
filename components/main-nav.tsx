import Link from 'next/link'
import * as React from 'react'
import Image from 'next/image'
export function MainNav() {
	const linkClass = 'text-sm md:text-base text-foreground hover:text-blue-800'
	return (
		<div className='mr-4 hidden md:flex'>
				<Link href='/'>
					{/* <span className='text-2xl font-semibold'>
						溴化锂的笔记本
					</span> */}
					<Image width={24} height={24} className="py-4" decoding="sync" alt="icon" src="/favicon.png"/>
				</Link>
				<div className="flex items-center gap-4 text-sm xl:gap-6 px-4">
					<Link href="/" className={linkClass}>首页</Link>
					<Link href="/categories" className={linkClass}>分类</Link>
					<Link href="/archives" className={linkClass}>归档</Link>
					<Link href="/friends" className={linkClass}>友链</Link>
					<Link href="/about" className={linkClass}>关于</Link>
				</div>
			</div>
	)
}
