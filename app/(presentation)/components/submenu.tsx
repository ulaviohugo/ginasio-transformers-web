'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType } from 'react'

export type SubmenuProps = {
	text: string
	link: string
	icon?: ElementType
}

export function SubMenu({ submenus }: { submenus: SubmenuProps[] }) {
	return (
		<nav>
			<ul className="flex text-sm bg-gray-200 border-x-4 border-t-4 border-x-gray-200 border-t-gray-200">
				{submenus.map(({ link, text, icon }) => (
					<MenuItem key={link} link={link} text={text} icon={icon} />
				))}
			</ul>
		</nav>
	)
}

type ItemProps = {
	text: string
	link: string
	icon?: ElementType
}
const MenuItem = ({ link, text, icon: Icon }: ItemProps) => {
	const path = usePathname()
	return (
		<li>
			<Link
				href={link}
				className={`flex items-center gap-1 px-2 py-1 hover:font-semibold 
				${path == link && 'bg-white font-semibold'}`}
			>
				{Icon && <Icon />} {text}
			</Link>
		</li>
	)
}
