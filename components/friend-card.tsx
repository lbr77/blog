/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from './icons'
export interface FriendCardProps {
    index: number
	id: string
	picLink: string
	links: string
	name: string
	created_time: string
	last_edited_time: string
}

export function FriendCard(props: FriendCardProps) {
	const [imgError, setImgError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	return (
		<div
			key={props.id}
			className='border-b border-gray-200 dark:border-gray-700'
		>
			<Link
				href={props.links}
				target='_blank'
				className='block p-4 hover:bg-gray-50 dark:hover:bg-gray-800'
			>
				<div className='flex items-center gap-2'>
					<div className="relative w-12 h-12">
						{(isLoading && !imgError)&& (
							<div className="absolute w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
						)}
						{!imgError && (
							<img
								src={props.picLink}
								alt={props.name}
								width={48}
								height={48}
								className="w-12 h-12 rounded-full"
								onError={() => setImgError(true)}
								onLoad={() => setIsLoading(false)}
							/>
						)}
						{imgError && (
							<Icon name='user' className='absolute w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800' />
						)}
					</div>
					<div>
						<h2 className='text-lg font-semibold'>{props.name}</h2>
					</div>
				</div>
			</Link>
		</div>
	)
}
