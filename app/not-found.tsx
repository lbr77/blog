import Link from 'next/link'

export default function NotFound() {
	return (
			<div className='container-wrapper w-full h-full overflow-auto flex-1 items-center justify-center bg-background'>
				<div className='text-center space-y-6 justify-center items-center w-full h-full container'>
					<h1 className='text-9xl font-bold text-gray-800'>404</h1>
					<div className='space-y-2'>
						<h2 className='text-3xl font-semibold text-gray-700'>
							页面未找到
						</h2>
						<p className='text-gray-500'>
							抱歉，您访问的页面不存在或已被移除
						</p>
					</div>
					<Link
						href='/'
						className='inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200'
					>
						返回首页
					</Link>
				</div>
			</div>
	)
}
