// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

export function LoadingBar() {
    const [loading, setLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timeout)
    }, [pathname, searchParams])

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setLoading(true)
        }

        const handleRouteChangeComplete = () => {
            setLoading(false)
        }

        const handleRouteChangeError = () => {
            setLoading(false)
        }

        document.addEventListener('mousedown', (e) => {
            const target = e.target as HTMLElement
            const closestLink = target.closest('a')
            if (closestLink && closestLink.href && !closestLink.target && closestLink.href.startsWith(window.location.origin)) {
                setLoading(true)
            }
        })

        router.events?.on('routeChangeStart', handleRouteChangeStart)
        router.events?.on('routeChangeComplete', handleRouteChangeComplete)
        router.events?.on('routeChangeError', handleRouteChangeError)

        return () => {
            router.events?.off('routeChangeStart', handleRouteChangeStart)
            router.events?.off('routeChangeComplete', handleRouteChangeComplete)
            router.events?.off('routeChangeError', handleRouteChangeError)
        }
    }, [router])

    if (!loading) return null

    return (
        <Suspense>
            <div className='fixed inset-0 bg-white/50 dark:bg-gray-900/70 backdrop-blur-sm z-40' />
            
            <div className='fixed top-0 left-0 right-0 z-50'>
                <div className='h-1 bg-primary animate-[loading_1s_ease-in-out_infinite]' />
            </div>
        </Suspense>
    )
}
