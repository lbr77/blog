// hooks/use-theme-animation.ts
'use client'

import { useEffect } from 'react'

const viewTransitionStyle = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
`

export function useThemeAnimation() {
	useEffect(() => {
		if (document && 'startViewTransition' in document) {
			const styleElement = document.createElement('style')
			styleElement.id = 'view-transition-style'
			styleElement.textContent = viewTransitionStyle
			document.head.appendChild(styleElement)

			return () => {
				const styleToRemove = document.getElementById(
					'view-transition-style',
				)
				if (styleToRemove) {
					document.head.removeChild(styleToRemove)
				}
			}
		}
	}, [])

	const toggleThemeWithAnimation = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		isDark: boolean,
		callback: () => void,
	) => {
		if (!document || !('startViewTransition' in document)) {
			callback()
			return
		}

		const x = event.clientX
		const y = event.clientY
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		)

		try {
			document
				.startViewTransition(() => {
					callback()
					return document.documentElement.classList.contains('dark')
						? document.documentElement.classList.replace(
								'dark',
								'light',
						  )
						: document.documentElement.classList.replace(
								'light',
								'dark',
						  )
				})
				.ready.then(() => {
					const clipPath = [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${endRadius}px at ${x}px ${y}px)`,
					]

					document.documentElement.animate(
						{
							clipPath: isDark
								? [...clipPath].reverse()
								: clipPath,
						},
						{
							duration: 400,
							easing: 'ease-in',
							pseudoElement: isDark
								? '::view-transition-old(root)'
								: '::view-transition-new(root)',
						},
					)
				})
				.catch(error => {
					console.error('Theme transition failed:', error)
					callback()
				})
		} catch (error) {
			console.error('Failed to start view transition:', error)
			callback()
		}
	}

	return toggleThemeWithAnimation
}
