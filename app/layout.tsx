import type { Metadata } from 'next'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism.css'
import 'katex/dist/katex.min.css'
import './globals.css'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { LoadingBar } from '@/components/loading'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: '溴化锂的笔记本',
	description: "LiBr's notebook",
	icons: [
		"favicon.png"
	],
	alternates: {
		canonical: 'https://nvme0n1p.dev',
		types: {
			'application/rss+xml': '/feed.xml',
		}
	}
}
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='zh-cn' suppressHydrationWarning>
			<head>
				{/* <script
					dangerouslySetInnerHTML={{
						__html: `try {if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}');}} catch (_) {}`,
					}}
				/> */}
			</head>
			<body
				className={cn(
					'min-h-svh bg-background font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				<Suspense fallback={null}> 
					<LoadingBar />
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem
						enableColorScheme
					>
						<div vaul-drawer-wrapper=''>
							<div className='relative flex flex-col bg-background min-h-screen'>
								<div
									data-wrapper=''
									className='border-grid flex flex-1 flex-col'
								>
									<SiteHeader />
									<main className='flex flex-1 flex-col'>
										{children}
									</main>
									<SiteFooter />
								</div>
							</div>
						</div>
						<Toaster />
						<Sonner />
					</ThemeProvider>
				</Suspense>
			</body>
		</html>
	)
}
