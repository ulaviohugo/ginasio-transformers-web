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
	const path = usePathname()
	return (
		<nav>
			<ul className="flex text-sm bg-gray-200 bg-opacity-90 px-1 pt-1">
				{submenus.map(({ link, text, icon }) => (
					<MenuItem
						key={link}
						link={link}
						text={text}
						icon={icon}
						active={path == link}
					/>
				))}
			</ul>
		</nav>
	)
}

type ItemProps = {
	text: string
	link: string
	icon?: ElementType
	active: boolean
}
const MenuItem = ({ link, text, icon: Icon, active }: ItemProps) => {
	return (
		<li>
			<Link
				href={link}
				className={`flex items-center gap-1 px-2 py-1 hover:font-semibold 
				${active ? 'bg-white font-semibold rounded-t-lg' : 'text-primary'}`}
			>
				{Icon && <Icon />} {text}
			</Link>
		</li>
	)
}
