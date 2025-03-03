'use client'

import { ComponentProps }from 'react'
import {AppProgressProvider} from "@bprogress/next";
export function ProgressProvider({
    children,
    ...props
}: ComponentProps<typeof AppProgressProvider>) {
    return (
        <AppProgressProvider {...props}>
            {children}
        </AppProgressProvider>
    )
}
