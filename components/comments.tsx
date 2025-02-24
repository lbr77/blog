"use client";
import { useEffect } from 'react'
import { TWIKOO_ID } from '@/config/site'
export const Twikoo = () => {
    useEffect(() => {
        const cdn = document.createElement('script')
        cdn.src = 'https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.all.min.js'
        cdn.async = true
        const loadSecondScript = () => {
            const initScript = document.createElement('script')
            initScript.innerHTML = `
            twikoo.init({
                envId: '${TWIKOO_ID.envId}',
                el: '#twikoo',
            })`
            initScript.id = "twikoo-init-id";
            document.body.appendChild(initScript)
        }
        cdn.addEventListener('load', loadSecondScript)
        document.body.appendChild(cdn)
        return () => {
            if(loadSecondScript) {
                cdn.removeEventListener('load', loadSecondScript)
            }
            if(cdn) {
                document.body.removeChild(cdn)
            }
            const initScript = document.getElementById('twikoo-init-id')
            if(initScript) {
                document.body.removeChild(initScript)
            }
        }
    },[])
    return (
        <div id="twikoo" className='p-5'></div>
    )
}