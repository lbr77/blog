'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { META_THEME_COLORS } from '@/config/site'
import { useMetaColor } from '@/hooks/use-meta-color'
import { useThemeAnimation } from '@/hooks/use-theme-animation'
import { Button } from '@/components/ui/button'

export function ModeSwitcher() {
	const { setTheme, resolvedTheme } = useTheme()
	const { setMetaColor } = useMetaColor()
	const toggleThemeWithAnimation = useThemeAnimation()

	const toggleTheme = React.useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			const isDark = resolvedTheme === 'dark'

			toggleThemeWithAnimation(e, isDark, () => {
				setTheme(isDark ? 'light' : 'dark')
				setMetaColor(
					isDark ? META_THEME_COLORS.light : META_THEME_COLORS.dark,
				)
			})
		},
		[resolvedTheme, setTheme, setMetaColor, toggleThemeWithAnimation],
	)

	return (
		<Button
			variant='ghost'
			className='group/toggle h-8 w-8 px-0'
			onClick={toggleTheme}
		>
			<SunIcon className='absolute transform opacity-0 transition-all duration-100 [html.dark_&]:opacity-100' />
			<MoonIcon className='absolute transform opacity-0 transition-all duration-100 [html.light_&]:opacity-100' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
