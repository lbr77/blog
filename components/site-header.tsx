import { MainNav } from './main-nav'
import { Button } from './ui/button'
import { Icon } from './icons'
import { ModeSwitcher } from './mode-switcher'
import { MobileNav } from './mobile-nav'
import Link from 'next/link'
import { CommandMenu } from './command-menu'
export function SiteHeader() {
	return (
		<header className='border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container-wrapper'>
				<div className='container flex h-14 items-center'>
					<MainNav />
					<MobileNav />
					<div className='flex flex-1 items-center justify-between gap-2 md:justify-end'>
						<div className='w-full flex-1 md:w-auto md:flex-none'>
							<CommandMenu />
						</div>
						<nav className='flex items-center gap-0.5'>
							<Button
								asChild
								variant='ghost'
								size='icon'
								className='h-8 w-8 px-0'
							>
								<Link
									href='https://github.com/lbr77'
									target='_blank'
									rel='noreferer'
								>
									<Icon name='github' />
									<span className='sr-only'>GitHub</span>
								</Link>
							</Button><Button
								asChild
								variant='ghost'
								size='icon'
								className='h-8 w-8 px-0'
							>
								<Link
									href='https://x.com/0x88ffa357'
									target='_blank'
									rel='noreferer'
								>
									<Icon name='twitter' />
									<span className='sr-only'>Twitter</span>
								</Link>
							</Button>
							<ModeSwitcher />
						</nav>
					</div>
				</div>
			</div>
		</header>
	)
}
