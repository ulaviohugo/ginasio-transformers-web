'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType } from 'react'
import { IconHome, IconProduct, IconUser } from '.'

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
					<Item active={path == '/'} link={'/'} text="Dashboard" icon={IconHome} />
					<Item
						active={path.indexOf('/comercial') >= 0}
						link={'/comercial'}
						text="Comercial"
						icon={IconProduct}
					/>
					<Item
						active={path.indexOf('/rh') >= 0}
						link={'/rh'}
						text="RH"
						icon={IconUser}
					/>
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
	icon: ElementType
}
const Item = ({ active, link, text, icon: Icon }: ItemProps) => {
	return (
		<li className="w-32">
			<Link
				href={link}
				className={`flex items-center gap-1 px-2 py-1 rounded-l-xl
				${active ? 'bg-gray-200 text-primary' : 'hover:bg-black hover:bg-opacity-20'}
				  transition-all duration-200 ease-in-out`}
			>
				<Icon /> {text}
			</Link>
		</li>
	)
}
