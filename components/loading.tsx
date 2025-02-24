'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export function LoadingBar() {
    const [loading, setLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timeout)
    }, [pathname, searchParams])

    if (!loading) return null

    return (
        <Suspense>
            <div className='fixed inset-0 bg-white/50 backdrop-blur-sm z-40' />
            
            <div className='fixed top-0 left-0 right-0 z-50'>
                <div className='h-1 bg-primary animate-[loading_1s_ease-in-out_infinite]' />
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin' />
                </div>
            </div>
        </Suspense>
    )
}
