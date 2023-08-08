'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
	const handleSignout = async () => {
		await signOut({ callbackUrl: '/login' })
	}
	const path = usePathname()
	return (
		<header className="bg-primary text-gray-200 h-screen">
			<nav className="flex flex-col gap-4 py-4 items-center h-full">
				<Image src={'/images/logo-tipo.png'} width={100} height={100} alt="Logo" />
				<ul className="flex flex-col">
					<Item active={path == '/'} link={'/'} text="Dashboard" />
					<Item
						active={path.indexOf('/comercial') >= 0}
						link={'/comercial'}
						text="Comercial"
					/>
					<Item active={path.indexOf('/rh') >= 0} link={'/rh'} text="RH" />
					<Item active={path == '/admin'} link={'/admin'} text="Administrativo" />
				</ul>
				<div className="flex mt-auto px-2">
					<button
						className="btn hover:bg-white hover:text-primary border"
						onClick={handleSignout}
					>
						Sair
					</button>
				</div>
			</nav>
		</header>
	)
}

type ItemProps = {
	text: string
	link: string
	active: boolean
}
const Item = ({ active, link, text }: ItemProps) => {
	return (
		<li>
			<Link
				href={link}
				className={`flex px-2 py-1 rounded-l-xl
				${active ? 'bg-gray-50 text-gray-500' : 'hover:bg-gray-700'}
				  transition-all duration-200 ease-in-out`}
			>
				{text}
			</Link>
		</li>
	)
}
