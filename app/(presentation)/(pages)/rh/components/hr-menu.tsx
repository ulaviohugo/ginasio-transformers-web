'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HRMenu() {
	const path = usePathname()
	return (
		<nav>
			<ul className="flex text-sm bg-gray-100">
				<MenuItem active={path == '/rh'} link={`/rh`} text="Funcionários" />
				<MenuItem
					active={path == '/rh/folha-salarial'}
					link={`/rh/folha-salarial`}
					text="Folha salarial"
				/>
			</ul>
		</nav>
	)
}

type ItemProps = {
	text: string
	link: string
	active: boolean
}
const MenuItem = ({ active, link, text }: ItemProps) => {
	return (
		<li>
			<Link
				href={link}
				className={`flex px-2 py-1 hover:bg-gray-200 
				${active && 'bg-gray-200'}`}
			>
				{text}
			</Link>
		</li>
	)
}
