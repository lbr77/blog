'use client'

import { useState, useEffect } from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandList,
	CommandSeparator,
	CommandGroup,
	CommandItem,
} from './ui/command'
import { ALGOLIA_SEARCH } from '@/config/site'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react" // 添加这行导入

interface SearchResult {
	objectID: string
	title: string
	description?: string
	url: string
}
export function CommandMenu({ ...props }: DialogProps) {
	const router = useRouter()
	const searchClient = algoliasearch(
		ALGOLIA_SEARCH.appId,
		ALGOLIA_SEARCH.apiKey,
	)
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	const [results, setResults] = useState<SearchResult[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
				if (
					(e.target instanceof HTMLElement &&
						e.target.isContentEditable) ||
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement ||
					e.target instanceof HTMLSelectElement
				) {
					return
				}

				e.preventDefault()
				setOpen(open => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	useEffect(() => {
		const fetchResults = async () => {
			if (!search) {
				setResults([])
				return
			}

			setLoading(true)
			try {
				const response = await searchClient.search({
					requests: [
						{
							indexName: ALGOLIA_SEARCH.indexName,
							query: search,
							hitsPerPage: 10,
						},
					],
				}) as unknown as { results: { hits: SearchResult[] }[] }
				setResults(response.results[0].hits)
			} catch (error) {
				console.error('Search error:', error)
				setResults([])
			} finally {
				setLoading(false)
			}
		}

		const debounce = setTimeout(() => {
			fetchResults()
		}, 300)

		return () => clearTimeout(debounce)
	}, [search, searchClient])

	const handleSelect = (result: SearchResult) => {
		setOpen(false)
		router.push(result.url)
	}

	return (
		<>
			<Button
				variant='outline'
				className={cn(
					'relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64',
				)}
				onClick={() => setOpen(true)}
				{...props}
			>
				<span className='hidden lg:inline-flex'>Search</span>
				<span className='inline-flex lg:hidden'>Search...</span>
				<kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
					<span className='text-xs'>⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder='Type to search...'
					value={search}
					onValueChange={setSearch}
				/>
				<CommandList>
					<CommandEmpty>
						{loading ? (
							<div className="flex items-center justify-center py-4">
								<Loader2 className="h-4 w-4 animate-spin" />
							</div>
						) : (
							"没有找到相关结果"
						)}
					</CommandEmpty>
					{results.length > 0 && (
						<>
							<CommandSeparator />
							<CommandGroup heading='搜索结果'>
								{results.map(result => (
									<CommandItem
										key={result.objectID}
										onSelect={() => handleSelect(result)}
									>
										<div className='flex flex-col'>
											<span>{result.title}</span>
											{result.description && (
												<span className='text-sm text-muted-foreground'>
													{result.description}
												</span>
											)}
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}
				</CommandList>
			</CommandDialog>
		</>
	)
}
