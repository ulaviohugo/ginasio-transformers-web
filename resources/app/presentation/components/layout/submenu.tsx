import React, { ElementType } from 'react'
import { Link } from 'react-router-dom'

export type SubmenuProps = {
	text: string
	link: string
	icon?: ElementType
}

export function SubMenu({ submenus }: { submenus: SubmenuProps[] }) {
	const path = location.pathname

	return (
		<nav>
			<ul className="flex text-sm bg-gray-200 bg-opacity-90 px-1 pt-1">
				{submenus.map(({ link, text, icon }) => {
					console.log({ link, path })

					return (
						<MenuItem
							key={link}
							link={link}
							text={text}
							icon={icon}
							active={path.includes(link)}
						/>
					)
				})}
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
				to={link}
				className={`flex items-center gap-1 px-2 py-1 hover:font-semibold 
				${active ? 'bg-white font-semibold rounded-t-lg' : 'text-primary'}`}
			>
				{Icon && <Icon />} {text}
			</Link>
		</li>
	)
}
