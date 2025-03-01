'use client'
import nextLeagacyImage from 'next/legacy/image' 
import nextLink from 'next/link'
import { NotionRenderer as OriginalRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const Code = dynamic(() =>
	import('react-notion-x/build/third-party/code').then(m => m.Code),
)
const Equation = dynamic(() =>
	import('react-notion-x/build/third-party/equation').then(m => m.Equation),
)
const Pdf = dynamic(
	() => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
	{
		ssr: false,
	},
)
const Modal = dynamic(
	() => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
	{
		ssr: false,
	},
)
const Collection = dynamic(
	() =>
		import('react-notion-x/build/third-party/collection').then(m => m.Collection),
	{
		ssr: false,
	},
)
export function NotionRenderer({
	recordMap,
	collection,
	...props
}: {
	recordMap: ExtendedRecordMap,
	collection?: boolean
}) {
	const { theme } = useTheme()
	const components = {
		nextLink,
		nextLeagacyImage,
		Code,
		Equation,
		Modal,
		Pdf,
		Collection: collection ? Collection : null,
	}
	return (
		<OriginalRenderer
			recordMap={recordMap}
			components={components}
			{...props}
			// fullPage={true}
			hideBlockId={true}
			darkMode={theme === 'dark'}
			forceCustomImages={true}
			showTableOfContents={true}
		/>
	)
}
