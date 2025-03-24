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
import { ProgressProvider } from '@/components/providers/progress-provider'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: '溴化锂的笔记本',
	description: "LiBr's notebook",
	icons: ['favicon.png'],
	alternates: {
		canonical: 'https://nvme0n1p.dev',
		types: {
			'application/rss+xml': '/feed.xml',
		},
	},
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
			<head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8340918938706383" crossOrigin="anonymous"></script></head>
			<body
				className={cn(
					'min-h-svh bg-background font-sans antialiased',
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				<Suspense fallback={null}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						enableColorScheme
					>
						<ProgressProvider height="4px" color="#ffd000" options={{ showSpinner: true }} shallowRouting>
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
						</ProgressProvider>
					</ThemeProvider>
				</Suspense>
			</body>
		</html>
	)
}
